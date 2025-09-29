terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region = var.region
}

module "web_cloudrun_service" {
  source = "../../../modules/cloudrun_service"
  service_name = "gemba-frontend-${var.environment}"
  location = var.region
  project_id = var.project_id
  image_url = var.frontend_image_url
  container_port = var.container_port

  environment_variables = {
    AUTH_SECRET = var.auth_secret
    AUTH_GOOGLE_ID = var.auth_google_id
    AUTH_GOOGLE_SECRET = var.auth_google_secret
    AUTH_TRUST_HOST = var.auth_trust_host
    NEXTAUTH_URL = var.nextauth_url
  }
  
  cpu_limit = "1000m"
  memory_limit = "512Mi"
  
  min_instances = 0
  max_instances = 20
}