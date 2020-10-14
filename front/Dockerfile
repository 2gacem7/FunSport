FROM node

ENV TZ Europe/Paris

COPY env.config.example.js /usr/src/front/env.config.js
COPY package.json  /usr/src/front/
COPY package-lock.json /usr/src/front/
WORKDIR /usr/src/front/
RUN npm install
COPY . /usr/src/front/


CMD npm run serve
