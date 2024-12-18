FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run tsc

EXPOSE 8000

CMD ["yarn","run","dev"]