# Use Node base image
FROM node:18


# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the app's port
EXPOSE 5002

# Start the server
CMD ["npm", "run", "dev"]
