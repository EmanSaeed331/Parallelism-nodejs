FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000 3001
CMD ["node", "index.js"]
