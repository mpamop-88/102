// Telegram WebApp API
const tg = window.Telegram.WebApp;
tg.expand();

function sendToBot(action) {
  tg.sendData(JSON.stringify({ type: action }));
}

const buttons = [
  { text: "⚔ Ближайший бой", action: "nearest_battle" },
  { text: "🔄 Замены", action: "substitutions" },
  { text: "⚓ Порт", action: "port" }
];

const panel = document.getElementById("panel");

buttons.forEach(btn => {
  const button = document.createElement("button");
  button.textContent = btn.text;
  button.style.display = "block";
  button.style.margin = "10px auto";
  button.style.padding = "12px 18px";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.background = "#007aff";
  button.style.color = "white";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.width = "220px";

  button.addEventListener("click", () => sendToBot(btn.action));
  panel.appendChild(button);
});
