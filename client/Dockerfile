#DockerFile for Client

# Use a Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the client files to the container
COPY . .



# Expose the port the app runs on
EXPOSE 3000

# Start the client
CMD ["npm", "run", "dev"]

