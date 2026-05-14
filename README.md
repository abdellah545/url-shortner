# URL Shortener API

A modern, fast, and secure URL Shortener application built with Node.js, Express, and MongoDB.

## Features
- Shorten any valid URL.
- Prevent duplicate short URLs for the same long URL.
- Uses `nanoid` for secure, collision-resistant short codes.
- Tracks the number of clicks/visits for each short URL.
- Simple, responsive, and beautiful Frontend.
- One-click copy to clipboard.

## Technologies Used
- **Backend:** Node.js, Express.js, Mongoose.
- **Database:** MongoDB.
- **Frontend:** HTML, CSS (Vanilla), JavaScript.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Run the application (Development mode):
   ```bash
   npm run dev
   ```

5. Run the application (Production mode):
   ```bash
   npm start
   ```

## API Endpoints
- `POST /shorten` - Shorten a new URL.
- `GET /:shortCode` - Redirect to the original URL and increment the click counter.
- `GET /stats/:shortCode` - Get statistics for a specific short URL.

## License
MIT
