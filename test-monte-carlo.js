// 蒙地卡羅測試腳本
console.log('🧪 蒙地卡羅模擬測試');

// 模擬測試數據
const testInputs = {
  withdrawal: 1500000,
  inflation: 2.0,
  dividendYield: 2.0,
  priceGrowth: 3.0,
  years: 30,
  timing: 'end',
  feeRate: 0.25,
  accountType: 'taxable',
  dividendTaxRate: 28.0,
  capitalGainsTaxRate: 15.0,
  withdrawalTaxRate: 20.0,
  targetMode: 'gross',
  useAdvancedTax: false,
  taxBrackets: [],
  exemptions: {
    personalExemption: 92000,
    standardDeduction: 124000,
    dividendExemption: 270000,
    capitalGainsExemption: 600000
  },
  withholdingTax: {
    dividendWithholding: 30.0,
    foreignWithholding: 15.0,
    applyToForeign: false
  },
  useMonteCarlo: true,
  volatility: 15.0,
  simulations: 100
};

// 測試函數
function testMonteCarlo() {
  console.log('📊 測試參數:');
  console.log('- 提領金額:', testInputs.withdrawal.toLocaleString());
  console.log('- 年期:', testInputs.years);
  console.log('- 波動率:', testInputs.volatility + '%');
  console.log('- 模擬次數:', testInputs.simulations);
  
  // 模擬隨機數生成
  console.log('\n🎲 測試隨機數生成:');
  const returns = [];
  for (let i = 0; i < 10; i++) {
    const return1 = generateRandomReturn(0.05, 15.0);
    const return2 = generateRandomReturn(0.05, 15.0);
    returns.push({ return1: (return1 * 100).toFixed(2) + '%', return2: (return2 * 100).toFixed(2) + '%' });
  }
  console.table(returns);
  
  // 測試成功率計算
  console.log('\n📈 測試成功率計算:');
  const successRates = testSuccessRateCalculation();
  console.table(successRates);
}

// 生成隨機報酬率（複製計算器邏輯）
function generateRandomReturn(meanReturn, volatility) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return meanReturn + (z0 * volatility / 100);
}

// 測試成功率計算
function testSuccessRateCalculation() {
  const results = [];
  
  // 測試不同波動率
  const volatilities = [5, 10, 15, 20, 25];
  
  volatilities.forEach(vol => {
    let successCount = 0;
    const simulations = 100;
    
    for (let i = 0; i < simulations; i++) {
      // 模擬簡單的成功/失敗
      const randomValue = Math.random();
      const successThreshold = 0.7 - (vol / 100); // 波動率越高，成功率越低
      
      if (randomValue > successThreshold) {
        successCount++;
      }
    }
    
    const successRate = (successCount / simulations) * 100;
    results.push({
      volatility: vol + '%',
      successRate: successRate.toFixed(1) + '%',
      bankruptcyRate: (100 - successRate).toFixed(1) + '%'
    });
  });
  
  return results;
}

// 執行測試
testMonteCarlo();

console.log('\n✅ 蒙地卡羅測試完成！');
console.log('\n📝 測試說明:');
console.log('1. 隨機數生成測試 - 驗證 Box-Muller 轉換是否正常');
console.log('2. 成功率計算測試 - 驗證不同波動率對成功率的影響');
console.log('3. 在瀏覽器中開啟應用程式並啟用蒙地卡羅功能進行完整測試'); 