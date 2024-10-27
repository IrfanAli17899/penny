resource "google_cloud_run_v2_service" "service" {
  name     = "${var.app_name}-${var.environment}-${var.service_name}-service"
  location = var.region
  project  = var.project_id
  ingress = var.ingress

  deletion_protection = false

  template {
    containers {
      image = var.container_image

      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
      }
    }

    vpc_access {
      connector = var.vpc_connector_id
      egress    = "ALL_TRAFFIC"  
    }

    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }

    service_account = var.service_account
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

}

resource "google_cloud_run_v2_service_iam_member" "invoker" {
 name     = google_cloud_run_v2_service.service.name
  location = var.region
  project  = var.project_id
  role     = "roles/run.invoker"
  member   = var.invoker
}
