const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
  { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
  { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
  { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
  { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
  { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
  { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
  { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
  { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const productListElement = document.getElementById('product-list');
const totalPriceElement = document.getElementById('total-price');
const categoryFilterElement = document.getElementById('category-filter');
const productSearchElement = document.getElementById('product-search');
const searchResultElement = document.getElementById('search-result');
const availabilityStatusElement = document.getElementById('availability-status');
const productNamesElement = document.getElementById('product-names');

// Visualización de Productos
const displayProducts = (products) => {
  productListElement.innerHTML = '';
  products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.innerHTML = `<strong>${product.name}</strong> - $${product.price} - Stock: ${product.stock}`;
      productListElement.appendChild(productItem);
  });
};
displayProducts(products);

// Calcular el Precio Total
const calculateTotalPrice = (products) => {
  const totalPrice = products.reduce((total, product) => total + product.price, 0);
  totalPriceElement.textContent = `Total Price: $${totalPrice}`;
};
calculateTotalPrice(products);

// Filtrar Productos por Categoría
categoryFilterElement.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  const filteredProducts = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);
  displayProducts(filteredProducts);
  calculateTotalPrice(filteredProducts);
});

// Buscar un Producto por Nombre
productSearchElement.addEventListener('input', (event) => {
  const searchQuery = event.target.value.toLowerCase();
  const foundProduct = products.find(product => product.name.toLowerCase() === searchQuery);
  searchResultElement.textContent = foundProduct 
      ? `Found: ${foundProduct.name} - $${foundProduct.price} - Stock: ${foundProduct.stock}` 
      : 'Product not found';
});

// Verificar Disponibilidad de Productos
const checkProductAvailability = (products) => {
  const allAvailable = products.every(product => product.stock > 0);
  availabilityStatusElement.textContent = allAvailable 
      ? 'All products are available' 
      : 'Some products are out of stock';
};
checkProductAvailability(products);

// Obtener Nombres de Productos
const displayProductNames = (products) => {
  productNamesElement.innerHTML = '';
  const productNames = products.map(product => product.name);
  productNames.forEach(name => {
      const nameItem = document.createElement('li');
      nameItem.textContent = name;
      productNamesElement.appendChild(nameItem);
  });
};
displayProductNames(products);
