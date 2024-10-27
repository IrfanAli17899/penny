provider "google" {
  project     = "${var.project_id}"
  region      = "${var.region}"
}


terraform {
  required_providers {
    google-beta = {
      source = "hashicorp/google-beta"
      version = "6.8.0"
    }
  }
}