import React from 'react';
import { AlertTriangle, Info, CheckCircle2, KeyRound } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function DemoNoticeBanner({
  lang,
  isLiveApi,
  onOpenDataModal
}) {
  const t = translations[lang] || translations.en;

  if (isLiveApi) {
    return (
      <div className="bg-emerald-50 border-y border-emerald-200 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{t.liveDataBadge}:</span>
            <span>{t.liveDataNotice}</span>
          </div>
          <button 
            onClick={onOpenDataModal}
            className="text-emerald-700 underline hover:text-emerald-900 font-semibold shrink-0"
          >
            Inspect API
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-y border-amber-300 px-4 py-3 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm">
        <div className="flex items-start sm:items-center gap-2.5 text-amber-950">
          <div className="p-1 rounded-md bg-amber-200 shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4 text-amber-900" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-black tracking-wider text-xs mr-2">
              ⚠️ {t.sampleDataWarning}
            </span>
            <span className="text-amber-900 font-medium">
              {t.sampleDataNotice}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          <button
            onClick={onOpenDataModal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-bold transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Connect API / Learn Why</span>
          </button>
        </div>
      </div>
    </div>
  );
}
