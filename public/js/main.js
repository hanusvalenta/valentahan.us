// public/js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission handling
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });

      const result = await response.json();
      formResponse.textContent = result.message;
      formResponse.style.color = response.ok ? 'green' : 'red';
      contactForm.reset(); // Clear the form on successful submission

    } catch (error) {
      formResponse.textContent = 'An error occurred. Please try again later.';
      formResponse.style.color = 'red';
      console.error('Error:', error);
    }
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  });

  document.querySelectorAll('.project, .about, .contact, .skills, .technologies').forEach(section => {
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
