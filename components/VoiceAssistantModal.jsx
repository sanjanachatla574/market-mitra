import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  Square, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  VolumeX,
  Play
} from 'lucide-react';
import { translations } from '../i18n/translations';
import { VoiceAssistantService } from '../services/voiceAssistant';

export default function VoiceAssistantModal({
  isOpen,
  onClose,
  lang,
  bestMandi,
  netEarnings,
  cropName
}) {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [ttsSupported, setTtsSupported] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  const [spokenMessage, setSpokenMessage] = useState('');

  useEffect(() => {
    setTtsSupported(VoiceAssistantService.isTtsSupported());
    setSttSupported(VoiceAssistantService.isSttSupported());

    // Generate natural script
    if (bestMandi) {
      const script = VoiceAssistantService.generateReadoutText(cropName, bestMandi, netEarnings, lang);
      setSpokenMessage(script);
    }

    return () => {
      VoiceAssistantService.stop();
    };
  }, [lang, bestMandi, netEarnings, cropName]);

  const handleSpeak = (textToSpeak) => {
    const text = textToSpeak || spokenMessage;
    setIsSpeaking(true);
    VoiceAssistantService.speak(
      text,
      lang,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleStopSpeaking = () => {
    VoiceAssistantService.stop();
    setIsSpeaking(false);
  };

  const handleStartListening = () => {
    if (!sttSupported) return;
    setIsListening(true);
    setTranscript('Listening... Speak now.');

    VoiceAssistantService.listen(
      lang,
      (text) => {
        setTranscript(text);
        setIsListening(false);
        // Process natural voice query
        handleVoiceQuery(text);
      },
      (err) => {
        setTranscript(`Could not hear clearly: ${err.error || 'Please try again.'}`);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleVoiceQuery = (query) => {
    const qLower = query.toLowerCase();
    let reply = "";
    if (qLower.includes("price") || qLower.includes("ధర") || qLower.includes("விலை") || qLower.includes("ಬೆಲೆ")) {
      reply = `${cropName} modal price at ${bestMandi.mandiName} is ₹${bestMandi.modalPrice} per quintal.`;
    } else if (qLower.includes("profit") || qLower.includes("లాభం") || qLower.includes("வருமானம்") || qLower.includes("ಆದಾಯ")) {
      reply = `Your estimated net earnings after transport are ₹${Math.round(netEarnings).toLocaleString('en-IN')}.`;
    } else {
      reply = `I heard: "${query}". Mitra recommends selling at ${bestMandi.mandiName} for best net returns.`;
    }
    handleSpeak(reply);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-farmer-200 relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            handleStopSpeaking();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-farmer-100 text-farmer-800 flex items-center justify-center">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-farmer-950">
              {t.voiceAssistant}
            </h3>
            <p className="text-xs text-slate-500">
              Voice navigation and market advisory in your regional language
            </p>
          </div>
        </div>

        {/* Hardware & Browser Support Truth Status */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Text-to-Speech (TTS):</span>
            <span className={`font-bold flex items-center gap-1 ${ttsSupported ? 'text-emerald-700' : 'text-rose-600'}`}>
              {ttsSupported ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {ttsSupported ? "Supported on this device" : "Not supported in browser"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600 font-medium">Speech-to-Text (Microphone):</span>
            <span className={`font-bold flex items-center gap-1 ${sttSupported ? 'text-emerald-700' : 'text-amber-700'}`}>
              {sttSupported ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {sttSupported ? "Microphone active & ready" : "Microphone not available"}
            </span>
          </div>
        </div>

        {/* Main Spoken Text Card */}
        <div className="mt-4 p-4 rounded-2xl bg-farmer-50/70 border border-farmer-200">
          <span className="text-[11px] font-bold text-farmer-800 uppercase tracking-wider block mb-1">
            Current Spoken Script ({lang.toUpperCase()}):
          </span>
          <p className="text-xs sm:text-sm text-farmer-950 font-medium leading-relaxed">
            "{spokenMessage}"
          </p>
        </div>

        {/* Voice Playback Controls */}
        <div className="mt-5 flex items-center gap-3">
          {isSpeaking ? (
            <button
              onClick={handleStopSpeaking}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>{t.stopSpeaking}</span>
            </button>
          ) : (
            <button
              onClick={() => handleSpeak()}
              disabled={!ttsSupported}
              className="flex-1 py-3 px-4 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-farmer-600/20 disabled:opacity-50 transition-all touch-target"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t.readAloud}</span>
            </button>
          )}

          {/* Microphone Query Button */}
          <button
            onClick={isListening ? () => setIsListening(false) : handleStartListening}
            disabled={!sttSupported}
            className={`p-3 rounded-xl border flex items-center justify-center transition-all touch-target ${
              isListening
                ? 'bg-rose-100 border-rose-400 text-rose-700 animate-pulse'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50'
            }`}
            title="Speak a voice command"
          >
            {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
        </div>

        {/* Speech Recognition Results */}
        {transcript && (
          <div className="mt-3 p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800">
            <strong>Voice Input:</strong> {transcript}
          </div>
        )}

        {/* Preset Voice Questions for Farmers */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Quick Voice Queries:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { label: "🔊 Read Highest Profit", text: spokenMessage },
              { label: "🍅 Today's Tomato Price", text: `Today's Tomato modal rate in nearby APMC yards is ₹${bestMandi?.modalPrice} per quintal.` },
              { label: "🤝 Check Local Trader Offer", text: `Your local buyer comparison shows you earn more by visiting ${bestMandi?.mandiName}.` }
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSpeak(preset.text)}
                className="text-left p-2.5 rounded-xl bg-slate-50 hover:bg-farmer-50 border border-slate-200 hover:border-farmer-300 text-xs text-slate-800 font-semibold transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
