FROM node:stretch-slim

WORKDIR /usr/monitoring

COPY *.json ./
COPY *.js ./

RUN npm install
EXPOSE 5005

CMD ["node", "monitoring-server.js"]
