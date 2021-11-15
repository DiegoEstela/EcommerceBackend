const fs = require("fs");

//setear datos
const setData = async (file, prod) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(prod, null, "\t"));
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

const borrarId = (data, id) => {
  return data.find((item) => item.id === id);
};

//

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
      { ...objeto, id: id, timeStamp: today },
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

  async update(id, arr) {
    let data = await obtData(this.file);
    let i;
    data.find((el, index) => {
      if (el.id == id) {
        i = index;
        return i;
      }
    });

    fileData[i].nombre = prod.nombre;
    fileData[i].descripcion = prod.descripcion;
    fileData[i].codigo = prod.codigo;
    fileData[i].foto = prod.foto;
    fileData[i].precio = prod.precio;
    fileData[i].stock = prod.stock;
    console.log(data);
    await setData(this.file, data);
  }
}

deleteById = async (id) => {
  let data = await obtData(this.file);
  if (data) {
    let newData = await data.filter((item) => item.id !== id);
    await setData(this.file, [newData]);
  } else {
    throw new Error(`no existe el id ${id}`);
  }
};
deleteAll = async () => {
  await setData(this.file, []);
};

module.exports = Contenedor;
