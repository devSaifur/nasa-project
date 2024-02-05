# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0
ARG PNPM_VERSION=8.15.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

# Create a stage for building the application.
FROM deps as build

# Copy the rest of the source files into the image.
COPY . .

# Run the install script
RUN pnpm install
# Run the build script.
RUN pnpm run build

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD pnpm start
