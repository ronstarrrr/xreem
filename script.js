const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const helper = document.getElementById("helper");
const story = document.getElementById("story");
const yay = document.getElementById("yay");
const stickers = document.getElementById("stickers");
const btnZone = document.getElementById("btnZone");
const yayLine = document.getElementById("yayLine");
const planBtn = document.getElementById("planBtn");

let noCount = 0;
let yesScale = 1;

// A more “thought-through” arc: playful -> cute -> heartfelt -> “ok you’re done”
const noFlow = [
  {
    noText: "No",
    story: "Okay. Starting with violence. I respect it. 😭",
    helper: "Tip: keep tapping “No”. I planned for this."
  },
  {
    noText: "Nope",
    story: "Alright miss stubborn. But I’m patient.",
    helper: "Also… I AM SO IN LOVE WITH YOU! YOU ARE my weakness."
  },
  {
    noText: "Not today",
    story: "Fair. But what about… *Valentine’s* today? 👀",
    helper: "“No” seems a bit shy."
  },
  {
    noText: "Hmm…",
    story: "I knew there was a soft side in there somewhere.",
    helper: "One more “No” and I start negotiating."
  },
  {
    noText: "Still no",
    story: "Ok listen… I’m not even asking for much. Just you + me + vibes.",
    helper: "Yes is locked until you’ve had your fun 😌"
  },
  {
    noText: "You’re annoying",
    story: "Correct. But I’m *your* annoying person. That’s the point.",
    helper: "Ok… I’m about to unlock “Yes”."
  },
  {
    noText: "STOP 😭",
    story: "😂 Okay okay. You’ve proven your resistance. Respect.",
    helper: "Unlocked ✅ (but you still have to choose it)"
  }
];

// little sticker pops for delight
const stickerSet = ["💘","🫶","✨","🥹","🍓","🌹","💌","😌"];

function popSticker() {
  const s = document.createElement("div");
  s.className = "sticker";
  s.textContent = stickerSet[Math.floor(Math.random() * stickerSet.length)];
  s.style.left = Math.floor(Math.random() * 100) + "vw";
  s.style.top = Math.floor(70 + Math.random() * 25) + "vh";
  stickers.appendChild(s);
  setTimeout(() => s.remove(), 1300);
}

function growYes() {
  yesScale = Math.min(yesScale + 0.16, 2.4);
  yesBtn.style.transform = `scale(${yesScale})`;
}

// Gentle dodge: after a few “No” clicks, move slightly within the button zone
function maybeDodgeNo() {
  if (noCount < 4) return; // only starts later

  noBtn.classList.add("wiggle");
  setTimeout(() => noBtn.classList.remove("wiggle"), 260);

  const zoneRect = btnZone.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Max movement so it stays playful not impossible
  const maxX = Math.min(80, (zoneRect.width - btnRect.width) / 2);
  const maxY = 18;

  const dx = (Math.random() * 2 - 1) * maxX;
  const dy = (Math.random() * 2 - 1) * maxY;

  noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
}

function setCopy(stepIndex) {
  const step = noFlow[Math.min(stepIndex, noFlow.length - 1)];
  noBtn.textContent = step.noText;
  story.textContent = step.story;
  helper.textContent = step.helper;
}

noBtn.addEventListener("click", () => {
  noCount += 1;

  // Update copy
  setCopy(noCount);

  // Make it feel alive
  popSticker();
  growYes();
  maybeDodgeNo();

  // Unlock Yes after enough “No”s (so she has to play)
  if (noCount >= 6) {
    yesBtn.disabled = false;
    yesBtn.textContent = "Yes 😌";
  }
});

yesBtn.addEventListener("click", () => {
  yay.classList.remove("hidden");

  // “Win” moment: shower a few stickers
  for (let i = 0; i < 10; i++) setTimeout(popSticker, i * 80);

  // Lock the zone
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.opacity = "0.85";
  noBtn.style.opacity = "0.55";

  // Optional: customize the final line
  yayLine.textContent = "Now we’re locked in. I’ll get to planning. 💐";

  // Optional: make “Claim your date” open WhatsApp (you can change later)
  // Replace the placeholder with your own WhatsApp link or leave it as a cute button.
  planBtn.onclick = () => {
    alert("✅ Date claimed. Now relax and get excited, be sure to bring a freakum dress for 14th Feb 😌");
    return false;
  };
});
