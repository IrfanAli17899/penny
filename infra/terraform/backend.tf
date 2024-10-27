
terraform {
  backend "gcs" {
    bucket = "penny-terraform-state"
  }
}
