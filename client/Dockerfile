FROM mhart/alpine-node:8.9.4

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# TODO - only needed if want to rebuild spritesheet
# RUN apk add --no-cache make gcc g++ python
# RUN apk update && \
#     apk upgrade && \
#     apk add git imagemagick-dev && \
#     apk add --update --repository http://dl-3.alpinelinux.org/alpine/edge/testing vips-tools vips-dev fftw-dev && \
#     rm -rf /var/cache/apk/*


WORKDIR /usr/src/app/client
COPY /client .
