FROM node:20-alpine3.20

WORKDIR /opt/app
COPY . .

RUN npm ci
RUN npm run build

CMD ["node", "/opt/app/dist/index.js"]
