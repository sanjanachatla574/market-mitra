import React from 'react';
import { 
  MapPin, 
  Scale, 
  Award, 
  ChevronDown, 
  Sparkles, 
  Compass, 
  SlidersHorizontal 
} from 'lucide-react';
import { CROPS, ORIGINS } from '../data/mockMarketData';
import { translations } from '../i18n/translations';

export default function CropLocationSelector({
  lang,
  selectedCropId,
  setSelectedCropId,
  selectedOriginId,
  setSelectedOriginId,
  quantity,
  setQuantity,
  unit,
  setUnit,
  qualityGrade,
  setQualityGrade
}) {
  const t = translations[lang] || translations.en;
  const currentCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];

  const quantityPresets = [
    { label: "10 q", value: 10 },
    { label: "25 q", value: 25 },
    { label: "50 q", value: 50 },
    { label: "100 q", value: 100 }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-farmer-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-farmer-950 flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-farmer-100 text-farmer-700">🌱</span>
            {t.selectCrop} & {t.selectOrigin}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select your harvest, village location, and grade to calculate exact mandi net returns
          </p>
        </div>

        {/* Selected Crop Summary Pill */}
        <div className="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-farmer-50 border border-farmer-200 text-farmer-900 text-sm font-semibold">
          <span className="text-xl">{currentCrop.icon}</span>
          <span>{currentCrop.names[lang] || currentCrop.names.en}</span>
          <span className="text-xs text-farmer-600 font-medium">({currentCrop.packingType})</span>
        </div>
      </div>

      {/* 1. Crop Selection Carousel / Grid */}
      <div className="mt-5">
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
          {t.selectCrop}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
          {CROPS.map((crop) => {
            const isSelected = crop.id === selectedCropId;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all text-center touch-target ${
                  isSelected
                    ? 'border-farmer-600 bg-farmer-50/80 shadow-md shadow-farmer-500/10 scale-[1.02]'
                    : 'border-slate-200 bg-white hover:border-farmer-300 hover:bg-slate-50/80'
                }`}
              >
                <span className="text-3xl sm:text-4xl mb-1.5 transition-transform group-hover:scale-110">
                  {crop.icon}
                </span>
                <span className={`text-xs sm:text-sm font-bold line-clamp-1 ${
                  isSelected ? 'text-farmer-900' : 'text-slate-800'
                }`}>
                  {crop.names[lang] || crop.names.en}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  ₹{crop.basePrice}/qtl
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Controls Grid: Location, Quantity, Quality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-5 border-t border-slate-100">
        
        {/* Origin Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-farmer-600" />
            {t.selectOrigin}
          </label>
          <div className="relative">
            <select
              value={selectedOriginId}
              onChange={(e) => setSelectedOriginId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-farmer-500 focus:bg-white appearance-none cursor-pointer"
            >
              {ORIGINS.map((origin) => (
                <option key={origin.id} value={origin.id}>
                  📍 {origin.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-farmer-600" />
            Distances to mandis will be calculated from this point.
          </p>
        </div>

        {/* Harvest Quantity */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-farmer-600" />
              {t.cropQuantity}
            </label>
            <div className="flex gap-1">
              {quantityPresets.map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setQuantity(preset.value)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                    quantity === preset.value
                      ? 'bg-farmer-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                min="1"
                max="5000"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-farmer-500 focus:bg-white"
              />
            </div>

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-36 bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-2.5 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-farmer-500 cursor-pointer"
            >
              <option value="quintal">{t.unitQuintal}</option>
              <option value="kg">{t.unitKg}</option>
              <option value="ton">{t.unitTon}</option>
              <option value="bags">{t.unitBags}</option>
            </select>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Normalized: <span className="font-bold text-farmer-800">{quantity} {unit}</span>
          </p>
        </div>

        {/* Quality Grade */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-farmer-600" />
            {t.cropQuality}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gradeA', label: 'Grade A', sub: 'FAQ / Top', color: 'border-emerald-500 bg-emerald-50 text-emerald-950' },
              { id: 'gradeB', label: 'Grade B', sub: 'Medium', color: 'border-blue-400 bg-blue-50 text-blue-950' },
              { id: 'gradeC', label: 'Grade C', sub: 'Fair/Local', color: 'border-slate-300 bg-slate-50 text-slate-800' }
            ].map((grade) => {
              const isSelected = qualityGrade === grade.id;
              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setQualityGrade(grade.id)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isSelected 
                      ? `${grade.color} ring-2 ring-farmer-500 font-bold shadow-sm` 
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold">{grade.label}</div>
                  <div className="text-[10px] opacity-75">{grade.sub}</div>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            Mandi pricing adjusts automatically by quality grade.
          </p>
        </div>
      </div>
    </div>
  );
}
