// global product list
const products = [
    { id: 1, brand: 'adidas', name: 'Printed Half Sleeves T-Shirts', price: 78, image: 'img/products/f1.png', rating: 5 },
    { id: 2, brand: 'adidas', name: 'Printed Half Sleeves T-Shirts', price: 78, image: 'img/products/f2.png', rating: 5 },
    { id: 3, brand: 'adidas', name: 'Printed Half Sleeves T-Shirts', price: 78, image: 'img/products/f3.png', rating: 5 },
    { id: 4, brand: 'adidas', name: 'Printed Half Sleeves T-Shirts', price: 78, image: 'img/products/f4.png', rating: 5 },
    { id: 5, brand: 'adidas', name: 'Grey Half Sleeves T-Shirts', price: 78, image: 'img/products/f5.png', rating: 5 },
    { id: 6, brand: 'adidas', name: 'Printed Half Sleeves T-Shirts', price: 78, image: 'img/products/f6.png', rating: 5 },
    { id: 7, brand: 'adidas', name: 'Brown Half Sleeves T-Shirts', price: 78, image: 'img/products/f7.png', rating: 5 },
    { id: 8, brand: 'adidas', name: 'Black Half Sleeves T-Shirts', price: 78, image: 'img/products/f8.png', rating: 5 },
   ];

// cart persistence helpers
function loadCart() {
    try {
        return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = loadCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
}

function addToCart(id) {
    const cart = loadCart();
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
    showToast('Added to cart');
}

// toast helper
function showToast(message, duration = 2000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function updateQuantity(id, qty) {
    if (qty < 1) return;
    const cart = loadCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = qty;
        saveCart(cart);
        updateCartCount();
        renderCart();
    }
}

function removeFromCart(id) {
    let cart = loadCart().filter(i => i.id !== id);
    saveCart(cart);
    updateCartCount();
    renderCart();
}

// rendering helpers
function makeStars(rating) {
    let html = '';
    for (let i = 0; i < rating; i++) {
        html += '<i class="fas fa-star"></i>';
    }
    return html;
}

function renderProducts(containerId, list) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    list.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'pro';
        div.innerHTML = `
            <a href="product.html?id=${prod.id}"><img src="${prod.image}" alt="${prod.name}"></a>
            <div class="des">
                <span>${prod.brand}</span>
                <h5><a href="product.html?id=${prod.id}">${prod.name}</a></h5>
                <div class="star">${makeStars(prod.rating)}</div>
                <h4>$${prod.price}</h4>
                ${prod.colors ? `<div class="card-colors">${prod.colors.map(c => `<span class="swatch" style="background:${c}"></span>`).join('')}</div>` : ''}
            </div>
            <button class="add-to-cart" data-id="${prod.id}"><i class="fal fa-shopping-cart cart"></i></button>
        `;
        container.appendChild(div);
    });
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id)));
    });
}

function renderCart() {
    const cart = loadCart();
    const container = document.getElementById('cart-container');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        if (totalEl) totalEl.textContent = '';
        return;
    }
    let total = 0;
    cart.forEach(item => {
        const prod = products.find(p => p.id === item.id);
        if (!prod) return;
        total += prod.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}">
            <div class="cart-details">
                <h4>${prod.name}</h4>
                <p>$${prod.price} x <input type="number" min="1" value="${item.quantity}" data-id="${prod.id}" class="quantity-input"></p>
                <button class="remove-item" data-id="${prod.id}">Remove</button>
            </div>
            <div class="item-total">$${(prod.price * item.quantity).toFixed(2)}</div>
        `;
        container.appendChild(row);
    });
    if (totalEl) totalEl.textContent = 'Total: $' + total.toFixed(2);

    container.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            const id = parseInt(input.dataset.id);
            const val = parseInt(input.value);
            if (!isNaN(val)) updateQuantity(id, val);
        });
    });
    container.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
        });
    });
}

function setActiveNav() {
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('#navbar a').forEach(a => {
        if (a.getAttribute('href') === path) {
            a.classList.add('active');
        }
    });
}

// initialize
document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();
    updateCartCount();
    if (document.getElementById('featured-products')) {
        // show first eight items as featured
        renderProducts('featured-products', products.slice(0, 8));
    }
    if (document.getElementById('all-products')) {
        renderProducts('all-products', products);
    }
    if (document.getElementById('cart-container')) {
        renderCart();
        // add 'Proceed to Checkout' button if cart not empty
        const cart = loadCart();
        if (cart.length > 0) {
            const container = document.getElementById('cart-section');
            const btn = document.createElement('a');
            btn.href = 'checkout.html';
            btn.className = 'btn';
            btn.textContent = 'Proceed to Checkout';
            container.appendChild(btn);
        }
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const subject = contactForm.querySelector('input[type="text"][placeholder="Subject"]')?.value || '';
            alert('Thank you for your message!' + (subject ? '\nSubject: ' + subject : ''));
            contactForm.reset();
        });
    }

    // product detail page
    const detailSection = document.getElementById('product-detail');
    if (detailSection) {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        const prod = products.find(p => p.id === id);
        if (!prod) {
            detailSection.innerHTML = '<p>Product not found.</p>';
        } else {
            detailSection.innerHTML = `
                <div class="pro-detail">
                    <img src="${prod.image}" alt="${prod.name}">
                    <div class="des">
                        <span>${prod.brand}</span>
                        <h2>${prod.name}</h2>
                        <h3>$${prod.price}</h3>
                        <div class="options">
                            <div class="sizes">
                                <label>Size:</label>
                                <select><option>S</option><option>M</option><option>L</option><option>XL</option></select>
                            </div>
                            <div class="colors">
                                <label>Color:</label>
                                <div class="swatches"><span class="swatch" style="background:#000"></span><span class="swatch" style="background:#ccc"></span></div>
                            </div>
                        </div>
                        <div class="quantity">
                            <label>Qty:</label>
                            <input type="number" value="1" min="1" style="width:60px;">
                        </div>
                        <button class="btn" id="add-detail" data-id="${prod.id}">Add to Cart</button>
                        <p><a href="shop.html">&larr; Back to Shop</a></p>
                    </div>
                </div>
            `;
            document.getElementById('add-detail').addEventListener('click', () => addToCart(prod.id));
        }
    }

    // checkout page
    const checkoutSection = document.getElementById('checkout-section');
    if (checkoutSection) {
        const cart = loadCart();
        const summaryEl = document.getElementById('order-summary');
        if (cart.length === 0) {
            summaryEl.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            let html = '<ul class="order-list">';
            let total = 0;
            cart.forEach(item => {
                const prod = products.find(p => p.id === item.id);
                if (!prod) return;
                total += prod.price * item.quantity;
                html += `<li>${prod.name} &times; ${item.quantity} = $${(prod.price * item.quantity).toFixed(2)}</li>`;
            });
            html += `</ul><p id="order-total">Total: $${total.toFixed(2)}</p>`;
            summaryEl.innerHTML = html;
        }
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', e => {
                e.preventDefault();
                // clear cart
                saveCart([]);
                updateCartCount();
                alert('Order placed! Thank you for shopping with us.');
                window.location.href = 'index.html';
            });
        }
    }

    // random map injection for any .map container
    document.querySelectorAll('.map').forEach(div => {
        // generate random lat/lon within reasonable bounds
        const lat = (Math.random() * 140) - 70; // -70..+70
        const lon = (Math.random() * 360) - 180; // -180..+180
        const delta = 0.5;
        const bbox = `${lon-delta}%2C${lat-delta}%2C${lon+delta}%2C${lat+delta}`;
        div.innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik"></iframe>`;
    });

    // mobile nav toggle
    const toggle = document.querySelector('.toggle');
    const navbar = document.getElementById('navbar');
    if (toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
        // close menu when a link is tapped
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }
});