const elevenLabsService = require('../services/elevenLabsService');

class SpeechController {
  async textToSpeech(req, res, next) {
    try {
      const { text, voiceSettings } = req.body;

      if (!text) {
        return res.status(400).json({ 
          success: false, 
          error: 'Text is required' 
        });
      }

      const audioBuffer = await elevenLabsService.textToSpeech(text, voiceSettings);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length
      });
      res.send(audioBuffer);
    } catch (error) {
      next(error);
    }
  }

  async getVoices(req, res, next) {
    try {
      const voices = await elevenLabsService.getVoices();
      res.json({ success: true, data: voices });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SpeechController();