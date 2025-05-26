# School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data in India.  
The API allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location using the Haversine formula.

---

## Features

- Add a new school with name, address, latitude, and longitude
- Retrieve all schools sorted by geographical proximity to a given latitude and longitude
- Input validation for school data
- Distance calculation using Haversine formula for accurate geographical sorting

---

## Technologies Used

- Node.js
- Express.js
- MySQL
- JavaScript (ES6+)
- Postman (for API testing)

---

## Database Setup

Create a MySQL database and run the following schema:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

API Endpoints
1. Add School
- URL: /addSchool
- Method: POST
- Payload:

```
{
  "name": "Example School",
  "address": "123 Street, City",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```
- Response:
  - 201 Created on succes
  - 400 Bad Request on validation failure

2. List Schools by Proximity
- URL: /listSchools
- Method: GET
- Query Parameters:
  - latitude (required) — User's latitude
  - longitude (required) — User's longitude
- Response:
  - 200 OK with JSON array of schools sorted by nearest first, including distance in kilometers
 
---

## Installation and Running

Clone the repository:
```
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

Install dependencies:
```
npm install
```

Configure your MySQL connection in config/db.js (or .env file):
```
module.exports = {
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
};
```

Start the server:
```
npm start
```
The API will run at http://localhost:3000.

---

## Testing
Use the provided Postman collection (SchoolManagementAPI.postman_collection.json) to test the APIs with example requests : 
https://api.postman.com/collections/38648093-32b5b9ef-47ec-4af8-ad17-761abb9b79c8?access_key=PMAT-01JW6F1GXNZDMBTGADAWKJ8ZXP

Import this in your Postman for testing.


---

## Project Structure

```
.
├── index.js              # Express app setup and routes
├── controllers/        # Request handlers for APIs
    └── schoolController.js
├── routes/             # API route definitions
    └── schoolRoutes.js 
├── utils/
│   └── distance.js  # Haversine distance calculation
├── db.js           # MySQL database connection
├── package.json
└── README.md
```

--- 

## Distance Calculation
Distance between two points (latitude and longitude) is calculated using the Haversine formula implemented in utils/getDistance.js. This provides accurate results for proximity sorting.


