import React, { useState } from 'react';
import { 
  Calculator, 
  Truck, 
  Receipt, 
  Wallet, 
  Info, 
  Check, 
  HelpCircle,
  TrendingUp,
  Percent,
  AlertCircle
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function NetEarningsCalculator({
  lang,
  selectedMandi,
  quantityInQuintals,
  cropName
}) {
  const t = translations[lang] || translations.en;

  // Custom adjustable parameters
  const [modalPrice, setModalPrice] = useState(selectedMandi?.modalPrice || 2200);
  const [distanceKm, setDistanceKm] = useState(selectedMandi?.distanceKm || 65);
  const [vehicleType, setVehicleType] = useState("bolero"); // auto, bolero, mini_truck, heavy_truck
  const [ratePerKm, setRatePerKm] = useState(25);
  const [hamaliPerQtl, setHamaliPerQtl] = useState(16);
  const [weighingFee, setWeighingFee] = useState(50);
  const [mandiCessPercent, setMandiCessPercent] = useState(1.0); // 1%
  const [packingCostPerBag, setPackingCostPerBag] = useState(12);

  // Sync if selectedMandi changes
  React.useEffect(() => {
    if (selectedMandi) {
      setModalPrice(selectedMandi.modalPrice);
      setDistanceKm(selectedMandi.distanceKm);
    }
  }, [selectedMandi]);

  // Handle vehicle type change
  const handleVehicleChange = (type) => {
    setVehicleType(type);
    if (type === "auto") setRatePerKm(18);
    else if (type === "bolero") setRatePerKm(26);
    else if (type === "mini_truck") setRatePerKm(38);
    else if (type === "heavy_truck") setRatePerKm(55);
  };

  // Calculations
  const q = Math.max(1, quantityInQuintals || 1);
  const bagsCount = Math.ceil((q * 100) / 50); // assuming standard 50kg bags

  const grossCropValue = Math.round(q * modalPrice);
  const totalTransportCost = Math.round(Math.max(400, distanceKm * ratePerKm));
  const totalHamali = Math.round(q * hamaliPerQtl);
  const totalMandiCess = Math.round((grossCropValue * mandiCessPercent) / 100);
  const totalPackingCost = Math.round(bagsCount * packingCostPerBag);
  const totalOtherExpenses = totalHamali + totalMandiCess + Number(weighingFee) + totalPackingCost;

  const totalDeductions = totalTransportCost + totalOtherExpenses;
  const netEarnings = Math.max(0, grossCropValue - totalDeductions);
  const effectivePricePerQuintal = Math.round(netEarnings / q);
  const expensePercentage = grossCropValue > 0 ? ((totalDeductions / grossCropValue) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-farmer-200 space-y-6">
      {/* Title & Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-farmer-950 flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-farmer-100 text-farmer-700">🧮</span>
            {t.calculatorTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.calcFormulaDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-2xl bg-farmer-50 border border-farmer-200 text-farmer-900 text-xs sm:text-sm font-semibold">
          <span>Target Mandi:</span>
          <span className="font-bold text-farmer-800">
            {selectedMandi?.mandiNames?.[lang] || selectedMandi?.mandiName || "Local APMC Yard"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs Section (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Price & Quantity Review */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <span>🌾</span>
              Market Base Rate & Harvest Volume
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Modal Price (₹ / quintal)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={modalPrice}
                    onChange={(e) => setModalPrice(Math.max(100, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Harvest Quantity (Quintals)
                </label>
                <input
                  type="number"
                  value={q}
                  disabled
                  className="w-full px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-xl font-bold text-slate-800 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-farmer-600" />
              {t.transportExpenses}
            </h3>

            {/* Vehicle selection pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { id: "auto", name: "Auto", cap: "≤10 q", rate: 18 },
                { id: "bolero", name: "Bolero / Pickup", cap: "≤25 q", rate: 26 },
                { id: "mini_truck", name: "Mini 709", cap: "≤60 q", rate: 38 },
                { id: "heavy_truck", name: "10-Wheeler", cap: "100+ q", rate: 55 }
              ].map((veh) => {
                const isSelected = vehicleType === veh.id;
                return (
                  <button
                    key={veh.id}
                    type="button"
                    onClick={() => handleVehicleChange(veh.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-farmer-600 bg-farmer-100/60 font-bold text-farmer-950 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-xs">{veh.name}</div>
                    <div className="text-[10px] text-slate-500">{veh.cap} • ₹{veh.rate}/km</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Distance to Mandi (km)
                </label>
                <input
                  type="number"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Rate Per Km (₹/km)
                </label>
                <input
                  type="number"
                  value={ratePerKm}
                  onChange={(e) => setRatePerKm(Math.max(5, Number(e.target.value) || 5))}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Mandi & Handling Expenses */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-farmer-600" />
              {t.otherExpenses}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Hamali (₹/qtl)
                </label>
                <input
                  type="number"
                  value={hamaliPerQtl}
                  onChange={(e) => setHamaliPerQtl(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Mandi Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={mandiCessPercent}
                  onChange={(e) => setMandiCessPercent(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Weighing Fee (₹)
                </label>
                <input
                  type="number"
                  value={weighingFee}
                  onChange={(e) => setWeighingFee(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Bag Cost (₹/bag)
                </label>
                <input
                  type="number"
                  value={packingCostPerBag}
                  onChange={(e) => setPackingCostPerBag(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg font-bold text-slate-900 text-sm focus:ring-2 focus:ring-farmer-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Results & Formula Receipt Section (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-farmer-950 text-white shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-farmer-800">
                <span className="text-xs uppercase tracking-widest text-farmer-400 font-bold">
                  Calculation Breakdown
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-farmer-800 text-farmer-200">
                  {q} Quintals
                </span>
              </div>

              {/* Line items */}
              <div className="space-y-3 mt-4 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-farmer-100">
                  <span>Gross Crop Value ({q} q × ₹{modalPrice})</span>
                  <span className="font-bold text-white text-base">
                    ₹{grossCropValue.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-300">
                  <span>− Transport ({distanceKm} km @ ₹{ratePerKm}/km)</span>
                  <span className="font-bold">
                    −₹{totalTransportCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-300">
                  <span>− Hamali / Loading ({q} q @ ₹{hamaliPerQtl})</span>
                  <span className="font-bold">
                    −₹{totalHamali.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-300">
                  <span>− Mandi Cess ({mandiCessPercent}%)</span>
                  <span className="font-bold">
                    −₹{totalMandiCess.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-rose-300">
                  <span>− Weighing + Bag Packing ({bagsCount} bags)</span>
                  <span className="font-bold">
                    −₹{(Number(weighingFee) + totalPackingCost).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-3 border-t border-farmer-800 flex justify-between items-center text-amber-300 font-semibold text-xs">
                  <span>Total Deductions ({expensePercentage}%)</span>
                  <span>−₹{totalDeductions.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Final Highlight Card */}
            <div className="mt-6 pt-5 border-t border-farmer-800 bg-farmer-900/80 rounded-2xl p-4 border border-farmer-700">
              <span className="text-xs font-bold uppercase tracking-wider text-farmer-300 block mb-1">
                {t.finalNetInPocket}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{netEarnings.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center justify-between text-xs text-farmer-300 mt-2 font-medium">
                <span>Effective Realized Price:</span>
                <span className="text-sm font-black text-harvest-300">
                  ₹{effectivePricePerQuintal} / quintal
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Advisory Note */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Note for Farmers:</strong> Net earnings are calculated as: 
              <code className="mx-1 px-1 py-0.5 rounded bg-amber-100 font-mono text-[11px]">Quantity × Price − Transport − Expenses</code>. 
              Actual spot prices depend on auction bids and moisture/quality tests at the yard. Mitra never guarantees future prices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
