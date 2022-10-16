const fetchItem = async (ItemID) => {
  if (!ItemID) {
    return new Error('You must provide an url');
  }
  const response = await fetch(
    `https://api.mercadolibre.com/items/${ItemID}`,
    );
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}