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

export interface CalculationResult {
  taxableRequired: number;
  deferredRequired: number;
  taxfreeRequired: number;
  yearlyData: YearlyData[];
  firstYearFees: number;
  firstYearTaxes: number;
  fourPercentRule: number;
} 