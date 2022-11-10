const { json } = require("express");
const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const product = products.find((product) => product.id === parseInt(id));

  if (!product) return res.status(404).json({ error: "Product not found" });

  product.name = name;
  product.price = price;

  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === Number(req.params.id));
  if (!productFound)
    return res.status(404).json({ message: "product not found" });

  products = products.filter((p) => p.id !== Number(req.params.id));
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const product = req.params.id;
  const item = products.find((e) => e.id === Number(product));
  if (!item) {
    return res.status(404).json({
      message: "Product not Found",
    });
  }
  res.json(item);
});

app.listen(3000);
console.log("server on port " + 3000);
