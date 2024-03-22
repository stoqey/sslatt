# base image
# FROM node:14.17-stretch as builder
FROM amd64/node:18.17-buster as builderxxx
ARG NEXT_PUBLIC_CDN_URL 
ARG NEXT_PUBLIC_API_URL 
WORKDIR /srv

RUN printenv

# copy source files
COPY . .

RUN npm i sharp -g
# install dependencies
RUN NODE_OPTIONS=--max_old_space_size=8192 yarn --ignore-platform --ignore-engines

ENV NEXT_PUBLIC_CDN_URL=$NEXT_PUBLIC_CDN_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build app
RUN yarn build

# use lighter image
FROM amd64/node:18.17-slim
WORKDIR /srv
COPY --from=builderxxx /srv .
ENV NODE_ENV=production
RUN ls -lah
RUN apt update && apt install fontconfig fontconfig-config fonts-freefont-otf -y
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]