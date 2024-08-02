FROM node:20.16.0-alpine

WORKDIR /server

COPY ./package.json ./   

ENV PATH /server/node_modules/.bin:$PATH

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh 
                                #allows to ssh into container 
RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "start"]    
          #["npm", "run", "server"] #
          #normal node server instead of nginx. buil and run both