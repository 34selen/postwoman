FROM node:lts

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY server.js ./
COPY views ./views

RUN useradd -ms /bin/bash user
USER user

EXPOSE 8080

CMD ["node" ,"server.js"]