import { FireInputs, YearlyData, CalculationResult, TaxBracket, TaxExemptions, WithholdingTax, MonteCarloResult } from '../types';

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

  // v1.3 進階稅務計算
  private calculateAdvancedTax(income: number, accountType: 'taxable' | 'deferred' | 'taxfree'): number {
    if (!this.inputs.useAdvancedTax) {
      return this.calculateSimpleTax(income, accountType);
    }

    const { exemptions, taxBrackets, withholdingTax } = this.inputs;
    
    // 計算應稅所得
    let taxableIncome = income;
    
    // 扣除標準扣除額和個人免稅額
    taxableIncome -= exemptions.standardDeduction + exemptions.personalExemption;
    
    if (taxableIncome <= 0) return 0;
    
    // 計算級距稅
    let totalTax = 0;
    for (const bracket of taxBrackets) {
      if (taxableIncome <= bracket.minIncome) continue;
      
      const bracketIncome = Math.min(
        taxableIncome - bracket.minIncome,
        (bracket.maxIncome || Infinity) - bracket.minIncome
      );
      
      if (bracketIncome > 0) {
        totalTax += bracketIncome * (bracket.rate / 100);
      }
    }
    
    // 加上預扣稅
    if (withholdingTax.applyToForeign) {
      totalTax += income * (withholdingTax.foreignWithholding / 100);
    }
    
    return totalTax;
  }

  private calculateSimpleTax(income: number, accountType: 'taxable' | 'deferred' | 'taxfree'): number {
    const { dividendTaxRate, capitalGainsTaxRate, withdrawalTaxRate } = this.inputs;
    
    switch (accountType) {
      case 'taxable':
        return income * (dividendTaxRate / 100);
      case 'deferred':
        return income * (withdrawalTaxRate / 100);
      case 'taxfree':
        return 0;
      default:
        return 0;
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
        dividendTax = this.calculateAdvancedTax(dividends, 'taxable');
        priceGrowthAmount = balance * priceGrowth / 100;
        
        // 先用稅後股息支付
        const afterTaxDividends = dividends - dividendTax;
        let remainingNeed = grossWithdrawal - afterTaxDividends;
        
        if (remainingNeed > 0) {
          // 需要賣出資產
          const unrealizedGainRatio = Math.max(balance - costBasis, 0) / balance;
          const sellAmount = remainingNeed / (1 - unrealizedGainRatio * this.inputs.capitalGainsTaxRate / 100);
          realizedGains = sellAmount * unrealizedGainRatio;
          capitalGainsTax = this.calculateAdvancedTax(realizedGains, 'taxable');
          
          // 更新成本基礎
          const costSold = sellAmount * (1 - unrealizedGainRatio);
          costBasis -= costSold;
          
          balance -= sellAmount;
        }
        
        netWithdrawal = grossWithdrawal - dividendTax - capitalGainsTax;
        
      } else if (accountType === 'deferred') {
        // 延稅帳戶
        fees = balance * this.inputs.feeRate / 100;
        priceGrowthAmount = balance * (dividendYield + priceGrowth) / 100;
        withdrawalTax = this.calculateAdvancedTax(grossWithdrawal, 'deferred');
        netWithdrawal = grossWithdrawal - withdrawalTax;
        balance = balance + priceGrowthAmount - fees - grossWithdrawal;
        
      } else {
        // 免稅帳戶
        fees = balance * this.inputs.feeRate / 100;
        priceGrowthAmount = balance * (dividendYield + priceGrowth) / 100;
        balance = balance + priceGrowthAmount - fees - grossWithdrawal;
      }
      
      yearlyData.push({
        year,
        beginningBalance: balance + grossWithdrawal + fees + dividendTax + capitalGainsTax + withdrawalTax,
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

  // 生成隨機報酬率
  private generateRandomReturn(meanReturn: number, volatility: number): number {
    // 使用 Box-Muller 轉換生成常態分佈
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    
    return meanReturn + (z0 * volatility / 100);
  }

  // 蒙地卡羅模擬
  private runMonteCarloSimulation(accountType: 'taxable' | 'deferred' | 'taxfree'): MonteCarloResult {
    const { withdrawal, inflation, years, volatility, simulations } = this.inputs;
    const meanReturn = this.getEffectiveReturn(accountType) / 100;
    const inflationRate = inflation / 100;
    
    const results: number[] = [];
    let successCount = 0;
    
    for (let sim = 0; sim < simulations; sim++) {
      let balance = 0;
      let low = 0;
      let high = withdrawal * years * 3; // 更寬鬆的上限
      
      // 二分法找尋所需資產
      for (let i = 0; i < 30; i++) {
        const mid = (low + high) / 2;
        const yearlyData = this.simulateYearlyDataWithVolatility(mid, accountType, meanReturn, volatility);
        
        if (yearlyData.length > 0 && yearlyData[yearlyData.length - 1].endingBalance >= -1) {
          balance = mid;
          high = mid;
        } else {
          low = mid;
        }
        
        if (high - low < 1) break;
      }
      
      results.push(balance);
      
      // 檢查是否成功（期末資產 > 0）
      const yearlyData = this.simulateYearlyDataWithVolatility(balance, accountType, meanReturn, volatility);
      if (yearlyData.length > 0 && yearlyData[yearlyData.length - 1].endingBalance > 0) {
        successCount++;
      }
    }
    
    // 排序結果
    results.sort((a, b) => a - b);
    
    const successRate = (successCount / simulations) * 100;
    const bankruptcyProbability = 100 - successRate;
    
    return {
      successRate,
      bankruptcyProbability,
      worstCase: results[results.length - 1],
      bestCase: results[0],
      medianCase: results[Math.floor(results.length / 2)],
      percentiles: [
        results[Math.floor(results.length * 0.05)], // 5th percentile
        results[Math.floor(results.length * 0.25)], // 25th percentile
        results[Math.floor(results.length * 0.75)], // 75th percentile
        results[Math.floor(results.length * 0.95)]  // 95th percentile
      ]
    };
  }

  // 帶波動率的年度模擬
  private simulateYearlyDataWithVolatility(
    initialBalance: number, 
    accountType: 'taxable' | 'deferred' | 'taxfree',
    meanReturn: number,
    volatility: number
  ): YearlyData[] {
    const { withdrawal, inflation, dividendYield, priceGrowth, years, targetMode, withdrawalTaxRate } = this.inputs;
    const yearlyData: YearlyData[] = [];
    
    let balance = initialBalance;
    let costBasis = initialBalance;
    
    for (let year = 1; year <= years; year++) {
      const withdrawalAmount = withdrawal * Math.pow(1 + inflation / 100, year - 1);
      
      // 生成隨機報酬率
      const randomReturn = this.generateRandomReturn(meanReturn, volatility);
      const randomDividendYield = Math.max(0, dividendYield / 100 + (Math.random() - 0.5) * volatility / 100);
      const randomPriceGrowth = randomReturn - randomDividendYield;
      
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
        fees = balance * this.inputs.feeRate / 100;
        dividends = balance * randomDividendYield;
        dividendTax = this.calculateAdvancedTax(dividends, 'taxable');
        priceGrowthAmount = balance * randomPriceGrowth;
        
        const afterTaxDividends = dividends - dividendTax;
        let remainingNeed = grossWithdrawal - afterTaxDividends;
        
        if (remainingNeed > 0) {
          const unrealizedGainRatio = Math.max(balance - costBasis, 0) / balance;
          const sellAmount = remainingNeed / (1 - unrealizedGainRatio * this.inputs.capitalGainsTaxRate / 100);
          realizedGains = sellAmount * unrealizedGainRatio;
          capitalGainsTax = this.calculateAdvancedTax(realizedGains, 'taxable');
          
          const costSold = sellAmount * (1 - unrealizedGainRatio);
          costBasis -= costSold;
          
          balance -= sellAmount;
        }
        
        netWithdrawal = grossWithdrawal - dividendTax - capitalGainsTax;
        
      } else if (accountType === 'deferred') {
        fees = balance * this.inputs.feeRate / 100;
        priceGrowthAmount = balance * randomReturn;
        withdrawalTax = this.calculateAdvancedTax(grossWithdrawal, 'deferred');
        netWithdrawal = grossWithdrawal - withdrawalTax;
        balance = balance + priceGrowthAmount - fees - grossWithdrawal;
        
      } else {
        fees = balance * this.inputs.feeRate / 100;
        priceGrowthAmount = balance * randomReturn;
        balance = balance + priceGrowthAmount - fees - grossWithdrawal;
      }
      
      yearlyData.push({
        year,
        beginningBalance: balance + grossWithdrawal + fees + dividendTax + capitalGainsTax + withdrawalTax,
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
    const error = this.validateInputs();
    if (error) {
      throw new Error(error);
    }

    const taxableRequired = this.preciseCalculation('taxable');
    const deferredRequired = this.preciseCalculation('deferred');
    const taxfreeRequired = this.preciseCalculation('taxfree');

    const yearlyData = this.simulateYearlyData(taxableRequired, 'taxable');
    const firstYearFees = yearlyData[0]?.fees || 0;
    const firstYearTaxes = (yearlyData[0]?.dividendTax || 0) + (yearlyData[0]?.capitalGainsTax || 0) + (yearlyData[0]?.withdrawalTax || 0);

    // 4% 法則對照
    const fourPercentRule = this.inputs.withdrawal * 25;

    const result: CalculationResult = {
      taxableRequired,
      deferredRequired,
      taxfreeRequired,
      yearlyData,
      firstYearFees,
      firstYearTaxes,
      fourPercentRule
    };

    // v1.5 蒙地卡羅模擬
    if (this.inputs.useMonteCarlo) {
      result.monteCarloResult = this.runMonteCarloSimulation('taxable');
    }

    return result;
  }
} 