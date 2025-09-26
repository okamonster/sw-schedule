variable "service_name" {
  type = string
  description = "The name of the service"
}

variable "location" {
  type = string
  description = "The location of the service"
}

variable "image_name" {
  type = string
  description = "The name of the image"
}

variable "image_tag" {
  type = string
  description = "The tag of the image"
}

variable "container_port" {
  type = number
  description = "The port of the container"
}