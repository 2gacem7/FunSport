FROM node:stretch-slim

WORKDIR /usr/src/app

COPY package*.json ./app/

CMD npm install @vue/cli@3.7.0 -g && npm install && npm run serve