const fs = require("fs");
const path = require("path");

module.exports = {
 name: "help",
 description: "Show all available commands or details of a specific command",
 permission: 0,
 cooldowns: 3,
 dmUser: true,
 author: "Priyanshi Kaur",

 run: async ({ sock, m, args }) => {
 try {
 const cmdsDir = path.resolve(__dirname);
 const commandFiles = fs.readdirSync(cmdsDir).filter(file => file.endsWith(".js"));
 const commands = commandFiles.map(file => require(path.join(cmdsDir, file)));

 const botPrefix = global.prefix || ".";

 if (args.length === 0) {
 const commandList = commands
 .filter(cmd => cmd.name)
 .map(cmd => `┃ ✦ *${botPrefix}${cmd.name}* ─ ${cmd.description || "No description"}`)
 .join("\n");

 const helpMessage = `╭──────────────❍\n` +
 `┃ 🤖 *QUEENBOT HELP MENU* \n` +
 `╰──────────────❍\n` +
 `╭───────────────────────────────❍\n` +
 `┃ 💡 *Available Commands:*\n` +
 `┃───────────────────────────────❍\n` +
 `${commandList}\n` +
 `┃───────────────────────────────❍\n` +
 `┃ 📌 Use *${botPrefix}help [command]* for details.\n` +
 `╰───────────────────────────────❍`;

 return await sock.sendMessage(m.key.remoteJid, { text: helpMessage });
 }

 const commandName = args[0].toLowerCase();
 const cmd = commands.find(c => c.name === commandName);

 if (!cmd) {
 return await sock.sendMessage(m.key.remoteJid, { text: `❌ Command *${commandName}* not found.` });
 }

 const cmdDetails = `╭──────────────❍\n` +
 `┃ 📌 *Command Details:*\n` +
 `╰──────────────❍\n` +
 `╭───────────────────────────────❍\n` +
 `┃ 📛 *Name:* ${cmd.name}\n` +
 `┃ 🧑‍💻 *Author:* ${cmd.author || "Unknown"}\n` +
 `┃ 🔒 *Permission:* ${cmd.permission}\n` +
 `┃ ⏳ *Cooldown:* ${cmd.cooldowns} sec\n` +
 `┃ 📜 *Description:* ${cmd.description}\n` +
 `╰───────────────────────────────❍`;

 await sock.sendMessage(m.key.remoteJid, { text: cmdDetails });
 } catch (error) {
 await sock.sendMessage(m.key.remoteJid, { text: "❌ Failed to fetch commands. Try again later." });
 }
 },
};