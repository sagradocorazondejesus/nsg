const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, 256, 240);

const nes = new jsnes.NES({
  onFrame(framebuffer_24) {
    for (let i = 0; i < framebuffer_24.length; i++) {
      const pixel = framebuffer_24[i];
      const j = i * 4;
      imageData.data[j]     = (pixel >> 16) & 0xff; // R
      imageData.data[j + 1] = (pixel >> 8)  & 0xff; // G
      imageData.data[j + 2] =  pixel        & 0xff; // B
      imageData.data[j + 3] = 255;                 // A
    }
    ctx.putImageData(imageData, 0, 0);
  },
  onAudioSample() {}
});

let rafId = null;
function frame() {
  nes.frame();
  rafId = requestAnimationFrame(frame);
}

document.getElementById("romInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  const binary = new Uint8Array(buffer)
    .reduce((s, b) => s + String.fromCharCode(b), "");

  nes.loadROM(binary);
  cancelAnimationFrame(rafId);
  frame();
});

// Controles táctiles simulando teclado
document.querySelectorAll(".controls button").forEach(btn => {
  const code = btn.dataset.key;
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    nes.buttonDown(1, jsnes.Controller[mapKey(code)]);
  }, { passive: false });

  btn.addEventListener("touchend", (e) => {
    e.preventDefault();
    nes.buttonUp(1, jsnes.Controller[mapKey(code)]);
  }, { passive: false });
});

function mapKey(code) {
  switch (code) {
    case "ArrowUp": return "UP";
    case "ArrowDown": return "DOWN";
    case "ArrowLeft": return "LEFT";
    case "ArrowRight": return "RIGHT";
    case "KeyZ": return "A";
    case "KeyX": return "B";
    case "Enter": return "START";
    case "ShiftRight": return "SELECT";
  }
}