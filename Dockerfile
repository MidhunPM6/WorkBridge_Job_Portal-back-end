# Use Node base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy .env file (important!)
COPY .env ./

# Copy the rest of the app
COPY . .

# Expose the app's port (Cloud Run uses 8080)
EXPOSE 8080

# Start the server
CMD ["npm", "run", "start"]
