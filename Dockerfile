FROM node:8.9-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent
# COPY . /usr/app
COPY ./src ./usr/src

CMD ["npm", "start"]