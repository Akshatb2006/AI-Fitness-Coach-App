const axios = require("axios");
const config = require("../config");

class ImageService {
  constructor() {
    this.deepinfraKey = config.deepinfra.apiToken; 
  }

  async generateImage(prompt, type = "exercise") {
    try {
      const enhancedPrompt =
        type === "exercise"
          ? `professional fitness photo of a person doing "${prompt}" exercise, gym setting, proper form, realistic, high detail, 4k`
          : `professional food photography of "${prompt}", healthy, appetizing, soft lighting, high quality, 4k`;

      const imageUrl = await this.generateWithDeepInfra(enhancedPrompt);

      if (!imageUrl) {
        console.log("⚠️ DeepInfra failed → using Pollinations fallback");
        return this.pollinationsFallback(prompt, type);
      }

      return imageUrl;
    } catch (error) {
      console.error("❌ Image Generation Error:", error);
      return this.pollinationsFallback(prompt, type);
    }
  }

  async generateWithDeepInfra(prompt) {
    try {
      if (!this.deepinfraKey) {
        console.log("⚠️ No DEEPINFRA API KEY → fallback");
        return null;
      }

      console.log("🚀 Generating with DeepInfra SDXL...");

      const response = await axios.post(
        "https://api.deepinfra.com/v1/inference/stabilityai/stable-diffusion-xl-base-1.0",
        {
          prompt,
          negative_prompt:
            "blurry, distorted, low quality, watermark, text, bad anatomy",
          width: 1024,
          height: 768,
          guidance_scale: 7.5,
          num_inference_steps: 30,
        },
        {
          headers: {
            Authorization: `Bearer ${this.deepinfraKey}`,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        }
      );

      const base64 = response.data?.output?.[0];
      if (!base64) return null;

      return `data:image/png;base64,${base64}`;
    } catch (err) {
      console.log("❌ DeepInfra error:", err.message);
      return null;
    }
  }

  pollinationsFallback(prompt, type) {
    console.log("🌸 Using Pollinations fallback");

    const seed = prompt
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const enhanced =
      type === "exercise"
        ? `professional fitness photo, ${prompt}, gym environment, high quality`
        : `professional food photo, ${prompt}, healthy, appetizing`;

    return `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhanced
    )}?seed=${seed}&width=512&height=384&nologo=true`;
  }
}

module.exports = new ImageService();
