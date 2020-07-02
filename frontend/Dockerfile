FROM node:12-alpine

WORKDIR /todo

COPY package.json /todo/package.json
RUN chmod +r /todo/package.json
COPY package-lock.json /todo/package-lock.json
RUN chmod +r /todo/package-lock.json

RUN npm install

COPY . /todo

# CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"

CMD ["npm", "start"]