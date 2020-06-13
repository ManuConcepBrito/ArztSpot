const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const morgan = require('morgan');

// Load config file
dotenv.config({ path: "./config/.env" });

// Connect database
connectDB();

// Route files
const auth = require("./routes/auth");

const app = express();


// Built-in express middleware to parse
// incoming requests with JSON
app.use(express.json());

// logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use("/api/v1/auth", auth);

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Arztspot ${process.env.NODE_ENV} server running in port ${PORT}`)
);

// Handle undhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit if error
  server.close(() => process.exit(1));
});
