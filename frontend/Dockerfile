
FROM node:latest as build


WORKDIR /frontend


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
