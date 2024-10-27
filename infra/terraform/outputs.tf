output "load_balancer_ip" {
  value = google_compute_global_address.lb_ip.address
}

output "frontend_url" {
  value = module.frontend.service_url
}

output "backend_url" {
  value = module.backend.service_url
}