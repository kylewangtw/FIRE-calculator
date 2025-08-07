import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import InputForm from '../InputForm';

// Mock props for InputForm
const mockProps = {
  inputs: {
    withdrawal: 1500000,
    inflation: 2.0,
    dividendYield: 2.0,
    priceGrowth: 3.0,
    years: 30,
    timing: 'end' as const,
    feeRate: 0.25,
    accountType: 'taxable' as const,
    dividendTaxRate: 28.0,
    capitalGainsTaxRate: 15.0,
    withdrawalTaxRate: 20.0,
    targetMode: 'gross' as const,
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

  },
  onInputChange: jest.fn(),
  onCalculate: jest.fn(),
  isCalculating: false
};

describe('Tooltip Tests', () => {
  const renderWithLanguage = (component: React.ReactElement) => {
    return render(
      <LanguageProvider>
        {component}
      </LanguageProvider>
    );
  };

  test('should show tooltip on hover for first year withdrawal', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    
    const withdrawalLabel = screen.getByText(/第一年度目標提領/);
    expect(withdrawalLabel).toBeInTheDocument();
    
    // Check if tooltip attribute exists
    expect(withdrawalLabel).toHaveAttribute('title');
  });

  test('should show tooltip on hover for inflation rate', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    
    const inflationLabel = screen.getByText(/通膨率/);
    expect(inflationLabel).toBeInTheDocument();
    
    // Check if tooltip attribute exists
    expect(inflationLabel).toHaveAttribute('title');
  });

  test('should show tooltip on hover for dividend yield', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    
    const dividendLabel = screen.getByText(/股息殖利率/);
    expect(dividendLabel).toBeInTheDocument();
    
    // Check if tooltip attribute exists
    expect(dividendLabel).toHaveAttribute('title');
  });

  test('should show tooltip on hover for price growth', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    
    const priceGrowthLabel = screen.getByText(/價格成長率/);
    expect(priceGrowthLabel).toBeInTheDocument();
    
    // Check if tooltip attribute exists
    expect(priceGrowthLabel).toHaveAttribute('title');
  });

  test('should show tooltip on hover for account type', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    
    const accountTypeLabel = screen.getByText(/帳戶型態/);
    expect(accountTypeLabel).toBeInTheDocument();
    
    // Check if tooltip attribute exists
    expect(accountTypeLabel).toHaveAttribute('title');
  });

  test('should show tooltip on hover for fee rate', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    
    const feeRateLabel = screen.getByText(/總費用率/);
    expect(feeRateLabel).toBeInTheDocument();
    
    // Check if tooltip attribute exists
    expect(feeRateLabel).toHaveAttribute('title');
  });


}); 