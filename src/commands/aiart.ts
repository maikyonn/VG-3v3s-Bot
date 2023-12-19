import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import axios from "axios";
import { getRandomInt } from "./utilities/random";
const FormData = require("form-data");
axios.defaults.headers.common["Accept-Encoding"] = "gzip";
const path = require("node:path");
const fs = require("node:fs");

const data = new SlashCommandBuilder()
    .setName("generateaiart")
    .setDescription("Generates AI art")

async function execute(interaction: ChatInputCommandInteraction) {
    const imageFolderPath = path.join(import.meta.dir, "../../assets/vgart");
    const imageFolderContents: string[] = fs.readdirSync(imageFolderPath);
    const fullImageFilePaths: string[] = [];

    for (const imageFile of imageFolderContents) {
        const fullImagePath = path.join(imageFolderPath, imageFile);
        fullImageFilePaths.push(fullImagePath);
    }

    const randomImage =
        fullImageFilePaths[getRandomInt(fullImageFilePaths.length)];

    const filePath = randomImage;
    const fileStream = fs.createReadStream(filePath);
    
    // Step 2: Create FormData and append the file
    const formData = new FormData();
    formData.append("access_token", "d55da0e8f8ce4d389dfc62847ccca356");
    formData.append("model_id", "woErXml");
    formData.append("prompt", "anime, splash art, masterpiece, best quality, extremely detailed CG unity 8k wallpaper");
    formData.append("init_image_file", fileStream);
    formData.append("num_images", "1");
    formData.append("image_strength", "0.5");
    formData.append("steps", "20");
    formData.append("scale", "5");


    await interaction.reply("Working on it");

    // Step 3: Send POST request
    try {
        const response = await axios
            .post("https://sinkin.ai/api/inference", formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            })
            .then(async (response) => {
                console.log("Image Created Successfully", response.data);
                await interaction.followUp(`${response.data.images[0]}`);

                // const formdata2 = new FormData();
                // formdata2.append(
                //     "access_token",
                //     "d55da0e8f8ce4d389dfc62847ccca356"
                // );
                // formdata2.append("inf_id", response.data.inf_id);
                // formdata2.append("url", response.data.images[0]);
                // formdata2.append("type", "esrgan");
                // formdata2.append("strength", "0.4");

                // const response2 = await axios
                //     .post("https://sinkin.ai/api/upscale", formdata2, {
                //         headers: {
                //             ...formdata2.getHeaders(),
                //         },
                //     }).then(async response => {
                //         console.log(response.data)
                //          await interaction.followUp(`${response.data.output}`);
                //     })
            });
    } catch (error) {
        console.error("Error uploading file", error);
    }

}

export { data, execute };
