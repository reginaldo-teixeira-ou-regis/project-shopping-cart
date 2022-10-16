/* const saveCartItems = (item) => {
  let cartItems = getSavedCartItems();
  if (cartItems) {
    cartItems.push(item);
  } else {
    cartItems = [item];
  }
  addItemLocalStorage('cartItems', cartItems);
}; */

const saveCartItems = (item) => localStorage.setItem('cartItems', item);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
