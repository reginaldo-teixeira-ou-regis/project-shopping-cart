const fetchItem = async (ItemID) => {
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
