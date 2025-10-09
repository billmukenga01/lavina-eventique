/**
 * Contact Form Handler for Firebase
 * This script handles the contact form submission without requiring PHP
 * It can be connected to Firebase Functions later for email sending
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check for URL parameters to show success/error messages
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        showMessage('Your message has been sent successfully!', 'success');
    } else if (status === 'error') {
        showMessage('There was an error sending your message. Please try again later.', 'error');
    }
    
    // Get the contact form
    const contactForm = document.getElementById('contact-form');
    
    // Add submit event listener to the form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    /**
     * Handle form submission
     * @param {Event} event - The form submission event
     */
    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form data
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real implementation, this would send data to Firebase Function
        // For now, we'll simulate a successful submission
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate sending (would be replaced with actual Firebase Function call)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Show success message
            showMessage('Your message has been sent successfully!', 'success');
            
            // Update URL without reloading the page
            const url = new URL(window.location);
            url.searchParams.set('status', 'success');
            window.history.pushState({}, '', url);
        }, 1500);
    }
    
    /**
     * Show a message to the user
     * @param {string} text - The message text
     * @param {string} type - The message type ('success' or 'error')
     */
    function showMessage(text, type) {
        // Create message element if it doesn't exist
        let messageElement = document.getElementById('form-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'form-message';
            contactForm.parentNode.insertBefore(messageElement, contactForm);
        }
        
        // Set message content and style
        messageElement.textContent = text;
        messageElement.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
    
    /**
     * Validate email format
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
