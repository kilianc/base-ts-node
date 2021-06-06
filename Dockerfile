FROM node:16.2.0-buster-slim as devDependencies

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

# --

FROM node:16.2.0-buster-slim as codegen

WORKDIR /opt/app

COPY --from=devDependencies ["/opt/app", "./"]
COPY ["src/proto", "src/proto"]

RUN npm run codegen

# --

FROM node:16.2.0-buster-slim as lint

WORKDIR /opt/app

COPY --from=devDependencies ["/opt/app", "./"]

COPY ["tsconfig.json", ".eslintrc", ".prettierrc", ".prettierignore", "./"]
COPY ["@types", "@types"]
COPY ["src", "src"]

RUN npm run lint

# --

FROM node:16.2.0-buster-slim as dependencies

WORKDIR /opt/app

COPY --from=devDependencies ["/opt/app", "./"]

RUN npm prune --production

# --

FROM node:16.3.0-alpine3.13 as final

ARG APP_NAME
ENV APP_NAME $APP_NAME

ARG REVISION
ENV REVISION $REVISION

ENV NODE_ENV production
ENV NODE_OPTIONS --unhandled-rejections=strict
ENV PATH $PATH:/opt/app/node_modules/.bin

WORKDIR /opt/app

COPY --from=dependencies ["/opt/app/node_modules", "node_modules"]
COPY --from=codegen ["/opt/app/src/proto", "src/proto"]

COPY ["@types", "@types"]
COPY ["src", "src"]
COPY ["tsconfig.json", "./"]

CMD ["ts-node", "src/index.ts"]
