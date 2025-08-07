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
    firstYearWithdrawalTooltip: '第一年度從投資組合中提領的金額，會根據通膨率逐年調整',
    inflationRate: '通膨率 (%)',
    inflationRateTooltip: '年度通貨膨脹率，用於調整未來年度的提領金額',
    years: '年期',
    yearsTooltip: '規劃的退休年期，從開始提領到結束的總年數',
    dividendYield: '股息殖利率 (%)',
    dividendYieldTooltip: '投資組合的年度股息和利息收入佔總資產的百分比',
    priceGrowth: '價格成長率 (%)',
    priceGrowthTooltip: '投資組合的年度價格成長率，不包括股息收入',
    withdrawalTiming: '提領時點',
    withdrawalTimingTooltip: '每年提領的時點，期初提領會影響年度投資報酬',
    endOfPeriod: '期末',
    beginningOfPeriod: '期初',
    
    // Taxes and Fees
    taxesAndFees: '稅與費用',
    totalFeeRate: '總費用率 (%)',
    totalFeeRateTooltip: '年度總費用率，包括基金費用、顧問費用等，對資產年收',
    accountType: '帳戶型態',
    accountTypeTooltip: '選擇帳戶的稅務類型，影響稅負計算方式',
    targetAmountMode: '目標金額模式',
    targetAmountModeTooltip: '選擇目標金額是稅前提領還是稅後到手金額',
    dividendTaxRate: '股息利息稅率 (%)',
    dividendTaxRateTooltip: '股息和利息收入的稅率，適用於一般應稅帳戶',
    capitalGainsTaxRate: '資本利得稅率 (%)',
    capitalGainsTaxRateTooltip: '資本利得稅率，僅在賣出資產實現利得時課徵',
    withdrawalTaxRate: '提領稅率 (%)',
    withdrawalTaxRateTooltip: '延稅帳戶提領時的稅率，如傳統退休帳戶',
    
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
    
    // v1.3 Advanced Tax Features
    advancedTaxFeatures: '進階稅務功能',
    useAdvancedTax: '使用進階稅務計算',
    useAdvancedTaxTooltip: '啟用進階稅務計算，考慮個人所得稅、股息扣繳稅、外國扣繳稅等',
    taxBrackets: '稅率級距',
    taxBracketsTooltip: '自訂個人所得稅的稅率級距',
    addTaxBracket: '新增稅率級距',
    removeTaxBracket: '移除稅率級距',
    minIncome: '最低收入',
    maxIncome: '最高收入',
    marginalRate: '邊際稅率',
    exemptions: '扣除額',
    exemptionsTooltip: '考慮個人所得稅的標準扣除額、個人免稅額、股息免稅額、資本利得免稅額等',
    personalExemption: '個人免稅額',
    standardDeduction: '標準扣除額',
    dividendExemption: '股息免稅額',
    capitalGainsExemption: '資本利得免稅額',
    withholdingTax: '扣繳稅',
    withholdingTaxTooltip: '考慮股息扣繳稅、外國扣繳稅等',
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
    monteCarloTooltip: '進行蒙地卡羅模擬，評估退休計劃的風險與成功率',
    volatility: '波動率',
    volatilityTooltip: '投資組合的預期波動率',
    simulations: '模擬次數',
    simulationsTooltip: '模擬次數越多，結果越準確',
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
    firstYearWithdrawalTooltip: 'Amount withdrawn from portfolio in the first year, adjusted annually for inflation',
    inflationRate: 'Inflation Rate (%)',
    inflationRateTooltip: 'Annual inflation rate used to adjust future withdrawal amounts',
    years: 'Years',
    yearsTooltip: 'Planned retirement period, total years from start to end of withdrawals',
    dividendYield: 'Dividend Yield (%)',
    dividendYieldTooltip: 'Annual dividend and interest income as percentage of total portfolio assets',
    priceGrowth: 'Price Growth Rate (%)',
    priceGrowthTooltip: 'Annual portfolio price growth rate, excluding dividend income',
    withdrawalTiming: 'Withdrawal Timing',
    withdrawalTimingTooltip: 'When to withdraw each year, beginning withdrawals affect annual investment returns',
    endOfPeriod: 'End of Period',
    beginningOfPeriod: 'Beginning of Period',
    
    // Taxes and Fees
    taxesAndFees: 'Taxes and Fees',
    totalFeeRate: 'Total Fee Rate (%)',
    totalFeeRateTooltip: 'Annual total fee rate including fund fees, advisor fees, etc., charged on assets',
    accountType: 'Account Type',
    accountTypeTooltip: 'Choose account tax type, affects tax calculation method',
    targetAmountMode: 'Target Amount Mode',
    targetAmountModeTooltip: 'Choose whether target amount is pre-tax withdrawal or after-tax amount',
    dividendTaxRate: 'Dividend Tax Rate (%)',
    dividendTaxRateTooltip: 'Tax rate on dividend and interest income, applies to general taxable accounts',
    capitalGainsTaxRate: 'Capital Gains Tax Rate (%)',
    capitalGainsTaxRateTooltip: 'Capital gains tax rate, only charged when selling assets to realize gains',
    withdrawalTaxRate: 'Withdrawal Tax Rate (%)',
    withdrawalTaxRateTooltip: 'Tax rate on withdrawals from tax-deferred accounts like traditional retirement accounts',
    
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
    
    // v1.3 Advanced Tax Features
    advancedTaxFeatures: 'Advanced Tax Features',
    useAdvancedTax: 'Use Advanced Tax Calculation',
    useAdvancedTaxTooltip: 'Enable advanced tax calculation, considering personal income tax, dividend withholding tax, foreign withholding tax, etc.',
    taxBrackets: 'Tax Brackets',
    taxBracketsTooltip: 'Customize tax brackets for personal income tax',
    addTaxBracket: 'Add Tax Bracket',
    removeTaxBracket: 'Remove Tax Bracket',
    minIncome: 'Minimum Income',
    maxIncome: 'Maximum Income',
    marginalRate: 'Marginal Rate',
    exemptions: 'Exemptions',
    exemptionsTooltip: 'Consider standard deduction, personal exemption, dividend exemption, capital gains exemption, etc. for personal income tax',
    personalExemption: 'Personal Exemption',
    standardDeduction: 'Standard Deduction',
    dividendExemption: 'Dividend Exemption',
    capitalGainsExemption: 'Capital Gains Exemption',
    withholdingTax: 'Withholding Tax',
    withholdingTaxTooltip: 'Consider dividend withholding tax, foreign withholding tax, etc.',
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
    monteCarloTooltip: 'Perform Monte Carlo simulation to assess the risk and success rate of the retirement plan',
    volatility: 'Volatility',
    volatilityTooltip: 'Expected volatility of the portfolio',
    simulations: 'Simulations',
    simulationsTooltip: 'More simulations result in more accurate results',
    bankruptcyProbability: 'Bankruptcy Probability',
    successRate: 'Success Rate',
    worstCase: 'Worst Case',
    bestCase: 'Best Case',
    medianCase: 'Median Case',
  },
}; 