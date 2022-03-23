FROM node:17-alpine

ADD . /app
WORKDIR /app
RUN yarn && yarn build
CMD ["yarn", "start"]