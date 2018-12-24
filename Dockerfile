#pull image from oficial node
FROM node:10.13.0-alpine

# ARG ssh_prv_key

RUN apk add --no-cache bash git openssh openssl ca-certificates python alpine-sdk autoconf

ENV NODE_ENV=development

# Authorize SSH Host
# RUN mkdir -p /root/.ssh && \
#     chmod 0700 /root/.ssh && \
#     ssh-keyscan bitbucket.org > /root/.ssh/known_hosts

# # Add the keys and set permissions
# RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && chmod 600 /root/.ssh/id_rsa


WORKDIR /app

COPY . /app/rappi-be/

WORKDIR /app/rappi-be/

COPY ./docker/wait_for_it.sh /app/rappi-be/

RUN chmod 755 /app/rappi-be/wait_for_it.sh

RUN npm i

#Remove SSH keys
RUN rm -rf /root/.ssh/

