import { randomHero } from "./utilities/random";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";


const data = new SlashCommandBuilder()
    .setName('getrandom3sheroes')
    .setDescription('Suggests 3 random heroes to play')

async function execute(interaction: CommandInteraction) {
    await interaction.reply(`${randomHero()}\n${randomHero()}\n${randomHero()}\n`)
}


export { data, execute }