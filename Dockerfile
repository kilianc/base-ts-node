FROM node:20.8.0-alpine3.18 as base

WORKDIR /opt/app
COPY [".npmrc", "./"]

# --

FROM base as dev_dependencies

WORKDIR /opt/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm ci

# --

FROM base as codegen

WORKDIR /opt/app

COPY --from=dev_dependencies ["/opt/app", "./"]
COPY ["src/proto", "src/proto"]

RUN npm run codegen

# --

FROM base as test

WORKDIR /opt/app

COPY --from=dev_dependencies ["/opt/app", "./"]
COPY --from=codegen ["/opt/app/src/proto", "src/proto"]

COPY ["tsconfig.json", "jest.config.js", ".eslintrc", ".prettierrc", ".prettierignore", "./"]
COPY ["@types", "@types"]
COPY ["src", "src"]

RUN npm run lint
RUN npm run test

RUN echo 'ok' > .tested

# --

FROM base as prod_dependencies

WORKDIR /opt/app

COPY --from=dev_dependencies ["/opt/app", "./"]

RUN npm prune --omit=dev

# --

FROM base as final

ARG APP_NAME
ENV APP_NAME $APP_NAME

ARG REVISION
ENV REVISION $REVISION

ENV NODE_ENV production
ENV NODE_OPTIONS --unhandled-rejections=strict
ENV PATH $PATH:/opt/app/node_modules/.bin

WORKDIR /opt/app

COPY --from=prod_dependencies ["/opt/app/node_modules", "node_modules"]
COPY --from=codegen ["/opt/app/src/proto", "src/proto"]
COPY --from=test ["/opt/app/.tested", "/dev/null"]

COPY ["@types", "@types"]
COPY ["src", "src"]
COPY ["tsconfig.json", ".npmrc", "./"]

CMD ["ts-node", "src/index.ts"]
