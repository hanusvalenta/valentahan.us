document.addEventListener("DOMContentLoaded", () => {
  // Scroll-based animation for each letter
  const nameLetters = document.querySelectorAll('.name span');

  // Assign a random speed multiplier to each letter
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

  // Intersection Observer for sections
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

  // Typing effect for "Full Stack Developer"
  const text = "Full Stack Developer";
  const roleElement = document.querySelector(".role"); 
  let index = 0;

  // Clear initial text from the element
  roleElement.textContent = "";

  // Typing function
  function type() {
    if (index < text.length) {
      roleElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  // Start typing on page load
  type();
});
