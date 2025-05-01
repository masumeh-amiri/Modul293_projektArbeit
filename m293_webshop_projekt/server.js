 import express from "express";
 
 app.use(express.json()); // bereits vorhanden

app.post("/api/cart", (req, res) => {
  const cart = req.body;
  console.log("Empfangener Warenkorb:", cart);

  // Hier kannst du später in Datei oder DB speichern

  res.status(200).json({ message: "Warenkorb empfangen!" });
});
