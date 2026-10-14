# Mitra – Smart Market Price Assistant
### రైతు బంధు | న్యాయమైన ధరల మార్గదర్శి | Fair Crop Prices, Transparent Market Insights & Net Earning Assistant

**Mitra** is a responsive, farmer-friendly web application designed to empower farmers with fair crop market intelligence. By comparing nearby APMC mandis, factoring in travel and handling deductions, calculating true in-pocket net earnings, evaluating local buyer offers, and offering multilingual voice and SMS assistance, Mitra ensures farmers never undersell their hard-earned harvest.

---

## 🌟 Key Features

1. **Multilingual Regional Support (4 Languages)**
   - **Telugu (తెలుగు)**
   - **English**
   - **Tamil (தமிழ்)**
   - **Kannada (ಕನ್ನಡ)**
   - Instant language switching with localized crop names, market terminology, calculation breakdowns, and audio readouts.

2. **Accurate Net Earnings Calculator**
   - **Formula:**  
     $$\text{Net Earnings} = (\text{Quantity} \times \text{Modal Price}) - \text{Transportation Expenses} - \text{Other Expenses}$$
   - **Transportation Breakdown:** Dynamic distance calculation (km), vehicle capacity presets (Auto $\le 10\text{ q}$, Bolero Pickup $\le 25\text{ q}$, Mini 709 $\le 60\text{ q}$, 10-Wheeler $100+\text{ q}$), and customizable per-km rates.
   - **Mandi Handling Expenses:** Hamali / unloading charges ($\text{₹/qtl}$), APMC mandi cess ($1\%$), weighbridge fee, and packaging / gunny bag costs.
   - Effective realized net price per quintal calculation.

3. **Nearby APMC Mandi Price Comparison**
   - Compares arrival rates across regulated markets (e.g., Bowenpally, Enumamula Warangal, Khammam, Guntur Mirchi Yard, Kurnool, Koyambedu, Yeshwanthpur).
   - Ranks mandis by **Estimated Net Profit in Pocket**, not just gross modal rate.
   - Distinct badges for:
     - 🌟 **Mitra Recommended Choice** (Highest Net In Hand)
     - ⚡ **Nearest Mandi** (Lowest Travel Distance)

4. **Buyer-Offer Checker (Local Trader vs APMC Mandi)**
   - Evaluates village middleman farmgate offers against traveling to the mandi.
   - Calculates **Break-even Mandi Price** required to match a local offer after subtracting travel risks.
   - Delivers clear verdict advice: *"Accept Local Offer"* (when travel costs erode extra mandi price) vs *"Go to Mandi"* (when net gain exceeds travel friction).

5. **Historical Price Trends & Seasonality**
   - Interactive 7-day, 15-day, and 30-day SVG trend charts displaying Minimum, Modal, and Maximum price lines alongside daily arrival volume bars.
   - Trend direction indicators ($\uparrow$ Rising, $\leftrightarrow$ Stable, $\downarrow$ Under Pressure).

6. **Voice Assistant (Web Speech API)**
   - Natural spoken audio summaries in Telugu, English, Tamil, and Kannada.
   - Truthful diagnostic checking: dynamically displays hardware and browser support status without false claims.

7. **Farmer SMS Assistant & Carrier Simulator**
   - Supports 2G / keypad feature phones without internet via structured SMS queries:
     - `PRICE TOMATO` $\rightarrow$ Returns top 2 nearby mandi modal prices.
     - `OFFER COTTON 7200` $\rightarrow$ Compares offer against mandi net earnings and sends advisory.
     - `HELP` $\rightarrow$ Lists query commands.
   - Features an interactive mobile phone simulator and ready-to-wire API architecture for Twilio or Fast2SMS.

8. **Strict Data Verification & Transparency Standards**
   - Distinguishes between **VERIFIED LIVE DATA** (when connected to data.gov.in / Agmarknet API key) and **SAMPLE DATA — NOT LIVE**.
   - Clear arrival timestamps, market names, and freshness badges:
     - ✅ *Verified Fresh Today*
     - ⚠️ *Yesterday's Session*
     - ⏳ *Outdated Data (3+ days)* with explanatory reasons (holidays, strikes).
     - 🚫 *No arrivals reported today*.
   - Statutory Agricultural Disclaimer: Mitra provides advisory estimates and never guarantees future prices or returns.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS
- **Icons:** Lucide React
- **Typography:** Plus Jakarta Sans, Noto Sans Telugu, Noto Sans Tamil, Noto Sans Kannada
- **Speech:** Native Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
- **API Client:** Agmarknet / data.gov.in architecture with offline resilience

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone & Install
```bash
git clone <repository-url>
cd sanjana
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` as needed:
```env
# Official Government Mandi Price API (Agmarknet / data.gov.in)
# Register for a free API key at https://data.gov.in
VITE_AGMARKNET_API_KEY=your_key_here

# SMS Provider (Optional)
VITE_SMS_PROVIDER_NAME=Fast2SMS
VITE_SMS_PROVIDER_API_KEY=
```
> **Note:** If `VITE_AGMARKNET_API_KEY` is not provided, Mitra automatically operates in **"SAMPLE DATA — NOT LIVE"** mode with clearly labeled indicators.

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Deployment Guide

### Deploying to Vercel
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import this repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Under **Environment Variables**, add:
   - `VITE_AGMARKNET_API_KEY` (if using official government API)
   - `VITE_SMS_PROVIDER_API_KEY` (if using live SMS dispatch)
6. Click **Deploy**.

---

## ⚖️ Statutory Advisory Disclaimer
Mitra calculations are advisory estimates based on reported mandi arrival data. Actual auction prices in APMC yards depend on real-time spot bidding, moisture content, physical grading by commission agents, and official APMC market deductions. Mitra does not guarantee future prices, auction outcomes, or profits.
