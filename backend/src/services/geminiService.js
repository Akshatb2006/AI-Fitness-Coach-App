const axios = require('axios');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1';
    
    this.models = [
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite',
      'gemini-2.0-flash-thinking-exp',
      'gemini-1.5-flash'
    ];
    
    this.currentModel = null;
    
    if (!this.apiKey) {
      console.error('⚠️  WARNING: GEMINI_API_KEY is not set!');
    } else {
      console.log('✅ Gemini API Key loaded (first 10 chars):', this.apiKey.substring(0, 10) + '...');
    }
  }

  async generateContent(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    for (const model of this.models) {
      try {
        const url = `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`;
        
        const response = await axios.post(url, {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 2048
          }
        }, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 60000  
        });

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
          if (!this.currentModel) {
            console.log(`✅ Using model: ${model}`);  
            this.currentModel = model;
          }
          return text;
        }
      } catch (error) {
        const msg = error.response?.data?.error?.message || error.message;
        if (!msg.includes('not found')) {
          console.error(`❌ ${model} error:`, msg.substring(0, 100));  
        }
        continue;
      }
    }

    throw new Error('All Gemini models failed');
  }

  parseJSON(text, fallback = null) {
    if (!text) return fallback;
    
    try {
      let cleaned = text
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/gi, '')
        .trim();
      
      const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch) {
        cleaned = jsonMatch[1];
      }
      
      return JSON.parse(cleaned);
    } catch (error) {
      console.log('⚠️ JSON parse failed, using fallback');
      return fallback;
    }
  }

  async listModels() {
    try {
      const url = `${this.baseUrl}/models?key=${this.apiKey}`;
      const response = await axios.get(url);
      
      console.log('\n📋 Available Gemini Models:');
      response.data.models
        ?.filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .forEach(m => {
          console.log(`   - ${m.name.replace('models/', '')}`);  
        });
      
      return response.data.models;
    } catch (error) {
      console.error('Could not list models:', error.message);
      return [];
    }
  }
}

module.exports = new GeminiService();