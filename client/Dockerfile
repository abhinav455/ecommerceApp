FROM node:20.16.0-alpine as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "server"] #not using nginx but our own cra static server to serve 

