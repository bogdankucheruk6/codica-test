FROM node:19.5.0

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080

RUN node --version
CMD npm run start