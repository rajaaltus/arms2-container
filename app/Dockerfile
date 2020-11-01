FROM node:10.20

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn
RUN yarn build
RUN yarn generate

ENV HOST 0.0.0.0
