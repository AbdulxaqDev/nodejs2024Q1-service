FROM node:lts-alpine

WORKDIR /app

COPY ./ ./

RUN npm run install
RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]

EXPOSE 4000


