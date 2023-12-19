import { CommandInteraction, SlashCommandBuilder } from "discord.js";


const data = new SlashCommandBuilder()
    .setName('getbadlist')
    .setDescription('Displays list of the worst players in the vainglory')

async function execute(interaction: CommandInteraction) {
    const response = await fetch("localhost:3000/badlist")
    const html = await response.text(); // HTML string

    await interaction.reply(`${html}`)
}


export { data, execute }