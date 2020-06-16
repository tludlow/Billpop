FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .

#Dont want to install cypress its way too big...
RUN npm install --production

CMD [ "npm", "run", "dev" ]