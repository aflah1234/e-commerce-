const products = [
    { id: 1, name: "Product 1", price: 29.99, image: "1.jpeg" },
    { id: 2, name: "Product 2", price: 49.99, image: "2.jpeg" },
    { id: 3, name: "Product 3", price: 19.99, image: "3.jpeg" },
    { id: 4, name: "Product 4", price: 99.99, image: "4.jpeg" }
];

let cart = [];

function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    cart.push(product);
    updateCartCount();
    updateCartItems();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${product.name} - $${product.price.toFixed(2)} 
                              <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(cartItem);

        totalPrice += product.price;
    });

    totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartItems();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Thank you for your purchase!');
        cart = [];
        updateCartCount();
        updateCartItems();
        closeCartModal(); 
    }
}

const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeBtn = document.getElementsByClassName('close')[0];

cartBtn.onclick = function() {
    cartModal.style.display = 'block';
    updateCartItems(); 
}

closeBtn.onclick = function() {
    cartModal.style.display = 'none';
}


window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
}


function closeCartModal() {
    cartModal.style.display = 'none';
}

document.getElementById('checkout-btn').addEventListener('click', handleCheckout);

displayProducts();
