const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = require("./routes/products");
const carts = require("./routes/cart");

app.use("/api/productos", products);
app.use("/api/carrito", carts);

app.use(function (req, res, next) {
  res.status(404).send({
    error: -1,
    descripcion: `Ruta ${req.url}, metodo ${req.method} no autorizada`,
  });
});

app.get("/", (req, res) => {
  if (req.query.admin === "admin") {
    res.send("Bienvenido a la API de productos como admin");
  } else {
    res.send("Bienvenido a la API de productos");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
