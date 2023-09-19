let addToCart = async (pid) => {
  axios({
    method: 'GET',
    url: '/api/carts/',
  })
    .then((res) => {
      const cartID = res.data.cartID;

      axios({
        method: 'POST',
        url: `/api/carts/${cartID}/products/${pid}`,
        data: {
          productID,
          quantity: 1,
        },
      }).then((res) => {
        alert('Product added to cart');
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
