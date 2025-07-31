# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port your app uses (adjust if needed)
EXPOSE 80

# Start the app
CMD [ "node", "app.js" ]