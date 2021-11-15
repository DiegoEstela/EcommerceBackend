const fs = require("fs");

//setear datos
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

const borrarId = (data, id) => {
  return data.filter((item) => item.id != id);
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

  async update(id, prod) {
    let data = await obtData(this.file);
    let i;
    data.find((el, index) => {
      if (el.id == id) {
        i = index;
        return i;
      }
    });

    data[i].nombre = prod.nombre;
    data[i].descripcion = prod.descripcion;
    data[i].codigo = prod.codigo;
    data[i].foto = prod.foto;
    data[i].precio = prod.precio;
    data[i].stock = prod.stock;
    console.log(data);
    await setData(this.file, data);
  }
}

deleteById = async (id) => {
  let data = await obtData(this.file);
  let newData = borrarId(data, id);
  setData(this.file, newData);
};
deleteAll = async () => {
  await setData(this.file, []);
};

module.exports = Contenedor;
