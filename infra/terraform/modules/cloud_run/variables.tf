variable "environment" {}
variable "project_id" {}
variable "region" {}
variable "service_name" {}
variable "app_name" {}
variable "container_image" {}
variable "vpc_connector_id" {}
variable "ingress" {}
variable "service_account" {}
variable "invoker" {
  default = ""
}
variable "cpu_limit" {
  default = 1.0
}
variable "memory_limit" {
  default = "512Mi"
}
variable "min_instances" {
  default = 0
}
variable "max_instances" {
  default = 2
}