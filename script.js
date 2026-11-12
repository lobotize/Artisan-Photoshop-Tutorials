const backToTop = document.querySelector("#back-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");    
  } else {
    backToTop.classList.remove("visible"); 
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});