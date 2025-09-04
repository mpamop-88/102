// Telegram WebApp API
const tg = window.Telegram.WebApp;
tg.expand();

function sendToBot(action) {
  tg.sendData(JSON.stringify({ type: action }));
}

const panel = document.createElement('div');
panel.style.display = 'fixed';
panel.id = 'panel';
panel.className = 'main';
panel.style.bottom = '25px';
panel.style.right = '25px';
panel.style.position = 'absolute';
document.body.appendChild(panel);

const buttons = [
  { text: '⚔ Ближайший бой', action: 'nearest_battle' },
  { text: '🔄 Замены', action: 'help' },
  { text: '⚓ Порт', action: 'port' },
];

buttons.forEach((btn) => {
  const button = document.createElement('button');
  button.textContent = btn.text;
  button.style.display = 'flex';
  button.style.margin = '5px';
  button.style.padding = '3px 7px';
  button.style.background = 'white';
  button.style.color = 'green';
  button.style.fontSize = '10px';
  button.style.fontWeight = 'bold';
  button.style.cursor = 'pointer';
  button.style.width = '160px';

  panel.appendChild(button);

  button.addEventListener('click', () => sendToBot(btn.action));
});
