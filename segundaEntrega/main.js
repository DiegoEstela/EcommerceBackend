import express from "express";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import productosRouter from "./routes/Productos.js";
import carritosRouter from "./routes/Carrito.js";

app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
