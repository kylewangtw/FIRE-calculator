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
  startMonteCarlo: string;
  calculating: string;
  monteCarloCalculating: string;
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
  standardDeduction: string;
  dividendExemption: string;
  capitalGainsExemption: string;
  withholdingTax: string;
  withholdingTaxTooltip: string;
  dividendWithholding: string;
  foreignWithholding: string;
  applyToForeign: string;
  
  // v1.4 Comparison and Reports
  comparisonAndReports: string;
  accountComparison: string;
  exportCSV: string;
  charts: string;
  assetGrowthChart: string;
  taxComparisonChart: string;
  
  // v1.5 Monte Carlo
  monteCarlo: string;
  monteCarloTooltip: string;
  volatility: string;
  volatilityTooltip: string;
  simulations: string;
  simulationsTooltip: string;
  bankruptcyProbability: string;
  successRate: string;
  worstCase: string;
  bestCase: string;
  medianCase: string;
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
    startMonteCarlo: '開始蒙地卡羅模擬',
    calculating: '計算中...',
    monteCarloCalculating: '蒙地卡羅模擬計算中...',
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
    standardDeduction: '標準扣除額',
    dividendExemption: '股息免稅額',
    capitalGainsExemption: '資本利得免稅額',
    withholdingTax: '扣繳稅',
    withholdingTaxTooltip: '考慮股息扣繳稅、外國扣繳稅等。股息扣繳稅是投資標的發放股息時預先扣繳的稅款，外國扣繳稅是投資海外標的時當地政府扣繳的稅款。這些稅款會減少實際收到的收入。',
    dividendWithholding: '股息扣繳稅',
    foreignWithholding: '外國扣繳稅',
    applyToForeign: '適用於外國收入',
    
    // v1.4 Comparison and Reports
    comparisonAndReports: '比較與報表',
    accountComparison: '帳戶比較',
    exportCSV: '匯出 CSV',
    charts: '圖表',
    assetGrowthChart: '資產成長圖',
    taxComparisonChart: '稅務比較圖',
    
    // v1.5 Monte Carlo
    monteCarlo: '蒙地卡羅模擬',
    monteCarloTooltip: '進行蒙地卡羅模擬，評估退休計劃的風險與成功率。蒙地卡羅模擬會進行數千次隨機模擬，考慮投資報酬的波動性，計算在不同市場情況下退休計劃的成功機率。這比傳統的固定報酬率計算更真實。',
    volatility: '波動率',
    volatilityTooltip: '投資組合的預期波動率，表示年度報酬率的標準差。較高的波動率表示報酬變化較大，風險較高。一般股票型基金波動率約 15-20%，債券型基金約 5-10%。波動率越高，破產風險越高。',
    simulations: '模擬次數',
    simulationsTooltip: '蒙地卡羅模擬的次數，次數越多結果越精確但計算時間越長。建議設定 1000-10000 次。1000 次約需 1-3 秒，10000 次約需 5-15 秒。',
    bankruptcyProbability: '破產機率',
    successRate: '成功率',
    worstCase: '最差情況',
    bestCase: '最佳情況',
    medianCase: '中位數情況',
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
    startMonteCarlo: 'Start Monte Carlo Simulation',
    calculating: 'Calculating...',
    monteCarloCalculating: 'Monte Carlo Simulation Calculating...',
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
    standardDeduction: 'Standard Deduction',
    dividendExemption: 'Dividend Exemption',
    capitalGainsExemption: 'Capital Gains Exemption',
    withholdingTax: 'Withholding Tax',
    withholdingTaxTooltip: 'Consider dividend withholding tax, foreign withholding tax, etc. Dividend withholding tax is pre-withheld tax when investments pay dividends, foreign withholding tax is local government tax on foreign investments. These taxes reduce actual income received.',
    dividendWithholding: 'Dividend Withholding',
    foreignWithholding: 'Foreign Withholding',
    applyToForeign: 'Apply to Foreign Income',
    
    // v1.4 Comparison and Reports
    comparisonAndReports: 'Comparison and Reports',
    accountComparison: 'Account Comparison',
    exportCSV: 'Export CSV',
    charts: 'Charts',
    assetGrowthChart: 'Asset Growth Chart',
    taxComparisonChart: 'Tax Comparison Chart',
    
    // v1.5 Monte Carlo
    monteCarlo: 'Monte Carlo Simulation',
    monteCarloTooltip: 'Perform Monte Carlo simulation to assess the risk and success rate of the retirement plan. Monte Carlo simulation runs thousands of random simulations considering investment return volatility, calculating success probability under different market conditions. This is more realistic than traditional fixed return calculations.',
    volatility: 'Volatility',
    volatilityTooltip: 'Expected volatility of the portfolio, representing the standard deviation of annual returns. Higher volatility means more variable returns and higher risk. Stock funds typically have 15-20% volatility, bond funds 5-10%. Higher volatility increases bankruptcy risk.',
    simulations: 'Simulations',
    simulationsTooltip: 'Number of Monte Carlo simulations, more simulations give more accurate results but longer calculation time. Recommend 1000-10000 simulations. 1000 simulations take 1-3 seconds, 10000 take 5-15 seconds.',
    bankruptcyProbability: 'Bankruptcy Probability',
    successRate: 'Success Rate',
    worstCase: 'Worst Case',
    bestCase: 'Best Case',
    medianCase: 'Median Case',
  },
}; 