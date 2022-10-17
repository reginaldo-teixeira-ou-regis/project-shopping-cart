const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Test the saveCartItems function', () => {
  it('Test if, when executing saveCartItems with a cartItem as an argument, the localStorage.setItem method is called', () => {
    saveCartItems('cartItems');
    expect(localStorage.setItem).toBeCalled();
  });
  it('Test if, when executing saveCartItems with a cartItem as an argument, the localStorage.setItem method is called with two parameters, the first being the "cartItems" key and the second being the value passed as an argument to saveCartItems', () => {
    saveCartItems('cartItems');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'cartItems');
  });
});
