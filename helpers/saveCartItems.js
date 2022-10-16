const saveCartItems = (item) => {
  let cartItems = getSavedCartItems();
  if (cartItems) {
    cartItems.push(item);
  } else {
    cartItems = [item];
  }
  addItemLocalStorage('cartItems', cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
