terraform {
  required_version = ">= 1.6.0"

  backend "s3" {
    bucket         = "tfstate-808058100325-ecommerce-platform"
    key            = "ecommerce-platform/staging/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks-ecommerce-platform"
    profile        = "terraform-dev"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region  = var.region
  profile = "terraform-dev"
}
