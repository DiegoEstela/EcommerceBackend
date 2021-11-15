const fs = require("fs");

const Contenedor = require("../class/products");
const product = new Contenedor("./products.txt");

const setData = async (file, prod) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(prod, null, 2));
  } catch (err) {
    console.log(err);
  }
};

// obtener datos
const obtData = async (file) => {
  try {
    const readFile = await fs.promises.readFile(file, "utf-8");
    if (readFile.length) return await JSON.parse(readFile);
    else return readFile;
  } catch (err) {
    console.log("no se pueden obtener datos", err);
  }
};

const today = new Date(Date.now());

class ContenedorCart {
  constructor(file) {
    this.file = file;
  }
  save = async (objeto) => {
    let data = await obtData(this.file);
    const id = data.length + 1;
    await setData(this.file, [
      ...data,
      { id: id, timeStamp: today, producto: [objeto] },
    ]);
  };

  getById = async (id) => {
    let data = await obtData(this.file);
    if (data) {
      return await data.find((item) => item.id === id);
    } else {
      throw new Error(`no existe el id ${id}`);
    }
  };

  getAll = async () => {
    return await obtData(this.file);
  };
  deleteById = async (objeto) => {
    await setData(this.file, [...objeto]);
  };

  addToCart = async (id, objeto) => {
    let data = await obtData(this.file);
    let index = id - 1;
    data[index].producto.push(objeto);
    await setData(this.file, [...data]);
  };

  deleteFromCart = async (id, idProd) => {
    let data = await obtData(this.file);
    let index = id - 1;
    let dataCart = data[index].producto;
    let dataAdd = dataCart.filter((item) => item.id !== idProd);
    data[index].producto = dataAdd;
    await setData(this.file, [...data]);
    console.log(dataAdd);
    // if (data) {
    //   let dataCart = await data.find((item) => item.id === id);
    //   let dataCartFilt = dataCart.producto.filter((item) => item.id !== idProd);
    //   dataCart[index].producto.splice(dataCartFilt, 1);
    //   await setData(this.file, [...dataCart]);
    // }
  };
}

module.exports = ContenedorCart;
