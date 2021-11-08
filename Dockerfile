FROM node:lts-alpine
ENV NODE_ENV development
EXPOSE 3000

WORKDIR /code

COPY ./package.json .
RUN npm install
COPY . .
