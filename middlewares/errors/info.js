export const generateProductErrorInfo = (product) => {
    return `Uno o más valores es inválido.
    Lista de valores requeridos:
    - title: ${product.title}
    - description: ${product.description}
    - stock: ${product.stock}
    - price: ${product.price}
    - category: ${product.category}
    - code: ${product.code}
    `;
  };