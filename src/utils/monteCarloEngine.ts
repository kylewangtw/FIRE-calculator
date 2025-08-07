import { MonteCarloInputs, MonteCarloResult } from '../types';

// Cholesky decomposition for correlated random numbers
function choleskyDecomposition(correlationMatrix: number[][]): number[][] {
  const n = correlationMatrix.length;
  const L: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      
      if (j === i) {
        for (let k = 0; k < j; k++) {
          sum += L[j][k] * L[j][k];
        }
        L[j][j] = Math.sqrt(correlationMatrix[j][j] - sum);
      } else {
        for (let k = 0; k < j; k++) {
          sum += L[i][k] * L[j][k];
        }
        L[i][j] = (correlationMatrix[i][j] - sum) / L[j][j];
      }
    }
  }
  
  return L;
}

// Box-Muller transform for normal distribution
function boxMuller(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// Geometric Brownian Motion
function geometricBrownianMotion(
  currentValue: number,
  mu: number,
  sigma: number,
  dt: number,
  randomValue: number
): number {
  return currentValue * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * randomValue);
}

// Single path simulation
function simulatePath(
  inputs: MonteCarloInputs,
  choleskyMatrix: number[][]
): { bankrupt: boolean; finalBalance: number } {
  let portfolioBalance = 1000000; // Starting with 1M
  let propertyValue = inputs.propertyValue;
  let mortgageBalance = inputs.mortgageAmount;
  
  const dt = 1; // 1 year time step
  const stockWeight = inputs.stockAllocation / 100;
  const bondWeight = 1 - stockWeight;
  
  for (let year = 1; year <= inputs.years; year++) {
    // Generate correlated random numbers
    const z1 = boxMuller();
    const z2 = boxMuller();
    const z3 = boxMuller();
    
    const correlated1 = choleskyMatrix[0][0] * z1;
    const correlated2 = choleskyMatrix[1][0] * z1 + choleskyMatrix[1][1] * z2;
    const correlated3 = choleskyMatrix[2][0] * z1 + choleskyMatrix[2][1] * z2 + choleskyMatrix[2][2] * z3;
    
    // Asset returns
    const stockReturn = geometricBrownianMotion(1, inputs.stockReturn / 100, inputs.stockVolatility / 100, dt, correlated1) - 1;
    const bondReturn = geometricBrownianMotion(1, inputs.bondReturn / 100, inputs.bondVolatility / 100, dt, correlated2) - 1;
    const propertyReturn = geometricBrownianMotion(1, inputs.propertyReturn / 100, inputs.propertyVolatility / 100, dt, correlated3) - 1;
    
    // Portfolio return
    const portfolioReturn = stockWeight * stockReturn + bondWeight * bondReturn;
    
    // Update portfolio
    portfolioBalance *= (1 + portfolioReturn);
    
    // Update property value
    propertyValue *= (1 + propertyReturn);
    
    // Mortgage payment
    const monthlyRate = inputs.mortgageRate / 100 / 12;
    const totalPayments = inputs.mortgageYears * 12;
    const monthlyPayment = inputs.mortgageAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const annualPayment = monthlyPayment * 12;
    const interestPayment = mortgageBalance * (inputs.mortgageRate / 100);
    const principalPayment = annualPayment - interestPayment;
    
    mortgageBalance -= principalPayment;
    
    // Withdrawal (adjusted for inflation)
    const inflationRate = 0.02; // 2% inflation
    const inflationAdjustedWithdrawal = portfolioBalance * (inputs.withdrawalRate / 100) * Math.pow(1 + inflationRate, year - 1);
    portfolioBalance -= inflationAdjustedWithdrawal;
    
    // Check bankruptcy (more realistic threshold)
    const netWorth = portfolioBalance + Math.max(0, propertyValue - mortgageBalance);
    // Bankruptcy if portfolio runs out or net worth becomes negative
    if (netWorth < 0 || portfolioBalance < 0) {
      return { bankrupt: true, finalBalance: netWorth };
    }
    
    // Additional bankruptcy condition: if portfolio drops below 20% of initial value
    if (portfolioBalance < 200000) { // 20% of 1M initial
      return { bankrupt: true, finalBalance: netWorth };
    }
  }
  
  return { bankrupt: false, finalBalance: portfolioBalance + Math.max(0, propertyValue - mortgageBalance) };
}

// Monte Carlo simulation for a single grid point
function simulateGridPoint(
  inputs: MonteCarloInputs,
  withdrawalRate: number,
  stockAllocation: number
): number {
  const modifiedInputs = {
    ...inputs,
    withdrawalRate,
    stockAllocation
  };
  
  // Build correlation matrix
  const correlationMatrix = [
    [1, inputs.stockBondCorrelation, inputs.stockPropertyCorrelation],
    [inputs.stockBondCorrelation, 1, inputs.bondPropertyCorrelation],
    [inputs.stockPropertyCorrelation, inputs.bondPropertyCorrelation, 1]
  ];
  
  const choleskyMatrix = choleskyDecomposition(correlationMatrix);
  
  let bankruptCount = 0;
  
  for (let path = 0; path < inputs.paths; path++) {
    const result = simulatePath(modifiedInputs, choleskyMatrix);
    if (result.bankrupt) {
      bankruptCount++;
    }
  }
  
  return bankruptCount / inputs.paths;
}

// Main Monte Carlo simulation
export function runMonteCarloSimulation(inputs: MonteCarloInputs): Promise<MonteCarloResult> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    // Grid parameters
    const withdrawalRates = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
    const stockAllocations = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    
    const bankruptcyRates: number[][] = [];
    
    // Simulate each grid point
    for (let i = 0; i < withdrawalRates.length; i++) {
      bankruptcyRates[i] = [];
      for (let j = 0; j < stockAllocations.length; j++) {
        const rate = simulateGridPoint(inputs, withdrawalRates[i], stockAllocations[j]);
        bankruptcyRates[i][j] = rate;
      }
    }
    
    // Calculate percentiles (simplified - using a representative path)
    const representativePath = simulateGridPoint(inputs, 4, 60); // 4% withdrawal, 60% stocks
    const percentiles = {
      p10: representativePath * 0.8,
      p50: representativePath,
      p90: representativePath * 1.2
    };
    
    // Find critical withdrawal rate (first rate with <5% bankruptcy at 60% stocks)
    let criticalWithdrawalRate = 6;
    for (let i = 0; i < withdrawalRates.length; i++) {
      const stockIndex = stockAllocations.indexOf(60);
      if (stockIndex >= 0 && bankruptcyRates[i][stockIndex] < 0.05) {
        criticalWithdrawalRate = withdrawalRates[i];
        break;
      }
    }
    
    const computationTime = performance.now() - startTime;
    
    resolve({
      bankruptcyRates,
      withdrawalRates,
      stockAllocations,
      percentiles,
      criticalWithdrawalRate,
      computationTime,
      pathsUsed: inputs.paths
    });
  });
}

// Web Worker version for non-blocking UI
export function createMonteCarloWorker(): Worker {
  const workerCode = `
    // Cholesky decomposition for correlated random numbers
    function choleskyDecomposition(correlationMatrix) {
      const n = correlationMatrix.length;
      const L = Array(n).fill(0).map(() => Array(n).fill(0));
      
      for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
          let sum = 0;
          
          if (j === i) {
            for (let k = 0; k < j; k++) {
              sum += L[j][k] * L[j][k];
            }
            L[j][j] = Math.sqrt(correlationMatrix[j][j] - sum);
          } else {
            for (let k = 0; k < j; k++) {
              sum += L[i][k] * L[j][k];
            }
            L[i][j] = (correlationMatrix[i][j] - sum) / L[j][j];
          }
        }
      }
      
      return L;
    }

    // Box-Muller transform for normal distribution
    function boxMuller() {
      const u1 = Math.random();
      const u2 = Math.random();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }

    // Geometric Brownian Motion
    function geometricBrownianMotion(currentValue, mu, sigma, dt, randomValue) {
      return currentValue * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * randomValue);
    }

    // Single path simulation
    function simulatePath(inputs, choleskyMatrix) {
      let portfolioBalance = 1000000; // Starting with 1M
      let propertyValue = inputs.propertyValue;
      let mortgageBalance = inputs.mortgageAmount;
      
      const dt = 1; // 1 year time step
      const stockWeight = inputs.stockAllocation / 100;
      const bondWeight = 1 - stockWeight;
      
      for (let year = 1; year <= inputs.years; year++) {
        // Generate correlated random numbers
        const z1 = boxMuller();
        const z2 = boxMuller();
        const z3 = boxMuller();
        
        const correlated1 = choleskyMatrix[0][0] * z1;
        const correlated2 = choleskyMatrix[1][0] * z1 + choleskyMatrix[1][1] * z2;
        const correlated3 = choleskyMatrix[2][0] * z1 + choleskyMatrix[2][1] * z2 + choleskyMatrix[2][2] * z3;
        
        // Asset returns
        const stockReturn = geometricBrownianMotion(1, inputs.stockReturn / 100, inputs.stockVolatility / 100, dt, correlated1) - 1;
        const bondReturn = geometricBrownianMotion(1, inputs.bondReturn / 100, inputs.bondVolatility / 100, dt, correlated2) - 1;
        const propertyReturn = geometricBrownianMotion(1, inputs.propertyReturn / 100, inputs.propertyVolatility / 100, dt, correlated3) - 1;
        
        // Portfolio return
        const portfolioReturn = stockWeight * stockReturn + bondWeight * bondReturn;
        
        // Update portfolio
        portfolioBalance *= (1 + portfolioReturn);
        
        // Update property value
        propertyValue *= (1 + propertyReturn);
        
        // Mortgage payment
        const monthlyRate = inputs.mortgageRate / 100 / 12;
        const totalPayments = inputs.mortgageYears * 12;
        const monthlyPayment = inputs.mortgageAmount * 
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
          (Math.pow(1 + monthlyRate, totalPayments) - 1);
        
        const annualPayment = monthlyPayment * 12;
        const interestPayment = mortgageBalance * (inputs.mortgageRate / 100);
        const principalPayment = annualPayment - interestPayment;
        
        mortgageBalance -= principalPayment;
        
        // Withdrawal
        const withdrawal = portfolioBalance * (inputs.withdrawalRate / 100);
        portfolioBalance -= withdrawal;
        
        // Check bankruptcy
        const netWorth = portfolioBalance + Math.max(0, propertyValue - mortgageBalance);
        if (netWorth < 0) {
          return { bankrupt: true, finalBalance: netWorth };
        }
      }
      
      return { bankrupt: false, finalBalance: portfolioBalance + Math.max(0, propertyValue - mortgageBalance) };
    }

    // Monte Carlo simulation for a single grid point
    function simulateGridPoint(inputs, withdrawalRate, stockAllocation) {
      const modifiedInputs = {
        ...inputs,
        withdrawalRate,
        stockAllocation
      };
      
      // Build correlation matrix
      const correlationMatrix = [
        [1, inputs.stockBondCorrelation, inputs.stockPropertyCorrelation],
        [inputs.stockBondCorrelation, 1, inputs.bondPropertyCorrelation],
        [inputs.stockPropertyCorrelation, inputs.bondPropertyCorrelation, 1]
      ];
      
      const choleskyMatrix = choleskyDecomposition(correlationMatrix);
      
      let bankruptCount = 0;
      
      for (let path = 0; path < inputs.paths; path++) {
        const result = simulatePath(modifiedInputs, choleskyMatrix);
        if (result.bankrupt) {
          bankruptCount++;
        }
      }
      
      return bankruptCount / inputs.paths;
    }

    // Main Monte Carlo simulation
    function runMonteCarloSimulation(inputs) {
      return new Promise((resolve) => {
        const startTime = performance.now();
        
        // Grid parameters
        const withdrawalRates = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
        const stockAllocations = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        
        const bankruptcyRates = [];
        
        // Simulate each grid point
        for (let i = 0; i < withdrawalRates.length; i++) {
          bankruptcyRates[i] = [];
          for (let j = 0; j < stockAllocations.length; j++) {
            const rate = simulateGridPoint(inputs, withdrawalRates[i], stockAllocations[j]);
            bankruptcyRates[i][j] = rate;
          }
        }
        
        // Calculate percentiles (simplified - using a representative path)
        const representativePath = simulateGridPoint(inputs, 4, 60); // 4% withdrawal, 60% stocks
        const percentiles = {
          p10: representativePath * 0.8,
          p50: representativePath,
          p90: representativePath * 1.2
        };
        
        // Find critical withdrawal rate (first rate with <5% bankruptcy at 60% stocks)
        let criticalWithdrawalRate = 6;
        for (let i = 0; i < withdrawalRates.length; i++) {
          const stockIndex = stockAllocations.indexOf(60);
          if (stockIndex >= 0 && bankruptcyRates[i][stockIndex] < 0.05) {
            criticalWithdrawalRate = withdrawalRates[i];
            break;
          }
        }
        
        const computationTime = performance.now() - startTime;
        
        resolve({
          bankruptcyRates,
          withdrawalRates,
          stockAllocations,
          percentiles,
          criticalWithdrawalRate,
          computationTime,
          pathsUsed: inputs.paths
        });
      });
    }
    
    self.onmessage = function(e) {
      const { inputs } = e.data;
      runMonteCarloSimulation(inputs).then(result => {
        self.postMessage({ result });
      });
    };
  `;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
} 