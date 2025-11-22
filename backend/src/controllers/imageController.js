const axios = require("axios");

class ImageController {
  constructor() {
    this.generateImage = this.generateImage.bind(this);
  }

  async generateImage(req, res) {
    try {
      const { prompt, type } = req.body;

      if (!prompt) {
        return res.status(400).json({
          success: false,
          error: "Prompt is required",
        });
      }

      const API_KEY = process.env.DEEPINFRA_KEY;

      if (!API_KEY) {
        console.log("⚠️ DEEPINFRA_KEY missing → using Pollinations fallback");
        return this.usePollinationsAI(req, res);
      }

      console.log(`🎨 DeepInfra: generating: "${prompt}" (${type})`);

      const enhancedPrompt =
        type === "exercise"
          ? `professional fitness photo of "${prompt}" exercise, proper form, gym background, realistic, high-detail`
          : `professional food photograph of "${prompt}", appetizing, healthy, studio lighting, 4k`;

      const imageUrl = await this.generateWithDeepInfra(enhancedPrompt, API_KEY);

      if (imageUrl) {
        return res.json({
          success: true,
          data: {
            imageUrl,
            prompt,
            type,
            source: "deepinfra",
          },
        });
      }

      console.log("⚠️ DeepInfra failed → using Pollinations fallback");
      return this.usePollinationsAI(req, res);
    } catch (error) {
      console.log("❌ Image Error:", error.message);
      return this.usePollinationsAI(req, res);
    }
  }

  async generateWithDeepInfra(prompt, apiKey) {
    const models = [
      "black-forest-labs/FLUX.1-schnell",
      "stabilityai/sdxl",
      "playgroundai/playground-v2.5",
    ];

    for (const model of models) {
      try {
        console.log(`🚀 Trying DeepInfra model: ${model}`);

        const response = await axios.post(
          `https://api.deepinfra.com/v1/inference/${model}:predict`,
          { prompt },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            timeout: 60000,
          }
        );

        const image = response.data?.images?.[0];

        if (image) {
          console.log(`✅ Success with model: ${model}`);
          return image; 
        }
      } catch (err) {
        console.log(
          `❌ ${model} failed:`,
          err.response?.status || err.message
        );
      }
    }

    return null;
  }


  usePollinationsAI(req, res) {
    const { prompt, type } = req.body;

    console.log("🌸 Pollinations fallback");

    const seed = (prompt || "default")
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);

    const finalPrompt =
      type === "exercise"
        ? `professional fitness photography of ${prompt}, gym background, high-quality`
        : `professional food photography of ${prompt}, healthy, appetizing`;

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      finalPrompt
    )}?width=512&height=384&seed=${seed}&nologo=true`;

    res.json({
      success: true,
      data: {
        imageUrl,
        prompt,
        type,
        source: "pollinations",
      },
    });
  }


  fallbackToUnsplash(req, res) {
    const { prompt, type } = req.body;
    console.log("📷 Unsplash fallback");

    const seed = (prompt || "default")
      .split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);

    const keywords =
      type === "exercise" ? "fitness workout gym" : "healthy food meal";

    const imageUrl = `https://source.unsplash.com/400x300/?${encodeURIComponent(
      keywords
    )}&sig=${seed}`;

    res.json({
      success: true,
      data: {
        imageUrl,
        prompt,
        type,
        source: "unsplash",
      },
    });
  }
}

module.exports = new ImageController();
