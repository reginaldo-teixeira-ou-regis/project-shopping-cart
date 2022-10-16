const fetchProducts = async (products) => {
  if (!products) {
    return new Error('You must provide an url');
  }
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLA/search?q=${products}`,
    );
  const data = await response.json();
  return data.results;
};
fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
