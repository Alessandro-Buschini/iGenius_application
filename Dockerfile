FROM node:10-slim

# Create app directory
WORKDIR /converter/


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /converter/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /converter/  

#CMD ["mocha", "test/test_api_converter.js"]
CMD [ "node", "src/converter.js" ]