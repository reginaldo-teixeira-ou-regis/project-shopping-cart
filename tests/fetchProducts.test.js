require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Test the fetchProducts function', () => {
  it('fetchProducts is a function', () => {
    expect(typeof fetchProducts).toEqual('function');
  });
  it('Run the fetchProducts function with the "computador" argument and test if fetch was called', async () => {
    const spyFetch = jest.spyOn(global, "fetch");
    await fetchProducts('computador');
    expect(spyFetch).toBeCalled();
  });
  it('Test if, when calling the fetchProducts function with the "computador" argument, the fetch function uses the endpoint: "https://api.mercadolibre.com/sites/MLA/search?q=computador"', async () => {
    const spyFetch = jest.spyOn(global, "fetch");
    await fetchProducts('computador');
    expect(spyFetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLA/search?q=computador');
  });
  /* it('Test if the fetchProducts function return with the "computador" argument is a data structure equal to the computerSearch object', async () => {
    const fetched = await fetchProducts('computador');
    expect(fetched).toMatchObject(computadorSearch);
  }); */
  it('Test if calling the fetchProducts function with no argument returns an error with the message: "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
