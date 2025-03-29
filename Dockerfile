# Use Node.js as the base image
FROM node:23-alpine3.20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install git 
RUN apk add --no-cache git

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 4000

# Start the API server
CMD ["npm", "run", "dev"]