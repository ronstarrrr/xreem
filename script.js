const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const helper = document.getElementById("helper");
const yay = document.getElementById("yay");

// “No” cycles + “Yes” grows (matches the common behaviour)
const noTexts = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again 😭",
  "Don’t do this to me",
  "I’m gonna cry",
  "Last chance...",
  "Ok you’re just being silly now"
];

let noCount = 0;
let yesScale = 1;

noBtn.addEventListener("click", () => {
  noCount += 1;

  // Update No text
  noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];

  // Grow Yes button
  yesScale = Math.min(yesScale + 0.18, 3.0);
  yesBtn.style.transform = `scale(${yesScale})`;

  // Keep helper line exactly as seen
  helper.textContent = "“No” seems a bit shy";
});

yesBtn.addEventListener("click", () => {
  yay.classList.remove("hidden");

  // Lock buttons (optional but feels clean)
  yesBtn.disabled = true;
  noBtn.disabled = true;
  yesBtn.style.opacity = "0.85";
  noBtn.style.opacity = "0.6";
});
