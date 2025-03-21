const axios = require("axios");

module.exports = {
  name: "ai",
  description: "Ask anything from AI",
  permission: 0,
  cooldowns: 5,
  dmUser: true,
  author: "Priyanshi Kaur",

  run: async ({ sock, m, args }) => {
    try {
      if (!args.length) {
        return await sock.sendMessage(m.key.remoteJid, {
          text: "❌ *Please provide a question for AI to answer.*",
        });
      }

      const encodedPrompt = encodeURIComponent(args.join(" "));
      const waitingMessage = await sock.sendMessage(m.key.remoteJid, {
        text: "🤖 *𝚀𝚞𝚎𝚎𝚗 𝚃𝚑𝚒𝚗𝚔𝚒𝚗𝚐...*",
      });

      const response = await axios.get(
        `https://priyansh-ai.onrender.com/gemini/ai?query=${encodedPrompt}`
      );
      const Priya = response.data.trim();

      const aiResponse = `╭──────────────❍\n` +
        `┃ 🤖 *QUEEN AI RESPONSE*\n` +
        `╰──────────────❍\n` +
        `╭───────────────────────────────❍\n` +
        `┃ 💬 *Question:* ${args.join(" ")}\n` +
        `┃ 🤖 *AI Says:*\n` +
        `┃ ${Priya}\n` +
        `╰───────────────────────────────❍`;

      await sock.sendMessage(m.key.remoteJid, {
        edit: waitingMessage.key,
        text: aiResponse,
      });

    } catch (error) {
      await sock.sendMessage(m.key.remoteJid, {
        edit: waitingMessage.key,
        text: "❌ AI is unavailable right now. Try again later.",
      });
    }
  },
};
