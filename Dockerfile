FROM mhart/alpine-node:9 AS build
WORKDIR /app
ADD package.json .
RUN npm install
ADD . .

FROM mhart/alpine-node:base-9
COPY --from=build /app .
EXPOSE 3000
CMD ["node", "index.js"]