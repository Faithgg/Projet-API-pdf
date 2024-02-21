
FROM node:latest

WORKDIR /backend

COPY package.json .
RUN npm cache clean --force \
    npm install

COPY . .

CMD ["npm ", "run-script src/index.ts"]
