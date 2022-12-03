FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "src/app.js"]