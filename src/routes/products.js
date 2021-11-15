const express = require("express");

const { Router } = express;
const router = new Router();

const Contenedor = require("../class/products");
const product = new Contenedor();

router.get("/:id", async (req, res) => {
  res.send(await product.getById(req.params.id));
});

router.get("/", async (req, res) => {
  let data = await product.getAll();
  console.log(data);

  res.send(data);
});

router.post("/", async (req, res) => {
  let data = await product.getAll();
  console.log(data);
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
  if (req.query.admin === "true") {
    await product.delete(req.params.id);
    res.send("Producto eliminado con exito");
  }
  verificarAutorizacion(res);
});

module.exports = router;
