export interface FireInputs {
  // 基本參數
  withdrawal: number; // 第一年度目標提領
  inflation: number; // 通膨率 (%)
  dividendYield: number; // 股息利息殖利率 (%)
  priceGrowth: number; // 價格成長率 (%)
  years: number; // 年期
  timing: 'begin' | 'end'; // 提領時點
  
  // 稅與費用
  feeRate: number; // 總費用率 (%)
  accountType: 'taxable' | 'deferred' | 'taxfree'; // 帳戶型態
  dividendTaxRate: number; // 股息利息稅率 (%)
  capitalGainsTaxRate: number; // 資本利得稅率 (%)
  withdrawalTaxRate: number; // 提領稅率 (%)
  targetMode: 'gross' | 'net'; // 目標金額模式
  
  // v1.3 高擬真稅制
  useAdvancedTax: boolean; // 是否使用高擬真稅制
  taxBrackets: TaxBracket[]; // 稅級距
  exemptions: TaxExemptions; // 免稅額
  withholdingTax: WithholdingTax; // 預扣稅
  
  // v1.5 蒙地卡羅模擬
  useMonteCarlo: boolean; // 是否使用蒙地卡羅模擬
  volatility: number; // 波動率 (%)
  simulations: number; // 模擬次數
}

export interface TaxBracket {
  minIncome: number; // 最低收入
  maxIncome: number | null; // 最高收入 (null 表示無上限)
  rate: number; // 邊際稅率 (%)
}

export interface TaxExemptions {
  personalExemption: number; // 個人免稅額
  standardDeduction: number; // 標準扣除額
  dividendExemption: number; // 股息免稅額
  capitalGainsExemption: number; // 資本利得免稅額
}

export interface WithholdingTax {
  dividendWithholding: number; // 股息預扣稅率 (%)
  foreignWithholding: number; // 海外預扣稅率 (%)
  applyToForeign: boolean; // 是否適用海外投資
}

export interface YearlyData {
  year: number;
  beginningBalance: number;
  fees: number;
  dividends: number;
  dividendTax: number;
  priceGrowth: number;
  realizedGains: number;
  capitalGainsTax: number;
  withdrawalTax: number;
  grossWithdrawal: number;
  netWithdrawal: number;
  endingBalance: number;
  costBasis: number;
}

export interface MonteCarloResult {
  successRate: number; // 成功率
  bankruptcyProbability: number; // 破產機率
  worstCase: number; // 最差情況所需資產
  bestCase: number; // 最佳情況所需資產
  medianCase: number; // 中位數情況所需資產
  percentiles: number[]; // 各百分位數的所需資產
}

export interface CalculationResult {
  taxableRequired: number;
  deferredRequired: number;
  taxfreeRequired: number;
  yearlyData: YearlyData[];
  firstYearFees: number;
  firstYearTaxes: number;
  fourPercentRule: number;
  monteCarloResult?: MonteCarloResult; // v1.5 蒙地卡羅結果
} 