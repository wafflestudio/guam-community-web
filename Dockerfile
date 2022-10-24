FROM node:alpine

WORKDIR /guam-community-web

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

USER node

CMD ["yarn", "start"]