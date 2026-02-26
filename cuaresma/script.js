const reveal = document.getElementById("reveal");

reveal.addEventListener("click", () => {
  reveal.classList.toggle("show");

  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
});
