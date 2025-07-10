const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const productRoutes = require("routes/productroutes.js");
app.use("/api/products", productRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/shopdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB verbunden"))
.catch((err) => console.error("❌ Fehler:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
