resource "google_compute_region_network_endpoint_group" "neg" {
  name                  = "${var.app_name}-${var.environment}-${var.service_name}-neg"
  project               = var.project_id
  region                = var.region
  network_endpoint_type = "SERVERLESS"
  cloud_run {
    service = var.cloud_run_service_name
  }
}

resource "google_compute_backend_service" "backend" {
  name                  = "${var.app_name}-${var.environment}-${var.service_name}-backend"
  project               = var.project_id
  protocol              = "HTTPS"
  port_name             = "http"
  timeout_sec           = 30
  load_balancing_scheme = "EXTERNAL_MANAGED"

  connection_draining_timeout_sec = 300

  backend {
    group = google_compute_region_network_endpoint_group.neg.id
  }

  log_config {
    enable = true
  }

}