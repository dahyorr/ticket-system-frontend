FROM node:lts-alpine
EXPOSE 3000

WORKDIR /code

COPY ./package*.json .
RUN npm install --no-optional && npm cache clean --force
COPY . .
