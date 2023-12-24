FROM node:lts-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY client/package.json client/
RUN pnpm --dir ./client install

COPY server/package.json server/
RUN pnpm --dir ./server install

COPY client/ client/
RUN pnpm --dir ./client run build

COPY server/ server/
RUN pnpm --dir ./server run build

USER node

CMD [ "pnpm", "--dir", "./server", "run", "start" ]

EXPOSE 4000