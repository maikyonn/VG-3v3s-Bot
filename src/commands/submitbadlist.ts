import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";


const data = new SlashCommandBuilder()
    .setName('badlist')
    .setDescription('Enters a player into the badlist')
    .addStringOption(option =>
        option.setName('username')
            .setDescription('Enter the player name'))
    .addIntegerOption(option =>
        option.setName('rating')
            .setDescription('Enter the rating (1-10)'))
    .addStringOption(option =>
        option.setName('kdratio')
            .setDescription('Enter a Kill/Death Ratio (10/2)'))

async function execute(interaction: ChatInputCommandInteraction) {

    var formdata = new FormData();
    formdata.append("username", interaction.options.getString('username') as string | Blob);
    formdata.append("rating", interaction.options.getInteger('rating')?.toString() as string | Blob);
    formdata.append("kdratio", interaction.options.getString('kdratio') as string | Blob);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    console.log(requestOptions.body)

    const response = await fetch("localhost:3000/badlist", requestOptions as RequestInit)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            interaction.reply(`${result} has been added to the badlist.`)
        }
        )
        .catch(error => console.log('error', error));

}

export { data, execute }