FROM node:14.4.0-alpine AS base
WORKDIR /app
COPY package.json ./
COPY prisma ./

ENV DATABASE_URL=postgres://root:root@postgres:5432/todo
ENV PORT=8080

#
# ----- Dependencies ----- #
FROM base AS dependencies
RUN yarn install --production
RUN cp -R node_modules production_node_modules
RUN yarn install

#
# ----- Builder ----- #
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY babel.config.js ./
COPY src ./src
RUN yarn build

#
# ----- Release ----- #
FROM base AS release
COPY --from=dependencies /app/production_node_modules ./node_modules
COPY --from=builder /app/.dist ./

RUN npx prisma migrate deploy

EXPOSE 8080

CMD ["node", "./main.js"]