// public/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  });

  document.querySelectorAll('.project, .about, .contact').forEach(section => {
    observer.observe(section);
  });

  // Animation for name scaling
  const nameElement = document.querySelector('.name');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const triggerHeight = window.innerHeight * 0.25;

    if (scrollPosition > triggerHeight) {
      nameElement.classList.add('shrink');
    } else {
      nameElement.classList.remove('shrink');
    }
  });
});
