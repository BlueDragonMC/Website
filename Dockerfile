FROM node:26-slim@sha256:e6bedef217677b276c591795e169840edd9096dbf13f29df8ef8d1856b8820bc AS buildtime
WORKDIR /app

FROM gcr.io/distroless/nodejs26-debian13:nonroot@sha256:9b945e92c1b5463a4b75f11e8417515e4bea7355f6adfd79ec220fbbe905dda8 AS runtime
WORKDIR /app

FROM buildtime AS all-deps

COPY package*.json .
RUN --mount=type=cache,target=/root/.npm npm ci

FROM all-deps AS prod-deps

RUN --mount=type=cache,target=/root/.npm npm prune --omit=dev

FROM buildtime AS build

COPY --from=all-deps /app/node_modules /app/node_modules
COPY . .
RUN npm run build

FROM runtime

ENV TINI_VERSION=v0.19.0
ADD --chmod=+x https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
ENTRYPOINT ["/tini", "--"]

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app

ENV HOST=0.0.0.0
ENV PORT=3000
CMD ["/nodejs/bin/node", "/app/server/entry.mjs"]
EXPOSE 3000
