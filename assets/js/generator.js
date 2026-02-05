// Marketing Copy Generator - API integration
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('generator-form');
  if (!form) return;

  const copyText = document.getElementById('copyText');
  const keyword = document.getElementById('keyword');
  const contentType = document.getElementById('contentType');
  const submitBtn = document.getElementById('submit-btn');
  const resultsDiv = document.getElementById('results');
  const errorDiv = document.getElementById('error');
  const originalTextEl = document.getElementById('original-text');
  const improvedTextEl = document.getElementById('improved-text');
  const rulesListEl = document.getElementById('rules-list');
  const contentTypeDisplay = document.getElementById('content-type-display');

  // Example data
  const examples = {
    1: {
      text: "Sanur is one of the best areas to stay in Bali and enjoy the relaxingatmosphere in Bali since it has many beautiful beaches, such as Sanur Beach, which are also great for families.",
      keyword: "Sanur"
    },
    2: {
      text: "This beach is calm enough for you to do some activities such as swim, water sports, or simply take a dip in the crystal clear waters.",
      keyword: "beach activities"
    },
    3: {
      text: "Sanur is also filled with many mid-range and luxury hotels like the Andaz, 101 Bali Oasis Sanur, or Bebek Cottages Sanur, which you can choose based on your budget.",
      keyword: "Sanur hotels"
    }
  };

  const contentTypes = {
    seo_content: "SEO Content",
    twitter: "Twitter",
    instagram: "Instagram",
    press_release: "Press Release",
    newsletter: "Newsletter",
    banner_copy: "Banner Copy"
  };

  // Load example buttons
  document.querySelectorAll('[data-example]').forEach(btn => {
    btn.addEventListener('click', function() {
      const num = this.dataset.example;
      const example = examples[num];
      if (example) {
        copyText.value = example.text;
        keyword.value = example.keyword;
        hideResults();
        hideError();
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const text = copyText.value.trim();
    if (!text) {
      showError('Please enter some marketing copy to improve.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>Analyzing and improving your copy...';
    hideResults();
    hideError();

    try {
      const response = await fetch('/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          target_keyword: keyword.value.trim() || null,
          content_type: contentType.value || null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Server error: ${response.status}`);
      }

      const result = await response.json();
      displayResults(text, result);
    } catch (err) {
      showError(err.message || 'An error occurred while processing your request.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Improve My Copy';
    }
  });

  function displayResults(originalText, result) {
    originalTextEl.textContent = originalText;
    improvedTextEl.textContent = result.improved_text || result.corrected_text;

    // Display content type if selected
    if (contentType.value && contentTypes[contentType.value]) {
      contentTypeDisplay.innerHTML = `<span class="text-green-600">&#10003;</span> Copy optimized for: <strong>${contentTypes[contentType.value]}</strong>`;
      contentTypeDisplay.classList.remove('hidden');
    } else {
      contentTypeDisplay.classList.add('hidden');
    }

    // Display rules
    rulesListEl.innerHTML = '';
    if (result.rules_applied && result.rules_applied.length > 0) {
      result.rules_applied.forEach(rule => {
        const span = document.createElement('span');
        span.className = 'inline-block bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium mr-2 mb-2';
        span.textContent = rule;
        rulesListEl.appendChild(span);
      });
    } else {
      const span = document.createElement('span');
      span.className = 'inline-block bg-gray-200 text-gray-500 px-3 py-2 rounded-lg text-sm';
      span.textContent = 'No specific rules identified';
      rulesListEl.appendChild(span);
    }

    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hideResults() {
    if (resultsDiv) resultsDiv.classList.add('hidden');
  }

  function showError(message) {
    if (errorDiv) {
      errorDiv.textContent = 'Error: ' + message;
      errorDiv.classList.remove('hidden');
    }
  }

  function hideError() {
    if (errorDiv) errorDiv.classList.add('hidden');
  }

  // Ctrl+Enter to submit
  if (copyText) {
    copyText.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
      }
    });
  }
});
