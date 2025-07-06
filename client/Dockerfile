FROM node:20-alpine

WORKDIR /app

# Install dependencies separately to leverage Docker cache
COPY package*.json ./
RUN npm install

# Now copy the rest of the app
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
