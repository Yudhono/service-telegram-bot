# Build stage.
FROM node:12-slim AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
ENV SKIP_BINARIES 1
RUN npm install
COPY . /usr/src/app/
RUN npx tsc

# Production stage.
FROM node:12-slim
RUN rm -f /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
RUN apt-get update
RUN apt-get install -y ca-certificates
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install --production && npm cache clean --force
COPY infrastructure /usr/src/app/infrastructure
COPY rbac /usr/src/app/rbac
COPY data /usr/src/app/data
COPY migrations /usr/src/app/migrations
COPY seeders /usr/src/app/seeders
COPY assets /usr/src/app/assets
COPY templates /usr/src/app/templates
COPY swagger /usr/src/app/swagger
COPY signing-keys /usr/src/app/signing-keys
COPY --from=build /usr/src/app/server.js /usr/src/app/
COPY --from=build /usr/src/app/scripts /usr/src/app/scripts
COPY --from=build /usr/src/app/sharedScripts /usr/src/app/sharedScripts
EXPOSE 3000
CMD [ "npm", "start" ]