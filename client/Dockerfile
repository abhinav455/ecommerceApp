FROM node:20.16.0-alpine as builder

#RUN mkdir /usr/src/app
WORKDIR /client 
  #/usr/src/app

ENV PATH /client/node_modules/.bin:$PATH

COPY ./package.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "server"] #not using nginx but our own serve static server to serve 

