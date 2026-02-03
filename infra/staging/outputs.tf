output "vpc_id" {
  value = aws_vpc.this.id
}

output "public_subnet_ids" {
  value = aws_subnet.public[*].id
}

output "backend_ecr_repo_url" {
  value = aws_ecr_repository.backend.repository_url
}

output "alb_dns_name" {
  value = aws_lb.this.dns_name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.this.name
}

output "backend_service_name" {
  value = aws_ecs_service.backend.name
}

output "backend_task_definition_family" {
  value = aws_ecs_task_definition.backend.family
}