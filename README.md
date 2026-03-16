# FIRE 提領計算器

專為 FIRE (Financial Independence, Retire Early) 規劃的財務計算工具，考慮稅負、費用與房產對退休提領的影響。支援台灣／美國預設稅制、三種帳戶型態、房產現金流與風險熱圖。

## 特色功能

- **三種帳戶型態**：一般應稅、延稅、免稅
- **稅負計算**：股息稅、資本利得稅、提領稅；可選**高擬真稅制**（級距、扣除額、預扣稅）
- **費用**：總費用率（基金、顧問等）
- **v1.3 高擬真稅制**：稅級距、標準扣除額、個人免稅額、股息/資本利得免稅額、預扣稅；內建台灣／美國預設
- **v2.0 房產模組**：房價、租金、空置率、維護費、房貸本息、租金稅；可與金融資產一起跑提領模擬
- **v2.0 風險熱圖**：提領率 × 股債配置 → 破產機率矩陣（可選含／不含房產），股債房相關性
- **Monte Carlo 模擬**：多路徑破產率、P10/P50/P90、臨界提領率、可調年期與路徑數
- **多語系**：繁中 (zh-TW)、英文 (en-US)，含對應預設稅率與金額
- **即時計算**：參數變更後自動重算
- **年度現金流表**：費用、股息、稅金、提領、期末資產、成本基礎
- **響應式**：手機、平板、桌面

## 線上使用

[https://kylewangtw.github.io/FIRE-calculator](https://kylewangtw.github.io/FIRE-calculator)

## 主要功能

### 基本參數
- 第一年度目標提領（稅前／稅後）
- 通膨率、股息殖利率、價格成長率、規劃年期、提領時點（期初／期末）

### 稅與費用
- 總費用率、帳戶型態、股息／資本利得／提領稅率、目標金額模式

### 高擬真稅制（可選）
- 稅級距、標準扣除額、個人免稅額、股息／資本利得免稅額、預扣稅（境內／境外）

### 房產（可選）
- 房產市價、年租金、空置率、維護費率、房價成長與波動、房貸本息、租金稅率

### 風險熱圖（可選）
- 股債配置、股債房報酬與波動、相關係數；輸出提領率 × 股票配置的破產機率熱圖

### 輸出
- 三種帳戶型態所需起始資產、首年費用與稅額、4% 法則對照、年度現金流表、風險熱圖、Monte Carlo 結果

## 技術架構

- **前端**：React 18 + TypeScript
- **樣式**：Tailwind CSS
- **圖表**：Chart.js、react-chartjs-2
- **建置**：Create React App + CRACO
- **部署**：GitHub Pages（`gh-pages` branch）

### 專案結構（main 分支）

```
src/
├── App.tsx                 # 主畫面、預設輸入（依語系）、計算觸發
├── components/
│   ├── InputForm.tsx       # 基本／稅／房產／風險熱圖表單
│   ├── AdvancedTaxForm.tsx # 高擬真稅制表單
│   ├── RealEstateForm.tsx  # 房產參數表單
│   ├── RiskHeatmapForm.tsx # 風險熱圖參數
│   ├── RiskHeatmap.tsx     # 熱圖圖表
│   ├── Results.tsx         # 結果卡片、帳戶對照、年度表
│   ├── AccountComparison.tsx
│   ├── MonteCarloSimulation.tsx  # Monte Carlo 區塊
│   ├── LanguageSwitcher.tsx
│   └── Tooltip.tsx
├── contexts/
│   └── LanguageContext.tsx # 多語系
├── types/
│   └── index.ts            # FireInputs, CalculationResult, YearlyData, RiskHeatmapResult, MonteCarlo* 等
├── utils/
│   ├── calculator.ts       # FireCalculator：驗證、有效報酬、稅（簡易/進階）、年度模擬、房產現金流、風險熱圖
│   ├── monteCarloEngine.ts # Monte Carlo 引擎
│   └── exportUtils.ts
└── ...
```

## 計算邏輯摘要

- **應稅帳戶**：費用 → 股息與股息稅 → 價格成長 → 提領先用稅後股息，不足則賣出資產 → 資本利得稅、成本基礎更新。
- **延稅帳戶**：年內不課投資稅，提領時課提領稅，費用按年扣除。
- **免稅帳戶**：無稅，僅扣費用。
- **所需資產**：以二分法對「起始資產」做年度模擬，使第 n 年末餘額 ≥ 0，得到精算所需起始資產。
- **風險熱圖**：固定起始資產（如 4% 法則基準），對多組（提領率 × 股票配置）跑多路徑模擬，計算破產率矩陣；可選含房產現金流與房價隨機路徑。

## 本地開發

```bash
git clone https://github.com/kylewangtw/FIRE-calculator.git
cd FIRE-calculator
npm install
npm start          # 開發
npm run build      # 生產建置
npm run deploy     # 部署到 GitHub Pages（會 build 後推到 gh-pages）
```

> 目前 `gh-pages` 分支為建置產物；原始碼在 `main`。開發請在 `main` 上進行，再 `npm run deploy` 更新線上版。

## 注意事項

- 本工具僅供參考，不構成投資建議。
- 稅率與稅制為近似模型；高擬真模式含級距與扣除額，仍非完整稅務申報。
- 資本利得以平均成本法估算。
- 建議諮詢專業財務／稅務顧問。

## 授權與聯絡

- **授權**：MIT License  
- **貢獻**：歡迎 Issue 與 Pull Request  
- **聯絡**：透過 GitHub Issues
