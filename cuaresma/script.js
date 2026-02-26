const msgCard = document.getElementById("msgCard");

msgCard.addEventListener("click", () => {
  msgCard.classList.toggle("flipped");

  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
});
