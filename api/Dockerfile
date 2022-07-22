FROM node:16

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /api

COPY . .

RUN npm install
# RUN npm run build # seems optional

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG API_HOST
ENV API_HOST=$API_HOST

ENTRYPOINT ["sh", "-c"]

CMD ["npm start"]