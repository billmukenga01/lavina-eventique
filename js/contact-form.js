/**
 * Contact Form Handler — Lavina Eventique
 * Sends emails via EmailJS (client-side, no backend required).
 * 
 * EmailJS Configuration:
 *   Public Key : QNb0GhZeBkM__FZGA  (initialized in <head>)
 *   Service ID : service_n9qhqss
 *   Template ID: template_sblzh5x
 */

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    var submitBtn = document.getElementById('submit-btn');
    if (!form || !submitBtn) return;

    var SERVICE_ID  = 'service_n9qhqss';
    var TEMPLATE_ID = 'template_sblzh5x';

    // ── Field references ──────────────────────────────────────
    var fields = {
        name:       document.getElementById('name'),
        email:      document.getElementById('email'),
        phone:      document.getElementById('phone'),
        eventType:  document.getElementById('event-type'),
        subject:    document.getElementById('subject'),
        message:    document.getElementById('message')
    };

    // ── Live validation on blur ───────────────────────────────
    Object.keys(fields).forEach(function (key) {
        var el = fields[key];
        if (!el) return;
        el.addEventListener('blur', function () {
            validateField(el);
        });
        // Clear error state when user starts typing
        el.addEventListener('input', function () {
            el.classList.remove('is-invalid');
        });
    });

    // ── Submit handler ────────────────────────────────────────
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all required fields
        var valid = true;
        ['name', 'email', 'eventType', 'subject', 'message'].forEach(function (key) {
            if (!validateField(fields[key])) valid = false;
        });
        if (!valid) {
            showToast('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Set loading state
        setLoading(true);

        // Build template params
        var templateParams = {
            from_name:  fields.name.value.trim(),
            from_email: fields.email.value.trim(),
            phone:      fields.phone ? fields.phone.value.trim() : '',
            event_type: fields.eventType ? fields.eventType.value : '',
            subject:    fields.subject.value.trim(),
            message:    fields.message.value.trim()
        };

        // Send via EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function () {
                showToast('Your message has been sent successfully! We\'ll get back to you within 24 hours.', 'success');
                form.reset();
                // Clear all validation classes
                Object.keys(fields).forEach(function (key) {
                    if (fields[key]) {
                        fields[key].classList.remove('is-valid', 'is-invalid');
                    }
                });
                setLoading(false);
            }, function (error) {
                console.error('EmailJS Error:', error);
                showToast('Sorry, there was a problem sending your message. Please email us directly at eventsbylavina@gmail.com or give us a call.', 'error');
                setLoading(false);
            });
    });

    // ── Helpers ───────────────────────────────────────────────

    /**
     * Validate a single field. Returns true if valid.
     */
    function validateField(el) {
        if (!el) return true;
        if (!el.hasAttribute('required')) return true;

        var value = el.value ? el.value.trim() : '';
        var isValid = true;

        if (!value) {
            isValid = false;
        } else if (el.type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        el.classList.toggle('is-invalid', !isValid);
        el.classList.toggle('is-valid', isValid);
        return isValid;
    }

    /**
     * Toggle the submit button loading state.
     */
    function setLoading(loading) {
        submitBtn.disabled = loading;
        submitBtn.classList.toggle('loading', loading);
        var btnText = submitBtn.querySelector('.btn-text');
        if (btnText) {
            btnText.textContent = loading ? 'Sending...' : 'Send Message';
        }
    }

    /**
     * Show a toast notification.
     * @param {string} message
     * @param {'success'|'error'} type
     */
    function showToast(message, type) {
        // Remove any existing toast
        var existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast-notification toast-' + type;

        var icon = type === 'success'
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-exclamation-circle"></i>';

        toast.innerHTML =
            '<span class="toast-icon">' + icon + '</span>' +
            '<span class="toast-message">' + message + '</span>' +
            '<button class="toast-close" aria-label="Close">&times;</button>';

        document.body.appendChild(toast);

        // Trigger reflow then animate in
        toast.offsetHeight;
        requestAnimationFrame(function () {
            toast.classList.add('show');
        });

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', function () {
            dismissToast(toast);
        });

        // Auto-dismiss after 6 seconds
        setTimeout(function () {
            dismissToast(toast);
        }, 6000);
    }

    function dismissToast(toast) {
        if (!toast || !toast.parentNode) return;
        toast.classList.remove('show');
        setTimeout(function () {
            if (toast.parentNode) toast.remove();
        }, 400);
    }
});
