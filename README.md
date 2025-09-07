# Weather App Backend

This is a **Node.js + Express** application that provides weather-related APIs.  
It includes user and admin management, integrates with external weather data sources, and exposes REST endpoints.

## Features
- Express.js server with REST API
- Weather endpoints (fetching weather data)
- User and admin models
- Organized MVC structure (controllers, models, routes)
- Postman collection for testing the APIs

## Project Structure
```
app.js                # Main application entry point
/controller           # API controllers (admin, user, weather)
/models               # Data models (admin, user, weather)
/routs/api.js         # API routes definition
/package.json         # Project dependencies
/weather app.postman_collection.json   # Postman collection for API testing
```

## Technologies
- Node.js
- Express.js
- MongoDB / Mongoose (if connected to database)
- External Weather API (e.g., OpenWeatherMap)
- Postman (for testing)

## Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd weather-app-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/weather-app
   WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The server should now be running at:
   ```
   http://localhost:5000
   ```

## API Documentation
- Import the provided Postman collection: `weather app.postman_collection.json`
- Test endpoints such as:
  - `GET /api/weather`
  - `POST /api/user`
  - `POST /api/admin`

## Deployment
- Can be deployed to platforms like Render, Heroku, or Railway.
- Make sure to configure environment variables in the hosting platform.

