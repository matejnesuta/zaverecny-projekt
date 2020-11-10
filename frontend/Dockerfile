#Dockerfile pro front-end. V podstatě se jen zkopíruje do kontejneru package.json, balíčky z něj se nainstalují a
#spustí se SPA napsané v Reactu.
FROM node:14.5.0

RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/
EXPOSE 3000
RUN npm install
COPY . /frontend/
