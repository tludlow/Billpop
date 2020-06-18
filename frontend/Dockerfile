FROM node:10-alpine as builder

ENV NODE_ENV=development

COPY package.json ./
RUN npm install


# The instructions for second stage
FROM node:10-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

CMD [ "npm", "run", "dev" ]