import fs from "fs";


class ProductsManager {
  constructor(path) {
    this.path = path
  }
  async getProducts(queryObj) {
    const { limit } = queryObj
    try {
      if (fs.existsSync(this.path)) {
        const productsFile = await fs.promises.readFile(this.path, "utf-8");
        const productsArray = JSON.parse(productsFile)
        return limit ? productsArray.slice(0, limit) : productsArray
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const productsFile = await this.getProducts({});
      const product = productsFile.find((p) => p.id === id);
      return product;
    } catch (error) {
      return error;
    }
    
  }

  async createProduct(obj) {
    try {
      const products = await this.getProducts({});
      let id;
      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }
      const newProduct = { id, ...obj };
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      return error;
    }
  }
}

const product1 = {
  name: "Iphone",
  price: 500,
};
const product2 = {
  name: "Ipad",
  price: 200,
};
const product3 = {
  name: "TV",
  price: 1000,
};
const product4 = {
  name: "Samsung",
  price: 400,
};
const product5 = {
  name: "Computador",
  price: 1400,
};
const product6 = {
  name: "Computador",
  price: 1350,
};
const product7 = {
  name: "joystcik",
  price: 350,
};
const product8 = {
  name: "mousse",
  price: 1560,
};
const product9 = {
  name: "keyboard",
  price: 1400,
};
const product10 = {
  name: "cpu",
  price: 180,
};


async function test() {
  const productManager = new ProductsManager("Products.json");

  console.log("blabla")

}

test();


export const productsManager = new ProductsManager("Products.json"); 
