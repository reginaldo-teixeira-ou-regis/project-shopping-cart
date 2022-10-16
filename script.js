// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const setTotalValue = (value) => {
  const elementTotal = document.getElementsByClassName('total-price')[0];
  if (elementTotal) {
    elementTotal.innerText = value;
  } else {
    const elementCart = document.getElementsByClassName('cart')[0];
    const p = createCustomElement('p', 'total-price', value);
    elementCart.appendChild(p);
  }
};

const deleteCartItems = (item) => {
  const cartItems = getSavedCartItems();
  if (cartItems) {
    const index = cartItems.findIndex((value) => value.id === item.id);
    const removeItems = cartItems.splice(index, 1);
    let totalCart = Number(getItemLocalStorage('totalCart'));
    totalCart -= removeItems[0].price;
    setTotalValue(totalCart);
    addItemLocalStorage('totalCart', totalCart);
  }
  addItemLocalStorage('cartItems', cartItems);
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

const btnProductClick = async (id, event) => {
  event.target.innerText = 'carregando...';
  event.target.classList.add('loading');
  const fetched = await fetchItem(id);
  event.target.innerText = 'Adicionar ao carrinho!';
  event.target.className = 'item__add';
  saveCartItems(fetched);
  const ol = document.getElementsByClassName('cart__items')[0];
  ol.appendChild(
    createCartItemElement({
      id: fetched.id,
      title: fetched.title,
      price: fetched.price,
    }),
  );
  let totalCart = Number(getItemLocalStorage('totalCart'));
  totalCart += fetched.price;
  setTotalValue(totalCart);
  addItemLocalStorage('totalCart', totalCart);
};

const createProductItemElement = (id, title, thumbnail) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const button = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  button.addEventListener('click', (e) => btnProductClick(id, e));
  section.appendChild(button);
  return section;
};

const sectionItems = document.getElementsByClassName('items')[0];

const addItems = async () => {
  const loading = createCustomElement('p', 'loading', 'carregando...');
  sectionItems.appendChild(loading);
  const armFetch = await fetchProducts('computador');
  loading.remove();
  armFetch.reduce((save, pointer) => {
    sectionItems.appendChild(
      createProductItemElement(pointer.id, pointer.title, pointer.thumbnail),
    );
    return save;
  }, '');
};
addItems();

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
/* const getIdFromProductItem = (product) =>
  product.querySelector('span.id').innerText; */

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    deleteCartItems({ id });
    li.remove();
  });
  return li;
};

const clearCart = () => {
  document
    .getElementsByClassName('empty-cart')[0]
    .addEventListener('click', () => {
      localStorage.removeItem('cartItems');
      document.getElementsByClassName('cart__items')[0].innerText = '';
      addItemLocalStorage('totalCart', 0);
      setTotalValue(0);
    });
};

window.onload = () => {
  const items = getSavedCartItems();
  if (items) {
    const ol = document.getElementsByClassName('cart__items')[0];
    let total = 0;
    items.forEach((element) => {
      const li = createCartItemElement({
        id: element.id,
        title: element.title,
        price: element.price,
      });
      ol.appendChild(li);
      total += element.price;
    });
    addItemLocalStorage('totalCart', total);
    setTotalValue(total);
  }
  clearCart();
};
