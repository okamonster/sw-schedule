variable "service_name" {
  type        = string
  description = "The name of the Cloud Run service"
}

variable "location" {
  type        = string
  description = "The location/region of the service"
}

variable "project_id" {
  type        = string
  description = "GCP Project ID"
}

variable "image_url" {
  type        = string
  description = "Container image URL"
}

variable "container_port" {
  type        = number
  description = "The port of the container"
  default     = 8080
}

variable "node_env" {
  type        = string
  description = "Node.js environment"
  default     = "production"
}

variable "environment_variables" {
  type        = map(string)
  description = "Environment variables for the container"
  default     = {}
}

variable "cpu_limit" {
  type        = string
  description = "CPU limit for the container"
  default     = "1"
}

variable "memory_limit" {
  type        = string
  description = "Memory limit for the container"
  default     = "512Mi"
}

variable "min_instances" {
  type        = number
  description = "Minimum number of instances"
  default     = 0
}

variable "max_instances" {
  type        = number
  description = "Maximum number of instances"
  default     = 10
}
