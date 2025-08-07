import { FireInputs, YearlyData, CalculationResult } from '../types';

export class FireCalculator {
  private inputs: FireInputs;

  constructor(inputs: FireInputs) {
    this.inputs = inputs;
  }

  // 驗證輸入
  validateInputs(): string | null {
    const { dividendYield, priceGrowth, dividendTaxRate, capitalGainsTaxRate, withdrawalTaxRate, feeRate } = this.inputs;
    
    if (Math.abs(dividendYield + priceGrowth - (dividendYield + priceGrowth)) > 0.01) {
      return '股息殖利率 + 價格成長率 應等於總報酬率';
    }
    
    if (dividendTaxRate < 0 || dividendTaxRate > 60) {
      return '股息稅率應在 0-60% 之間';
    }
    
    if (capitalGainsTaxRate < 0 || capitalGainsTaxRate > 60) {
      return '資本利得稅率應在 0-60% 之間';
    }
    
    if (withdrawalTaxRate < 0 || withdrawalTaxRate > 60) {
      return '提領稅率應在 0-60% 之間';
    }
    
    if (feeRate < 0 || feeRate > 3) {
      return '費用率應在 0-3% 之間';
    }
    
    return null;
  }

  // 計算有效報酬率
  private getEffectiveReturn(accountType: 'taxable' | 'deferred' | 'taxfree'): number {
    const { dividendYield, priceGrowth, dividendTaxRate, feeRate } = this.inputs;
    const totalReturn = dividendYield + priceGrowth;
    
    switch (accountType) {
      case 'taxable':
        return priceGrowth + dividendYield * (1 - dividendTaxRate / 100) - feeRate;
      case 'deferred':
      case 'taxfree':
        return totalReturn - feeRate;
      default:
        return totalReturn - feeRate;
    }
  }

  // 快速估算所需資產
  private quickEstimate(accountType: 'taxable' | 'deferred' | 'taxfree'): number {
    const { withdrawal, inflation, years, targetMode, withdrawalTaxRate } = this.inputs;
    
    // 處理稅後目標轉換
    let grossWithdrawal = withdrawal;
    if (targetMode === 'net' && accountType === 'deferred') {
      grossWithdrawal = withdrawal / (1 - withdrawalTaxRate / 100);
    }
    
    const effectiveReturn = this.getEffectiveReturn(accountType) / 100;
    const inflationRate = inflation / 100;
    
    // 成長年金現值公式
    if (Math.abs(effectiveReturn - inflationRate) < 0.001) {
      // 報酬率等於通膨率時的特殊情況
      return grossWithdrawal * years;
    }
    
    const growthFactor = (1 + inflationRate) / (1 + effectiveReturn);
    const presentValueFactor = (1 - Math.pow(growthFactor, years)) / (1 - growthFactor);
    
    return grossWithdrawal * presentValueFactor;
  }

  // 精算所需資產（逐年模擬）
  private preciseCalculation(accountType: 'taxable' | 'deferred' | 'taxfree'): number {
    const { withdrawal, inflation, years, targetMode, withdrawalTaxRate } = this.inputs;
    
    // 處理稅後目標轉換
    let grossWithdrawal = withdrawal;
    if (targetMode === 'net' && accountType === 'deferred') {
      grossWithdrawal = withdrawal / (1 - withdrawalTaxRate / 100);
    }
    
    // 二分法找尋所需起始資產
    let low = 0;
    let high = withdrawal * years * 2; // 保守上限
    let result = 0;
    
    for (let i = 0; i < 50; i++) { // 最多50次迭代
      const mid = (low + high) / 2;
      const yearlyData = this.simulateYearlyData(mid, accountType);
      
      if (yearlyData.length > 0 && yearlyData[yearlyData.length - 1].endingBalance >= -1) {
        result = mid;
        high = mid;
      } else {
        low = mid;
      }
      
      if (high - low < 1) break; // 精確到1元
    }
    
    return result;
  }

  // 逐年模擬
  private simulateYearlyData(initialBalance: number, accountType: 'taxable' | 'deferred' | 'taxfree'): YearlyData[] {
    const { withdrawal, inflation, dividendYield, priceGrowth, years, targetMode, withdrawalTaxRate } = this.inputs;
    const yearlyData: YearlyData[] = [];
    
    let balance = initialBalance;
    let costBasis = initialBalance;
    
    for (let year = 1; year <= years; year++) {
      const withdrawalAmount = withdrawal * Math.pow(1 + inflation / 100, year - 1);
      
      // 處理稅後目標轉換
      let grossWithdrawal = withdrawalAmount;
      if (targetMode === 'net' && accountType === 'deferred') {
        grossWithdrawal = withdrawalAmount / (1 - withdrawalTaxRate / 100);
      }
      
      let fees = 0;
      let dividends = 0;
      let dividendTax = 0;
      let priceGrowthAmount = 0;
      let realizedGains = 0;
      let capitalGainsTax = 0;
      let withdrawalTax = 0;
      let netWithdrawal = grossWithdrawal;
      
      if (accountType === 'taxable') {
        // 一般應稅帳戶
        fees = balance * this.inputs.feeRate / 100;
        dividends = balance * dividendYield / 100;
        dividendTax = dividends * this.inputs.dividendTaxRate / 100;
        priceGrowthAmount = balance * priceGrowth / 100;
        
        // 先用稅後股息支付
        const afterTaxDividends = dividends - dividendTax;
        let remainingNeed = grossWithdrawal - afterTaxDividends;
        
        if (remainingNeed > 0) {
          // 需要賣出資產
          const unrealizedGainRatio = Math.max(balance - costBasis, 0) / balance;
          const sellAmount = remainingNeed / (1 - unrealizedGainRatio * this.inputs.capitalGainsTaxRate / 100);
          realizedGains = sellAmount * unrealizedGainRatio;
          capitalGainsTax = realizedGains * this.inputs.capitalGainsTaxRate / 100;
          
          // 更新成本基礎
          const costSold = sellAmount * (1 - unrealizedGainRatio);
          costBasis = costBasis - costSold + (dividends - dividendTax);
          
          balance = balance + priceGrowthAmount + dividends - dividendTax - fees - sellAmount;
        } else {
          // 股息足夠支付
          costBasis = costBasis + (dividends - dividendTax);
          balance = balance + priceGrowthAmount + dividends - dividendTax - fees - grossWithdrawal;
        }
      } else if (accountType === 'deferred') {
        // 延稅帳戶
        fees = balance * this.inputs.feeRate / 100;
        dividends = balance * dividendYield / 100;
        priceGrowthAmount = balance * priceGrowth / 100;
        withdrawalTax = grossWithdrawal * this.inputs.withdrawalTaxRate / 100;
        netWithdrawal = grossWithdrawal - withdrawalTax;
        
        balance = balance + priceGrowthAmount + dividends - fees - grossWithdrawal;
      } else {
        // 免稅帳戶
        fees = balance * this.inputs.feeRate / 100;
        dividends = balance * dividendYield / 100;
        priceGrowthAmount = balance * priceGrowth / 100;
        
        balance = balance + priceGrowthAmount + dividends - fees - grossWithdrawal;
      }
      
      yearlyData.push({
        year,
        beginningBalance: balance + grossWithdrawal, // 期初餘額
        fees,
        dividends,
        dividendTax,
        priceGrowth: priceGrowthAmount,
        realizedGains,
        capitalGainsTax,
        withdrawalTax,
        grossWithdrawal,
        netWithdrawal,
        endingBalance: balance,
        costBasis
      });
    }
    
    return yearlyData;
  }

  // 主要計算方法
  calculate(): CalculationResult {
    const validationError = this.validateInputs();
    if (validationError) {
      throw new Error(validationError);
    }
    
    const taxableRequired = this.preciseCalculation('taxable');
    const deferredRequired = this.preciseCalculation('deferred');
    const taxfreeRequired = this.preciseCalculation('taxfree');
    
    // 使用一般應稅帳戶的年度數據作為主要輸出
    const yearlyData = this.simulateYearlyData(taxableRequired, 'taxable');
    
    const firstYearData = yearlyData[0];
    const firstYearFees = firstYearData.fees;
    const firstYearTaxes = firstYearData.dividendTax + firstYearData.capitalGainsTax + firstYearData.withdrawalTax;
    
    // 4% 法則對照
    const fourPercentRule = this.inputs.withdrawal * 25;
    
    return {
      taxableRequired,
      deferredRequired,
      taxfreeRequired,
      yearlyData,
      firstYearFees,
      firstYearTaxes,
      fourPercentRule
    };
  }
} 