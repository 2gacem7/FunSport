FROM node

ENV TZ Europe/Paris

COPY package.json  /usr/src/back/
COPY package-lock.json /usr/src/back/
WORKDIR /usr/src/back/
RUN npm install
COPY . /usr/src/back/

CMD npm run start