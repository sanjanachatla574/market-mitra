import React from 'react';
import { 
  TrendingUp, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Info, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function MarketComparison({
  lang,
  mandiData,
  quantityInQuintals,
  isLiveApi,
  onSelectMandiForCalc,
  onCompareOffer
}) {
  const t = translations[lang] || translations.en;

  // Compute travel and net earnings for ranking
  const computedMandis = mandiData.map(mandi => {
    // Standard transport calculation: ₹28 per km flat base or ₹4.5/quintal/10km
    const transportCost = Math.round(Math.max(450, mandi.distanceKm * 24 + (quantityInQuintals * 15)));
    // Other fees (Hamali ~₹15/qtl + Mandi cess 1% + Weighing ₹50 flat)
    const grossVal = mandi.modalPrice * quantityInQuintals;
    const hamali = Math.round(quantityInQuintals * 16);
    const mandiCess = Math.round(grossVal * 0.01);
    const otherExpenses = hamali + mandiCess + 50;

    const netEarnings = grossVal - transportCost - otherExpenses;
    const effectiveRate = quantityInQuintals > 0 ? Math.round(netEarnings / quantityInQuintals) : mandi.modalPrice;

    return {
      ...mandi,
      grossVal,
      transportCost,
      otherExpenses,
      netEarnings,
      effectiveRate
    };
  });

  // Sort by net earnings descending to find the best market
  const sortedByNetProfit = [...computedMandis].sort((a, b) => b.netEarnings - a.netEarnings);
  const bestMandiId = sortedByNetProfit[0]?.mandiId;
  const nearestMandiId = [...computedMandis].sort((a, b) => a.distanceKm - b.distanceKm)[0]?.mandiId;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-farmer-950 flex items-center gap-2">
            <span>🏛️</span>
            {t.nearbyMarkets}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.compareMarketsDesc} ({quantityInQuintals} quintals total)
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold bg-farmer-50 border border-farmer-200 text-farmer-800 px-3 py-1.5 rounded-full">
          <span>Sort: Ranked by Net Profit in Pocket</span>
        </div>
      </div>

      {/* Mandi Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedByNetProfit.map((mandi) => {
          const isBest = mandi.mandiId === bestMandiId;
          const isNearest = mandi.mandiId === nearestMandiId;

          // Freshness formatting
          let freshnessColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
          let freshnessIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
          let freshnessLabel = t.freshData;

          if (mandi.freshnessStatus === "yesterday") {
            freshnessColor = "bg-amber-100 text-amber-800 border-amber-300";
            freshnessIcon = <Clock className="w-3.5 h-3.5 text-amber-600" />;
            freshnessLabel = t.yesterdayData;
          } else if (mandi.freshnessStatus === "stale") {
            freshnessColor = "bg-rose-100 text-rose-800 border-rose-300";
            freshnessIcon = <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />;
            freshnessLabel = t.staleData;
          } else if (mandi.freshnessStatus === "no_arrivals") {
            freshnessColor = "bg-slate-100 text-slate-700 border-slate-300";
            freshnessIcon = <Info className="w-3.5 h-3.5 text-slate-500" />;
            freshnessLabel = t.noArrivals;
          }

          return (
            <div
              key={mandi.mandiId}
              className={`rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                isBest
                  ? 'border-farmer-600 bg-gradient-to-b from-farmer-50/60 to-white shadow-lg shadow-farmer-600/10 ring-2 ring-farmer-500/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Card Header & Badges */}
              <div className="p-5 pb-3">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {isBest && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-farmer-600 text-white shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 fill-current" />
                        {t.bestRecommendation}
                      </span>
                    )}
                    {isNearest && !isBest && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                        ⚡ {t.lowestDistance}
                      </span>
                    )}
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${freshnessColor}`}>
                    {freshnessIcon}
                    <span>{freshnessLabel}</span>
                  </span>
                </div>

                {/* Mandi Name & Location */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {mandi.mandiNames[lang] || mandi.mandiName}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {mandi.district}, {mandi.state}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Truck className="w-3.5 h-3.5 text-farmer-600" />
                    {mandi.distanceKm} km
                  </span>
                </div>

                {/* Main Price Highlight */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {t.modalPrice}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      Range: ₹{mandi.minPrice} - ₹{mandi.maxPrice}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black tracking-tight text-farmer-800">
                      ₹{mandi.modalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      / quintal
                    </span>
                  </div>

                  {/* Deductions Breakdown */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 text-xs">
                    <div>
                      <div className="text-[11px] text-slate-500">{t.estTravelCost}</div>
                      <div className="font-bold text-slate-800">−₹{mandi.transportCost.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-500">{t.otherExpenses}</div>
                      <div className="font-bold text-slate-800">−₹{mandi.otherExpenses.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                {/* Net Earnings in Farmer's Pocket */}
                <div className="mt-3 p-3 rounded-2xl bg-farmer-500/10 border border-farmer-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-farmer-900 uppercase tracking-wide block">
                      {t.estNetProfit}
                    </span>
                    <span className="text-xl font-black text-farmer-900">
                      ₹{Math.round(mandi.netEarnings).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-farmer-700 font-medium block">
                      Net Per Quintal
                    </span>
                    <span className="text-xs font-black text-farmer-800">
                      ₹{mandi.effectiveRate}/qtl
                    </span>
                  </div>
                </div>

                {/* Explanation if data has warning / holiday / no arrivals */}
                {mandi.freshnessStatus !== "fresh" && (
                  <div className="mt-2.5 p-2 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug">
                    <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                    <span>{mandi.freshnessReason}</span>
                  </div>
                )}
              </div>

              {/* Card Footer: Actions & Metadata */}
              <div className="p-4 pt-2 bg-slate-50/70 border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] text-slate-600">
                  <span>📅 {mandi.arrivalDate} ({mandi.lastUpdated})</span>
                  <span className="font-semibold text-slate-600">
                    {mandi.isSampleData ? "Demo Sample" : "Live API"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    onClick={() => onSelectMandiForCalc(mandi)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors touch-target"
                  >
                    <span>{t.viewBreakdown}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  <button
                    onClick={() => onCompareOffer(mandi)}
                    className="w-full py-2.5 px-3 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm touch-target"
                  >
                    <span>Check Buyer Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
