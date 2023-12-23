FROM node:lts-alpine

WORKDIR /app

COPY client/package.json client/
RUN pnpm --dir ./client install

COPY server/package.json server/
RUN pnpm --dir ./server install

COPY client/ client/
RUN pnpm --dir ./client build

COPY /server /server

USER node

CMD [ "pnpm", "--dir", "./server", "start" ]

EXPOSE 4000