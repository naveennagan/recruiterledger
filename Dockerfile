FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm run test

RUN npm run buildDev

COPY --chown=node:node . .

EXPOSE 3124

CMD [ "node", "src/server/server.js" ]