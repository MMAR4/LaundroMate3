# 🧺 Spotless Laundry Services (LaundroMate)

## ✨ Project Overview

LaundroMate is a modern, single-page web application designed to allow customers to easily browse and book laundry and dry-cleaning services online. The project focuses on a clean, responsive **Dark Theme** interface and robust frontend logic, simulating a real-world e-commerce booking experience.

The core challenge involved implementing dynamic shopping cart functionality purely with **Vanilla JavaScript** and integrating a third-party email service for reliable booking confirmation without a dedicated backend server.

## 🚀 Key Features

* **Dynamic Cart Logic (Vanilla JS):** Services can be added and removed dynamically, with an automatic calculation and display of the running **Grand Total**.
* **Booking Confirmation via EmailJS:** Integrates with EmailJS to securely send booking details (customer info, services, and total cost) to the service provider's inbox upon submission.
* **Modern Dark Theme:** A visually appealing dark-mode design implemented using CSS custom properties (`:root` variables) for easy customization.
* **Responsive Design:** Fully optimized for seamless viewing and interaction across desktop, tablet, and mobile devices.
* **Scroll Spy Navigation:** The header navigation highlights the current active section as the user scrolls down the page.
* **Form Validation:** Basic input validation ensures all necessary fields are filled before attempting the booking submission.

## ⚙️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3 | Structure and styling (including Flexbox/Grid for layout). |
| **Logic** | **Vanilla JavaScript** | All dynamic functionality (cart, total calculation, form handling, scroll spy). |
| **External API** | **EmailJS** | Handles secure, client-side email sending for booking confirmations. |
| **Icons** | **Font Awesome 6** | Used for service icons, navigation, and utility indicators. |

## 💻 Setup and Installation

To run this project locally and test the booking functionality:

### Prerequisites

1.  A modern web browser.
2.  An EmailJS account (required for sending emails).

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd laundromate
    ```

2.  **Configure EmailJS:**
    * Sign up for EmailJS and connect an **Email Service** (e.g., Gmail).
    * Create a new **Email Template** (using the provided dark theme HTML template).
    * Locate your **Public Key (User ID)**, **Service ID**, and **Template ID**.

3.  **Update `index.html` (Public Key):**
    Replace the placeholder in the `<script>` tag inside `index.html` with your **EmailJS Public Key**:
    ```html
    emailjs.init('YOUR_PUBLIC_KEY'); 
    ```

4.  **Update `script.js` (IDs):**
    Replace the placeholder IDs in the `bookingForm` event listener inside `script.js` with your specific **Service ID** and **Template ID**:
    ```javascript
    const YOUR_SERVICE_ID = 'service_z2sqm2a'; // Replace with your Service ID
    const YOUR_TEMPLATE_ID = 'template_6dstwul'; // Replace with your Template ID
    ```

5.  **Run Locally:**
    Open the `index.html` file in your web browser.

## 🤝 Contribution

Feel free to fork the repository and contribute! Any suggestions for improving the frontend logic, UI/UX, or code structure are welcome.
