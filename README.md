**IT 3103N System Architecture Final Project Guide**

Welcome to the guide for the IT 3103N System Architecture Final Project. This document will help you set up and run the project with clear instructions.

**Setup Instructions**

1. Load the Database
	
	Use the provided SQL file to initialize your database.

2. Install Dependencies

	Navigate to each service directory in your project.
	
	Run the following commands to install necessary packages:
	
	npm install express jsonwebtoken bcryptjs dotenv winston morgan amqplib mysql2 sequelize axios
	npm init -y

3. Configure Environment Variables

   	Create an .env file in each service directory to include the following:

	DB_NAME=supermarket
	DB_USER="your username"
	DB_PASSWORD="your password"
	DB_HOST=localhost
	JWT_SECRET="your jwt secret key"
	ENCRYPTION_KEY="your encryption key"
	IV_KEY="16 letter key"

	Replace the placeholders (e.g., "your username") with the appropriate values for your environment.

**Running the Project**

1. Start the Services

	Navigate to each service directory and run the following command:
	
	node server.js
	
	This will start the services required for the project.


