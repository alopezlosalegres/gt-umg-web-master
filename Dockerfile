FROM node:12.18.4 as build-angular
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install -g @angular/cli@9.0.3
COPY . .
RUN ng build --prod
FROM httpd
COPY --from=build-angular /app/dist/gt-umg-web /usr/local/apache2/htdocs/
EXPOSE 80
