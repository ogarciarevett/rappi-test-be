#!/bin/bash

docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker rmi -f $(docker images -q) && \
docker network rm $(docker network lsf | grep "bridge" | awk '/ / { print $1 }')