FROM node:16-alpine3.11 as build
COPY . /bridge-frontend
WORKDIR /bridge-frontend
RUN npm install
RUN npm run build

FROM nginx:1.16-alpine
COPY --from=build /bridge-frontend/build /usr/share/nginx/html
COPY bridger.mcnpoc2.xyz.conf /etc/nginx/conf.d
RUN nginx -t

RUN apk update
RUN apk add bash
RUN apk add nano
RUN apk add certbot certbot-nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]