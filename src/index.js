const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = require("./routes/products");

app.use("/api/productos", products);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de productos");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
