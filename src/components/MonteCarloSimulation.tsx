import React, { useState, useRef, useEffect } from 'react';
import { MonteCarloInputs, MonteCarloResult } from '../types';
import { runMonteCarloSimulation } from '../utils/monteCarloEngine';
import Tooltip from './Tooltip';
import { useLanguage } from '../contexts/LanguageContext';

interface MonteCarloSimulationProps {
  onResultChange: (result: MonteCarloResult | null) => void;
}

const MonteCarloSimulation: React.FC<MonteCarloSimulationProps> = ({ onResultChange }) => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<MonteCarloInputs>({
    years: 30,
    paths: 5000,
    withdrawalRate: 4.0,
    stockAllocation: 60.0,
    stockReturn: 5.5,
    stockVolatility: 20.0,
    bondReturn: 2.0,
    bondVolatility: 10.0,
    propertyReturn: 1.5,
    propertyVolatility: 15.0,
    stockBondCorrelation: 0.25,
    stockPropertyCorrelation: 0.40,
    bondPropertyCorrelation: 0.10,
    propertyValue: 15000000,
    mortgageAmount: 10000000,
    mortgageRate: 2.0,
    mortgageYears: 20
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<MonteCarloResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (field: keyof MonteCarloInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setResult(null);

    try {
      const simulationResult = await runMonteCarloSimulation(inputs);
      setResult(simulationResult);
      onResultChange(simulationResult);
    } catch (error) {
      console.error('Monte Carlo simulation error:', error);
    } finally {
      setIsSimulating(false);
    }
  };

  // Draw heatmap on canvas
  useEffect(() => {
    if (!result || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Define margins for axis labels
    const marginLeft = 60;
    const marginBottom = 60;
    const chartWidth = width - marginLeft;
    const chartHeight = height - marginBottom;
    
    const cellWidth = chartWidth / result.stockAllocations.length;
    const cellHeight = chartHeight / result.withdrawalRates.length;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw heatmap
    for (let i = 0; i < result.withdrawalRates.length; i++) {
      for (let j = 0; j < result.stockAllocations.length; j++) {
        const bankruptcyRate = result.bankruptcyRates[i][j];
        
        // Color gradient: green (0%) to red (100%)
        const intensity = Math.min(255, Math.floor(bankruptcyRate * 255));
        const red = intensity;
        const green = 255 - intensity;
        const blue = 0;

        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(marginLeft + j * cellWidth, i * cellHeight, cellWidth, cellHeight);

        // Add text for high bankruptcy rates
        if (bankruptcyRate > 0.1) {
          ctx.fillStyle = 'white';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            `${(bankruptcyRate * 100).toFixed(0)}%`,
            marginLeft + j * cellWidth + cellWidth / 2,
            i * cellHeight + cellHeight / 2 + 4
          );
        }
      }
    }

    // Draw axes labels with better positioning and styling
    ctx.fillStyle = 'black';
    ctx.font = 'bold 12px Arial';
    
    // X-axis labels (stock allocation) - below the heatmap
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let j = 0; j < result.stockAllocations.length; j++) {
      ctx.fillText(
        `${result.stockAllocations[j]}%`,
        marginLeft + j * cellWidth + cellWidth / 2,
        chartHeight + 10
      );
    }

    // Y-axis labels (withdrawal rate) - to the left of the heatmap
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < result.withdrawalRates.length; i++) {
      ctx.fillText(
        `${result.withdrawalRates[i]}%`,
        marginLeft - 10,
        i * cellHeight + cellHeight / 2
      );
    }

    // Draw axis titles
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    // X-axis title
    ctx.fillText(
      t.stockAllocationLabel + ' (%)',
      marginLeft + chartWidth / 2,
      chartHeight + 35
    );
    
    // Y-axis title (rotated)
    ctx.save();
    ctx.translate(marginLeft - 40, chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(t.withdrawalRateLabel + ' (%)', 0, 0);
    ctx.restore();
      }, [result, t]);



  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">{t.monteCarloSimulation}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Simulation Parameters */}
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.simulationYears}
            </label>
            <Tooltip content={t.simulationYearsTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <select
            value={inputs.years}
            onChange={(e) => handleInputChange('years', Number(e.target.value) as 30 | 40 | 50)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={30}>30 {t.simulationYears}</option>
            <option value={40}>40 {t.simulationYears}</option>
            <option value={50}>50 {t.simulationYears}</option>
          </select>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.simulationPaths}
            </label>
            <Tooltip content={t.simulationPathsTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <select
            value={inputs.paths}
            onChange={(e) => handleInputChange('paths', Number(e.target.value) as 1000 | 5000 | 10000)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1000}>1,000</option>
            <option value={5000}>5,000</option>
            <option value={10000}>10,000</option>
          </select>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.withdrawalRate}
            </label>
            <Tooltip content={t.withdrawalRateTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            min="2"
            max="6"
            step="0.1"
            value={inputs.withdrawalRate}
            onChange={(e) => handleInputChange('withdrawalRate', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.stockAllocation}
            </label>
            <Tooltip content={t.stockAllocationTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            min="0"
            max="100"
            step="10"
            value={inputs.stockAllocation}
            onChange={(e) => handleInputChange('stockAllocation', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Asset Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.stockReturn}
            </label>
            <Tooltip content={t.stockReturnTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            step="0.1"
            value={inputs.stockReturn}
            onChange={(e) => handleInputChange('stockReturn', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.stockVolatility}
            </label>
            <Tooltip content={t.stockVolatilityTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            step="0.1"
            value={inputs.stockVolatility}
            onChange={(e) => handleInputChange('stockVolatility', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.bondReturn}
            </label>
            <Tooltip content={t.bondReturnTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            step="0.1"
            value={inputs.bondReturn}
            onChange={(e) => handleInputChange('bondReturn', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.bondVolatility}
            </label>
            <Tooltip content={t.bondVolatilityTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            step="0.1"
            value={inputs.bondVolatility}
            onChange={(e) => handleInputChange('bondVolatility', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.propertyReturn}
            </label>
            <Tooltip content={t.propertyReturnTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            step="0.1"
            value={inputs.propertyReturn}
            onChange={(e) => handleInputChange('propertyReturn', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.propertyVolatility}
            </label>
            <Tooltip content={t.propertyVolatilityTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            step="0.1"
            value={inputs.propertyVolatility}
            onChange={(e) => handleInputChange('propertyVolatility', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Correlations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.stockBondCorrelation}
            </label>
            <Tooltip content={t.stockBondCorrelationTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            min="-1"
            max="1"
            step="0.01"
            value={inputs.stockBondCorrelation}
            onChange={(e) => handleInputChange('stockBondCorrelation', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.stockPropertyCorrelation}
            </label>
            <Tooltip content={t.stockPropertyCorrelationTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            min="-1"
            max="1"
            step="0.01"
            value={inputs.stockPropertyCorrelation}
            onChange={(e) => handleInputChange('stockPropertyCorrelation', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.bondPropertyCorrelation}
            </label>
            <Tooltip content={t.bondPropertyCorrelationTooltip}>
              <span className="ml-1 text-gray-400 cursor-help">?</span>
            </Tooltip>
          </div>
          <input
            type="number"
            min="-1"
            max="1"
            step="0.01"
            value={inputs.bondPropertyCorrelation}
            onChange={(e) => handleInputChange('bondPropertyCorrelation', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Simulation Button */}
      <div className="text-center mb-6">
        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          {isSimulating ? t.simulationInProgress : t.startSimulation}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">{t.criticalWithdrawalRate}</div>
              <div className="text-2xl font-bold text-blue-600">
                {result.criticalWithdrawalRate.toFixed(1)}%
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">{t.computationTime}</div>
              <div className="text-2xl font-bold text-green-600">
                {(result.computationTime / 1000).toFixed(1)}s
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">{t.pathsUsed}</div>
              <div className="text-2xl font-bold text-purple-600">
                {result.pathsUsed.toLocaleString()}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">{t.p50EndValue}</div>
              <div className="text-2xl font-bold text-orange-600">
                {(result.percentiles.p50 * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.bankruptcyRateDataTable}</h4>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">{t.withdrawalRateLabel}</th>
                    {result.stockAllocations.map(allocation => (
                      <th key={allocation} className="p-2 text-center">
                        {allocation}% {t.stockAllocationLabel}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.withdrawalRates.map((withdrawalRate, i) => (
                    <tr key={withdrawalRate} className="border-b hover:bg-gray-100">
                      <td className="p-2 font-medium">{withdrawalRate}%</td>
                      {result.stockAllocations.map((allocation, j) => {
                        const rate = result.bankruptcyRates[i][j];
                        const colorClass = rate < 0.05 ? 'text-green-600' : 
                                         rate < 0.15 ? 'text-yellow-600' : 
                                         rate < 0.30 ? 'text-orange-600' : 'text-red-600';
                        return (
                          <td key={allocation} className={`p-2 text-center ${colorClass}`}>
                            {(rate * 100).toFixed(1)}%
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-4">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded mr-1"></span>
                    {t.lowRisk} (&lt;5%)
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded mr-1"></span>
                    {t.mediumRisk} (5-15%)
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded mr-1"></span>
                    {t.highRisk} (15-30%)
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded mr-1"></span>
                    {t.veryHighRisk} (&gt;30%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Heatmap */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.bankruptcyRateHeatmap}</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <canvas
                ref={canvasRef}
                width={700}
                height={500}
                className="border border-gray-300 rounded"
              />
              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>{t.greenLowBankruptcy}</span>
                  <span>{t.redHighBankruptcy}</span>
                </div>
                <div className="text-center mt-1">
                  {t.yAxisWithdrawalRate} | {t.xAxisStockAllocation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default MonteCarloSimulation; 