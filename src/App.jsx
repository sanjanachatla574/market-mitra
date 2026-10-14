import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import DemoNoticeBanner from './components/DemoNoticeBanner';
import CropLocationSelector from './components/CropLocationSelector';
import MarketComparison from './components/MarketComparison';
import NetEarningsCalculator from './components/NetEarningsCalculator';
import BuyerOfferChecker from './components/BuyerOfferChecker';
import HistoricalPriceChart from './components/HistoricalPriceChart';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import SmsIntegrationModal from './components/SmsIntegrationModal';
import DataSourceInspectorModal from './components/DataSourceInspectorModal';
import ShareSummaryModal from './components/ShareSummaryModal';
import DisclaimerFooter from './components/DisclaimerFooter';

import { CROPS, ORIGINS } from './data/mockMarketData';
import { MarketApiService } from './services/marketApi';
import { translations } from './i18n/translations';
import { Volume2, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

export default function App() {
  // Localization: Support Telugu, English, Tamil, Kannada
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mitra_user_lang') || 'te'; // Telugu default for regional farmer focus
  });

  useEffect(() => {
    localStorage.setItem('mitra_user_lang', lang);
  }, [lang]);

  // Main UI State
  const [activeTab, setActiveTab] = useState('prices');
  const [selectedCropId, setSelectedCropId] = useState('tomato');
  const [selectedOriginId, setSelectedOriginId] = useState('siddipet');
  const [quantity, setQuantity] = useState(25);
  const [unit, setUnit] = useState('quintal');
  const [qualityGrade, setQualityGrade] = useState('gradeA');

  // API & Data State
  const [mandiPrices, setMandiPrices] = useState([]);
  const [isLiveApi, setIsLiveApi] = useState(MarketApiService.isLiveConnected());
  const [isLoading, setIsLoading] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState(MarketApiService.getApiKey());

  // Focus mandis for calculator and offer checker
  const [calcMandi, setCalcMandi] = useState(null);
  const [offerMandi, setOfferMandi] = useState(null);

  // Modals
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [smsModalOpen, setSmsModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Normalize quantity to quintals
  const quantityInQuintals = useMemo(() => {
    const q = Number(quantity) || 1;
    switch (unit) {
      case 'kg': return Math.max(0.1, q / 100);
      case 'ton': return q * 10;
      case 'bags': return q * 0.5; // 50kg bag
      case 'quintal':
      default: return q;
    }
  }, [quantity, unit]);

  // Fetch prices on crop/location/grade change
  const loadMarketPrices = async () => {
    setIsLoading(true);
    try {
      const response = await MarketApiService.fetchMandiPrices(
        selectedCropId,
        selectedOriginId,
        qualityGrade
      );
      setMandiPrices(response.data);
      setIsLiveApi(response.isLive);

      // Default the target mandi to highest net profit
      if (response.data && response.data.length > 0) {
        setCalcMandi(response.data[0]);
        setOfferMandi(response.data[0]);
      }
    } catch (err) {
      console.error("Failed to load market prices:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMarketPrices();
  }, [selectedCropId, selectedOriginId, qualityGrade]);

  const currentCrop = CROPS.find(c => c.id === selectedCropId) || CROPS[0];
  const cropDisplayName = currentCrop.names[lang] || currentCrop.names.en;

  // Best Mandi computation for voice & share
  const bestMandi = useMemo(() => {
    if (!mandiPrices || mandiPrices.length === 0) return null;
    
    // Sort by computed net profit
    const list = mandiPrices.map(m => {
      const transportCost = Math.round(Math.max(450, m.distanceKm * 24 + (quantityInQuintals * 15)));
      const grossVal = m.modalPrice * quantityInQuintals;
      const hamali = Math.round(quantityInQuintals * 16);
      const mandiCess = Math.round(grossVal * 0.01);
      const otherExpenses = hamali + mandiCess + 50;
      const netEarnings = grossVal - transportCost - otherExpenses;
      const effectiveRate = Math.round(netEarnings / quantityInQuintals);
      return { ...m, grossVal, transportCost, otherExpenses, netEarnings, effectiveRate };
    });

    list.sort((a, b) => b.netEarnings - a.netEarnings);
    return list[0];
  }, [mandiPrices, quantityInQuintals]);

  const handleSelectMandiForCalc = (mandi) => {
    setCalcMandi(mandi);
    setActiveTab('calculator');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleCompareOffer = (mandi) => {
    setOfferMandi(mandi);
    setActiveTab('offer');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSaveApiKey = (key) => {
    localStorage.setItem('mitra_user_api_key', key);
    setCurrentApiKey(key);
    setIsLiveApi(Boolean(key && key.trim().length > 8));
    loadMarketPrices();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveApi={isLiveApi}
        onOpenVoiceModal={() => setVoiceModalOpen(true)}
        onOpenSmsModal={() => setSmsModalOpen(true)}
        onOpenDataModal={() => setDataModalOpen(true)}
        onShareSummary={() => setShareModalOpen(true)}
      />

      {/* Demo Notice Banner with Strict Transparency */}
      <DemoNoticeBanner
        lang={lang}
        isLiveApi={isLiveApi}
        onOpenDataModal={() => setDataModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 space-y-6 w-full">
        
        {/* Step 1: Crop, Location, Quantity & Quality Selector */}
        <CropLocationSelector
          lang={lang}
          selectedCropId={selectedCropId}
          setSelectedCropId={setSelectedCropId}
          selectedOriginId={selectedOriginId}
          setSelectedOriginId={setSelectedOriginId}
          quantity={quantity}
          setQuantity={setQuantity}
          unit={unit}
          setUnit={setUnit}
          qualityGrade={qualityGrade}
          setQualityGrade={setQualityGrade}
        />

        {/* Tab Content Display */}
        {activeTab === 'prices' && (
          <MarketComparison
            lang={lang}
            mandiData={mandiPrices}
            quantityInQuintals={quantityInQuintals}
            isLiveApi={isLiveApi}
            onSelectMandiForCalc={handleSelectMandiForCalc}
            onCompareOffer={handleCompareOffer}
          />
        )}

        {activeTab === 'calculator' && (
          <NetEarningsCalculator
            lang={lang}
            selectedMandi={calcMandi || bestMandi}
            quantityInQuintals={quantityInQuintals}
            cropName={cropDisplayName}
          />
        )}

        {activeTab === 'offer' && (
          <BuyerOfferChecker
            lang={lang}
            bestMandi={offerMandi || bestMandi}
            quantityInQuintals={quantityInQuintals}
            cropName={cropDisplayName}
          />
        )}

        {activeTab === 'trends' && (
          <HistoricalPriceChart
            lang={lang}
            mandi={bestMandi}
            cropName={cropDisplayName}
          />
        )}

        {activeTab === 'sms' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-farmer-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Farmer SMS Advisory
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Test the SMS query parser and carrier simulator directly below.
              </p>
              <SmsIntegrationModal
                isOpen={true}
                onClose={() => setActiveTab('prices')}
                lang={lang}
                cropName={cropDisplayName}
              />
            </div>
          </div>
        )}

        {activeTab === 'transparency' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-farmer-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Data Verification & API Governance
              </h2>
              <DataSourceInspectorModal
                isOpen={true}
                onClose={() => setActiveTab('prices')}
                isLiveApi={isLiveApi}
                onSaveApiKey={handleSaveApiKey}
                currentApiKey={currentApiKey}
                onRefreshData={loadMarketPrices}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button for Voice Assistance on Mobile */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-30 flex flex-col gap-2.5">
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-farmer-600 to-emerald-600 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all touch-target"
        >
          <Volume2 className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Voice Assistant</span>
        </button>
      </aside>

      {/* Modals */}
      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        lang={lang}
        bestMandi={bestMandi}
        netEarnings={bestMandi?.netEarnings || 0}
        cropName={cropDisplayName}
      />

      <SmsIntegrationModal
        isOpen={smsModalOpen}
        onClose={() => setSmsModalOpen(false)}
        lang={lang}
        cropName={cropDisplayName}
      />

      <DataSourceInspectorModal
        isOpen={dataModalOpen}
        onClose={() => setDataModalOpen(false)}
        isLiveApi={isLiveApi}
        onSaveApiKey={handleSaveApiKey}
        currentApiKey={currentApiKey}
        onRefreshData={loadMarketPrices}
      />

      <ShareSummaryModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        lang={lang}
        cropName={cropDisplayName}
        quantity={quantity}
        unit={unit}
        bestMandi={bestMandi}
        netEarnings={bestMandi?.netEarnings || 0}
        isLiveApi={isLiveApi}
      />

      {/* Statutory Footer */}
      <DisclaimerFooter
        lang={lang}
        onOpenDataModal={() => setDataModalOpen(true)}
      />
    </div>
  );
}
