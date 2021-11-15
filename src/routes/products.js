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

router.post("/", async (req, res) => {
  let data = await product.save(req.body);
  console.log(req.body);
  res.send(data);
});

router.put("/:id", async (req, res) => {
  if (req.query.admin === "true") {
    console.log(req.params.id);
    console.log(req.body);
    await product.update(req.params.id, req.body);
    res.send("Producto actualizado con exito");
  }
  verificarAutorizacion(res);
});

router.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  await product.deleteById(id);
});

module.exports = router;
