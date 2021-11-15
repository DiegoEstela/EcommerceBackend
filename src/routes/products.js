const express = require("express");

const { Router } = express;
const router = new Router();

const Contenedor = require("../class/products");
const product = new Contenedor("./products.txt");

const noAdmin = {
  error: -1,
  mensaje: "usuario sin privilegios",
};

router.get("/", async (req, res) => {
  let data = await product.getAll();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let data = await product.getById(id);
  res.send(data);
});

router.post("/save", async (req, res) => {
  if (req.query.admin === "admin") {
    await product.save(req.body);
    let nombreProduct = req.body.nombre;
    res.send(`Se guardo el producto ${nombreProduct}`);
  }
  res.send(noAdmin);
});

router.put("/:id", async (req, res) => {
  if (req.query.admin === "admin") {
    await product.update(req.params.id, req.body);
    res.send("Producto actualizado con exito");
  }
  res.send(noAdmin);
});

router.delete("/:id", async (req, res) => {
  if (req.query.admin === "admin") {
    let data = await product.getAll();
    let newData = data.filter((x) => {
      return x.id != req.params.id;
    });
    await product.deleteById(newData);
    res.send("se elimino correctamente el producto");
  }
  res.send(noAdmin);
});

module.exports = router;
