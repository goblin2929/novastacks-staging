// Mobile navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const bar1 = document.getElementById('menu-bar-1');
  const bar2 = document.getElementById('menu-bar-2');
  const bar3 = document.getElementById('menu-bar-3');

  let isOpen = false;

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      isOpen = !isOpen;

      if (isOpen) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');

        // Animate hamburger to X
        bar1.classList.add('rotate-45', 'translate-y-1.5');
        bar2.classList.add('opacity-0');
        bar3.classList.add('-rotate-45', '-translate-y-1.5');
      } else {
        // Hide menu
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');

        // Animate X back to hamburger
        bar1.classList.remove('rotate-45', 'translate-y-1.5');
        bar2.classList.remove('opacity-0');
        bar3.classList.remove('-rotate-45', '-translate-y-1.5');
      }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        bar1.classList.remove('rotate-45', 'translate-y-1.5');
        bar2.classList.remove('opacity-0');
        bar3.classList.remove('-rotate-45', '-translate-y-1.5');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        bar1.classList.remove('rotate-45', 'translate-y-1.5');
        bar2.classList.remove('opacity-0');
        bar3.classList.remove('-rotate-45', '-translate-y-1.5');
      }
    });
  }
});
