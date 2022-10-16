const getSavedCartItems = () => getItemLocalStorage('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
