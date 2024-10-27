variable "environment" {}
variable "project_id" {}
variable "region" {}
variable "app_name" {}
variable "subnet_cidr" {
  default = "10.0.0.0/24"
}
variable "connector_cidr" {
  default = "10.8.0.0/28"
}