import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("generateaiart")
    .setDescription("(BROKEN) Generates AI art")
    .addStringOption((option) =>
        option.setName("username").setDescription("Enter the player name")
    );

async function execute(interaction: ChatInputCommandInteraction) {
    var formdata = new FormData();
    formdata.append("access_token", "d55da0e8f8ce4d389dfc62847ccca356");
    formdata.append("model_id", "woErXml");
    formdata.append("prompt", "anime, witch girl, kawaii, magic, 1girl");

    var requestOptions: RequestInit = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };
    console.log(requestOptions)

    await interaction.reply("Working on it");

    const result = await fetch(
        "https://sinkin.ai/api/inference",
        requestOptions
    )
        .then((response) => response.json())
        .then((result: any) => {
            console.log(result.images);
        })
        .catch((error) => console.log("error", error));

    await interaction.followUp(
        `sorry master :( i can't do much yet`
    );
}

export { data, execute };
