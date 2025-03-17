async function fetchProduct() {
    const response = await fetch('data.json');
    const products = await response.json();
    displayProducts(products);
}

fetchProduct();

function displayProducts(products) {
    const productContainer = document.getElementById('product-list');

    products.forEach(product =>{
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
        <img src= "${product.image.thumbnail}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick = "addToCart('${product.name}', ${product.price})">Add to cart</button>
        `;

        productContainer.appendChild(productCard);

    });
}

let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1});
    }

    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');

    cartContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
        <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateTotal();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerHTML =  `$${total.toFixed(2)}`;
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);

    saveCart();
    updateCartUI();
}

function clearCart() {
    cart = [];

    saveCart();
    updateCartUI();
}

document.getElementById('clear-cart').addEventListener("click", clearCart);

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartUI();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCart();
})
