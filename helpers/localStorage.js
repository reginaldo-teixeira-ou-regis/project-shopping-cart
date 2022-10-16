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

if (typeof module !== 'undefined') {
  module.exports = {
    addItemLocalStorage,
    getItemLocalStorage,
  };
}
