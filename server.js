import express from "express";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

// --- Подключение бота ---
const bot = new Telegraf(BOT_TOKEN);

// Маршрут для webhook
const webhookPath = `/webhook/${BOT_TOKEN}`;
bot.telegram.setWebhook(`${WEBAPP_URL}${webhookPath}`);
app.use(bot.webhookCallback(webhookPath));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Server запущен на порту ${PORT}`);
  console.log(`✅ WebApp доступен по адресу ${WEBAPP_URL}`);
});


// Раздаём статику
app.use(express.static("./public"));

// Бот: кнопка для открытия WebApp
bot.start((ctx) => {
  ctx.reply("Жми кнопку 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Открыть WebApp 🌐",
            web_app: { url: WEBAPP_URL }
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

// Обработка данных от WebApp
bot.on("message", (ctx) => {
  if (ctx.message.web_app_data) {
    const data = JSON.parse(ctx.message.web_app_data.data);
    ctx.reply(`Ты нажал: ${data.type}`);
  }
});
