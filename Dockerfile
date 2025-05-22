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
EXPOSE 8080

# Start the app using npm script (which runs: node src/server.js)
CMD ["npm", "run", "start"]
