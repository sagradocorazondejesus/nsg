const msgCard = document.getElementById("msgCard");

msgCard.addEventListener("click", () => {
  msgCard.classList.toggle("flipped");

  // Vibración corta al tocar (si el dispositivo lo permite)
  if (navigator.vibrate) {
    navigator.vibrate([40, 40, 40]); // (latido)
  }
});
