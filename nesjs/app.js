const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
const imageData = ctx.getImageData(0, 0, 256, 240);

const nes = new jsnes.NES({
  onFrame(framebuffer_24) {
    for (let i = 0; i < framebuffer_24.length; i++) {
      const pixel = framebuffer_24[i];
      const j = i * 4;
      imageData.data[j]     = (pixel >> 16) & 0xff;
      imageData.data[j + 1] = (pixel >> 8)  & 0xff;
      imageData.data[j + 2] =  pixel        & 0xff;
      imageData.data[j + 3] = 255;
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
  const binary = String.fromCharCode(...new Uint8Array(buffer));

  nes.loadROM(binary);
  cancelAnimationFrame(rafId);
  frame();
});

// Fullscreen
document.getElementById("fsBtn").addEventListener("click", () => {
  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
});

// Vibración
function buzz(ms = 12) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

// Controles táctiles (pointer events)
document.querySelectorAll("[data-btn]").forEach(btn => {
  const nesBtn = jsnes.Controller[btn.dataset.btn];

  const down = (e) => {
    e.preventDefault();
    nes.buttonDown(1, nesBtn);
    buzz();
  };

  const up = (e) => {
    e.preventDefault();
    nes.buttonUp(1, nesBtn);
  };

  btn.addEventListener("pointerdown", down);
  btn.addEventListener("pointerup", up);
  btn.addEventListener("pointercancel", up);
  btn.addEventListener("pointerleave", up);
});