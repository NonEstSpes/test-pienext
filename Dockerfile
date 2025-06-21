FROM docker.io/node:22-alpine3.20 AS build-stage
WORKDIR /frontend
COPY ./package.json ./package-lock.json /frontend/
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY ./ /frontend/
RUN npm run build
FROM docker.io/nginx:1.27.5
COPY --from=build-stage /frontend/dist/test-pienext/browser /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

