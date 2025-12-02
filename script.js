// Data Structure for Services
const servicesData = [
    { id: 1, name: 'Dry Cleaning', price: 200.00, icon: 'fa-tshirt' },
    { id: 2, name: 'Wash & Fold', price: 100.00, icon: 'fa-layer-group' },
    { id: 3, name: 'Ironing', price: 30.00, icon: 'fa-steam' },
    { id: 4, name: 'Stain Removal', price: 500.00, icon: 'fa-wand-magic-sparkles' },
    { id: 5, name: 'Leather & Suede Cleaning', price: 999.00, icon: 'fa-vest' },
    { id: 6, name: 'Wedding Dress Cleaning', price: 2800.00, icon: 'fa-person-dress' }
];

let cart = [];

// DOM Elements
const servicesContainer = document.getElementById('services-container');
const cartContentArea = document.getElementById('cart-content-area'); // Area to swap list vs empty state
const totalPriceElement = document.getElementById('total-price');
const bookingForm = document.getElementById('bookingForm');
const successMessage = document.getElementById('success-message');
// NEW: Get the form to append error message containers
const bookingFormCard = document.querySelector('.booking-form.card'); 

// --- Active Link Highlight Logic (Enhanced for Bottom of Page) ---
const sections = document.querySelectorAll('section.section-spy, footer.section-spy');
const navLinks = document.querySelectorAll('.nav-link');

window.onscroll = () => {
    let current = "";
    
    // Check if we are at the bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        // If bottom, force 'footer' (Contact Us) to be active
        current = "footer";
    } else {
        // Standard scroll spy logic
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Trigger if scrolled past top of section (minus offset)
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach((li) => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
};


// --- Service & Cart Logic ---

function renderServices() {
    servicesContainer.innerHTML = ''; 
    servicesData.forEach(service => {
        const isInCart = cart.includes(service.id);
        const buttonClass = isInCart ? 'btn-outline remove' : 'btn-outline';
        const buttonText = isInCart ? 'Remove Item <i class="fas fa-minus-circle"></i>' : 'Add Item <i class="fas fa-plus-circle"></i>';
        const buttonAction = isInCart ? `removeFromCart(${service.id})` : `addToCart(${service.id})`;

        const serviceHTML = `
            <div class="service-item">
                <div class="service-info">
                    <i class="fas ${service.icon}"></i>
                    <span>${service.name} <span class="service-price">₹${service.price.toFixed(2)}</span></span>
                </div>
                <button class="btn ${buttonClass}" onclick="${buttonAction}">
                    ${buttonText}
                </button>
            </div>
        `;
        servicesContainer.insertAdjacentHTML('beforeend', serviceHTML);
    });
}

function addToCart(id) {
    if (!cart.includes(id)) {
        cart.push(id);
        updateUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(itemId => itemId !== id);
    updateUI();
}

function updateUI() {
    renderServices();
    
    cartContentArea.innerHTML = ''; // Clear cart area
    let total = 0;

    if (cart.length === 0) {
        // RENDER EMPTY STATE MATCHING SCREENSHOT
        const emptyStateHTML = `
            <div class="empty-cart-state">
                <i class="fas fa-info-circle"></i>
                <h4>No Items Added</h4>
                <p>Add items to the cart from the services bar</p>
            </div>
        `;
        cartContentArea.innerHTML = emptyStateHTML;
    } else {
        // Render Cart Items
        cart.forEach((itemId, index) => {
            const service = servicesData.find(s => s.id === itemId);
            total += service.price;
            
            const cartItemHTML = `
                <div class="cart-item">
                    <span>${index + 1}</span>
                    <span class="item-name">${service.name}</span>
                    <span>₹${service.price.toFixed(2)}</span>
                </div>
            `;
            cartContentArea.insertAdjacentHTML('beforeend', cartItemHTML);
        });
    }
    totalPriceElement.textContent = `₹${total.toFixed(2)}`;
}

function scrollToBooking() {
    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
}

// Function to handle message display (success or fail)
function displayMessage(type, message) {
    const messageContainer = type === 'success' ? successMessage : document.getElementById('fail-message');
    const otherContainer = type === 'success' ? document.getElementById('fail-message') : successMessage;

    if (!messageContainer) return; // Safety check

    otherContainer.style.display = 'none';
    messageContainer.innerHTML = `
        <p style="color: var(--${type}-color); font-weight: 600;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'times-circle'}"></i> ${message}
        </p>
    `;
    messageContainer.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 5000);
}

// --- EmailJS Logic ---
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Validation: Check if cart is empty
    if (cart.length === 0) {
        alert("Adding item is necessary for book now.");
        return;
    }
    
    // Hide previous messages
    document.getElementById('fail-message').style.display = 'none';
    successMessage.style.display = 'none';

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Booking...';
    submitBtn.disabled = true;

    const fullName = document.getElementById('fullName').value;
    const emailId = document.getElementById('emailId').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    let orderSummary = "";
    let total = 0;
    cart.forEach(itemId => {
        const service = servicesData.find(s => s.id === itemId);
        orderSummary += `- ${service.name}: ₹${service.price}\n`;
        total += service.price;
    });
    orderSummary += `\nTotal Amount: ₹${total.toFixed(2)}`;

    const templateParams = {
        user_name: fullName,
        user_email: emailId,
        user_phone: phoneNumber,
        order_details: orderSummary
    };

    // Corrected Keys from user context
    const YOUR_SERVICE_ID = 'service_z2sqm2a'; 
    const YOUR_TEMPLATE_ID = 'template_ric8x0h';

    emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, templateParams)
        .then(function() {
            // Success
            displayMessage('success', 'Email Has been sent successfully');
            bookingForm.reset();
            cart = [];
            updateUI();
            
            submitBtn.innerText = 'Book now';
            submitBtn.disabled = false;
        }, function(error) {
            // Failure
            console.error('Booking FAILED...', error);
            displayMessage('danger', 'Booking failed. Please try again later.');
            
            submitBtn.innerText = 'Book now';
            submitBtn.disabled = false;
        });
});

document.addEventListener('DOMContentLoaded', () => {
    // Inject fail message container into the form
    const failMessageHTML = `
        <div id="fail-message" style="display: none; margin-top: 1rem; text-align: center;"></div>
    `;
    // We insert it right after the existing success message div
    document.getElementById('success-message').insertAdjacentHTML('afterend', failMessageHTML);
    
    updateUI();
});