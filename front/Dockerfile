FROM node

ENV TZ Europe/Paris

COPY package.json  /usr/src/front/
COPY package-lock.json /usr/src/front/
WORKDIR /usr/src/front/
COPY . /usr/src/front/
RUN npm install

CMD npm run serve