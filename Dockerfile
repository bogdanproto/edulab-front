FROM node:latest

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
