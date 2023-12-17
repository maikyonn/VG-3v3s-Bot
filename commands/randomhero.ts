import { randomHero } from "./utilities/random";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";


const data = new SlashCommandBuilder()
    .setName('getrandomhero')
    .setDescription('Suggests 1 random hero to play')
    
async function execute(interaction: CommandInteraction) {
    await interaction.reply(`You should play ${randomHero()}.`)
}


export {data, execute}