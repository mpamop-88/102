import express from "express";
import dotenv from "dotenv";
import bot from "./bot.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Раздаём статические файлы (наш WebApp)
app.use(express.static("public"));

// Подключаем webhook для бота
const webhookPath = "/bot";
bot.telegram.setWebhook(`${process.env.WEBAPP_URL}${webhookPath}`);
app.use(bot.webhookCallback(webhookPath));

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  console.log(`🌍 WebApp доступен: ${process.env.WEBAPP_URL}`);
});
