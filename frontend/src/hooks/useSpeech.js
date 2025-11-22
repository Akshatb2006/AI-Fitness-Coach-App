import { useState, useCallback } from 'react';
import fitnessAPI from '../services/api';

export const useSpeech = () => {
  const [speaking, setSpeaking] = useState(null);
  const [audio, setAudio] = useState(null);

  const browserSpeak = useCallback((text, section) => {
    if (!text || text.trim() === "") return;

    // Toggle off
    if (speaking === section) {
      window.speechSynthesis.cancel();
      setSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 1;

    utter.onend = () => setSpeaking(null);
    utter.onerror = () => setSpeaking(null);

    window.speechSynthesis.speak(utter);

    setSpeaking(section);
  }, [speaking]);

  const elevenSpeak = useCallback(async (text, section) => {
    if (!text || text.trim() === "") return;

    if (speaking === section) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setSpeaking(null);
      return;
    }

    try {
      setSpeaking(section);

      const blob = await fitnessAPI.textToSpeech(text);
      const url = URL.createObjectURL(blob);

      const audioObj = new Audio(url);
      setAudio(audioObj);

      audioObj.onended = () => {
        URL.revokeObjectURL(url);
        setSpeaking(null);
      };

      audioObj.onerror = () => {
        URL.revokeObjectURL(url);
        setSpeaking(null);
      };

      await audioObj.play();

    } catch (err) {
      console.error("⚠️ ElevenLabs failed, falling back to browser TTS:", err);
      setSpeaking(null);
      browserSpeak(text, section);
    }
  }, [speaking, audio, browserSpeak]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setSpeaking(null);
  }, [audio]);

  return {
    speaking,
    speak: elevenSpeak,  
    stop
  };
};
