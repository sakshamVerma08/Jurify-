# Command to start Redis Container with attatched volumen in Ubuntu WSL

 -  docker run -d --name redis-server -v ~/redis/data:/data -p 6379:6379 redis:7 redis-server --appendonly yes


# Docker container volume is at the following path:

- Host (WSL):      ~/redis/data
- Container:       /data
- Inspect Command to check volume directory:  docker inspect redis-server --format='{{json .Mounts}}'