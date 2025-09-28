resource "google_cloud_run_v2_service" "service" {
  name     = var.service_name
  location = var.location
  project  = var.project_id

  template {
    containers {
      image = var.image_url
      ports {
        container_port = var.container_port
      }
      env {
        name  = "NODE_ENV"
        value = var.node_env
      }
      dynamic "env" {
        for_each = var.environment_variables
        content {
          name  = env.key
          value = env.value
        }
      }
      resources {
        limits = {
          cpu    = var.cpu_limit
          memory = var.memory_limit
        }
      }
    }
    scaling {
      min_instance_count = var.min_instances
      max_instance_count = var.max_instances
    }
  }
  traffic {
    percent = 100
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
  }

  lifecycle {
    ignore_changes = [
      template[0].labels,
      client,
      client_version
    ]
  }
}
