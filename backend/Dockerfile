FROM node:21.7.1-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]

EXPOSE 4000


