variable "project" {
  description = "Project name used for tagging/naming."
  type        = string
  default     = "ecommerce-platform"
}

variable "environment" {
  description = "Environment name (dev/staging/prod)."
  type        = string
  default     = "staging"
}

variable "region" {
  description = "AWS region for this environment."
  type        = string
  default     = "us-east-1"
}

variable "app_version" {
  description = "App version tag used for container image."
  type        = string
  default     = "0.1.1"
}

