#Specify a base image
FROM node:14-alpine

#install some depenedencines
#makes the working directory in the container /usr/app so that it does not conflicts the 
#the files already in the container
WORKDIR /usr/app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./config.ts ./
COPY ./tsconfig.json ./
RUN npm install
COPY ./ ./
RUN npm run build

#default commands
CMD ["npm" , "run", "start"]