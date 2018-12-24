#!/bin/bash

target=${1:-"rappi_be"}

# export ssh_prv_key="$(cat ~/.ssh/id_rsa)"

# docker-compose build --build-arg ssh_prv_key="${ssh_prv_key}" "${target}"

docker-compose up "${target}"

# unset ssh_prv_key