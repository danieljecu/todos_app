FROM node:20

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /api

# Declare build args before `npm install` so the postinstall `prisma generate`
# step has DATABASE_URL available.
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG API_HOST
ENV API_HOST=$API_HOST

COPY . .

RUN npm install
# RUN npm run build # seems optional

ENTRYPOINT ["sh", "-c"]

CMD ["npm start"]