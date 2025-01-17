FROM node:22-alpine3.19
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm", "start"]