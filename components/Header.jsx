import React from 'react';
import { 
  Sprout, 
  Languages, 
  Volume2, 
  MessageSquare, 
  Database, 
  Share2, 
  CheckCircle2, 
  AlertTriangle,
  Radio
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Header({
  lang,
  setLang,
  activeTab,
  setActiveTab,
  isLiveApi,
  onOpenVoiceModal,
  onOpenSmsModal,
  onOpenDataModal,
  onShareSummary
}) {
  const t = translations[lang] || translations.en;

  const languages = [
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-farmer-200 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-farmer-800 via-farmer-700 to-farmer-900 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-harvest-400 text-farmer-950">
              🌾 {t.farmerBadge}
            </span>
            <span className="hidden sm:inline text-farmer-100">
              {t.appTagline}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live vs Demo Badge */}
            <button 
              onClick={onOpenDataModal}
              title="Click to inspect official data sources and freshness"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                isLiveApi 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : 'bg-amber-400 text-slate-900 hover:bg-amber-300'
              }`}
            >
              {isLiveApi ? (
                <>
                  <Radio className="w-3 h-3 animate-pulse text-white" />
                  <span>{t.liveDataBadge}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-950" />
                  <span>{t.sampleDataWarning}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-farmer-900/80 rounded-lg p-0.5 border border-farmer-600">
              <Languages className="w-3.5 h-3.5 ml-2 text-farmer-300" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-white text-xs font-medium py-1 px-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-harvest-400 cursor-pointer"
                aria-label="Select Language"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-farmer-900 text-white">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-farmer-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-farmer-500/20">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-farmer-950">
                  {t.appName}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-md bg-farmer-100 text-farmer-800 font-semibold border border-farmer-200">
                  v1.0 MVP
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Quick Action Icons (Visible on mobile top-right) */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onOpenVoiceModal}
              className="p-2.5 rounded-xl bg-farmer-100 text-farmer-800 hover:bg-farmer-200"
              title={t.voiceAssistant}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenSmsModal}
              className="p-2.5 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200"
              title={t.smsAssistant}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenVoiceModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-farmer-50 text-farmer-800 border border-farmer-200 hover:bg-farmer-100 font-semibold text-sm transition-all"
          >
            <Volume2 className="w-4 h-4 text-farmer-600" />
            <span>{t.voiceAssistant}</span>
          </button>

          <button
            onClick={onOpenSmsModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 font-semibold text-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <span>{t.smsAssistant}</span>
          </button>

          <button
            onClick={onShareSummary}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-sm shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.printReport}</span>
          </button>
        </div>
      </div>

      {/* Primary Mobile-first Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none border-t border-slate-100 text-sm font-semibold">
          {[
            { id: 'prices', label: t.tabMarketPrices, icon: '🏛️' },
            { id: 'calculator', label: t.tabNetCalculator, icon: '🧮' },
            { id: 'offer', label: t.tabBuyerOffer, icon: '🤝' },
            { id: 'trends', label: t.tabHistoricalTrends, icon: '📈' },
            { id: 'sms', label: t.tabSmsService, icon: '📱' },
            { id: 'transparency', label: t.tabDataSource, icon: '🛡️' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg whitespace-nowrap transition-all touch-target text-xs sm:text-sm ${
                  isActive
                    ? 'bg-farmer-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
