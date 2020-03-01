FROM node:alpine

COPY . .

ENV NODE_ENV=production

RUN yarn install --ignore-scripts

CMD ["node", "index.js"]