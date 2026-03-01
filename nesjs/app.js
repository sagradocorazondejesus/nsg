const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, 256, 240);

const nes = new jsnes.NES({
  onFrame(framebuffer) {
    for (let i = 0; i < framebuffer.length; i++) {
      const pixel = framebuffer[i];
      const j = i * 4;
      imageData.data[j]     = (pixel >> 16) & 0xff;
      imageData.data[j + 1] = (pixel >> 8) & 0xff;
      imageData.data[j + 2] = pixel & 0xff;
      imageData.data[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  },
  onAudioSample() {}
});

let raf = null;

function run() {
  cancelAnimationFrame(raf);
  function loop() {
    nes.frame();
    raf = requestAnimationFrame(loop);
  }
  loop();
}

// Selector de ROM
document.getElementById("romInput").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const data = new Uint8Array(reader.result);
    nes.loadROM(data);
    run();
  };
  reader.readAsArrayBuffer(file);
});

// Controles táctiles
document.querySelectorAll("button[data-btn]").forEach(btn => {
  const key = btn.dataset.btn;

  btn.addEventListener("touchstart", e => {
    e.preventDefault();
    nes.buttonDown(1, jsnes.Controller[key]);
  }, { passive: false });

  btn.addEventListener("touchend", e => {
    e.preventDefault();
    nes.buttonUp(1, jsnes.Controller[key]);
  }, { passive: false });
});

// Pantalla completa
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  document.documentElement.requestFullscreen?.();
});