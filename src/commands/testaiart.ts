import axios from "axios";
import { getRandomInt } from "./utilities/random";
const FormData = require('form-data');
axios.defaults.headers.common["Accept-Encoding"] = "gzip";


const path = require('node:path');
const fs = require('node:fs');

console.log(import.meta.dir)
const imageFolderPath = path.join(import.meta.dir, '../../assets/vgart');
const imageFolderContents: string[] = fs.readdirSync(imageFolderPath);
const fullImageFilePaths: string[] = [];

for (const imageFile of imageFolderContents) {
    const fullImagePath = path.join(imageFolderPath, imageFile)
    fullImageFilePaths.push(fullImagePath)
}

const randomImage = fullImageFilePaths[getRandomInt(fullImageFilePaths.length)];

const filePath = randomImage;
const fileStream = fs.createReadStream(filePath);

// Step 2: Create FormData and append the file
const formData = new FormData();
formData.append("access_token", "d55da0e8f8ce4d389dfc62847ccca356");
formData.append("model_id", "woErXml");
formData.append("prompt", "anime, witch girl, kawaii, magic, 1girl");
formData.append("init_image_file", fileStream);
formData.append("num_images", "1");
formData.append("image_strength", "0.5");

// Step 3: Send POST request
try {
    const response = await axios.post('https://sinkin.ai/api/inference', formData, {
        headers: {
            ...formData.getHeaders(),
        },
    });
    console.log('File uploaded successfully', response.data);
} catch (error) {
    console.error('Error uploading file', error);
}