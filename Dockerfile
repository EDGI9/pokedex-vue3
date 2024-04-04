FROM node:20-alpine3.18

WORKDIR /app

COPY . .

#RUN npm ci

EXPOSE 5173