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

class Contenedor {
  constructor(file) {
    this.file = file;
  }
  save = async (objeto) => {
    let data = await obtData(this.file);
    const id = data.length + 1;
    await setData(this.file, [
      ...data,
      { id: id, timeStamp: today, producto: [...objeto] },
    ]);
  };
}
