FROM node:20-alpine3.18

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 5173

CMD [ "npm", "run", "dev" ]