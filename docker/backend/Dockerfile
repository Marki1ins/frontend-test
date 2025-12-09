FROM node:22-slim
WORKDIR /app
RUN npm install -g json-server
RUN npm install json-server
COPY ./server/db.json /app/db.json
EXPOSE 5000
CMD ["json-server", "--watch", "/app/db.json", "--port", "5000"]