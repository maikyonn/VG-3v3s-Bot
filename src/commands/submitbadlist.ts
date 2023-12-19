import {
    ChatInputCommandInteraction,
    CommandInteraction,
    SlashCommandBuilder,
} from "discord.js";
import type { App } from "../server-elysia";
import { edenFetch, edenTreaty } from "@elysiajs/eden";

const data = new SlashCommandBuilder()
    .setName("badlist")
    .setDescription("Enters a player into the badlist")
    .addStringOption((option) =>
        option.setName("username").setDescription("Enter the player name")
    )
    .addIntegerOption((option) =>
        option.setName("rating").setDescription("Enter the rating (1-10)")
    )
    .addStringOption((option) =>
        option
            .setName("kdratio")
            .setDescription("Enter a Kill/Death Ratio (10/2)")
    );

async function execute(interaction: ChatInputCommandInteraction) {
    const fetch = edenFetch<App>("localhost:3000");

    const body = {
        username: interaction.options.getString("username") as string,
        rating: interaction.options.getInteger("rating") as number,
        kdratio: interaction.options.getString("kdratio") as string,
    }
    console.log(body)
    
    const response = await fetch("/badlist", {
        method: "POST",
        body: body,
    }).then((result) => {
        interaction.reply(`${result.data?.username} has been added to the badlist.`);
    });
}

export { data, execute };
