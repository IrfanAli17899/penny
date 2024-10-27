resource "google_compute_network" "vpc_network" {
  name                    = "${var.app_name}-${var.environment}-vpc"
  auto_create_subnetworks = false
  project                 = var.project_id
}

resource "google_compute_subnetwork" "subnet" {
  name          = "${var.app_name}-${var.environment}-subnet"
  network       = google_compute_network.vpc_network.id
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  project       = var.project_id
}

resource "google_compute_router" "router" {
  name    = "${var.app_name}-${var.environment}-router"
  region  = var.region
  project = var.project_id
  network = google_compute_network.vpc_network.id
}

resource "google_compute_router_nat" "nat" {
  name                               = "${var.app_name}-${var.environment}-nat"
  router                             = google_compute_router.router.name
  region                             = var.region
  project                            = var.project_id
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }
}

resource "google_vpc_access_connector" "vpc_connector" {
  name          = "${var.app_name}-${var.environment}-connector"
  region        = var.region
  project       = var.project_id
  network       = google_compute_network.vpc_network.name
  ip_cidr_range = var.connector_cidr
  machine_type  = "e2-micro"

  min_throughput = 200
  max_throughput = 300

  depends_on = [
    google_compute_network.vpc_network,
    google_compute_router_nat.nat
  ]
}
