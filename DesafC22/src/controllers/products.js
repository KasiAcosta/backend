const { faker } = require("@faker-js/faker");

const createFakerProducts = async() => {

    let products = [];
    for(let i = 0; i < 5; i++){
        const product = {
            name: faker.commerce.product(),
            price: faker.commerce.price(),
            image: faker.image.image()
        }
        products.push(product);
    }
    return products;
}

module.exports = { createFakerProducts }