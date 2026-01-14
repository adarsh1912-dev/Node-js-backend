// In this example, we will learn how app.use() matches routes using req.url,
// and how route matching differs between app.use() and specific HTTP methods like app.post().

import express from "express";

const app = express();
const port = 4000;

app.use(express.json());


// app.use() matches the beginning of the URL path using startsWith logic.
// For example: "/users/1".startsWith("/users") is true, so middleware for "/users" will run for any subpath.
// Express splits the route and request URL by '/', and matches each section in order.
// If all sections of the route match the start of the URL, the middleware is executed.

// This middleware runs for any route that starts with "/admin" (e.g., "/admin", "/admin/settings").
// It checks for a password in the request body and only allows requests with the correct password to proceed.
app.use("/admin", (req, res, next) => {
  console.log("Request URL:", req.url);
  if (req.body.password === "secret") {
    // If password is correct, continue to the next middleware or route handler
    next();
  } else {
    // If password is incorrect, end the response
    res.end("Invalid Credentials");
  }
});


// For specific HTTP methods (like app.post), Express checks for an exact match between the route and the request URL.

// This route handler only runs for POST requests to exactly "/admin".
app.post("/admin", (req, res) => {
  console.log("POST /admin called, URL:", req.url);
  res.end("Hello Admin");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
