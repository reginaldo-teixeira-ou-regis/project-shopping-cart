require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('fetchItem is a function', () => {
    expect(typeof fetchItem).toEqual('function');
  });
});
