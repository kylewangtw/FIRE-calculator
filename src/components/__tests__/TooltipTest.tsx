import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import InputForm from '../InputForm';

const mockInputs = {
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
    capitalGainsExemption: 600000,
  },
  withholdingTax: {
    dividendWithholding: 30.0,
    foreignWithholding: 15.0,
    applyToForeign: false,
  },
  useRealEstate: false,
  propertyValue: 15000000,
  annualRent: 360000,
  vacancyRate: 10.0,
  maintenanceRate: 1.5,
  propertyGrowthRate: 3.0,
  propertyVolatility: 6.0,
  mortgageAmount: 10000000,
  mortgageRate: 2.0,
  mortgageYears: 20,
  rentTaxRate: 15.0,
  useRiskHeatmap: false,
  stockAllocation: 60.0,
  bondAllocation: 40.0,
  stockReturn: 7.0,
  stockVolatility: 15.0,
  bondReturn: 3.0,
  bondVolatility: 6.0,
  stockBondCorrelation: 0.25,
  stockPropertyCorrelation: 0.40,
  bondPropertyCorrelation: 0.10,
};

const mockProps = {
  inputs: mockInputs,
  onInputChange: jest.fn(),
  onCalculate: jest.fn(),
  isCalculating: false,
};

describe('Tooltip Tests', () => {
  const renderWithLanguage = (component: React.ReactElement) => {
    return render(<LanguageProvider>{component}</LanguageProvider>);
  };

  // Basic-section labels are always visible
  test('withdrawal label is visible in basic section', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    expect(screen.getByText(/第一年度目標提領/)).toBeInTheDocument();
  });

  test('inflation rate label is visible in basic section', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    expect(screen.getByText(/通膨率/)).toBeInTheDocument();
  });

  test('account type label is visible in basic section', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    expect(screen.getByText(/帳戶型態/)).toBeInTheDocument();
  });

  test('years label is visible in basic section', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    expect(screen.getByText(/規劃年期/)).toBeInTheDocument();
  });

  // Advanced-section labels become visible when the section is expanded
  test('fee rate label is visible after expanding Tax & Fees section', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    const expandBtn = screen.getByText(/稅務與費用/);
    fireEvent.click(expandBtn);
    expect(screen.getByText(/總費用率/)).toBeInTheDocument();
  });

  test('dividend yield label is visible after expanding Tax & Fees section', () => {
    renderWithLanguage(<InputForm {...mockProps} />);
    const expandBtn = screen.getByText(/稅務與費用/);
    fireEvent.click(expandBtn);
    expect(screen.getByText(/股息殖利率/)).toBeInTheDocument();
  });
});
