import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { clientId, guildId, token } from "./config.json"
const path = require('node:path');
const fs = require('node:fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = new Collection();
const commandsFolderPath = path.join(import.meta.dir, 'commands');
const commandsFolderContents: string[] = fs.readdirSync(commandsFolderPath);
const commandsFiles: string[] = commandsFolderContents.filter(file => file.endsWith('.ts'))

for (const file of commandsFiles) {
    const commandPath: string = path.join(commandsFolderPath, file)
    await import(commandPath).then(command => {
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`);
        }
    })
}

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command: any = commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.login(token);