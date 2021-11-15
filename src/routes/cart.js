const express = require("express");

const { Router } = express;
const router = new Router();

const ContenedorCart = require("../class/cart");
const cart = new ContenedorCart("./carrito.txt");

const Contenedor = require("../class/products");
const product = new Contenedor("./products.txt");

router.get("/", async (req, res) => {
  let data = await cart.getAll();
  res.send(data);
});

router.get("/:id/productos", async (req, res) => {
  let id = parseInt(req.params.id);
  let data = await cart.getById(id);
  res.send(data);
});

router.post("/", async (req, res) => {
  await cart.save(req.body);
  let id = parseInt(req.body.id);
  res.send(`Carrito id: Nº${id}, se creo correctamente`);
});

router.post("/:id/productos", async (req, res) => {
  let id = parseInt(req.params.id);
  await cart.addToCart(id, req.body);
  res.send(`se agrego nuevo producto al carrito Id Nº ${id}`);
});

router.delete("/:id", async (req, res) => {
  let data = await cart.getAll();
  let newData = data.filter((x) => {
    return x.id != req.params.id;
  });
  await cart.deleteById(newData);
  res.send("se elimino correctamente el producto");
});

router.delete("/:id/productos/:idProd", async (req, res) => {
  let id = parseInt(req.params.id);
  let idProd = parseInt(req.params.idProd);
  await cart.deleteFromCart(id, idProd);
  res.send(`se elimino del carrito Id Nº ${id} el producto Id Nº ${idProd} `);
});

module.exports = router;
