// Blog category filter
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('[data-category-filter]');
  const blogCards = document.querySelectorAll('[data-category]');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.categoryFilter;

      // Update button styles
      filterButtons.forEach(b => {
        b.classList.remove('bg-novastacks', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
      });
      this.classList.add('bg-novastacks', 'text-white');
      this.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');

      // Filter cards
      blogCards.forEach(card => {
        if (category === 'All' || card.dataset.category === category) {
          card.classList.remove('hidden');
          // Add fade-in animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
