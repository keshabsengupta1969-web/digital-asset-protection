// Import dependencies
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data storage
let assets = [
  {
    id: 1,
    title: "Match Highlight Clip",
    description: "Final goal highlight",
    status: "Authorized"
  }
];

// CREATE
app.post("/assets", (req, res) => {
  const newAsset = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  };

  assets.push(newAsset);
  res.json(newAsset);
});

// READ ALL
app.get("/assets", (req, res) => {
  res.json(assets);
});

// READ ONE
app.get("/", (req, res) => {
  res.send("🚀 Digital Asset Protection API is running");
});

// UPDATE
app.put("/assets/:id", (req, res) => {
  assets = assets.map(a =>
    a.id == req.params.id ? { ...a, ...req.body } : a
  );
  res.json({ message: "Updated" });
});

// DELETE
app.delete("/assets/:id", (req, res) => {
  assets = assets.filter(a => a.id != req.params.id);
  res.json({ message: "Deleted" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});