// ==========================================
// CONFIG
// ==========================================
const GIFS = [
  // Happy (near Yes)
  {
    url: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHl5dzhyNjE5NGZpNmpmZzF4Mm5udjN0a3Z0dGdyZXYzNDVkaDI1cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1sSfhxzWHJ4vC/giphy.gif",
    label: "YES! You mean it?! 🥰",
  },
  {
    url: "https://media.giphy.com/media/NxC8VtyxqhMtpLoEEN/giphy.gif",
    label: "I love you so much! 😍",
  },
  {
    url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTM1am9kcm5zZHJkcjZ5eDdrYjFleDE1a3E3b3VxMWg0MTFmNmkxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
    label: "Getting so excited! 💖",
  },
  // Neutral
  {
    url: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3UyZjBsNTFobjV1cjkxY2h5bzQ0eGNmYnFhNnd1d25xNm01dDdmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N6funLtVsHW0g/giphy.gifhttps://media.giphy.com/media/26xBBjZ35Q6CMtuI8/giphy.gif",
    label: "Say yes... please? 🥺",
  },
  // Getting sad
  {
    url: "https://media.giphy.com/media/qQdL532ZANbjy/giphy.gif",
    label: "Don't go that way... 😢",
  },
  {
    url: "https://media.giphy.com/media/10tIjpzIu8fe0/giphy.gif",
    label: "Nooo please! 😭",
  },
  // Breakdown
  {
    url: "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
    label: "Why would you... 💔",
  },
  {
    url: "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif",
    label: "I can't stop crying... 😭",
  },
  {
    url: "https://media.giphy.com/media/2WxWfiavndgcM/giphy.gif",
    label: "I'm completely broken 🥀",
  },
];

const loveEmojis = ["💕", "💖", "💗", "💘", "💝", "❤️", "🩷", "🌹", "😍", "🥰"];
const sadEmojis = ["💔", "😢", "😭", "🥀", "☁️", "🖤", "😞", "💧", "😿", "🫠"];

const SAD_TITLES = [
  "Will You Be My Valentine?",
  "Please reconsider...",
  "You're breaking my heart...",
  "I can't take this anymore...",
  "Why are you doing this to me...",
  "...",
];

const SAD_SUBTITLES = [
  "Move your mouse and see how I feel...",
  "Please... just click Yes...",
  "Every click hurts more...",
  "I'm falling apart...",
  "There's nothing left...",
  "...",
];

// Background stages — each click goes darker
const SAD_BACKGROUNDS = [
  "linear-gradient(135deg, #636e72 0%, #b2bec3 50%, #dfe6e9 100%)",
  "linear-gradient(135deg, #4a5568 0%, #718096 50%, #a0aec0 100%)",
  "linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #718096 100%)",
  "linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)",
  "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a202c 100%)",
];

// ==========================================
// ELEMENTS
// ==========================================
const heartsBg = document.getElementById("heartsBg");
const gifContainer = document.getElementById("gifContainer");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const proximityFill = document.getElementById("proximityFill");
const proximityLabel = document.getElementById("proximityLabel");
const celebration = document.getElementById("celebration");
const titleEl = document.querySelector(".container h1");
const subtitleEl = document.querySelector(".subtitle");

// ==========================================
// STATE
// ==========================================
let isSadMode = false;
let noClickCount = 0;
let minGifIndex = 0;

// No button translate offset
let noOffsetX = 0;
let noOffsetY = 0;
const MAX_OFFSET = 250;

// Emoji spawn control
let emojiIntervalId = null;
let currentEmojiRate = 150;
let rainfallId = null;

// ==========================================
// GIF PRELOADING
// ==========================================
const imgElements = [];
let currentGifIndex = Math.floor(GIFS.length / 2);

GIFS.forEach((gif, i) => {
  const img = document.createElement("img");
  img.src = gif.url;
  img.alt = gif.label;
  img.className = i === currentGifIndex ? "visible" : "hidden";
  gifContainer.appendChild(img);
  imgElements.push(img);
});

const moodLabel = document.createElement("div");
moodLabel.className = "mood-label";
moodLabel.textContent = GIFS[currentGifIndex].label;
gifContainer.appendChild(moodLabel);

function showGif(index) {
  if (index === currentGifIndex) return;
  currentGifIndex = index;
  imgElements.forEach((img, i) => {
    img.className = i === index ? "visible" : "hidden";
  });
  moodLabel.textContent = GIFS[index].label;
}

// ==========================================
// FLOATING EMOJIS
// ==========================================
function createEmoji() {
  const el = document.createElement("span");
  el.className = "floating-heart";
  const pool = isSadMode ? sadEmojis : loveEmojis;
  el.textContent = pool[Math.floor(Math.random() * pool.length)];
  el.style.left = Math.random() * 100 + "%";
  el.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";
  el.style.animationDuration = Math.random() * 5 + 5 + "s";
  heartsBg.appendChild(el);
  setTimeout(() => el.remove(), 12000);
}

// Initial burst
for (let i = 0; i < 30; i++) setTimeout(createEmoji, i * 150);
emojiIntervalId = setInterval(createEmoji, currentEmojiRate);

// ==========================================
// SAD RAINFALL — emojis falling from top
// ==========================================
function createRainDrop() {
  const el = document.createElement("span");
  el.className = "rain-drop";
  el.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
  el.style.left = Math.random() * 100 + "%";
  el.style.fontSize = Math.random() * 1 + 0.6 + "rem";
  el.style.animationDuration = Math.random() * 2 + 1.5 + "s";
  heartsBg.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

function startRainfall() {
  if (rainfallId) return;
  rainfallId = setInterval(createRainDrop, 60);
}

function intensifyRainfall() {
  if (!rainfallId) return;
  clearInterval(rainfallId);
  const rate = Math.max(20, 60 - (noClickCount - 3) * 10);
  rainfallId = setInterval(createRainDrop, rate);
}

// ==========================================
// HELPERS
// ==========================================
function getCenter(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// ==========================================
// MOUSEMOVE — GIF switching + proximity bar
// ==========================================
document.addEventListener("mousemove", (e) => {
  const mouse = { x: e.clientX, y: e.clientY };
  const yesCenter = getCenter(btnYes);
  const noCenter = getCenter(btnNo);

  const distYes = dist(mouse, yesCenter);
  const distNo = dist(mouse, noCenter);
  const total = distYes + distNo || 1;
  const ratio = distYes / total;

  // GIF switching — respects minimum sadness level
  const maxIndex = GIFS.length - 1;
  const range = maxIndex - minGifIndex;
  let gifIndex;
  if (range <= 0) {
    gifIndex = maxIndex;
  } else {
    gifIndex =
      minGifIndex + Math.min(range, Math.max(0, Math.round(ratio * range)));
  }
  showGif(gifIndex);

  // Proximity bar
  proximityFill.style.width = (1 - ratio) * 100 + "%";
  if (ratio < 0.35) {
    proximityFill.style.background = "linear-gradient(90deg, #e74c3c, #ff6b81)";
    proximityLabel.textContent = isSadMode
      ? "💖 There's still hope..."
      : "💖 So close to YES!";
  } else if (ratio > 0.65) {
    proximityFill.style.background = "linear-gradient(90deg, #7f8c8d, #2d3436)";
    proximityLabel.textContent = isSadMode
      ? "💔 Stop... please..."
      : "💔 Please don't...";
  } else {
    proximityFill.style.background = "linear-gradient(90deg, #f39c12, #e67e22)";
    proximityLabel.textContent = isSadMode ? "😢 Just say yes..." : "💕 Hmm...";
  }
});

// ==========================================
// NO BUTTON CLICK — escalating sadness
// ==========================================
btnNo.addEventListener("click", () => {
  noClickCount++;

  // ---- First click: activate sad mode ----
  if (noClickCount === 1) {
    isSadMode = true;
    document.body.classList.add("sad");

    // Clear existing happy emojis
    heartsBg.querySelectorAll(".floating-heart").forEach((h) => {
      h.style.opacity = "0";
      setTimeout(() => h.remove(), 400);
    });
  }

  // ---- Deepen background ----
  const bgIndex = Math.min(noClickCount - 1, SAD_BACKGROUNDS.length - 1);
  document.body.style.background = SAD_BACKGROUNDS[bgIndex];

  // ---- Update title & subtitle ----
  const textIndex = Math.min(noClickCount, SAD_TITLES.length - 1);
  titleEl.textContent = SAD_TITLES[textIndex];
  subtitleEl.textContent = SAD_SUBTITLES[textIndex];

  // ---- Darken title color progressively ----
  const darkness = Math.min(noClickCount * 15, 60);
  titleEl.style.color = `hsl(0, 0%, ${70 - darkness}%)`;
  subtitleEl.style.color = `hsl(0, 0%, ${65 - darkness}%)`;

  // ---- Lock GIF to sadder range ----
  minGifIndex = Math.min(noClickCount + 2, GIFS.length - 1);
  showGif(minGifIndex);

  // ---- Burst of sad emojis (more each click) ----
  const burstCount = 40 + noClickCount * 20;
  for (let i = 0; i < burstCount; i++) {
    setTimeout(createEmoji, i * 40);
  }

  // ---- Speed up continuous emoji spawning ----
  currentEmojiRate = Math.max(80, 300 - noClickCount * 50);
  clearInterval(emojiIntervalId);
  emojiIntervalId = setInterval(createEmoji, currentEmojiRate);

  // ---- Start/intensify rainfall at click 3+ ----
  if (noClickCount >= 3) {
    if (!rainfallId) {
      startRainfall();
    } else {
      intensifyRainfall();
    }
  }

  // ---- Nudge button in random direction ----
  const angle = Math.random() * Math.PI * 2;
  const nudge = 60 + Math.random() * 60;

  noOffsetX += Math.cos(angle) * nudge;
  noOffsetY += Math.sin(angle) * nudge;

  // Clamp within max offset boundary
  noOffsetX = clamp(noOffsetX, -MAX_OFFSET, MAX_OFFSET);
  noOffsetY = clamp(noOffsetY, -MAX_OFFSET, MAX_OFFSET);

  // Also clamp within viewport
  const rect = btnNo.getBoundingClientRect();
  const btnW = rect.width;
  const btnH = rect.height;
  const naturalLeft = rect.left - noOffsetX;
  const naturalTop = rect.top - noOffsetY;

  const pad = 20;
  noOffsetX = clamp(
    noOffsetX,
    Math.max(-MAX_OFFSET, pad - naturalLeft),
    Math.min(MAX_OFFSET, window.innerWidth - btnW - pad - naturalLeft),
  );
  noOffsetY = clamp(
    noOffsetY,
    Math.max(-MAX_OFFSET, pad - naturalTop),
    Math.min(MAX_OFFSET, window.innerHeight - btnH - pad - naturalTop),
  );

  btnNo.style.transform = `translate(${noOffsetX}px, ${noOffsetY}px)`;
});

// ==========================================
// YES BUTTON → Celebration!
// ==========================================
const celebrationEmojis = [
  '💕', '💖', '💗', '💘', '💝', '❤️', '🩷', '🌹', '😍', '🥰',
  '🐼', '🐼', '🐼', '❤️', '💖', '💗',
  '🎉', '🎊', '✨', '💐', '🫶', '💞',
];

function createCelebrationDrop() {
  const el = document.createElement("span");
  el.className = "celebration-drop";
  el.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = (Math.random() * 1.8 + 1) + "rem";
  el.style.animationDuration = (Math.random() * 2.5 + 2) + "s";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}

let celebrationIntervalId = null;

btnYes.addEventListener("click", () => {
  // Stop all sad effects
  if (rainfallId) clearInterval(rainfallId);
  clearInterval(emojiIntervalId);

  // Clear any remaining sad emojis
  heartsBg.querySelectorAll(".floating-heart, .rain-drop").forEach((el) => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  });

  celebration.classList.add("active");

  // --- Confetti pieces ---
  const colors = ["#e74c3c", "#ff6b81", "#ffeaa7", "#fd79a8", "#fab1a0", "#fff", "#ff9ff3"];
  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = Math.random() * 10 + 5 + "px";
      piece.style.height = Math.random() * 10 + 5 + "px";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      piece.style.animationDuration = Math.random() * 2 + 2 + "s";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }, i * 25);
  }

  // --- Initial burst of emoji rain (hearts, pandas, love) ---
  for (let i = 0; i < 80; i++) {
    setTimeout(createCelebrationDrop, i * 50);
  }

  // --- Continuous emoji rain that keeps going ---
  celebrationIntervalId = setInterval(createCelebrationDrop, 80);
});

// ==========================================
// TOUCH SUPPORT
// ==========================================
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  document.dispatchEvent(
    new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    }),
  );
});

