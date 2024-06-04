FROM node:18

RUN apt-get update && apt-get install -y libc6-dev openssl

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

RUN yarn prisma generate

COPY . .

RUN yarn build
RUN yarn add prisma

CMD ["./entrypoint.sh"]
