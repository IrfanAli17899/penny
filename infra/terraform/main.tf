resource "google_service_account" "frontend_sa" {
  account_id   = "${var.app_name}-${var.environment}-frontend-sa"
  display_name = "Frontend Service Account"
  project      = var.project_id
}

resource "google_service_account" "backend_sa" {
  account_id   = "${var.app_name}-${var.environment}-backend-sa"
  display_name = "Backend Service Account"
  project      = var.project_id
}

module "networking" {
  source         = "./modules/networking"
  app_name       = var.app_name
  environment    = var.environment
  project_id     = var.project_id
  region         = var.region
  subnet_cidr    = "10.0.0.0/24"
  connector_cidr = "10.8.0.0/28"
}

module "frontend" {
  source           = "./modules/cloud_run"
  app_name         = var.app_name
  environment      = var.environment
  project_id       = var.project_id
  region           = var.region
  service_name     = "frontend"
  container_image  = var.frontend_container_image
  vpc_connector_id = module.networking.connector_id
  service_account  = google_service_account.frontend_sa.email
  invoker          = "allUsers"
  ingress          = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"
}

module "backend" {
  source           = "./modules/cloud_run"
  app_name         = var.app_name
  environment      = var.environment
  project_id       = var.project_id
  region           = var.region
  service_name     = "backend"
  container_image  = var.backend_container_image
  vpc_connector_id = module.networking.connector_id
  service_account  = google_service_account.backend_sa.email
  invoker          = "serviceAccount:${google_service_account.frontend_sa.email}"
  ingress          = "INGRESS_TRAFFIC_INTERNAL_ONLY"
}

module "frontend_lb" {
  source                 = "./modules/load_balancer"
  app_name               = var.app_name
  environment            = var.environment
  project_id             = var.project_id
  region                 = var.region
  service_name           = "frontend"
  cloud_run_service_name = module.frontend.service_name
}


resource "google_compute_global_address" "lb_ip" {
  name    = "${var.app_name}-${var.environment}-lb-ip"
  project = var.project_id
}

resource "google_compute_managed_ssl_certificate" "lb_cert" {
  name    = "${var.app_name}-${var.environment}-cert"
  project = var.project_id

  managed {
    domains = [var.domain_name]
  }
}

resource "google_compute_target_https_proxy" "https_proxy" {
  name    = "${var.app_name}-${var.environment}-https-proxy"
  project = var.project_id
  url_map = google_compute_url_map.url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.lb_cert.id]
}

resource "google_compute_url_map" "url_map" {
  name            = "${var.app_name}-${var.environment}-url-map"
  project         = var.project_id
  default_service = module.frontend_lb.backend_service_id

  host_rule {
    hosts        = [var.domain_name]
    path_matcher = "main"
  }

  path_matcher {
    name            = "main"
    default_service = module.frontend_lb.backend_service_id
  }
}

resource "google_compute_global_forwarding_rule" "https_rule" {
  name                  = "${var.app_name}-${var.environment}-https-rule"
  project               = var.project_id
  target                = google_compute_target_https_proxy.https_proxy.id
  port_range            = "443"
  ip_address            = google_compute_global_address.lb_ip.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
}
