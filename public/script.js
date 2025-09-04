const tg = window.Telegram.WebApp;
tg.expand();

const buttons = [
  { text: "⚔ Ближайший бой", action: "nearest_battle" },
  { text: "🔄 Замены", action: "substitutions" },
  { text: "⚓ Порт", action: "port" }
];

const panel = document.getElementById("panel");

buttons.forEach(btn => {
  const button = document.createElement("button");
  button.textContent = btn.text;
  button.addEventListener("click", () => {
    tg.sendData(JSON.stringify({ type: btn.action }));
  });
  panel.appendChild(button);
});
