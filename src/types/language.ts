export type Language = 'zh-TW' | 'en-US';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  disclaimer: string;
  
  // Basic Parameters
  basicParameters: string;
  firstYearWithdrawal: string;
  firstYearWithdrawalTooltip: string;
  inflationRate: string;
  inflationRateTooltip: string;
  years: string;
  yearsTooltip: string;
  dividendYield: string;
  dividendYieldTooltip: string;
  priceGrowth: string;
  priceGrowthTooltip: string;
  withdrawalTiming: string;
  withdrawalTimingTooltip: string;
  endOfPeriod: string;
  beginningOfPeriod: string;
  
  // Taxes and Fees
  taxesAndFees: string;
  totalFeeRate: string;
  totalFeeRateTooltip: string;
  accountType: string;
  accountTypeTooltip: string;
  targetAmountMode: string;
  targetAmountModeTooltip: string;
  dividendTaxRate: string;
  dividendTaxRateTooltip: string;
  capitalGainsTaxRate: string;
  capitalGainsTaxRateTooltip: string;
  withdrawalTaxRate: string;
  withdrawalTaxRateTooltip: string;
  
  // Account Types
  generalTaxable: string;
  taxDeferred: string;
  taxFree: string;
  
  // Target Modes
  preTaxWithdrawal: string;
  afterTaxWithdrawal: string;
  
  // Validation Messages
  dividendPlusGrowth: string;
  taxRateRange: string;
  feeRateRange: string;
  
  // Results
  requiredInitialAssets: string;
  generalTaxableAccount: string;
  taxDeferredAccount: string;
  taxFreeAccount: string;
  firstYearFees: string;
  firstYearTaxes: string;
  fourPercentRule: string;
  fourPercentRuleNote: string;
  
  // Yearly Table
  yearlyCashFlow: string;
  year: string;
  beginningBalance: string;
  fees: string;
  dividends: string;
  dividendTax: string;
  priceGrowthAmount: string;
  realizedGains: string;
  capitalGainsTax: string;
  withdrawalTax: string;
  grossWithdrawal: string;
  netWithdrawal: string;
  endingBalance: string;
  showingFirst10Years: string;
  
  // Errors
  calculationError: string;
  genericError: string;
  
  // Language Switcher
  language: string;
  switchToEnglish: string;
  switchToChinese: string;
  
  // Calculate Button
  calculateResults: string;
  calculating: string;
  calculatingDescription: string;
  
  // v1.3 Advanced Tax Features
  advancedTaxFeatures: string;
  useAdvancedTax: string;
  useAdvancedTaxTooltip: string;
  taxBrackets: string;
  taxBracketsTooltip: string;
  addTaxBracket: string;
  removeTaxBracket: string;
  minIncome: string;
  maxIncome: string;
  marginalRate: string;
  exemptions: string;
  exemptionsTooltip: string;
  personalExemption: string;
  personalExemptionTooltip: string;
  standardDeduction: string;
  standardDeductionTooltip: string;
  dividendExemption: string;
  dividendExemptionTooltip: string;
  capitalGainsExemption: string;
  capitalGainsExemptionTooltip: string;
  withholdingTax: string;
  withholdingTaxTooltip: string;
  dividendWithholding: string;
  dividendWithholdingTooltip: string;
  foreignWithholding: string;
  foreignWithholdingTooltip: string;
  applyToForeign: string;
  applyToForeignTooltip: string;
  
  // v1.4 Comparison and Reports
  comparisonAndReports: string;
  accountComparison: string;
  exportCSV: string;
  charts: string;
  assetGrowthChart: string;
  taxComparisonChart: string;
  
  // v2.0 Real Estate Module
  realEstateModule: string;
  useRealEstate: string;
  useRealEstateTooltip: string;
  propertyValue: string;
  propertyValueTooltip: string;
  annualRent: string;
  annualRentTooltip: string;
  vacancyRate: string;
  vacancyRateTooltip: string;
  maintenanceRate: string;
  maintenanceRateTooltip: string;
  propertyGrowthRate: string;
  propertyGrowthRateTooltip: string;
  propertyVolatility: string;
  propertyVolatilityTooltip: string;
  mortgageAmount: string;
  mortgageAmountTooltip: string;
  mortgageRate: string;
  mortgageRateTooltip: string;
  mortgageYears: string;
  mortgageYearsTooltip: string;
  rentTaxRate: string;
  rentTaxRateTooltip: string;
  
  // v2.0 Risk Heatmap
  riskHeatmap: string;
  riskHeatmapSettings: string;
  useRiskHeatmap: string;
  useRiskHeatmapTooltip: string;
  stockAllocation: string;
  stockAllocationTooltip: string;
  bondAllocation: string;
  bondAllocationTooltip: string;
  stockReturn: string;
  stockReturnTooltip: string;
  stockVolatility: string;
  stockVolatilityTooltip: string;
  bondReturn: string;
  bondReturnTooltip: string;
  bondVolatility: string;
  bondVolatilityTooltip: string;
  stockBondCorrelation: string;
  stockBondCorrelationTooltip: string;
  stockPropertyCorrelation: string;
  stockPropertyCorrelationTooltip: string;
  bondPropertyCorrelation: string;
  bondPropertyCorrelationTooltip: string;
  withdrawalRate: string;
  withdrawalRateTooltip: string;
  bankruptcyRate: string;
  bankruptcyRateTooltip: string;
  withRealEstate: string;
  withoutRealEstate: string;
  realEstateImpact: string;
  realEstateImpactTooltip: string;

  medianCase: string;
  
  // Risk Heatmap specific translations
  riskHeatmapTitle: string;
  riskHeatmapDescription: string;
  stockPercentage: string;
  withdrawalRatePercentage: string;
  bankruptcyRatePercentage: string;
  riskLevelLow: string;
  riskLevelMedium: string;
  riskLevelHigh: string;
  riskLevelVeryHigh: string;
  riskHeatmapInstructions: string;
  riskHeatmapInstructions1: string;
  riskHeatmapInstructions2: string;
  riskHeatmapInstructions3: string;
  riskHeatmapInstructions4: string;
  
  // Real Estate Module specific translations
  realEstateInstructions: string;
  realEstateInstructions1: string;
  realEstateInstructions2: string;
  realEstateInstructions3: string;
  
  // Account Comparison specific translations
  best: string;
  worst: string;
  difference: string;
  
  // Results specific translations
  detailedInformation: string;
  
  // Language names
  chinese: string;
  english: string;
  
  // Risk level descriptions
  riskLevelDescription: string;
  
  // Chart axis labels
  xAxis: string;
  yAxis: string;
  
  // Monte Carlo Simulation
  monteCarloSimulation: string;
  simulationYears: string;
  simulationYearsTooltip: string;
  simulationPaths: string;
  simulationPathsTooltip: string;
  criticalWithdrawalRate: string;
  computationTime: string;
  pathsUsed: string;
  p50EndValue: string;
  bankruptcyRateDataTable: string;
  bankruptcyRateHeatmap: string;
  simulationInProgress: string;
  startSimulation: string;
  lowRisk: string;
  mediumRisk: string;
  highRisk: string;
  veryHighRisk: string;
  greenLowBankruptcy: string;
  redHighBankruptcy: string;
  yAxisWithdrawalRate: string;
  xAxisStockAllocation: string;
  stockAllocationLabel: string;
  withdrawalRateLabel: string;
  bankruptcyRateLabel: string;
  propertyReturn: string;
  propertyReturnTooltip: string;
}

export const translations: Record<Language, Translations> = {
  'zh-TW': {
    // Header
    title: 'FIRE 提領計算器',
    subtitle: '含稅負與費用的財務獨立退休規劃工具',
    disclaimer: '本工具僅供參考，不構成投資建議。請諮詢專業財務顧問。',
    
    // Basic Parameters
    basicParameters: '基本參數',
    firstYearWithdrawal: '第一年度目標提領 (元)',
    firstYearWithdrawalTooltip: '退休後第一年從投資組合中提領的金額。這個金額會根據通膨率逐年調整，確保購買力不變。例如：設定 150 萬元，通膨率 2%，第二年會自動調整為 153 萬元。',
    inflationRate: '通膨率 (%)',
    inflationRateTooltip: '年度通貨膨脹率，用於調整未來年度的提領金額。歷史平均約 2-3%。較高的通膨率會大幅增加所需資產，因為提領金額會逐年增加。',
    years: '年期',
    yearsTooltip: '規劃的退休年期，從開始提領到結束的總年數。較長的年期需要更多資產，因為需要支撐更長時間的提領。一般建議規劃 30-40 年。',
    dividendYield: '股息殖利率 (%)',
    dividendYieldTooltip: '投資組合的年度股息和利息收入佔總資產的百分比。例如：殖利率 2% 表示每 100 萬元資產每年產生 2 萬元股息收入。這部分收入通常較穩定，可用於支付提領。',
    priceGrowth: '價格成長率 (%)',
    priceGrowthTooltip: '投資組合的年度價格成長率，不包括股息收入。例如：價格成長率 3% 表示投資標的本身價值每年成長 3%。這部分收益需要賣出資產才能實現。',
    withdrawalTiming: '提領時點',
    withdrawalTimingTooltip: '每年提領的時點。期初提領會影響年度投資報酬，因為資金在年初就被提走；期末提領讓資金全年都在投資，可能獲得更多報酬。',
    endOfPeriod: '期末',
    beginningOfPeriod: '期初',
    
    // Taxes and Fees
    taxesAndFees: '稅與費用',
    totalFeeRate: '總費用率 (%)',
    totalFeeRateTooltip: '年度總費用率，包括基金費用、顧問費用、平台費用等，對資產年收。例如：費用率 0.25% 表示每 100 萬元資產每年支付 2,500 元費用。費用會直接減少投資報酬。',
    accountType: '帳戶型態',
    accountTypeTooltip: '選擇帳戶的稅務類型，影響稅負計算方式。一般應稅帳戶：股息和資本利得都要課稅；延稅帳戶：提領時才課稅；免稅帳戶：完全免稅。不同帳戶型態的稅負差異很大。',
    targetAmountMode: '目標金額模式',
    targetAmountModeTooltip: '選擇目標金額是稅前提領還是稅後到手金額。稅前提領：包含稅金的金額；稅後到手：扣除稅金後實際可用的金額。延稅帳戶選擇稅後模式時會自動換算所需稅前提領。',
    dividendTaxRate: '股息利息稅率 (%)',
    dividendTaxRateTooltip: '股息和利息收入的稅率，適用於一般應稅帳戶。台灣目前股息稅率約 28%，但可能有抵減額。較高的稅率會減少實際可用的股息收入。',
    capitalGainsTaxRate: '資本利得稅率 (%)',
    capitalGainsTaxRateTooltip: '資本利得稅率，僅在賣出資產實現利得時課徵。台灣目前資本利得稅率約 15%。當需要賣出資產支付提領時，會產生資本利得稅，減少實際可用的現金。',
    withdrawalTaxRate: '提領稅率 (%)',
    withdrawalTaxRateTooltip: '延稅帳戶提領時的稅率，如傳統退休帳戶。提領時會課徵所得稅，稅率依個人所得級距而定。例如：稅率 20% 表示提領 100 萬元實際只能拿到 80 萬元。',
    
    // Account Types
    generalTaxable: '一般應稅',
    taxDeferred: '延稅',
    taxFree: '免稅',
    
    // Target Modes
    preTaxWithdrawal: '稅前提領',
    afterTaxWithdrawal: '稅後到手',
    
    // Validation Messages
    dividendPlusGrowth: '股息殖利率 + 價格成長率 = 總報酬率',
    taxRateRange: '稅率範圍：0-60%',
    feeRateRange: '費用率範圍：0-3%',
    
    // Results
    requiredInitialAssets: '所需起始資產',
    generalTaxableAccount: '一般應稅帳戶',
    taxDeferredAccount: '延稅帳戶',
    taxFreeAccount: '免稅帳戶',
    firstYearFees: '第一年費用',
    firstYearTaxes: '第一年稅額',
    fourPercentRule: '4% 法則對照',
    fourPercentRuleNote: '（僅供參考，未考慮稅負與費用）',
    
    // Yearly Table
    yearlyCashFlow: '年度現金流表',
    year: '年',
    beginningBalance: '期初資產',
    fees: '費用',
    dividends: '股息',
    dividendTax: '股息稅',
    priceGrowthAmount: '價格成長',
    realizedGains: '已實現利得',
    capitalGainsTax: '資本利得稅',
    withdrawalTax: '提領稅',
    grossWithdrawal: '稅前提領',
    netWithdrawal: '稅後到手',
    endingBalance: '期末資產',
    showingFirst10Years: '顯示前 10 年，共 {total} 年',
    
    // Errors
    calculationError: '計算錯誤',
    genericError: '計算發生錯誤',
    
    // Language Switcher
    language: '語言',
    switchToEnglish: 'Switch to English',
    switchToChinese: '切換到中文',
    
    // Calculate Button
    calculateResults: '計算結果',
    calculating: '計算中...',
    calculatingDescription: '請稍候，系統正在進行複雜的計算。',
    
    // v1.3 Advanced Tax Features
    advancedTaxFeatures: '進階稅務功能',
    useAdvancedTax: '使用進階稅務計算',
    useAdvancedTaxTooltip: '啟用進階稅務計算，考慮個人所得稅級距、標準扣除額、個人免稅額、股息免稅額、資本利得免稅額、股息扣繳稅、外國扣繳稅等更精確的稅務影響。這會讓計算更接近實際稅務情況。',
    taxBrackets: '稅率級距',
    taxBracketsTooltip: '自訂個人所得稅的稅率級距。可以設定多個級距，每個級距有最低收入、最高收入和邊際稅率。系統會根據應稅所得計算實際稅額，而不是使用固定稅率。',
    addTaxBracket: '新增稅率級距',
    removeTaxBracket: '移除稅率級距',
    minIncome: '最低收入',
    maxIncome: '最高收入',
    marginalRate: '邊際稅率',
    exemptions: '扣除額',
    exemptionsTooltip: '考慮個人所得稅的標準扣除額、個人免稅額、股息免稅額、資本利得免稅額等。這些扣除額會減少應稅所得，降低實際稅負。標準扣除額和個人免稅額是基本扣除，股息和資本利得免稅額是額外優惠。',
    personalExemption: '個人免稅額',
    personalExemptionTooltip: '個人所得稅的標準扣除額，用於減少應稅所得。',
    standardDeduction: '標準扣除額',
    standardDeductionTooltip: '個人所得稅的標準扣除額，用於減少應稅所得。',
    dividendExemption: '股息免稅額',
    dividendExemptionTooltip: '股息收入的免稅額，用於減少應稅所得。',
    capitalGainsExemption: '資本利得免稅額',
    capitalGainsExemptionTooltip: '資本利得收入的免稅額，用於減少應稅所得。',
    withholdingTax: '扣繳稅',
    withholdingTaxTooltip: '考慮股息扣繳稅、外國扣繳稅等。股息扣繳稅是投資標的發放股息時預先扣繳的稅款，外國扣繳稅是投資海外標的時當地政府扣繳的稅款。這些稅款會減少實際收到的收入。',
    dividendWithholding: '股息扣繳稅',
    dividendWithholdingTooltip: '股息扣繳稅是投資標的發放股息時預先扣繳的稅款。',
    foreignWithholding: '外國扣繳稅',
    foreignWithholdingTooltip: '外國扣繳稅是投資海外標的時當地政府扣繳的稅款。',
    applyToForeign: '適用於外國收入',
    applyToForeignTooltip: '選擇此選項表示該收入來自於外國，可能需要考慮外國扣繳稅。',
    
    // v1.4 Comparison and Reports
    comparisonAndReports: '比較與報表',
    accountComparison: '帳戶比較',
    exportCSV: '匯出 CSV',
    charts: '圖表',
    assetGrowthChart: '資產成長圖',
    taxComparisonChart: '稅務比較圖',
    
    // v2.0 Real Estate Module
    realEstateModule: '房產模組',
    useRealEstate: '使用房產模組',
    useRealEstateTooltip: '啟用房產模組，考慮租金收入、空置率、維護費、房貸等因素對退休計劃的影響。房產可以作為額外的收入來源，但也會增加維護成本。',
    propertyValue: '房產市價 (元)',
    propertyValueTooltip: '房產的當前市場價值，用於計算房產的投資報酬和維護費用。',
    annualRent: '年租金 (元)',
    annualRentTooltip: '房產的年度租金收入，扣除空置率後為實際收入。',
    vacancyRate: '空置率 (%)',
    vacancyRateTooltip: '房產的年度空置率，表示無法出租的時間比例。空置期間沒有租金收入，但仍需支付維護費和房貸。',
    maintenanceRate: '維護費率 (%)',
    maintenanceRateTooltip: '房產年度維護費用佔房產價值的百分比，包括管理費、保險費、維修費等。',
    propertyGrowthRate: '房價成長率 (%)',
    propertyGrowthRateTooltip: '房產價值的年度成長率，用於計算房產的資本增值。',
    propertyVolatility: '房價波動率 (%)',
    propertyVolatilityTooltip: '房產價值的年度波動率，用於風險分析。',
    mortgageAmount: '房貸本金 (元)',
    mortgageAmountTooltip: '房貸的剩餘本金，用於計算每月房貸付款。',
    mortgageRate: '房貸利率 (%)',
    mortgageRateTooltip: '房貸的年度利率，用於計算每月房貸付款。',
    mortgageYears: '房貸年期',
    mortgageYearsTooltip: '房貸的剩餘年期，用於計算每月房貸付款。',
    rentTaxRate: '租金稅率 (%)',
    rentTaxRateTooltip: '租金收入的稅率，用於計算稅後租金收入。',
    
    // v2.0 Risk Heatmap
    riskHeatmap: '風險熱圖',
    riskHeatmapSettings: '風險熱圖設定',
    useRiskHeatmap: '使用風險熱圖',
    useRiskHeatmapTooltip: '啟用風險熱圖，顯示不同提領率和資產配置下的破產機率。這可以幫助找到最適合的提領策略。',
    stockAllocation: '股票配置比例 (%)',
    stockAllocationTooltip: '投資組合中股票的配置比例，影響整體報酬率和風險。',
    bondAllocation: '債券配置比例 (%)',
    bondAllocationTooltip: '投資組合中債券的配置比例，影響整體報酬率和風險。',
    stockReturn: '股票期望報酬率 (%)',
    stockReturnTooltip: '股票的年度期望報酬率，包括股息和價格成長。',
    stockVolatility: '股票波動率 (%)',
    stockVolatilityTooltip: '股票的年度波動率，表示報酬的變異性。',
    bondReturn: '債券期望報酬率 (%)',
    bondReturnTooltip: '債券的年度期望報酬率，包括利息和價格變動。',
    bondVolatility: '債券波動率 (%)',
    bondVolatilityTooltip: '債券的年度波動率，通常比股票低。',
    stockBondCorrelation: '股債相關係數',
    stockBondCorrelationTooltip: '股票和債券報酬的相關係數，影響投資組合的分散效果。',
    stockPropertyCorrelation: '股房相關係數',
    stockPropertyCorrelationTooltip: '股票和房產報酬的相關係數，影響投資組合的分散效果。',
    bondPropertyCorrelation: '債房相關係數',
    bondPropertyCorrelationTooltip: '債券和房產報酬的相關係數，影響投資組合的分散效果。',
    withdrawalRate: '提領率 (%)',
    withdrawalRateTooltip: '年度提領金額佔投資組合的百分比。',
    bankruptcyRate: '破產機率 (%)',
    bankruptcyRateTooltip: '在特定提領率和資產配置下，投資組合耗盡的機率。',
    withRealEstate: '含房產',
    withoutRealEstate: '無房產',
    realEstateImpact: '房產影響',
    realEstateImpactTooltip: '房產對破產風險的影響，可以作為額外收入來源或增加維護成本。',

    medianCase: '中位數情況',
    
    // Risk Heatmap specific translations
    riskHeatmapTitle: '風險熱圖',
    riskHeatmapDescription: '顯示不同提領率和資產配置下的破產機率。',
    stockPercentage: '股票配置比例',
    withdrawalRatePercentage: '提領率',
    bankruptcyRatePercentage: '破產機率',
    riskLevelLow: '低風險',
    riskLevelMedium: '中風險',
    riskLevelHigh: '高風險',
    riskLevelVeryHigh: '極高風險',
    riskHeatmapInstructions: '請調整以下參數以查看風險熱圖：',
    riskHeatmapInstructions1: '1. 調整「提領率」滑桿，觀察不同提領率下的破產機率。',
    riskHeatmapInstructions2: '2. 調整「股票配置比例」滑桿，觀察不同股票配置下的破產機率。',
    riskHeatmapInstructions3: '3. 調整「債券配置比例」滑桿，觀察不同債券配置下的破產機率。',
    riskHeatmapInstructions4: '4. 調整「房產配置比例」滑桿，觀察不同房產配置下的破產機率。',
    
    // Real Estate Module specific translations
    realEstateInstructions: '請調整以下參數以查看房產模組的影響：',
    realEstateInstructions1: '1. 調整「房產市價」滑桿，觀察房產價值變化對提領計算的影響。',
    realEstateInstructions2: '2. 調整「年租金」滑桿，觀察租金收入變化對提領計算的影響。',
    realEstateInstructions3: '3. 調整「空置率」滑桿，觀察空置率變化對提領計算的影響。',
    
    // Account Comparison specific translations
    best: '最佳',
    worst: '最差',
    difference: '差異',
    
    // Language names
    chinese: '中文',
    english: 'English',
    
    // Risk level descriptions
    riskLevelDescription: '低風險：綠色，高風險：紅色',
    
    // Chart axis labels
    xAxis: 'X軸',
    yAxis: 'Y軸',
    
    // Monte Carlo Simulation
    monteCarloSimulation: '蒙地卡羅模擬',
    simulationYears: '年期',
    simulationYearsTooltip: '模擬的投資年期長度',
    simulationPaths: '路徑數',
    simulationPathsTooltip: '隨機模擬的路徑數量，越多越精確但計算時間越長',
    criticalWithdrawalRate: '臨界提領率',
    computationTime: '計算時間',
    pathsUsed: '路徑數',
    p50EndValue: 'P50 終值',
    bankruptcyRateDataTable: '破產機率數據表',
    bankruptcyRateHeatmap: '破產機率熱圖',
    simulationInProgress: '模擬中...',
    startSimulation: '開始模擬',
    lowRisk: '低風險',
    mediumRisk: '中風險',
    highRisk: '高風險',
    veryHighRisk: '極高風險',
    greenLowBankruptcy: '綠色: 低破產機率',
    redHighBankruptcy: '紅色: 高破產機率',
    yAxisWithdrawalRate: 'Y軸: 提領率 (%)',
    xAxisStockAllocation: 'X軸: 股票配置 (%)',
    stockAllocationLabel: '股票配置比例',
    withdrawalRateLabel: '提領率',
    bankruptcyRateLabel: '破產機率',
    propertyReturn: '房產報酬率 (%)',
    propertyReturnTooltip: '房產的年度期望報酬率',
    detailedInformation: '詳細資訊',
  },
  'en-US': {
    // Header
    title: 'FIRE Withdrawal Calculator',
    subtitle: 'Financial Independence Retirement Planning Tool with Taxes and Fees',
    disclaimer: 'This tool is for reference only and does not constitute investment advice. Please consult a professional financial advisor.',
    
    // Basic Parameters
    basicParameters: 'Basic Parameters',
    firstYearWithdrawal: 'First Year Target Withdrawal ($)',
    firstYearWithdrawalTooltip: 'Amount withdrawn from portfolio in the first year of retirement. This amount will be adjusted annually for inflation to maintain purchasing power. Example: Setting $1.5M with 2% inflation means $1.53M in year 2.',
    inflationRate: 'Inflation Rate (%)',
    inflationRateTooltip: 'Annual inflation rate used to adjust future withdrawal amounts. Historical average is 2-3%. Higher inflation significantly increases required assets because withdrawal amounts increase each year.',
    years: 'Years',
    yearsTooltip: 'Planned retirement period, total years from start to end of withdrawals. Longer periods require more assets to support extended withdrawals. Generally recommend 30-40 years.',
    dividendYield: 'Dividend Yield (%)',
    dividendYieldTooltip: 'Annual dividend and interest income as percentage of total portfolio assets. Example: 2% yield means $20K income from $1M assets. This income is usually stable and can be used for withdrawals.',
    priceGrowth: 'Price Growth Rate (%)',
    priceGrowthTooltip: 'Annual portfolio price growth rate, excluding dividend income. Example: 3% growth means investment value increases 3% annually. This gain requires selling assets to realize.',
    withdrawalTiming: 'Withdrawal Timing',
    withdrawalTimingTooltip: 'When to withdraw each year. Beginning withdrawals affect annual returns because money is taken early; end withdrawals keep money invested longer for potential higher returns.',
    endOfPeriod: 'End of Period',
    beginningOfPeriod: 'Beginning of Period',
    
    // Taxes and Fees
    taxesAndFees: 'Taxes and Fees',
    totalFeeRate: 'Total Fee Rate (%)',
    totalFeeRateTooltip: 'Annual total fee rate including fund fees, advisor fees, platform fees, etc., charged on assets. Example: 0.25% fee means $2,500 cost on $1M assets annually. Fees directly reduce investment returns.',
    accountType: 'Account Type',
    accountTypeTooltip: 'Choose account tax type, affects tax calculation method. Taxable: dividends and capital gains taxed; Tax-deferred: taxed only on withdrawal; Tax-free: no taxes. Different account types have significant tax differences.',
    targetAmountMode: 'Target Amount Mode',
    targetAmountModeTooltip: 'Choose whether target amount is pre-tax withdrawal or after-tax amount. Pre-tax: includes taxes; After-tax: actual usable amount after taxes. Tax-deferred accounts automatically convert after-tax to pre-tax when needed.',
    dividendTaxRate: 'Dividend Tax Rate (%)',
    dividendTaxRateTooltip: 'Tax rate on dividend and interest income, applies to general taxable accounts. Current US dividend tax rate is about 15-20%. Higher rates reduce actual usable dividend income.',
    capitalGainsTaxRate: 'Capital Gains Tax Rate (%)',
    capitalGainsTaxRateTooltip: 'Capital gains tax rate, only charged when selling assets to realize gains. Current US capital gains tax rate is about 15-20%. When selling assets for withdrawals, capital gains tax reduces actual cash available.',
    withdrawalTaxRate: 'Withdrawal Tax Rate (%)',
    withdrawalTaxRateTooltip: 'Tax rate on withdrawals from tax-deferred accounts like traditional retirement accounts. Withdrawals are taxed as ordinary income based on tax brackets. Example: 20% rate means $100K withdrawal gives only $80K.',
    
    // Account Types
    generalTaxable: 'General Taxable',
    taxDeferred: 'Tax Deferred',
    taxFree: 'Tax Free',
    
    // Target Modes
    preTaxWithdrawal: 'Pre-tax Withdrawal',
    afterTaxWithdrawal: 'After-tax Withdrawal',
    
    // Validation Messages
    dividendPlusGrowth: 'Dividend Yield + Price Growth = Total Return Rate',
    taxRateRange: 'Tax Rate Range: 0-60%',
    feeRateRange: 'Fee Rate Range: 0-3%',
    
    // Results
    requiredInitialAssets: 'Required Initial Assets',
    generalTaxableAccount: 'General Taxable Account',
    taxDeferredAccount: 'Tax Deferred Account',
    taxFreeAccount: 'Tax Free Account',
    firstYearFees: 'First Year Fees',
    firstYearTaxes: 'First Year Taxes',
    fourPercentRule: '4% Rule Comparison',
    fourPercentRuleNote: '(For reference only, does not consider taxes and fees)',
    
    // Yearly Table
    yearlyCashFlow: 'Yearly Cash Flow Table',
    year: 'Year',
    beginningBalance: 'Beginning Balance',
    fees: 'Fees',
    dividends: 'Dividends',
    dividendTax: 'Dividend Tax',
    priceGrowthAmount: 'Price Growth',
    realizedGains: 'Realized Gains',
    capitalGainsTax: 'Capital Gains Tax',
    withdrawalTax: 'Withdrawal Tax',
    grossWithdrawal: 'Gross Withdrawal',
    netWithdrawal: 'After-tax Withdrawal',
    endingBalance: 'Ending Balance',
    showingFirst10Years: 'Showing first 10 years, total {total} years',
    
    // Errors
    calculationError: 'Calculation Error',
    genericError: 'Calculation error occurred',
    
    // Language Switcher
    language: 'Language',
    switchToEnglish: 'Switch to English',
    switchToChinese: '切換到中文',
    
    // Calculate Button
    calculateResults: 'Calculate Results',
    calculating: 'Calculating...',
    calculatingDescription: 'Please wait, the system is performing complex calculations.',
    
    // v1.3 Advanced Tax Features
    advancedTaxFeatures: 'Advanced Tax Features',
    useAdvancedTax: 'Use Advanced Tax Calculation',
    useAdvancedTaxTooltip: 'Enable advanced tax calculation considering personal income tax brackets, standard deduction, personal exemption, dividend exemption, capital gains exemption, dividend withholding tax, foreign withholding tax, etc. for more accurate tax impact. This makes calculations closer to actual tax situations.',
    taxBrackets: 'Tax Brackets',
    taxBracketsTooltip: 'Customize tax brackets for personal income tax. Can set multiple brackets with minimum income, maximum income, and marginal rate. System calculates actual tax based on taxable income instead of using fixed rate.',
    addTaxBracket: 'Add Tax Bracket',
    removeTaxBracket: 'Remove Tax Bracket',
    minIncome: 'Minimum Income',
    maxIncome: 'Maximum Income',
    marginalRate: 'Marginal Rate',
    exemptions: 'Exemptions',
    exemptionsTooltip: 'Consider standard deduction, personal exemption, dividend exemption, capital gains exemption, etc. for personal income tax. These exemptions reduce taxable income and lower actual tax burden. Standard deduction and personal exemption are basic deductions, dividend and capital gains exemptions are additional benefits.',
    personalExemption: 'Personal Exemption',
    personalExemptionTooltip: 'Standard deduction for personal income tax, used to reduce taxable income.',
    standardDeduction: 'Standard Deduction',
    standardDeductionTooltip: 'Standard deduction for personal income tax, used to reduce taxable income.',
    dividendExemption: 'Dividend Exemption',
    dividendExemptionTooltip: 'Dividend income exemption, used to reduce taxable income.',
    capitalGainsExemption: 'Capital Gains Exemption',
    capitalGainsExemptionTooltip: 'Capital gains income exemption, used to reduce taxable income.',
    withholdingTax: 'Withholding Tax',
    withholdingTaxTooltip: 'Consider dividend withholding tax, foreign withholding tax, etc. Dividend withholding tax is pre-withheld tax when investments pay dividends, foreign withholding tax is local government tax on foreign investments. These taxes reduce actual income received.',
    dividendWithholding: 'Dividend Withholding',
    dividendWithholdingTooltip: 'Dividend withholding tax is pre-withheld tax when investments pay dividends.',
    foreignWithholding: 'Foreign Withholding',
    foreignWithholdingTooltip: 'Foreign withholding tax is local government tax on foreign investments.',
    applyToForeign: 'Apply to Foreign Income',
    applyToForeignTooltip: 'Selecting this option means the income comes from abroad, which may require consideration of foreign withholding tax.',
    
    // v1.4 Comparison and Reports
    comparisonAndReports: 'Comparison and Reports',
    accountComparison: 'Account Comparison',
    exportCSV: 'Export CSV',
    charts: 'Charts',
    assetGrowthChart: 'Asset Growth Chart',
    taxComparisonChart: 'Tax Comparison Chart',
    
    // v2.0 Real Estate Module
    realEstateModule: 'Real Estate Module',
    useRealEstate: 'Use Real Estate Module',
    useRealEstateTooltip: 'Enable real estate module to consider rental income, vacancy rate, maintenance costs, mortgage payments, and other factors that affect retirement planning. Real estate can serve as an additional income source but also increases maintenance costs.',
    propertyValue: 'Property Value ($)',
    propertyValueTooltip: 'Current market value of the property, used to calculate property investment returns and maintenance costs.',
    annualRent: 'Annual Rent ($)',
    annualRentTooltip: 'Annual rental income from the property, actual income after deducting vacancy rate.',
    vacancyRate: 'Vacancy Rate (%)',
    vacancyRateTooltip: 'Annual vacancy rate of the property, indicating the proportion of time when the property cannot be rented. During vacancy periods, there is no rental income but maintenance costs and mortgage payments still apply.',
    maintenanceRate: 'Maintenance Rate (%)',
    maintenanceRateTooltip: 'Annual maintenance costs as a percentage of property value, including management fees, insurance, repairs, etc.',
    propertyGrowthRate: 'Property Growth Rate (%)',
    propertyGrowthRateTooltip: 'Annual growth rate of property value, used to calculate property capital appreciation.',
    propertyVolatility: 'Property Volatility (%)',
    propertyVolatilityTooltip: 'Annual volatility of property value, used for risk analysis.',
    mortgageAmount: 'Mortgage Principal ($)',
    mortgageAmountTooltip: 'Remaining mortgage principal, used to calculate monthly mortgage payments.',
    mortgageRate: 'Mortgage Rate (%)',
    mortgageRateTooltip: 'Annual mortgage interest rate, used to calculate monthly mortgage payments.',
    mortgageYears: 'Mortgage Years',
    mortgageYearsTooltip: 'Remaining mortgage term, used to calculate monthly mortgage payments.',
    rentTaxRate: 'Rent Tax Rate (%)',
    rentTaxRateTooltip: 'Tax rate on rental income, used to calculate after-tax rental income.',
    
    // v2.0 Risk Heatmap
    riskHeatmap: 'Risk Heatmap',
    riskHeatmapSettings: 'Risk Heatmap Settings',
    useRiskHeatmap: 'Use Risk Heatmap',
    useRiskHeatmapTooltip: 'Enable risk heatmap to display bankruptcy probability under different withdrawal rates and asset allocations. This helps find the most suitable withdrawal strategy.',
    stockAllocation: 'Stock Allocation (%)',
    stockAllocationTooltip: 'Stock allocation percentage in the investment portfolio, affecting overall returns and risk.',
    bondAllocation: 'Bond Allocation (%)',
    bondAllocationTooltip: 'Bond allocation percentage in the investment portfolio, affecting overall returns and risk.',
    stockReturn: 'Stock Expected Return (%)',
    stockReturnTooltip: 'Annual expected return of stocks, including dividends and price growth.',
    stockVolatility: 'Stock Volatility (%)',
    stockVolatilityTooltip: 'Annual volatility of stocks, indicating return variability.',
    bondReturn: 'Bond Expected Return (%)',
    bondReturnTooltip: 'Annual expected return of bonds, including interest and price changes.',
    bondVolatility: 'Bond Volatility (%)',
    bondVolatilityTooltip: 'Annual volatility of bonds, typically lower than stocks.',
    stockBondCorrelation: 'Stock-Bond Correlation',
    stockBondCorrelationTooltip: 'Correlation coefficient between stock and bond returns, affecting portfolio diversification.',
    stockPropertyCorrelation: 'Stock-Property Correlation',
    stockPropertyCorrelationTooltip: 'Correlation coefficient between stock and property returns, affecting portfolio diversification.',
    bondPropertyCorrelation: 'Bond-Property Correlation',
    bondPropertyCorrelationTooltip: 'Correlation coefficient between bond and property returns, affecting portfolio diversification.',
    withdrawalRate: 'Withdrawal Rate (%)',
    withdrawalRateTooltip: 'Annual withdrawal amount as a percentage of the investment portfolio.',
    bankruptcyRate: 'Bankruptcy Rate (%)',
    bankruptcyRateTooltip: 'Probability of portfolio depletion under specific withdrawal rates and asset allocations.',
    withRealEstate: 'With Real Estate',
    withoutRealEstate: 'Without Real Estate',
    realEstateImpact: 'Real Estate Impact',
    realEstateImpactTooltip: 'Impact of real estate on bankruptcy risk, can serve as additional income source or increase maintenance costs.',

    medianCase: 'Median Case',
    
    // Risk Heatmap specific translations
    riskHeatmapTitle: 'Risk Heatmap',
    riskHeatmapDescription: 'Display bankruptcy probability under different withdrawal rates and asset allocations.',
    stockPercentage: 'Stock Allocation (%)',
    withdrawalRatePercentage: 'Withdrawal Rate (%)',
    bankruptcyRatePercentage: 'Bankruptcy Rate (%)',
    riskLevelLow: 'Low Risk',
    riskLevelMedium: 'Medium Risk',
    riskLevelHigh: 'High Risk',
    riskLevelVeryHigh: 'Very High Risk',
    riskHeatmapInstructions: 'Please adjust the following parameters to view the risk heatmap:',
    riskHeatmapInstructions1: '1. Adjust the "Withdrawal Rate" slider to observe bankruptcy probability at different withdrawal rates.',
    riskHeatmapInstructions2: '2. Adjust the "Stock Allocation" slider to observe bankruptcy probability at different stock allocations.',
    riskHeatmapInstructions3: '3. Adjust the "Bond Allocation" slider to observe bankruptcy probability at different bond allocations.',
    riskHeatmapInstructions4: '4. Adjust the "Real Estate Allocation" slider to observe bankruptcy probability at different real estate allocations.',
    
    // Real Estate Module specific translations
    realEstateInstructions: 'Please adjust the following parameters to view the real estate module impact:',
    realEstateInstructions1: '1. Adjust the "Property Value" slider to observe the impact of property value changes on the withdrawal calculation.',
    realEstateInstructions2: '2. Adjust the "Annual Rent" slider to observe the impact of rental income changes on the withdrawal calculation.',
    realEstateInstructions3: '3. Adjust the "Vacancy Rate" slider to observe the impact of vacancy rate changes on the withdrawal calculation.',
    
    // Account Comparison specific translations
    best: 'Best',
    worst: 'Worst',
    difference: 'Difference',
    
    // Language names
    chinese: 'Chinese',
    english: 'English',
    
    // Risk level descriptions
    riskLevelDescription: 'Low Risk: Green, High Risk: Red',
    
    // Chart axis labels
    xAxis: 'X-axis',
    yAxis: 'Y-axis',
    
    // Monte Carlo Simulation
    monteCarloSimulation: 'Monte Carlo Simulation',
    simulationYears: 'Years',
    simulationYearsTooltip: 'Length of investment simulation period',
    simulationPaths: 'Paths',
    simulationPathsTooltip: 'Number of random simulation paths, more paths are more accurate but take longer to calculate',
    criticalWithdrawalRate: 'Critical Withdrawal Rate',
    computationTime: 'Computation Time',
    pathsUsed: 'Paths Used',
    p50EndValue: 'P50 End Value',
    bankruptcyRateDataTable: 'Bankruptcy Rate Data Table',
    bankruptcyRateHeatmap: 'Bankruptcy Rate Heatmap',
    simulationInProgress: 'Simulating...',
    startSimulation: 'Start Simulation',
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
    veryHighRisk: 'Very High Risk',
    greenLowBankruptcy: 'Green: Low Bankruptcy Rate',
    redHighBankruptcy: 'Red: High Bankruptcy Rate',
    yAxisWithdrawalRate: 'Y-axis: Withdrawal Rate (%)',
    xAxisStockAllocation: 'X-axis: Stock Allocation (%)',
    stockAllocationLabel: 'Stock Allocation',
    withdrawalRateLabel: 'Withdrawal Rate',
    bankruptcyRateLabel: 'Bankruptcy Rate',
    propertyReturn: 'Property Return (%)',
    propertyReturnTooltip: 'Annual expected return of property',
    detailedInformation: 'Detailed Information',
  },
}; 