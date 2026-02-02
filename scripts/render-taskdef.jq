.taskDefinition
| .containerDefinitions[0].image = $IMAGE
| .containerDefinitions[0].environment = (
    (.containerDefinitions[0].environment // [])
    | map(select(.name != "APP_VERSION" and .name != "APP_ENV"))
    + [
        {"name":"APP_VERSION","value":$APP_VERSION},
        {"name":"APP_ENV","value":$APP_ENV}
      ]
  )
| {
    family: .family,
    taskRoleArn: .taskRoleArn,
    executionRoleArn: .executionRoleArn,
    networkMode: .networkMode,
    containerDefinitions: .containerDefinitions,
    requiresCompatibilities: .requiresCompatibilities,
    cpu: .cpu,
    memory: .memory
  }
| with_entries(select(.value != null))