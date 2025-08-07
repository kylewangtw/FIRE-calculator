import { FireInputs, YearlyData, CalculationResult, TaxBracket, TaxExemptions, WithholdingTax, RiskHeatmapResult } from '../types';

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
    const { withdrawal, inflation, years, timing } = this.inputs;
    const effectiveReturn = this.getEffectiveReturn(accountType);
    
    // 計算成長年金現值
    const growthRate = (1 + inflation / 100) / (1 + effectiveReturn / 100) - 1;
    const periods = years;
    
    let pvFactor: number;
    if (timing === 'begin') {
      // 期初領：先付年金
      pvFactor = (1 - Math.pow(1 + growthRate, -periods)) / growthRate * (1 + growthRate);
    } else {
      // 期末領：普通年金
      pvFactor = (1 - Math.pow(1 + growthRate, -periods)) / growthRate;
    }
    
    return withdrawal * pvFactor;
  }

  // 精確計算所需資產
  private preciseCalculation(accountType: 'taxable' | 'deferred' | 'taxfree'): number {
    const { withdrawal, years } = this.inputs;
    
    // 使用二分法找到正確的起始資產
    let lowerBound = 0;
    let upperBound = withdrawal * years * 2; // 合理的上界
    
    const tolerance = 1; // 容許誤差 1 元
    
    while (upperBound - lowerBound > tolerance) {
      const midPoint = (lowerBound + upperBound) / 2;
      const yearlyData = this.simulateYearlyData(midPoint, accountType);
      
      if (yearlyData[yearlyData.length - 1].endingBalance >= 0) {
        upperBound = midPoint;
      } else {
        lowerBound = midPoint;
      }
    }
    
    return upperBound;
  }

  // 模擬年度數據
  private simulateYearlyData(initialBalance: number, accountType: 'taxable' | 'deferred' | 'taxfree'): YearlyData[] {
    const { withdrawal, inflation, dividendYield, priceGrowth, years, timing } = this.inputs;
    const yearlyData: YearlyData[] = [];
    
    let balance = initialBalance;
    let costBasis = initialBalance;
    
    for (let year = 1; year <= years; year++) {
      const inflationFactor = Math.pow(1 + inflation / 100, year - 1);
      const grossWithdrawal = withdrawal * inflationFactor;
      
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
        dividends = balance * dividendYield / 100;
        dividendTax = this.calculateAdvancedTax(dividends, 'taxable');
        priceGrowthAmount = balance * priceGrowth / 100;
        
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
        priceGrowthAmount = balance * (dividendYield + priceGrowth) / 100;
        withdrawalTax = this.calculateAdvancedTax(grossWithdrawal, 'deferred');
        netWithdrawal = grossWithdrawal - withdrawalTax;
        balance = balance + priceGrowthAmount - fees - grossWithdrawal;
        
      } else {
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

  // 生成隨機報酬
  private generateRandomReturn(meanReturn: number, volatility: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.exp(meanReturn / 100 - 0.5 * Math.pow(volatility / 100, 2) + volatility / 100 * z) - 1;
  }



  // 生成相關隨機變數
  private generateCorrelatedReturns(): { stock: number, bond: number, property: number } {
    const { stockReturn, stockVolatility, bondReturn, bondVolatility, propertyGrowthRate, propertyVolatility, stockBondCorrelation, stockPropertyCorrelation, bondPropertyCorrelation } = this.inputs;
    
    // 生成獨立標準常態隨機變數
    const u1 = Math.random();
    const u2 = Math.random();
    const u3 = Math.random();
    
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    const z3 = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * Math.random());
    
    // 使用 Cholesky 分解生成相關隨機變數
    const stock = z1;
    const bond = stockBondCorrelation * z1 + Math.sqrt(1 - Math.pow(stockBondCorrelation, 2)) * z2;
    const property = stockPropertyCorrelation * z1 + 
                    (bondPropertyCorrelation - stockBondCorrelation * stockPropertyCorrelation) / Math.sqrt(1 - Math.pow(stockBondCorrelation, 2)) * z2 +
                    Math.sqrt(1 - Math.pow(stockPropertyCorrelation, 2) - Math.pow((bondPropertyCorrelation - stockBondCorrelation * stockPropertyCorrelation) / Math.sqrt(1 - Math.pow(stockBondCorrelation, 2)), 2)) * z3;
    
    // 轉換為實際報酬率
    return {
      stock: Math.exp(stockReturn / 100 - 0.5 * Math.pow(stockVolatility / 100, 2) + stockVolatility / 100 * stock) - 1,
      bond: Math.exp(bondReturn / 100 - 0.5 * Math.pow(bondVolatility / 100, 2) + bondVolatility / 100 * bond) - 1,
      property: Math.exp(propertyGrowthRate / 100 - 0.5 * Math.pow(propertyVolatility / 100, 2) + propertyVolatility / 100 * property) - 1
    };
  }

  // 計算房產現金流
  private calculateRealEstateCashFlow(year: number, propertyValue: number): number {
    const { annualRent, vacancyRate, maintenanceRate, mortgageAmount, mortgageRate, mortgageYears, rentTaxRate, inflation } = this.inputs;
    
    // 租金淨額（考慮通膨、空置率、稅金）
    const inflationFactor = Math.pow(1 + inflation / 100, year - 1);
    const grossRent = annualRent * inflationFactor;
    const netRent = grossRent * (1 - vacancyRate / 100) * (1 - rentTaxRate / 100);
    
    // 維護費
    const maintenance = propertyValue * maintenanceRate / 100;
    
    // 房貸本息（固定支付）
    const monthlyRate = mortgageRate / 100 / 12;
    const totalPayments = mortgageYears * 12;
    const monthlyPayment = mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const annualMortgagePayment = monthlyPayment * 12;
    
    return netRent - maintenance - annualMortgagePayment;
  }

  // 模擬單一路徑（用於風險熱圖）
  private simulatePath(
    initialFinancialAssets: number,
    withdrawalRate: number,
    stockAllocation: number,
    withRealEstate: boolean
  ): { bankruptcy: boolean, finalAssets: number } {
    const { years, propertyValue, propertyGrowthRate, propertyVolatility, stockReturn, stockVolatility, bondReturn, bondVolatility } = this.inputs;
    
    let financialAssets = initialFinancialAssets;
    let propertyValueCurrent = propertyValue;
    
    for (let year = 1; year <= years; year++) {
      // 生成相關隨機報酬
      const returns = this.generateCorrelatedReturns();
      
      // 計算投資組合報酬
      const bondAllocation = 100 - stockAllocation;
      const portfolioReturn = (stockAllocation / 100) * returns.stock + (bondAllocation / 100) * returns.bond;
      
      // 更新金融資產
      financialAssets *= (1 + portfolioReturn);
      
      // 更新房產價值
      if (withRealEstate) {
        propertyValueCurrent *= (1 + returns.property);
      }
      
      // 計算提領需求（考慮通膨）
      const inflationFactor = Math.pow(1 + this.inputs.inflation / 100, year - 1);
      const withdrawalAmount = initialFinancialAssets * withdrawalRate / 100 * inflationFactor;
      
      // 計算房產現金流
      let realEstateCashFlow = 0;
      if (withRealEstate) {
        realEstateCashFlow = this.calculateRealEstateCashFlow(year, propertyValueCurrent);
      }
      
      // 檢查是否需要賣出資產
      const availableCash = realEstateCashFlow;
      const remainingNeed = withdrawalAmount - availableCash;
      
      if (remainingNeed > 0) {
        financialAssets -= remainingNeed;
      }
      
      // 檢查破產
      if (financialAssets < 0) {
        return { bankruptcy: true, finalAssets: financialAssets };
      }
    }
    
    return { bankruptcy: false, finalAssets: financialAssets };
  }

  // 生成風險熱圖
  private generateRiskHeatmap(withRealEstate: boolean): RiskHeatmapResult {
    const withdrawalRates = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0];
    const stockAllocations = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const bankruptcyRates: number[][] = [];
    
    const simulations = 1000; // 固定使用 1000 次模擬
    const initialAssets = this.inputs.withdrawal * 25; // 使用 4% 法則作為基準
    
    for (let i = 0; i < stockAllocations.length; i++) {
      bankruptcyRates[i] = [];
      for (let j = 0; j < withdrawalRates.length; j++) {
        let bankruptcyCount = 0;
        
        for (let sim = 0; sim < simulations; sim++) {
          const result = this.simulatePath(
            initialAssets,
            withdrawalRates[j],
            stockAllocations[i],
            withRealEstate
          );
          
          if (result.bankruptcy) {
            bankruptcyCount++;
          }
        }
        
        bankruptcyRates[i][j] = bankruptcyCount / simulations;
      }
    }
    
    return {
      withdrawalRates,
      stockAllocations,
      bankruptcyRates,
      withRealEstate
    };
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



    // v2.0 風險熱圖
    if (this.inputs.useRiskHeatmap) {
      // 生成無房產和有房產的熱圖
      const withoutRealEstate = this.generateRiskHeatmap(false);
      const withRealEstate = this.generateRiskHeatmap(true);
      
      // 使用有房產的結果作為主要結果，但包含兩種比較
      result.riskHeatmapResult = {
        ...withRealEstate,
        withoutRealEstate: withoutRealEstate.bankruptcyRates
      };
    }

    return result;
  }
} 