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
  


  // v2.0 房產模組
  useRealEstate: boolean; // 是否包含房產
  propertyValue: number; // 房產市價
  annualRent: number; // 年租金
  vacancyRate: number; // 空置率 (%)
  maintenanceRate: number; // 維護費率 (%)
  propertyGrowthRate: number; // 房價年增長率 (%)
  propertyVolatility: number; // 房價波動率 (%)
  mortgageAmount: number; // 房貸本金
  mortgageRate: number; // 房貸利率 (%)
  mortgageYears: number; // 房貸年期
  rentTaxRate: number; // 租金稅率 (%)

  // v2.0 風險熱圖
  useRiskHeatmap: boolean; // 是否使用風險熱圖
  stockAllocation: number; // 股票配置比例 (%)
  bondAllocation: number; // 債券配置比例 (%)
  stockReturn: number; // 股票期望報酬率 (%)
  stockVolatility: number; // 股票波動率 (%)
  bondReturn: number; // 債券期望報酬率 (%)
  bondVolatility: number; // 債券波動率 (%)
  stockBondCorrelation: number; // 股債相關係數
  stockPropertyCorrelation: number; // 股房相關係數
  bondPropertyCorrelation: number; // 債房相關係數
}

export interface TaxBracket {
  minIncome: number;
  maxIncome: number | null;
  rate: number;
}

export interface TaxExemptions {
  personalExemption: number;
  standardDeduction: number;
  dividendExemption: number;
  capitalGainsExemption: number;
}

export interface WithholdingTax {
  dividendWithholding: number;
  foreignWithholding: number;
  applyToForeign: boolean;
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



export interface RiskHeatmapResult {
  withdrawalRates: number[]; // 提領率範圍 (2-6%)
  stockAllocations: number[]; // 股票配置範圍 (0-100%)
  bankruptcyRates: number[][]; // 破產機率矩陣
  withRealEstate: boolean; // 是否包含房產
  withoutRealEstate?: number[][]; // 無房產的破產機率矩陣（用於比較）
}

export interface CalculationResult {
  taxableRequired: number;
  deferredRequired: number;
  taxfreeRequired: number;
  yearlyData: YearlyData[];
  firstYearFees: number;
  firstYearTaxes: number;
  fourPercentRule: number;

  riskHeatmapResult?: RiskHeatmapResult;
  monteCarloResult?: MonteCarloResult;
}

// Monte Carlo Simulation Types
export interface MonteCarloInputs {
  years: 30 | 40 | 50;
  paths: 1000 | 5000 | 10000;
  withdrawalRate: number; // 2-6%
  stockAllocation: number; // 0-100%
  
  // Asset parameters
  stockReturn: number;
  stockVolatility: number;
  bondReturn: number;
  bondVolatility: number;
  propertyReturn: number;
  propertyVolatility: number;
  
  // Correlations
  stockBondCorrelation: number;
  stockPropertyCorrelation: number;
  bondPropertyCorrelation: number;
  
  // Real estate parameters
  propertyValue: number;
  mortgageAmount: number;
  mortgageRate: number;
  mortgageYears: number;
}

export interface MonteCarloResult {
  bankruptcyRates: number[][]; // [withdrawalRate][stockAllocation]
  withdrawalRates: number[]; // 2-6%
  stockAllocations: number[]; // 0-100%
  percentiles: {
    p10: number;
    p50: number;
    p90: number;
  };
  criticalWithdrawalRate: number;
  computationTime: number;
  pathsUsed: number;
}

export interface MonteCarloGridPoint {
  withdrawalRate: number;
  stockAllocation: number;
  bankruptcyRate: number;
} 