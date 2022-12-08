const { response } = require("express");
const { Configuration, OpenAIApi } = require("openai");
// ----------------------------------------------------------------------
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// ----------------------------------------------------------------------
// Response:
const generateImage = async (req, res) => {
    const { prompt, size } = req.body;
    const imgSize = size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
    // ----------------------------------------------------------------------
    try {
        // Create Image:
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: imgSize
        });
        // Image Url:
        const imgUrl = response.data.data[0].url;
        // Response:
        res.status(200).json({
            success: true,
            data: imgUrl,
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        // Error Response:
        res.status(400).json({
            success: false,
            error: "Image is not generated"
        });
    }
};

// ----------------------------------------------------------------------
// Export:
module.exports = { generateImage }; 