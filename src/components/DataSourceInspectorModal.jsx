import React, { useState } from 'react';
import { 
  Database, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  KeyRound, 
  Radio, 
  Clock, 
  Save, 
  RefreshCw 
} from 'lucide-react';
import { MarketApiService } from '../services/marketApi';

export default function DataSourceInspectorModal({
  isOpen,
  onClose,
  isLiveApi,
  onSaveApiKey,
  currentApiKey,
  onRefreshData
}) {
  if (!isOpen) return null;

  const [inputKey, setInputKey] = useState(currentApiKey || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const statusInfo = MarketApiService.getApiStatusInfo();

  const handleSave = () => {
    onSaveApiKey(inputKey);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-farmer-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-farmer-100 text-farmer-800 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Data Governance & Verification Status
            </h3>
            <p className="text-xs text-slate-500">
              Strict transparency audit between Verified Live APIs and Sample Data
            </p>
          </div>
        </div>

        {/* Current State Banner */}
        <div className={`mt-4 p-4 rounded-2xl border ${
          isLiveApi 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            {isLiveApi ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-600 text-white">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                VERIFIED LIVE API CONNECTED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-amber-950">
                <AlertTriangle className="w-3.5 h-3.5" />
                SAMPLE DATA — NOT LIVE
              </span>
            )}
          </div>
          <p className="text-xs mt-1.5 leading-relaxed font-medium">
            {statusInfo.reason}
          </p>
        </div>

        {/* Data Architecture & API Key Setting */}
        <div className="mt-5 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-farmer-600" />
              Configure Official Government API Key
            </h4>
            <p className="text-xs text-slate-500 mb-3">
              To fetch live, second-by-second mandi auctions from 
              <a 
                href="https://data.gov.in" 
                target="_blank" 
                rel="noreferrer"
                className="text-farmer-700 underline font-semibold ml-1 inline-flex items-center gap-0.5"
              >
                data.gov.in <ExternalLink className="w-3 h-3" />
              </a>, enter your registered API key below:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter 57-character data.gov.in API Key..."
                className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-farmer-500"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2.5 bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Key</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="mt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                API Key saved! Re-evaluating live connectivity...
              </div>
            )}
          </div>

          {/* Official Sources Citation Checklist */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <h4 className="font-bold text-slate-900 mb-2">Verified Official Sources:</h4>
            
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-farmer-600 shrink-0 mt-0.5" />
              <div>
                <strong>Agmarknet (Directorate of Marketing & Inspection):</strong>
                <p className="text-slate-500 text-[11px]">Covers 3,200+ regulated wholesale agricultural markets (APMC mandis) across all Indian States.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-farmer-600 shrink-0 mt-0.5" />
              <div>
                <strong>e-NAM (National Agriculture Market):</strong>
                <p className="text-slate-500 text-[11px]">Pan-India electronic trading portal integrating existing APMC mandis to create a unified national market.</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-farmer-600 shrink-0 mt-0.5" />
              <div>
                <strong>Open Government Data Platform (data.gov.in):</strong>
                <p className="text-slate-500 text-[11px]">Resource ID <code>9ef84268-d588-465a-a308-a864a43d0070</code> for daily wholesale commodity price reporting.</p>
              </div>
            </div>
          </div>

          {/* Outdated / Missing Data Policy */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
            <h5 className="font-bold flex items-center gap-1 text-amber-900">
              <Clock className="w-4 h-4" />
              Our Policy on Outdated or Missing Data:
            </h5>
            <p className="leading-relaxed text-[11px] text-amber-900">
              If an APMC market does not submit daily arrival auction reports (due to holidays, local mandi strikes, or power outage), Mitra explicitly tags records as "Outdated (3+ days)" or "No arrivals reported today." Mitra strictly forbids generating or fabricating fictitious live prices.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
