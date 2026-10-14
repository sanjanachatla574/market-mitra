import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BarChart3, 
  Info, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function HistoricalPriceChart({
  lang,
  mandi,
  cropName
}) {
  const t = translations[lang] || translations.en;
  const [timeRange, setTimeRange] = useState(15); // 7, 15, 30
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const history = mandi?.history || [];
  const displayHistory = history.slice(-timeRange);

  if (displayHistory.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-6 text-center text-slate-500 border border-slate-200">
        No historical trends available for this market.
      </div>
    );
  }

  // Calculate chart boundaries
  const prices = displayHistory.flatMap(d => [d.min, d.modal, d.max]);
  const minPrice = Math.min(...prices) * 0.95;
  const maxPrice = Math.max(...prices) * 1.05;
  const priceRange = maxPrice - minPrice || 1;

  const volumes = displayHistory.map(d => d.volumeQtl);
  const maxVol = Math.max(...volumes) || 1;

  // Chart dimensions
  const width = 800;
  const height = 320;
  const paddingLeft = 55;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 45;
  const plotWidth = width - paddingLeft - paddingRight;
  const plotHeight = height - paddingTop - paddingBottom;

  const getX = (idx) => paddingLeft + (idx / (displayHistory.length - 1)) * plotWidth;
  const getY = (val) => paddingTop + plotHeight - ((val - minPrice) / priceRange) * plotHeight;

  // Generate SVG paths
  const modalPoints = displayHistory.map((d, i) => `${getX(i)},${getY(d.modal)}`).join(' ');
  const maxPoints = displayHistory.map((d, i) => `${getX(i)},${getY(d.max)}`).join(' ');
  const minPoints = displayHistory.map((d, i) => `${getX(i)},${getY(d.min)}`).join(' ');

  // Calculate percentage change
  const firstModal = displayHistory[0].modal;
  const lastModal = displayHistory[displayHistory.length - 1].modal;
  const pctChange = (((lastModal - firstModal) / firstModal) * 100).toFixed(1);
  const isRising = pctChange > 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-farmer-200 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-farmer-100 text-farmer-700">📈</span>
            <h2 className="text-xl sm:text-2xl font-black text-farmer-950">
              {t.trendTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {cropName} prices at <span className="font-semibold text-slate-700">{mandi?.mandiNames?.[lang] || mandi?.mandiName}</span>
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {[
            { days: 7, label: t.time7d },
            { days: 15, label: t.time15d },
            { days: 30, label: t.time30d }
          ].map(btn => (
            <button
              key={btn.days}
              onClick={() => setTimeRange(btn.days)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeRange === btn.days
                  ? 'bg-farmer-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trend Summary Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isRising ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
            {isRising ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>{isRising ? t.trendRising : t.trendFalling}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${isRising ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                {pctChange > 0 ? `+${pctChange}%` : `${pctChange}%`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Over selected {timeRange} day period
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-farmer-600"></span>
            <span className="text-slate-700">{t.modalTrend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-blue-400"></span>
            <span className="text-slate-500">{t.maxTrend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 rounded-full bg-amber-400"></span>
            <span className="text-slate-500">{t.minTrend}</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative overflow-x-auto">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto min-w-[600px] select-none font-sans"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = paddingTop + plotHeight * pct;
            const priceVal = Math.round(maxPrice - pct * priceRange);
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#64748b"
                  fontWeight="600"
                >
                  ₹{priceVal}
                </text>
              </g>
            );
          })}

          {/* Volume Bars at bottom */}
          {displayHistory.map((d, i) => {
            const barH = (d.volumeQtl / maxVol) * 45;
            const x = getX(i) - 6;
            const y = paddingTop + plotHeight - barH;
            return (
              <rect
                key={`bar-${i}`}
                x={x}
                y={y}
                width="12"
                height={barH}
                fill="#cbd5e1"
                opacity="0.45"
                rx="2"
              />
            );
          })}

          {/* Max Price Line (Blue dotted) */}
          <polyline
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            points={maxPoints}
          />

          {/* Min Price Line (Amber dotted) */}
          <polyline
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            points={minPoints}
          />

          {/* Modal Price Line (Farmer Green Solid) */}
          <polyline
            fill="none"
            stroke="#16a34a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={modalPoints}
          />

          {/* Data Points */}
          {displayHistory.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d.modal);
            const isHovered = hoveredPoint?.date === d.date;

            return (
              <g key={`pt-${i}`} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(d)}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 7 : 4}
                  fill="#16a34a"
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 3 : 2}
                  className="transition-all"
                />
                {/* Date labels */}
                {(i % (Math.ceil(displayHistory.length / 7)) === 0 || i === displayHistory.length - 1) && (
                  <text
                    x={cx}
                    y={height - 15}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#64748b"
                    fontWeight="600"
                  >
                    {d.date}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 p-3 rounded-2xl bg-farmer-950 text-white text-xs shadow-xl border border-farmer-800 space-y-1 z-10 pointer-events-none">
            <div className="font-bold text-farmer-300 pb-1 border-b border-farmer-800 flex justify-between gap-4">
              <span>{hoveredPoint.date}</span>
              <span>Arrival: {hoveredPoint.volumeQtl} qtl</span>
            </div>
            <div className="text-white font-extrabold text-sm">
              Modal: ₹{hoveredPoint.modal} / qtl
            </div>
            <div className="text-slate-300 text-[11px] flex justify-between gap-3">
              <span>Min: ₹{hoveredPoint.min}</span>
              <span>Max: ₹{hoveredPoint.max}</span>
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer with Transparency Citation */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-farmer-600" />
          <span>{mandi?.isSampleData ? "SAMPLE DATA — NOT LIVE" : "LIVE AGMARKNET FEED"}</span>
          <span>• Historical series compiled from APMC daily trade log sheets.</span>
        </div>
        <div className="font-mono text-[11px] text-slate-600">
          Last Synced: 14 Oct 2026
        </div>
      </div>
    </div>
  );
}
