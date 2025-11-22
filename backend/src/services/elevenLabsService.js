const axios = require('axios');
const config = require('../config');

class ElevenLabsService {
  constructor() {
    this.apiKey = config.elevenLabs.apiKey;
    this.voiceId = "EXAVITQu4vr4xnSDxMaL";
    this.baseUrl = 'https://api.elevenlabs.io/v1';
  }

  async textToSpeech(text, voiceSettings = {}) {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/text-to-speech/${this.voiceId}`,
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        data: {
          text,
          model_id: 'eleven_turbo_v2',
          voice_settings: {
            stability: voiceSettings.stability || 0.5,
            similarity_boost: voiceSettings.similarityBoost || 0.75
          }
        },
        responseType: 'arraybuffer'
      });

      return Buffer.from(response.data);
    } catch (error) {
      console.error('ElevenLabs API Error:', error);
      throw new Error(`Text-to-speech failed: ${error.message}`);
    }
  }

  async getVoices() {
    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: { 'xi-api-key': this.apiKey }
      });
      return response.data.voices;
    } catch (error) {
      throw new Error(`Failed to fetch voices: ${error.message}`);
    }
  }
}

module.exports = new ElevenLabsService();
