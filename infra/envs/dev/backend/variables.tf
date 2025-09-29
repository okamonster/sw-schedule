variable "project_id" {
  type        = string
  description = "GCP Project ID"
  default     = "gemba-463817"
}

variable "region" {
  type        = string
  description = "GCP Region"
  default     = "asia-northeast2"
}

variable "environment" {
  type        = string
  description = "Environment name"
  default     = "dev"
}

# 環境変数（実際は tfvars ファイルで管理）
variable "database_url" {
  type        = string
  description = "Database connection URL"
  sensitive   = true
}

variable "direct_url" {
  type        = string
  description = "Direct database connection URL"
  sensitive   = true
}

variable "jwt_secret" {
  type        = string
  description = "JWT secret key"
  sensitive   = true
}

variable "supabase_url" {
  type        = string
  description = "Supabase URL"
}

variable "supabase_anon_key" {
  type        = string
  description = "Supabase anonymous key"
  sensitive   = true
}

variable "app_url" {
  type        = string
  description = "Application URL"
  default     = "https://develop.gemba-live.jp"
}

variable "resend_api_key" {
  type        = string
  description = "Resend API key"
  sensitive   = true
}

variable "backend_image_url" {
  type        = string
  description = "Backend container image URL"
}

variable "container_port" {
  type        = number
  description = "Container port"
  default     = 8080
}
