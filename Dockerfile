FROM node:12-alpine

WORKDIR /todo

COPY package.json /todo/package.json
COPY package-lock.json /todo/package-lock.json
RUN npm install

CMD ["npm", "start"]