document.addEventListener("DOMContentLoaded", () => {
  alert("Bem-vindo à Ideal Store! Confira nossas promoções!");

  // Slider automático
  const slides = document.querySelectorAll(".hero-slider .slide");
  let current = 0;

  function nextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  setInterval(nextSlide, 5000); // troca a cada 5 segundos
});
