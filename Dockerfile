FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm --user root --unsafe-perm true install npm -g

RUN npm install

COPY . .

CMD ["npm", "run", "build"]

#CMD ["npm", "run", "dev"]
