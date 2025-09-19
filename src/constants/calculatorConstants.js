// Calculator tab configuration
export const CALCULATOR_TABS = [
  { id: 'compound', name: 'Compound Interest', icon: 'TrendingUp' },
  { id: 'roi', name: 'ROI Calculator', icon: 'BarChart3' },
  { id: 'goal', name: 'Investment Goal', icon: 'Target' },
  { id: 'present', name: 'Present Value', icon: 'DollarSign' },
];

// Default input values
export const DEFAULT_INPUTS = {
  initialAmount: 10000,
  monthlyContribution: 500,
  annualRate: 7,
  years: 10,
  compoundFreq: 12,
  inflationRate: 2.5,
  taxRate: 20,
  targetAmount: 100000,
  investmentCost: 50000,
  finalValue: 75000
};

// Compound frequency options
export const COMPOUND_FREQUENCY_OPTIONS = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Semi-Annually' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
  { value: 365, label: 'Daily' }
];