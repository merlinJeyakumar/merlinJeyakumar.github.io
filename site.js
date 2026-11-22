const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { mobileMenu.open = false; });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector('summary').focus();
    }
  });
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = [...document.querySelectorAll('[data-reveal]')];

if (!motionPreference.matches && 'IntersectionObserver' in window && revealTargets.length) {
  let revealed = 0;
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      target.style.setProperty('--reveal-delay', `${Math.min(revealed * 45, 225)}ms`);
      target.classList.add('reveal-play');
      target.addEventListener('animationend', () => target.classList.remove('reveal-play'), { once: true });
      observer.unobserve(target);
      revealed += 1;
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });

  revealTargets.forEach((target) => revealObserver.observe(target));
}
