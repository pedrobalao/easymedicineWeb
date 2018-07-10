FROM node:carbon

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app
# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./test
RUN rm -rf ./src
RUN rm .env.*
RUN rm envs.*
ENV PORT=80
ENV FIREBASE_API_KEY=TBD
ENV FIREBASE_AUTH_DOMAIN=TBD
ENV FIREBASE_DATABASE_URL=TBD
ENV FIREBASE_PROJECT_ID=TBD
ENV FIREBASE_STORAGE_BUCKET=TBD
ENV FIREBASE_MSG_SENDING_ID=TBD
ENV API_BASE_URL=TBD
ENV GOOGLE_ANALYTICS_ID=TBD

EXPOSE 80
CMD [ "npm", "run", "startdocker" ]
