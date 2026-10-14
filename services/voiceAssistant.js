/**
 * Voice Assistant Service for Mitra
 * Handles Text-to-Speech (TTS) and Speech-to-Text (STT) in Telugu, English, Tamil, and Kannada.
 * Checks hardware & browser support truthfully without false claims.
 */

const LANG_CODES = {
  te: "te-IN",
  en: "en-IN",
  ta: "ta-IN",
  kn: "kn-IN"
};

export class VoiceAssistantService {
  static isTtsSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  static isSttSupported() {
    return typeof window !== 'undefined' && (
      'SpeechRecognition' in window || 
      'webkitSpeechRecognition' in window
    );
  }

  static getRecognitionInstance() {
    if (!this.isSttSupported()) return null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return new SpeechRecognition();
  }

  static getAvailableVoices() {
    if (!this.isTtsSupported()) return [];
    return window.speechSynthesis.getVoices();
  }

  /**
   * Speak text in chosen regional language
   */
  static speak(text, lang = 'en', onStart = null, onEnd = null) {
    if (!this.isTtsSupported()) {
      console.warn("SpeechSynthesis not supported on this device/browser.");
      return false;
    }

    // Cancel any currently playing audio
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLangCode = LANG_CODES[lang] || 'en-IN';
    utterance.lang = targetLangCode;
    utterance.rate = 0.95; // Slightly slower, clear cadence for rural farmers
    utterance.pitch = 1.0;

    // Pick best regional voice if installed
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(targetLangCode.split('-')[0]) || v.lang === targetLangCode);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;
    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  }

  static stop() {
    if (this.isTtsSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Start speech recognition for voice queries
   */
  static listen(lang = 'en', onResult, onError, onEnd) {
    if (!this.isSttSupported()) {
      if (onError) onError(new Error("Microphone speech recognition is not supported in this browser."));
      return null;
    }

    try {
      const recognition = this.getRecognitionInstance();
      recognition.lang = LANG_CODES[lang] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      };

      recognition.onerror = (event) => {
        if (onError) onError(event);
      };

      recognition.onend = () => {
        if (onEnd) onEnd();
      };

      recognition.start();
      return recognition;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  }

  /**
   * Generate natural voice readout script for market comparison
   */
  static generateReadoutText(cropName, bestMandi, netEarnings, lang = 'en') {
    const netFormatted = Math.round(netEarnings).toLocaleString('en-IN');
    const modalPrice = Math.round(bestMandi.modalPrice).toLocaleString('en-IN');

    switch (lang) {
      case 'te':
        return `${cropName} పంటకు ${bestMandi.mandiNames.te || bestMandi.mandiName} అత్యంత అనుకూలమైన మార్కెట్. అక్కడ మోడల్ ధర క్వింటాలుకు ₹${modalPrice}. రవాణా మరియు హమాలి ఖర్చులు పోను మీ చేతికి అందే నికర లాభం సుమారు ₹${netFormatted}.`;
      case 'ta':
        return `${cropName} பயிருக்கு ${bestMandi.mandiNames.ta || bestMandi.mandiName} சிறந்த பரிந்துரைக்கப்பட்ட சந்தை. மாதிரி விலை குவிண்டாலுக்கு ₹${modalPrice}. போக்குவரத்து செலவுகள் கழித்து உங்கள் நிகர வருமானம் ₹${netFormatted}.`;
      case 'kn':
        return `${cropName} ಬೆಳೆಗೆ ${bestMandi.mandiNames.kn || bestMandi.mandiName} ಅತ್ಯುತ್ತಮ ಶಿಫಾರಸು ಮಾಡಿದ ಮಾರುಕಟ್ಟೆ. ಅಲ್ಲಿನ ಮಾದರಿ ದರ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹${modalPrice}. ಸಾರಿಗೆ ವೆಚ್ಚ ಕಳೆದು ನಿಮ್ಮ ನಿವ್ವಳ ಲಾಭ ₹${netFormatted}.`;
      default:
        return `For ${cropName}, ${bestMandi.mandiName} is the recommended market. The modal price is ₹${modalPrice} per quintal. After deducting estimated transport and mandi expenses, your estimated net earnings will be ₹${netFormatted}.`;
    }
  }
}
