// Contact form handler - submits to /contact API endpoint
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('contact-submit-btn');
  const successMsg = document.getElementById('contact-success');
  const errorMsg = document.getElementById('contact-error');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      companyUrl: document.getElementById('companyUrl').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Validation
    if (!formData.firstName) {
      showError('Please enter your first name.');
      return;
    }

    if (!formData.lastName) {
      showError('Please enter your last name.');
      return;
    }

    if (!formData.companyUrl) {
      showError('Please enter your company URL.');
      return;
    }

    // URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    if (!urlPattern.test(formData.companyUrl)) {
      showError('Please enter a valid URL (e.g., example.com or https://example.com).');
      return;
    }

    if (!formData.message) {
      showError('Please enter a message.');
      return;
    }

    if (formData.message.length < 10) {
      showError('Message must be at least 10 characters.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    hideMessages();

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message');
      }

      showSuccess("Thank you! Your message has been sent successfully. We'll get back to you within 24-48 hours.");
      form.reset();
    } catch (err) {
      showError(err.message || 'An error occurred. Please try again or email us directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });

  function showSuccess(message) {
    if (successMsg) {
      successMsg.textContent = message;
      successMsg.classList.remove('hidden');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showError(message) {
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.classList.remove('hidden');
    }
  }

  function hideMessages() {
    if (successMsg) successMsg.classList.add('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');
  }
});
