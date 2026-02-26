const card = document.getElementById("card");
const volverBtn = document.getElementById("volver");

card.addEventListener("click", () => {
  card.classList.add("flipped");
  if (navigator.vibrate) navigator.vibrate(30);
});

volverBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // evita que vuelva a girar por el click de la tarjeta
  card.classList.remove("flipped");
  if (navigator.vibrate) navigator.vibrate([20, 20, 20]);
});
