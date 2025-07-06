FROM node:20-alpine

WORKDIR /app

# Install dependencies separately
COPY package*.json ./
RUN npm install --force

# Copy rest of the server code
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
