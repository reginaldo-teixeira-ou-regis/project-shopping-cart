const arrowTop = document.getElementById('top__arrow');

arrowTop.addEventListener('click', () => {
  window.scrollTo(0, 0);
});
window.onscroll = () => {
  if (window.scrollY > 80) {
    arrowTop.style.display = 'block';
  } else {
    arrowTop.style.display = 'none';
  }
};

const addItemLocalStorage = (name, value) => {
  localStorage.setItem(
    name,
    typeof value === 'object' ? JSON.stringify(value) : String(value),
  );
};

const getItemLocalStorage = (name) => {
  let load = null;
  try {
    load = localStorage.getItem(name);
    return JSON.parse(load);
  } catch (e) {
    return load;
  }
};

const savedCartItems = (item) => {
  let cartItems;
  if (localStorage.cartItems) {
    cartItems = JSON.parse(localStorage.cartItems);
    cartItems.push(item);
  } else {
    cartItems = [item];
  }
  saveCartItems(JSON.stringify(cartItems));
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const setTotalValue = (value, operation) => {
  const elementTotal = document.getElementsByClassName('total-price')[0];
  let totalCart = getItemLocalStorage('totalCart');
  if (operation === '-') {
    totalCart -= value;
  } else if (operation === '+') {
    totalCart += value;
  } else {
    totalCart = value;
  }
  const payTotal = 'Total: ';
  elementTotal.innerText = payTotal + new Intl.NumberFormat('pt-BR',
   { style: 'currency', currency: 'BRL' }).format(totalCart);
  addItemLocalStorage('totalCart', JSON.stringify(totalCart));
};

const deleteCartItems = (item) => {
  const cartItems = JSON.parse(getSavedCartItems());
  if (cartItems) {
    const index = cartItems.findIndex((value) => value.id === item.id);
    const removeItems = cartItems.splice(index, 1);
    setTotalValue(removeItems[0].price, '-');
  }
  addItemLocalStorage('cartItems', cartItems);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  const img = document.createElement('img');
  img.src = thumbnail;
  img.className = 'cart__thumb';
  li.appendChild(img);
  li.appendChild(createCustomElement('p', 'cart__p',
   `ID: ${id} | TITLE: ${title} | PRICE: ${new Intl.NumberFormat('pt-BR',
    { style: 'currency', currency: 'BRL' }).format(price)}`));
  li.addEventListener('click', () => {
    deleteCartItems({ id });
    li.remove();
  });
  return li;
};

const btnProductClick = async (id, event) => {
  const eTarget = event.target;
  eTarget.innerText = 'carregando...';
  eTarget.classList.add('loading');
  const fetched = await fetchItem(id);
  eTarget.innerText = 'Adicionar ao carrinho!';
  eTarget.className = 'item__add';
  savedCartItems(fetched);
  const ol = document.getElementsByClassName('cart__items')[0];
  ol.appendChild(createCartItemElement(fetched));
  setTotalValue(fetched.price, '+');
};

const createProductItemElement = ({ id, title, thumbnail, price }) => {
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
  const priceProduct = 'Preço: ';
  section.appendChild(createCustomElement('span', 'item__price',
   priceProduct + new Intl.NumberFormat('pt-BR',
  { style: 'currency', currency: 'BRL' }).format(price)));
  button.addEventListener('click', (e) => btnProductClick(id, e));
  section.appendChild(button);
  return section;
};

const sectionItems = document.getElementsByClassName('items')[0];

const addItems = async () => {
  const loading = createCustomElement('p', 'loading', 'carregando....');
  sectionItems.appendChild(loading);
  const armFetch = await fetchProducts('computador');
  loading.remove();
  armFetch.reduce((save, pointer) => {
    sectionItems.appendChild(
      createProductItemElement(pointer),
    );
    return save;
  }, '');
};
addItems();

const clearCart = () => {
  document
    .getElementsByClassName('empty-cart')[0]
    .addEventListener('click', () => {
      localStorage.removeItem('cartItems');
      document.getElementsByClassName('cart__items')[0].innerText = '';
      setTotalValue(0);
    });
};

const forEachOnload = (element) => {
  const li = createCartItemElement(element);
  const ol = document.getElementsByClassName('cart__items')[0];
  ol.appendChild(li);
  return element.price;
};

const inputSearch = document.getElementById('searchInput');

const searchProducts = async () => {
  sectionItems.innerHTML = 'carregando...';
  const valueInput = inputSearch.value;
  let itemsProducts;
  if (valueInput.length === 0) {
    itemsProducts = await fetchProducts('computador');
  } else {
    itemsProducts = await fetchProducts(valueInput);
  }
  sectionItems.innerHTML = '';
  if (itemsProducts.length === 0) {
    sectionItems.appendChild(createCustomElement('h3', 'erro__class', 'Produto não encontrado'));
  }
  itemsProducts.forEach((element) => {
    sectionItems.appendChild(createProductItemElement(element));
  });
};
inputSearch.addEventListener('change', searchProducts);

window.onload = () => {
  const items = JSON.parse(getSavedCartItems());
  if (items) {
    let total = 0;
    items.forEach((element) => { total += forEachOnload(element); });
    setTotalValue(total);
  }
  clearCart();
};
