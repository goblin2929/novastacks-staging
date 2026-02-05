// Tab component with data attributes
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('[data-tab-trigger]');
  const tabPanels = document.querySelectorAll('[data-tab-content]');

  function activateTab(tabId) {
    // Deactivate all buttons
    tabButtons.forEach(btn => {
      btn.classList.remove('bg-novastacks', 'text-white');
      btn.classList.add('bg-slate-600/50', 'text-gray-300');
      btn.setAttribute('aria-selected', 'false');
    });

    // Hide all panels
    tabPanels.forEach(panel => {
      panel.classList.add('hidden');
      panel.setAttribute('aria-hidden', 'true');
    });

    // Activate selected button
    const activeBtn = document.querySelector(`[data-tab-trigger="${tabId}"]`);
    if (activeBtn) {
      activeBtn.classList.add('bg-novastacks', 'text-white');
      activeBtn.classList.remove('bg-slate-600/50', 'text-gray-300');
      activeBtn.setAttribute('aria-selected', 'true');
    }

    // Show selected panel
    const activePanel = document.querySelector(`[data-tab-content="${tabId}"]`);
    if (activePanel) {
      activePanel.classList.remove('hidden');
      activePanel.setAttribute('aria-hidden', 'false');
    }
  }

  // Add click listeners
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tabTrigger);
    });

    // Keyboard navigation
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(btn.dataset.tabTrigger);
      }
    });
  });

  // Activate first tab by default
  if (tabButtons.length > 0) {
    activateTab(tabButtons[0].dataset.tabTrigger);
  }
});
