const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Test getSavedCartItems function', () => {
  it('Test if, when executing getSavedCartItems, the localStorage.getItem method is called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  });
  it('Test if, when executing getSavedCartItems, the localStorage.getItem method is called with "cartItems" as a parameter.', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
