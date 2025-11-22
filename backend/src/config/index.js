module.exports = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-1.5-flash'
  },
  elevenLabs: {
    apiKey: process.env.ELEVENLABS_API_KEY,
    voiceId: '21m00Tcm4TlvDq8ikWAM' 
  },
  replicate: {
    apiToken: process.env.REPLICATE_API_TOKEN
  },
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  deepinfra: {
    apiKey: process.env.DEEPINFRA_KEY
  },
  hf: {
    apiKey: process.env.HF_API_KEY
  }
};