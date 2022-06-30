FROM node
WORKDIR /app
COPY package.json .
RUN npm install

ARG NODE_ENV
RUN chown -R node /app/node_modules
RUN npm install

COPY . ./
ENV PORT 8000
EXPOSE $PORT
CMD ["npm", "run", "dev"]