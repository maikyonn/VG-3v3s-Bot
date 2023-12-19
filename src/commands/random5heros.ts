import { HeroCollection } from "./utilities/HeroCollection";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";


const data = new SlashCommandBuilder()
    .setName('getrandom5sheroes')
    .setDescription('Suggests 5 random heroes to play')

async function execute(interaction: CommandInteraction) {
    const randomHeroes = new HeroCollection()
    randomHeroes.initRandom(5)

    console.log(randomHeroes.toString())

    await interaction.reply(`${randomHeroes.toString()}`)
}


export { data, execute }