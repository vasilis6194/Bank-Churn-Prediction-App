const express = require("express");
const path = require("path");

const app = express();

// Enable CORS & Allow iframe embedding
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  next();
});

// Serve static files from build
app.use(express.static(path.join(__dirname, "build")));

// Serve static HTML plots from public/sources/
app.use("/sources", express.static(path.join(__dirname, "public/sources")));

// Serve index.html for React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
