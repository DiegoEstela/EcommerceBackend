const express = require("express");

const { Router } = express;
const router = new Router();

const Contenedor = require("../class/products");
const product = new Contenedor("./products.txt");

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
  await product.save(req.body);
  let nombreProduct = req.body.nombre;
  res.send(`Se guardo el producto ${nombreProduct}`);
});

router.put("/:id", async (req, res) => {
  await product.update(req.params.id, req.body);
  res.send("Producto actualizado con exito");
});

router.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  await product.deleteById(id);
  res.send("Producto eliminado con exito");
});

module.exports = router;
