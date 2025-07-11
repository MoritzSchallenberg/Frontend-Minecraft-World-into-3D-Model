function loadSection(section) {
  const content = document.getElementById("content-area");

  if (section === "home") {
    content.innerHTML = `
      <h2>Willkommen bei PrintYourGame!</h2>
      <p>Hier beginnt deine Reise durch unsere Druckwelt...</p>
    `;
  }

  else if (section === "spiele") {
    content.innerHTML = `
      <h2>Spiele</h2>
      <ul>
        <li>Minecraft</li>
        <li>Sims</li>
        <li>Cities Skylines</li>
        <li>Valheim</li>
      </ul>
    `;
  }

  else if (section === "shop") {
    content.innerHTML = `
      <h2>Shop</h2>
      <p>Hier findest du alle Produkte</p>
    `;
  }

  else if (section === "faq") {
    content.innerHTML = `
      <h2>FAQ</h2>
      <p>Hier findest du Antworten auf häufige Fragen</p>
    `;
  }
}

function toggleFavorit(button) {
  const produktDiv = button.closest(".produkt");
  const produktId = produktDiv.dataset.id;
  const produktKategorie = produktDiv.dataset.kategorie;
  const produktHtml = produktDiv.outerHTML;

  let favoriten = JSON.parse(localStorage.getItem("favoriten")) || [];

  const index = favoriten.findIndex(p => p.id === produktId);
  if (index !== -1) {
    favoriten.splice(index, 1); // entfernen
  } else {
    favoriten.push({ id: produktId, kategorie: produktKategorie, html: produktHtml });
  }

  localStorage.setItem("favoriten", JSON.stringify(favoriten));
}


const express = require("express");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./db/users.db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT,
    address TEXT,
    billing_address TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product TEXT,
    date TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product TEXT,
    review TEXT
  )`);
});

app.post("/register", async (req, res) => {
  const { username, password, email, address, billing_address } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (username, password, email, address, billing_address) VALUES (?, ?, ?, ?, ?)`,
    [username, hashed, email, address, billing_address], function (err) {
      if (err) return res.status(400).json({ error: "Benutzername existiert bereits" });
      res.json({ success: true });
    });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (!user) return res.status(401).json({ error: "Benutzer nicht gefunden" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Falsches Passwort" });
    res.json({ success: true, user });
  });
});

app.post("/review", (req, res) => {
  const { user_id, product, review } = req.body;
  db.run(`INSERT INTO reviews (user_id, product, review) VALUES (?, ?, ?)`, [user_id, product, review], function (err) {
    if (err) return res.status(500).json({ error: "Fehler beim Speichern der Bewertung" });
    res.json({ success: true });
  });
});

app.get("/reviews/:userId", (req, res) => {
  db.all(`SELECT * FROM reviews WHERE user_id = ?`, [req.params.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Fehler beim Abrufen der Bewertungen" });
    res.json(rows);
  });
});

app.get("/orders/:userId", (req, res) => {
  db.all(`SELECT * FROM orders WHERE user_id = ?`, [req.params.userId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Fehler beim Abrufen der Bestellungen" });
    res.json(rows);
  });
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));