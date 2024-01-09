import { HeroCollection } from "./utilities/HeroCollection";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("getrandom3sheroes")
    .setDescription("Suggests 3 random heroes to play")
    .addStringOption((option) =>
        option
            .setName("bans")
            .setDescription(
                "Enter a list of heroes(case-sensitive) separated by commas to remove from the pool"
            )
    );

async function execute(interaction: CommandInteraction) {
    const randomHeroes = new HeroCollection();
    const bans = interaction.options.get("bans")
        ? interaction.options.get("bans")?.value
        : "";
    const bannedHeroes: Set<string> = new Set();
    if (bans && typeof bans === "string" && bans.length) {
        for (const bannedHero in bans.split(",")) {
            bannedHeroes.add(bannedHero.trim());
        }
    }

    randomHeroes.initRandom(3, bannedHeroes);

    console.log(randomHeroes.toString());

    await interaction.reply(`${randomHeroes.toString()}`);
}

export { data, execute };