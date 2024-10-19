# Use a Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install service dependencies
RUN npm install

# Copy the rest of the service files to the container
COPY . .

# Run migrations and seed data 
RUN npx prisma migrate dev


# Expose the port the service runs on
EXPOSE 5000

# Start the client
CMD ["npm", "run", "dev"]
