require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('fetchProducts is a function', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('Run the fetchProducts function with the "computador" argument and test if fetch was called', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalled();
  });
  it('Test if, when calling the fetchProducts function with the "computador" argument, the fetch function uses the endpoint: "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
/*   it('Test if the fetchProducts function return with the "computador" argument is a data structure equal to the computerSearch object', async () => {
    await fetchProducts('computador');
    expect(fetch).toEqual(computadorSearch);
  });
  it('Test if calling the fetchProducts function with no argument returns an error with the message: "You must provide an url"', async () => {
    expect(await fetchProducts('computador')).toThrow(new Error('You must provide an url'));
  }); */
});
