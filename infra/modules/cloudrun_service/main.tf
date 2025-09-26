resource "google_cloud_run_service" "gemba-cloudrun-service" {
  name = var.service_name
  location = var.location
  template {
    spec {
      containers {
        image = "${var.image_name}:${var.image_tag}"
        ports {
          container_port = var.container_port
        }
      }
    }
  }
}