const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('', () => {
    saveCartItems('cartItems');
    expect(localStorage.setItem).toBeCalled();
  });
  it('', () => {
    saveCartItems('cartItems');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItems');
  });
});
