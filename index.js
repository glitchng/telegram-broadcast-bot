require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

function getRandomAmount() {
  return (Math.random() * (1000 - 100) + 100).toFixed(2);
}

function getRandomWallet() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let wallet = "T";
  for (let i = 0; i < 33; i++) {
    wallet += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return wallet;
}

function getCurrentTimestamp() {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function sendWithdrawalMessage() {
  const amount = getRandomAmount();
  const wallet = getRandomWallet();
  const timestamp = getCurrentTimestamp();

  const message = `✅ *Test Withdrawal*\n\n💸 *Amount:* ${amount} USDT\n🏦 *Wallet:* \`${wallet}\`\n📆 *Date:* ${timestamp}`;

  bot.sendMessage(process.env.CHANNEL_ID, message, { parse_mode: "Markdown" });
}

// Run every minute and send 10 messages
setInterval(() => {
  for (let i = 0; i < 10; i++) {
    setTimeout(sendWithdrawalMessage, i * 6000);
  }
}, 60000);
