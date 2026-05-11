/* NAV scroll shadow */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* Scroll reveal */
const srEls = document.querySelectorAll(
  '.project-card, .tl-card, .about-info-card, .skills-mini, .about-text, .about-cards-col, .section-header, .contact-wrap'
);
srEls.forEach(el => el.classList.add('sr'));

/* stagger siblings */
document.querySelectorAll('.projects-bento .project-card').forEach((el, i) => {
  el.classList.add(`sr-d${Math.min(i + 1, 4)}`);
});
document.querySelectorAll('.tl-item').forEach((el, i) => {
  el.querySelector('.tl-card')?.classList.add(`sr-d${Math.min(i + 1, 4)}`);
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

srEls.forEach(el => io.observe(el));

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Smooth scroll for nav anchors */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* Tilt effect on project cards (subtle) */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
