FROM node:14

WORKDIR /api


COPY . .

RUN npm install
RUN npm run build


ENTRYPOINT ["sh", "-c"]

CMD ["npm start"]