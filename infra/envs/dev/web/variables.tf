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

variable "container_port" {
  type        = number
  description = "Container port"
  default     = 3000
}

# Frontend環境変数
variable "auth_secret" {
  type        = string
  description = "NextAuth secret key"
  sensitive   = true
}

variable "auth_google_id" {
  type        = string
  description = "Google OAuth client ID"
}

variable "auth_google_secret" {
  type        = string
  description = "Google OAuth client secret"
  sensitive   = true
}

variable "auth_trust_host" {
  type        = string
  description = "NextAuth trust host setting"
  default     = "true"
}

variable "nextauth_url" {
  type        = string
  description = "NextAuth URL"
  sensitive   = true
}

variable "frontend_image_url" {
  type        = string
  description = "Frontend container image URL"
}
