FROM node:14.5.0

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/
EXPOSE 3000
RUN npm install
COPY . /frontend/
