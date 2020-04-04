FROM node:stretch-slim

WORKDIR /usr/monitoring

COPY *.json ./
COPY *.js ./

RUN mkdir /var/log/happystore
RUN npm install
EXPOSE 5005

CMD ["node", "monitoring-server.js"]
