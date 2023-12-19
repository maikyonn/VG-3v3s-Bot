import { HeroCollection } from "./utilities/HeroCollection";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";


const data = new SlashCommandBuilder()
    .setName('getrandom3sheroes')
    .setDescription('Suggests 3 random heroes to play')

async function execute(interaction: CommandInteraction) {
    const randomHeroes = new HeroCollection()
    randomHeroes.initRandom(3)

    console.log(randomHeroes.toString())

    await interaction.reply(`${randomHeroes.toString()}`)
}


export { data, execute }