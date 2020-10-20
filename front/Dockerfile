# base image
FROM node:alpine


ARG user
ARG uid

ADD . /app

WORKDIR /app

RUN npm install @vue/cli@3.7.0 -g

RUN npm install


CMD npm run serve