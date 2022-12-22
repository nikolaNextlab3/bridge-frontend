FROM node:16-alpine3.11 as build
COPY . /bridge-frontend
WORKDIR /bridge-frontend
RUN npm install
RUN npm run build

FROM nginx:1.16-alpine
COPY --from=build /bridge-frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
RUN nginx -t

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]