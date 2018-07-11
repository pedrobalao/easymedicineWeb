FROM node:carbon


# env variables
ENV PORT=80

ARG FIREBASE_API_KEY=test
ENV FIREBASE_API_KEY ${FIREBASE_API_KEY}
ARG FIREBASE_AUTH_DOMAIN=test
ENV FIREBASE_AUTH_DOMAIN ${FIREBASE_AUTH_DOMAIN}
ARG FIREBASE_DATABASE_URL=test
ENV FIREBASE_DATABASE_URL ${FIREBASE_DATABASE_URL}

ARG FIREBASE_PROJECT_ID=test
ENV FIREBASE_PROJECT_ID ${FIREBASE_PROJECT_ID}
ARG FIREBASE_STORAGE_BUCKET=test
ENV FIREBASE_STORAGE_BUCKET ${FIREBASE_STORAGE_BUCKET}
ARG FIREBASE_MSG_SENDING_ID=test
ENV FIREBASE_MSG_SENDING_ID ${FIREBASE_MSG_SENDING_ID}

ARG API_BASE_URL=test
ENV API_BASE_URL ${API_BASE_URL}
ARG GOOGLE_ANALYTICS_ID=test
ENV GOOGLE_ANALYTICS_ID ${GOOGLE_ANALYTICS_ID}

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
RUN rm .env.test
RUN rm .env.dev
RUN rm envs.*


EXPOSE 80
CMD [ "npm", "run", "startdocker" ]
