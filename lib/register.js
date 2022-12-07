import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";

dotenv.config();

const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

const url = `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/guilds/${DISCORD_GUILD_ID}/commands`;

(async () => {})();
// List all community's application commands
const dirPath = new URL("../commands", import.meta.url);
const dir = fs.readdirSync(dirPath);
const commands = [];

// Import all community's application commands
for (let i = 0; i < dir.length; i++) {
  const file = dir[i];
  console.log(file);

  const fileContent = await import(`../commands/${file}`);

  commands.push(fileContent.command);
}

// Bulk overwrite guild application commands
await axios.put(url, commands, {
  headers: {
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
  },
});
