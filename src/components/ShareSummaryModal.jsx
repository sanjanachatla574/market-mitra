import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  X, 
  Send, 
  Printer, 
  ExternalLink 
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function ShareSummaryModal({
  isOpen,
  onClose,
  lang,
  cropName,
  quantity,
  unit,
  bestMandi,
  netEarnings,
  isLiveApi
}) {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const generateReportText = () => {
    const netFormatted = Math.round(netEarnings).toLocaleString('en-IN');
    const modalFormatted = Math.round(bestMandi?.modalPrice || 0).toLocaleString('en-IN');
    const transportFormatted = Math.round(bestMandi?.transportCost || 0).toLocaleString('en-IN');
    const otherFormatted = Math.round(bestMandi?.otherExpenses || 0).toLocaleString('en-IN');

    const sourceTag = isLiveApi ? "VERIFIED LIVE DATA" : "SAMPLE DATA — NOT LIVE";

    return `🌾 *MITRA – SMART MARKET ADVISORY REPORT* 🌾
📅 Date: ${formattedDate}
📊 Status: [${sourceTag}]

🌱 *Crop Details:*
• Crop: ${cropName}
• Harvest Volume: ${quantity} ${unit}
• Quality Grade: Grade A (FAQ)

🏛️ *Recommended Market:*
• Mandi: ${bestMandi?.mandiNames?.[lang] || bestMandi?.mandiName} (${bestMandi?.district}, ${bestMandi?.state})
• Distance: ${bestMandi?.distanceKm} km
• Modal Market Price: ₹${modalFormatted} / quintal
• Price Range: ₹${bestMandi?.minPrice} - ₹${bestMandi?.maxPrice}

💰 *Estimated Farmer Economics:*
• Gross Harvest Value: ₹${(bestMandi?.grossVal || 0).toLocaleString('en-IN')}
• Transport & Fuel: −₹${transportFormatted}
• Mandi Hamali & Cess: −₹${otherFormatted}
━━━━━━━━━━━━━━━━━━
✨ *Net Earnings In Pocket: ₹${netFormatted}*
✨ *Effective Rate: ₹${bestMandi?.effectiveRate} / quintal*
━━━━━━━━━━━━━━━━━━
⚠️ *Farmer Notice:* Calculation is advisory. Actual prices depend on physical quality inspection & spot auction bids. Mitra never guarantees future prices.
Powered by Mitra Farmer Assistant`;
  };

  const reportText = generateReportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(reportText)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-farmer-200 relative max-h-[90vh] flex flex-col">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {t.printReport}
            </h3>
            <p className="text-xs text-slate-500">
              Share clear market advice with family or transport drivers
            </p>
          </div>
        </div>

        {/* Text Preview Area */}
        <div className="mt-4 flex-1 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-800">
          {reportText}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={handleWhatsApp}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all touch-target"
          >
            <Send className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all touch-target"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Report Text"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
