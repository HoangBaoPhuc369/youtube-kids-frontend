FROM node:18.7.0-alpine3.16 As build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:18.7.0-alpine3.16 As production

COPY --chown=node:node --from=build /app/build /build

RUN yarn global add serve

CMD ["serve", "-s", "build"]