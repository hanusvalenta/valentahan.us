document.addEventListener("DOMContentLoaded", () => {
  const nameLetters = document.querySelectorAll('.name span');

  const randomSpeeds = Array.from(nameLetters).map(() => Math.random() * 0.2 + 0.05);

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    nameLetters.forEach((letter, index) => {
      const speed = randomSpeeds[index];
      const transformValue = -scrollPosition * speed;

      letter.style.transform = `translateY(${transformValue}px)`;
      letter.style.opacity = 1 - scrollPosition / (window.innerHeight * 2);
    });
  });

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

  const text = "Full Stack Developer";
  const roleElement = document.querySelector(".role"); 
  let index = 0;

  roleElement.textContent = "";
  function type() {
    if (index < text.length) {
      roleElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  type();

  document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      document.getElementById('formResponse').textContent = result.message;

      if (response.ok) {
        form.reset();
      }
    } catch (error) {
      document.getElementById('formResponse').textContent = 'Failed to send message. Please try again.';
      console.error('Error:', error);
    }
  });
});
