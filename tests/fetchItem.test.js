require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Test the fetchItem function', () => {
  it('fetchItem is a function', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  /* it('Run the fetchProducts function with the "MLB1615760527" argument and test if fetch was called', async () => {
    const spyFetch = jest.spyOn(global, "fetch");
    await fetchProducts('MLB1615760527');
    expect(spyFetch).toBeCalled();
  }); */
  it('Test if, when calling the fetchItem function with the "MLB1615760527" argument, the fetch function uses the endpoint: "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const spyFetch = jest.spyOn(global, "fetch");
    await fetchItem('MLB1615760527');
    expect(spyFetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Test if the fetchItem function return with the "MLB1615760527" argument is a data structure equal to the computerSearch object', async () => {
    const fetched = await fetchItem('MLB1615760527');
    expect(fetched).toEqual(item);
  });
  it('Test if calling the fetchItem function with no argument returns an error with the message: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
