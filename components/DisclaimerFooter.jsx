import React from 'react';
import { ShieldCheck, Heart, ExternalLink, HelpCircle } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function DisclaimerFooter({ lang, onOpenDataModal }) {
  const t = translations[lang] || translations.en;

  return (
    <footer className="mt-12 border-t border-farmer-200 bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Statutory Agricultural Warning Box */}
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-black text-slate-900 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-farmer-600" />
            <span>Statutory Farmer Advisory & Calculation Notice</span>
          </div>
          <p className="text-slate-600">
            {t.statutoryDisclaimer}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
            <span>• Net Earnings Formula: <code>Quantity × Modal Price − Transportation − Other Expenses</code></span>
            <span>• Price Source: Agmarknet & e-NAM (Ministry of Agriculture, GoI)</span>
            <button 
              onClick={onOpenDataModal}
              className="text-farmer-700 underline font-semibold hover:text-farmer-900"
            >
              Verify Data Sources
            </button>
          </div>
        </div>

        {/* Brand & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Mitra – Smart Market Price Assistant</span>
            <span>• Supporting farmers in Telugu, Tamil, Kannada & English</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://agmarknet.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-farmer-700 flex items-center gap-1 transition-colors"
            >
              <span>Agmarknet Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://enam.gov.in" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-farmer-700 flex items-center gap-1 transition-colors"
            >
              <span>e-NAM National Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
