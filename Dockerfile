FROM node:20.13.0-alpine3.19

WORKDIR /app

RUN mkdir -p /app

RUN npm install -g pnpm

COPY package.json /app

RUN pnpm store status

RUN rm -rf node_modules \
    && pnpm install

COPY . /app

EXPOSE 3003

ENTRYPOINT ["pnpm", "start:dev"]