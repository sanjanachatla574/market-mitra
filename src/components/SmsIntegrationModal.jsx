import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  KeyRound,
  Copy,
  Check
} from 'lucide-react';
import { translations } from '../i18n/translations';
import { SmsService } from '../services/smsService';

export default function SmsIntegrationModal({
  isOpen,
  onClose,
  lang,
  cropName
}) {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;
  const providerStatus = SmsService.getProviderStatus();

  const [inputMessage, setInputMessage] = useState(`PRICE ${cropName?.toUpperCase() || 'TOMATO'}`);
  const [chatLog, setChatLog] = useState([
    {
      sender: 'system',
      text: "Welcome to Mitra SMS Gateway. Farmers can query market rates without smartphones or internet.",
      time: "10:00 AM"
    },
    {
      sender: 'user',
      text: "PRICE TOMATO",
      time: "10:01 AM"
    },
    {
      sender: 'mitra',
      text: "MITRA [14 Oct]: TOMATO Modal Prices:\n1. Bowenpally: ₹1,850/qtl (68km)\n2. Warangal: ₹1,780/qtl (92km)\nSource: Agmarknet (Sample). Reply OFFER TOMATO <PRICE> for advice.",
      time: "10:01 AM"
    }
  ]);

  const [copiedKey, setCopiedKey] = useState(false);

  const handleSend = (textToSend) => {
    const message = textToSend || inputMessage;
    if (!message.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsg = {
      sender: 'user',
      text: message,
      time: timeNow
    };

    // Process via SMS engine
    const replyText = SmsService.processIncomingSms(message, lang);
    const replyMsg = {
      sender: 'mitra',
      text: replyText,
      time: timeNow
    };

    setChatLog(prev => [...prev, userMsg, replyMsg]);
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-farmer-200 relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {t.smsAssistant}
            </h3>
            <p className="text-xs text-slate-500">
              SMS queries for farmers with basic 2G / keypad feature phones
            </p>
          </div>
        </div>

        {/* Provider Connection Status - Truthful check */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">SMS Gateway:</span>
            <span className={`inline-flex items-center gap-1 font-bold ${
              providerStatus.isConfigured ? 'text-emerald-700' : 'text-amber-800'
            }`}>
              {providerStatus.isConfigured ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {providerStatus.statusText}
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            {providerStatus.reason}
          </span>
        </div>

        {/* Interactive Simulated Phone Screen */}
        <div className="mt-4 flex-1 overflow-hidden flex flex-col rounded-2xl border-2 border-slate-300 bg-slate-900 text-white shadow-inner">
          {/* Phone Top Notch */}
          <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-bold text-slate-200">📱 BSNL / Jio 4G (Feature Phone)</span>
            <span>SMS to: <strong>57575</strong></span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs max-h-64">
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-farmer-600 text-white rounded-br-none'
                      : msg.sender === 'system'
                      ? 'bg-slate-800 text-slate-300 border border-slate-700'
                      : 'bg-slate-800 text-amber-300 border border-slate-700 rounded-bl-none font-bold'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-0.5 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* SMS Input Box */}
          <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. PRICE ONION or OFFER COTTON 7200"
              className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-farmer-500"
            />
            <button
              onClick={() => handleSend()}
              className="px-4 py-2 bg-farmer-600 hover:bg-farmer-700 text-white rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Quick command buttons */}
        <div className="mt-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Sample SMS Commands (Click to Test):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              `PRICE ${cropName?.toUpperCase() || 'TOMATO'}`,
              `PRICE ONION HYDERABAD`,
              `OFFER ${cropName?.toUpperCase() || 'COTTON'} 7200`,
              `HELP`
            ].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleSend(cmd)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-farmer-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
