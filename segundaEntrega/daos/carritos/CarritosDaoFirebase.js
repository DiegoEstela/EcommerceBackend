import ContenedorFirebase from "../../contenedores/ContenedorFirebase";

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super("carritos");
  }

  async guardar(carrito = { productos: [] }) {
    return super.guardar(carrito);
  }
}

export default CarritosDaoFirebase;
