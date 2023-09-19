import { faker } from '@faker-js/faker';

faker.locale = 'es';

const fakeProductGenerator = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(6),
    thumbnail: faker.image.image(),
    category: faker.commerce.productMaterial(),
    stock: faker.random.numeric(1),
    price: faker.commerce.price(),
  };
};

export { fakeProductGenerator };