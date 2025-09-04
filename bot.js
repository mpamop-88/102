import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Кнопка для открытия WebApp
bot.start((ctx) => {
  ctx.reply("Жми кнопку, чтобы открыть интерфейс 👇", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Открыть WebApp 🌐",
            web_app: { url: process.env.WEBAPP_URL }
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});

// Приём данных из WebApp
bot.on("message", (ctx) => {
  if (ctx.message?.web_app_data?.data) {
    const data = JSON.parse(ctx.message.web_app_data.data);
    ctx.reply(`Ты нажал: ${data.type}`);
  }
});

export default bot;
