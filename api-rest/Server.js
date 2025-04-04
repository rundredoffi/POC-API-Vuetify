const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.use(express.json());

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];
// méthodes du CRUD
// 1️⃣ Récupérer tous les éléments (GET /items)
app.get("/items", (req, res) => {// endpoint
  res.status(200).json(items); // 200 OK
});

// 2️⃣ Récupérer un élément par ID (GET /items/:id)
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" }); // 404 Not Found
  res.status(200).json(item); // 200 OK
});

// 3️⃣ Créer un nouvel élément (POST /items)
app.post("/items", (req, res) => {
  // on récupère le name
    const { name } = req.body;
  // on vérifie qu’il est bien renseigné
    if (!name) return res.status(400).json({ message: "Name is required" }); // 400 Bad Request
  // l’id est géré en numéro auto mais avec doublon possible car length + 1, pb en cas de //suppression
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem); // 201 Created
  });
  

// 4️⃣ Mettre à jour un élément (PUT /items/:id)
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" }); // 404 Not Found
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" }); // 400 Bad Request
  item.name = name;
  res.status(200).json(item); // 200 OK
});

// 5️⃣ Supprimer un élément (DELETE /items/:id)
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" }); // 404 Not Found
  items.splice(index, 1);
  res.status(204).send(); // 204 No Content
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
