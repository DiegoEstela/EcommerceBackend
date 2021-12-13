import ContenedorMemoria from "../../contenedores/ContenedorMemoria";

class CarritosDaoMem extends ContenedorMemoria {
  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }
}

export default CarritosDaoMem;
