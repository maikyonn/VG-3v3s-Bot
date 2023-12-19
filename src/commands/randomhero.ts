
import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { HeroCollection } from "./utilities/HeroCollection";


const data = new SlashCommandBuilder()
    .setName('getrandomhero')
    .setDescription('Suggests 1 random hero to play')
    
async function execute(interaction: CommandInteraction) {
    await interaction.reply(`You should play ${HeroCollection.randomHero()}.`)
}


export {data, execute}