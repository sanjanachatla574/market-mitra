import { CROPS, MANDIS, getSampleMandiPrices } from '../data/mockMarketData';

/**
 * SMS Service & Gateway Simulator for Mitra
 * Handles SMS query parsing, command interpretation, and live gateway webhook integration.
 */
export class SmsService {
  static getProviderStatus() {
    const key = import.meta.env.VITE_SMS_PROVIDER_API_KEY || localStorage.getItem('mitra_sms_api_key');
    const isConfigured = Boolean(key && key.trim().length > 6);
    return {
      isConfigured,
      providerName: import.meta.env.VITE_SMS_PROVIDER_NAME || "Fast2SMS / Twilio Gateway",
      statusText: isConfigured ? "Connected (Live SMS Active)" : "Simulator Mode (Provider API Key not set)",
      reason: isConfigured 
        ? "Connected to carrier gateway for outbound SMS dispatch."
        : "No live SMS provider API key configured in .env. Real SMS dispatch is disabled. Interactive SMS Simulator is active for testing."
    };
  }

  /**
   * Parse farmer incoming SMS and generate responsive text
   */
  static processIncomingSms(messageText, lang = 'en') {
    const raw = (messageText || "").trim().toUpperCase();
    
    if (!raw) {
      return "Mitra SMS: Send 'PRICE <CROP>' (e.g., 'PRICE TOMATO') or 'OFFER <CROP> <OFFER_PRICE>' to get market rates & net advice. Help: 1800-MITRA.";
    }

    if (raw.includes("HELP") || raw.includes("సహాయం") || raw.includes("உதவி") || raw.includes("ಸಹಾಯ")) {
      return "MITRA SMS HELP:\n1. PRICE <CROP> (e.g. PRICE ONION)\n2. OFFER <CROP> <PRICE> (e.g. OFFER COTTON 7200)\n3. BEST <CROP> <LOCATION>\nFree farmer service.";
    }

    // Check for OFFER command: OFFER <CROP> <AMOUNT>
    if (raw.startsWith("OFFER") || raw.startsWith("ఆఫర్") || raw.startsWith("ஆஃபர்") || raw.startsWith("ಆಫರ್")) {
      const parts = raw.split(/\s+/);
      const cropQuery = parts[1] || "TOMATO";
      const offerPrice = parseFloat(parts[2]) || 0;

      const crop = CROPS.find(c => 
        c.id.toUpperCase() === cropQuery || 
        c.names.en.toUpperCase().includes(cropQuery)
      ) || CROPS[0];

      const mandiPrices = getSampleMandiPrices(crop.id, "siddipet", "gradeA");
      const bestMandi = mandiPrices[0];
      const transportEst = 120; // per quintal estimate
      const mandiNet = bestMandi.modalPrice - transportEst;

      if (offerPrice <= 0) {
        return `Mitra: Please specify offer price. Example: OFFER ${crop.names.en.toUpperCase()} 2200`;
      }

      if (offerPrice >= mandiNet) {
        return `Mitra Advisory for ${crop.names.en}: Accept local offer of ₹${offerPrice}/qtl. Mandi modal is ₹${bestMandi.modalPrice}, but after ₹${transportEst} transport/hamali, mandi net is ₹${mandiNet}. You save hassle.`;
      } else {
        const extraGain = mandiNet - offerPrice;
        return `Mitra Advisory: Do NOT accept ₹${offerPrice}/qtl locally! Go to ${bestMandi.mandiName}. Mandi net after travel is ₹${mandiNet}/qtl. You gain +₹${extraGain}/qtl extra!`;
      }
    }

    // Default: PRICE query
    let cropQuery = raw.replace(/^PRICE\s+/i, '').replace(/^ధర\s+/i, '').replace(/^விலை\s+/i, '').replace(/^ಬೆಲೆ\s+/i, '').trim();
    if (!cropQuery) cropQuery = "TOMATO";

    const matchedCrop = CROPS.find(c => 
      c.id.toUpperCase().includes(cropQuery) || 
      c.names.en.toUpperCase().includes(cropQuery) ||
      cropQuery.includes(c.id.toUpperCase())
    ) || CROPS[0];

    const samplePrices = getSampleMandiPrices(matchedCrop.id, "siddipet", "gradeA");
    const top2 = samplePrices.slice(0, 2);

    const timeStamp = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

    return `MITRA [${timeStamp}]: ${matchedCrop.names.en} Modal Prices:
1. ${top2[0].mandiName.split(' ')[0]}: ₹${top2[0].modalPrice}/qtl (${top2[0].distanceKm}km)
2. ${top2[1].mandiName.split(' ')[0]}: ₹${top2[1].modalPrice}/qtl (${top2[1].distanceKm}km)
Source: Agmarknet (Sample). Reply OFFER <CROP> <PRICE> to test.`;
  }

  /**
   * Send live SMS if provider configured
   */
  static async sendLiveSms(toMobile, messageBody) {
    const status = this.getProviderStatus();
    if (!status.isConfigured) {
      return {
        success: false,
        delivered: false,
        isSimulated: true,
        message: "Live SMS Provider is not configured. Handled via interactive Simulator.",
        replyText: messageBody
      };
    }

    // Twilio or Fast2SMS API dispatch structure
    try {
      // In production, call backend /api/sms/send
      const response = await fetch('/api/sms/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: toMobile, message: messageBody })
      });
      const resData = await response.json();
      return { success: true, delivered: true, ...resData };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}
