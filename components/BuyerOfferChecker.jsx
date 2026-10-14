import React, { useState } from 'react';
import { 
  Handshake, 
  Store, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Info, 
  Truck,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function BuyerOfferChecker({
  lang,
  bestMandi,
  quantityInQuintals,
  cropName
}) {
  const t = translations[lang] || translations.en;
  
  const mandiModal = bestMandi?.modalPrice || 2200;
  // Initialize with a realistic local trader offer (~8-10% below mandi modal to cover middleman margin)
  const [buyerOfferPrice, setBuyerOfferPrice] = useState(Math.round(mandiModal * 0.90));

  const q = Math.max(1, quantityInQuintals || 1);

  // Mandi deductions
  const dist = bestMandi?.distanceKm || 65;
  const mandiTransport = Math.round(Math.max(450, dist * 24 + (q * 15)));
  const mandiOtherFees = Math.round(q * 16 + (q * mandiModal * 0.01) + 50);
  const totalMandiDeductions = mandiTransport + mandiOtherFees;

  // Local Buyer economics: Zero transport paid by farmer, zero mandi cess, zero hamali paid by farmer (buyer loads at farmgate)
  const localGross = Math.round(buyerOfferPrice * q);
  const localNetEarnings = localGross; // Farmer gets cash in hand at farmgate

  // Mandi economics
  const mandiGross = Math.round(mandiModal * q);
  const mandiNetEarnings = Math.max(0, mandiGross - totalMandiDeductions);
  const mandiEffectiveRate = Math.round(mandiNetEarnings / q);

  // Break-even price calculation:
  // To match local offer: Mandi Gross - Mandi Deductions = BuyerOffer * q
  // Mandi Price * q - Deductions = BuyerOffer * q
  // Mandi Price needed = BuyerOffer + (Deductions / q)
  const breakEvenMandiPrice = Math.round(buyerOfferPrice + (totalMandiDeductions / q));

  // Difference in net profit
  const netDifference = mandiNetEarnings - localNetEarnings;
  const isMandiBetter = netDifference > 0;
  const diffPerQtl = Math.round(Math.abs(netDifference) / q);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-farmer-200 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-farmer-950 flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-harvest-100 text-harvest-800">🤝</span>
            {t.buyerOfferTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.buyerOfferDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700">
          <span>Comparing Against:</span>
          <span className="font-bold text-farmer-800">
            {bestMandi?.mandiNames?.[lang] || bestMandi?.mandiName}
          </span>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          {t.buyerOfferedPrice}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-lg">
              ₹
            </span>
            <input
              type="number"
              value={buyerOfferPrice}
              onChange={(e) => setBuyerOfferPrice(Math.max(100, Number(e.target.value) || 0))}
              className="w-full pl-9 pr-4 py-3 bg-white border border-slate-300 rounded-xl font-black text-xl text-slate-900 focus:ring-2 focus:ring-farmer-500 focus:outline-none"
              placeholder="e.g. 2100"
            />
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600">
            <span>Total Harvest:</span>
            <span className="font-bold text-slate-900">{q} Quintals</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Enter the exact rate the village trader / commission agent offered at your doorstep.
        </p>
      </div>

      {/* Verdict Alert Box */}
      <div className={`p-5 rounded-3xl border-2 transition-all ${
        isMandiBetter 
          ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950'
          : 'bg-harvest-50/80 border-harvest-500 text-harvest-950'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`p-2 rounded-2xl shrink-0 ${
              isMandiBetter ? 'bg-emerald-600 text-white' : 'bg-harvest-500 text-farmer-950'
            }`}>
              {isMandiBetter ? <Store className="w-6 h-6" /> : <Handshake className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider opacity-75">
                  {t.verdictTitle}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black mt-0.5">
                {isMandiBetter ? t.goToMandiVerdict : t.acceptOfferVerdict}
              </h3>
              <p className="text-xs sm:text-sm mt-1 opacity-90 max-w-2xl">
                {isMandiBetter ? t.goToMandiDesc : t.acceptOfferDesc}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-black/5">
            <span className="text-[11px] font-bold uppercase tracking-wider block opacity-70">
              {isMandiBetter ? "Net Gain by Visiting Mandi" : "Saved by Selling Locally"}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{Math.abs(netDifference).toLocaleString('en-IN')}
            </div>
            <span className="text-xs font-semibold text-farmer-700 block mt-0.5">
              (₹{diffPerQtl} / quintal difference)
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Local Buyer Option */}
        <div className="p-5 rounded-3xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <span>🚪</span>
                Local Farmgate Buyer
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-semibold">
                Doorstep Pick-up
              </span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Offered Rate</span>
                <span className="font-bold text-slate-900">₹{buyerOfferPrice} / qtl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Transport & Fuel Cost</span>
                <span className="font-bold text-emerald-700">₹0 (Zero)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Hamali & Mandi Fee</span>
                <span className="font-bold text-emerald-700">₹0 (Buyer pays)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Travel Hassle & Waiting</span>
                <span className="font-bold text-slate-700">None (Instant)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Net In Hand
            </span>
            <div className="text-2xl font-black text-slate-900">
              ₹{localNetEarnings.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* APMC Mandi Option */}
        <div className="p-5 rounded-3xl border border-farmer-300 bg-farmer-50/50 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-farmer-200">
              <span className="font-bold text-sm text-farmer-950 flex items-center gap-1.5">
                <span>🏛️</span>
                {bestMandi?.mandiNames?.[lang] || bestMandi?.mandiName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-farmer-200 text-farmer-900 font-semibold">
                APMC Mandi
              </span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Mandi Modal Rate</span>
                <span className="font-bold text-farmer-900">₹{mandiModal} / qtl</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Transport ({dist} km)</span>
                <span className="font-bold text-rose-600">−₹{mandiTransport.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Hamali, Cess & Weighing</span>
                <span className="font-bold text-rose-600">−₹{mandiOtherFees.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Deductions</span>
                <span className="font-bold text-rose-700">−₹{totalMandiDeductions.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-farmer-200">
            <span className="text-[11px] font-bold text-farmer-900 uppercase block">
              Net In Pocket After Travel
            </span>
            <div className="text-2xl font-black text-farmer-900">
              ₹{mandiNetEarnings.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Break-even Explainer Card */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-slate-800">
          <Info className="w-4 h-4 text-farmer-600 shrink-0" />
          <span>
            {t.breakEvenDesc}
          </span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 font-black text-farmer-800 self-start sm:self-auto">
          ₹{breakEvenMandiPrice} / quintal
        </div>
      </div>
    </div>
  );
}
