FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm run install

COPY ./ ./
RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]

EXPOSE 4000


