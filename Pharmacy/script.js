// Sample product data
const products = [
    {
        id: 1,
        name: "Paracetamol",
        description: "Pain relief medication",
        price: 4.99,
        image: "assets/prescription-and-pills-1864007.jpg"
    },
    {
        id: 2,
        name: "Ibuprofen",
        description: "Anti-inflammatory medication",
        price: 5.99,
        image: "assets/brett-jordan-rJVflgqasr4-unsplash.jpg"
    },
    {
        id: 3,
        name: "Allergy Relief",
        description: "Antihistamine tablets",
        price: 6.99,
        image: "assets/pexels-polina-tankilevitch-3873140.jpg"
    },
    {
        id: 4,
        name: "Cold & Flu Relief",
        description: "Multi-symptom relief",
        price: 7.99,
        image: "assets/pexels-polina-tankilevitch-3873140.jpg"
    },
    {
        id: 5,
        name: "Vitamin D",
        description: "Daily supplement",
        price: 8.99,
        image: "assets/pexels-alex-green-5699524.jpg"
    },
    {
        id: 6,
        name: "First Aid Kit",
        description: "Essential medical supplies",
        price: 15.99,
        image: "assets/pexels-roger-brown-3435524-5149757 (1).jpg"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// Load products
function loadProducts() {
    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">£${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    const productElement = document.querySelector(`[onclick="addToCart(${productId})"]`).closest('.product-card');
    const cartIcon = document.querySelector('.cart-icon');

    // Create floating element
    const floatingElement = document.createElement('div');
    floatingElement.className = 'floating-product';
    floatingElement.style.backgroundImage = `url(${product.image})`;
    
    // Position the floating element at the product's position
    const productRect = productElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    floatingElement.style.top = `${productRect.top}px`;
    floatingElement.style.left = `${productRect.left}px`;
    document.body.appendChild(floatingElement);

    // Animate to cart
    setTimeout(() => {
        floatingElement.style.top = `${cartRect.top}px`;
        floatingElement.style.left = `${cartRect.left}px`;
        floatingElement.style.transform = 'scale(0.1)';
        floatingElement.style.opacity = '0';
    }, 50);

    // Remove floating element and update cart
    setTimeout(() => {
        floatingElement.remove();
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        updateCart();
        showNotification(`${product.name} added to cart!`);
    }, 500);
}

// Update cart
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>£${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})" class="remove-item">🗑️</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add animation styles
    notification.style.animation = 'slideInOut 3s ease-in-out';
    notification.style.transform = 'translateX(100%)';
    
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2700);
}

// Cart modal
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real application, this would redirect to a checkout page
    alert('Proceeding to checkout...');
    // You would typically redirect to a secure checkout page here
    // window.location.href = '/checkout';
});

// Contact form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    // In a real application, you would send this data to a server
    alert('Thank you for your message. We will get back to you soon!');
    contactForm.reset();
});

// Initialize
loadProducts();

// Add Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to animate
function initAnimations() {
    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'all 0.8s ease';
        observer.observe(heroContent);
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect for product cards
function addProductHoverEffect() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', (e) => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
}

// Enhanced contact form interactions
function initFormAnimations() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    // Add focus animations
    inputs.forEach(input => {
        // Initial check for pre-filled inputs
        if (input.value) {
            input.classList.add('has-content');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });

        // Add typing animation
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });

    // Enhanced form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Add loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            submitButton.innerHTML = '✓ Message Sent!';
            submitButton.classList.add('success');
            
            // Reset form with animation
            setTimeout(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('success');
                inputs.forEach(input => input.classList.remove('has-content'));
            }, 2000);

            showNotification('Thank you for your message. We will get back to you soon!');
        } catch (error) {
            // Error state
            submitButton.innerHTML = '× Error';
            submitButton.classList.add('error');
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('error');
            }, 2000);
        }
    });
}

// Add to the existing styles
const additionalStyles = `
    .animate-in {
        opacity: 1 !important;
        transform: translate(0, 0) !important;
    }

    .floating-product {
        position: fixed;
        width: 50px;
        height: 50px;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        z-index: 1000;
        transition: all 0.4s ease-in-out;
    }

    @keyframes slideInOut {
        0% { transform: translateX(100%); opacity: 0; }
        15% { transform: translateX(0); opacity: 1; }
        85% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }

    .product-card img {
        transition: transform 0.3s ease;
    }

    .form-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
        vertical-align: middle;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .submit-button.success {
        background: linear-gradient(135deg, #27ae60, #2ecc71);
    }

    .submit-button.error {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
        transform: translateY(-4px);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add form initialization to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    addProductHoverEffect();
    initFormAnimations();
}); 