# Contact App

This project is a full-stack application that includes a React front-end and a JSON Server API for managing contacts. It allows users to view, add, and manage contacts through a simple web interface.

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

```
.
├── contact-app
│   ├── node_modules
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── images
│   │   ├── index.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── server-api
│   ├── node_modules
│   ├── db.json
│   ├── package.json
│   ├── package-lock.json
├── .gitignore
└── README.md
```

## Features

- **Add Contacts:** Allows users to add new contacts with full name, email, and phone number.
- **View Contacts:** Displays a list of all contacts.
- **Edit and Delete Contacts:** Users can update or delete existing contacts.
- **Simple REST API:** A JSON Server API to handle contact data storage and retrieval.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/contact-app.git
   cd contact-app
   ```

2. **Install Dependencies**

   Navigate to both the front-end and server directories to install necessary packages:

   ```bash
   cd contact-app
   npm install

   cd ../server-api
   npm install
   ```

## Running Locally

To run the project locally, you need to start both the React app and the JSON Server.

1. **Build the React App**

   ```bash
   cd contact-app
   npm run build
   ```

2. **Start JSON Server**

   In another terminal, run:

   ```bash
   cd server-api
   npx json-server --watch db.json --port 5000
   ```

3. **Serve the React App**

   Go back to the `contact-app` directory and run:

   ```bash
   npx serve -s build
   ```

The React app will be served at `http://localhost:3000`, and the JSON API will be available at `http://localhost:5000`.

## Deployment

### Heroku Deployment

1. **Set Up an Express Server**

   Create a `server.js` in the root directory to serve both React and JSON API.

   ```javascript
   const express = require("express");
   const path = require("path");
   const jsonServer = require("json-server");

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(express.static(path.join(__dirname, "contact-app", "build")));
   const router = jsonServer.router(path.join(__dirname, "server-api", "db.json"));
   const middlewares = jsonServer.defaults();
   app.use("/api", middlewares, router);

   app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "contact-app", "build", "index.html"));
   });

   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

2. **Push to Heroku**

   ```bash
   git init
   heroku create your-app-name
   git add .
   git commit -m "Deploying app"
   git push heroku main
   ```

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **JSON Server**: Provides a full fake REST API.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are encouraged.

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
