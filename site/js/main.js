// ── Estimate Modal ──
(function () {
  const overlay = document.getElementById('estimate-modal');
  const form    = document.getElementById('estimate-form');
  const success = document.getElementById('modal-success');
  const doneBtn = document.getElementById('modal-done');

  function openModal() {
    overlay.classList.add('open');
    overlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('input, select, textarea, button:not(.modal-close)')?.focus();
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Intercept all #contact CTA links EXCEPT phone/email/tel/mailto
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  // Also intercept nav "Free Estimate" link
  document.querySelectorAll('.nav-cta').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal();
    });
  });

  // Close on backdrop click
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // Close button
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);

  // ESC to close
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const phone   = form.phone.value.trim();
    const service = form.service.value;
    if (!name || !phone || !service) {
      [form.name, form.phone, form.service].forEach(f => {
        if (!f.value.trim()) f.style.borderColor = '#e53935';
      });
      return;
    }
    form.hidden   = true;
    success.hidden = false;
  });

  // Reset on done
  doneBtn?.addEventListener('click', () => {
    form.reset();
    form.hidden   = false;
    success.hidden = true;
    closeModal();
  });

  // Clear red borders on input
  form.querySelectorAll('input, select').forEach(f => {
    f.addEventListener('input', () => { f.style.borderColor = ''; });
  });
})();

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger?.addEventListener('click', () => {
    nav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = nav.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = nav.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = nav.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close nav on link click
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
}));

// Sticky header shrink
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
});

// Animate on scroll (simple)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .testimonial-card, .cert-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.visible').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// Apply visible class via CSS
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
