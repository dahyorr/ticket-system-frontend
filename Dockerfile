FROM node:lts-alpine
EXPOSE 3000

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

COPY ./package*.json .
RUN npm install && npm cache clean --force
COPY . .
