terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Cloud Run Service for Backend
module "backend_service" {
  source = "../../modules/cloudrun_service"

  service_name = "gemba-backend-${var.environment}"
  location     = var.region
  project_id   = var.project_id
  image_url    = var.backend_image_url
  container_port = var.container_port

  environment_variables = {
    DATABASE_URL     = var.database_url
    DIRECT_URL       = var.direct_url
    JWT_SECRET       = var.jwt_secret
    SUPABASE_URL     = var.supabase_url
    SUPABASE_ANON_KEY = var.supabase_anon_key
    APP_URL         = var.app_url
    RESEND_API_KEY   = var.resend_api_key
  }

  cpu_limit    = "1"
  memory_limit = "512Mi"
  
  min_instances = 0
  max_instances = 20
}
