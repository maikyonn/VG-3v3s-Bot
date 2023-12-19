import { REST, Routes } from "discord.js";
import { clientId, guildId, token } from "../config.json"
const path = require('node:path');
const fs = require('node:fs');

const commands: JSON[] = []
const commandsFolderPath = path.join(import.meta.dir, 'commands');

const commandsFolderContents: string[] = fs.readdirSync(commandsFolderPath);
const commandsFiles: string[] = commandsFolderContents.filter(file => file.endsWith('.ts'))

for (const file of commandsFiles) {
    const commandPath: string = path.join(commandsFolderPath, file)
    await import(commandPath).then(command => {
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${commandPath} is missing a required "data" or "execute" property.`);
        }
    }).catch(error => {
        console.error(`Error importing command from ${commandPath}:`, error);
    });
}
// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data: any = await rest.put(Routes.applicationCommands(clientId), { body: commands })


        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();