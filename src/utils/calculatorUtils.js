// Calculation utility functions

export const calculateCompoundInterest = (inputs) => {
  const { initialAmount, monthlyContribution, annualRate, years, inflationRate, taxRate } = inputs;
  const monthlyRate = annualRate / 100 / 12;
  const periods = years * 12;
  
  let yearlyData = [];
  let currentValue = initialAmount;
  let totalContributions = initialAmount;
  
  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      currentValue = currentValue * (1 + monthlyRate) + monthlyContribution;
      totalContributions += monthlyContribution;
    }
    
    const inflationAdjusted = currentValue / Math.pow(1 + inflationRate / 100, year);
    const afterTax = currentValue - (currentValue - totalContributions) * (taxRate / 100);
    
    yearlyData.push({
      year,
      value: Math.round(currentValue),
      contributions: Math.round(totalContributions),
      interest: Math.round(currentValue - totalContributions),
      inflationAdjusted: Math.round(inflationAdjusted),
      afterTax: Math.round(afterTax)
    });
  }
  
  const finalValue = yearlyData[yearlyData.length - 1]?.value || initialAmount;
  const totalInterest = finalValue - totalContributions;
  const effectiveRate = Math.pow(finalValue / initialAmount, 1 / years) - 1;
  
  return {
    finalValue,
    totalContributions,
    totalInterest,
    effectiveRate: effectiveRate * 100,
    yearlyData
  };
};

export const calculateROI = (investmentCost, finalValue) => {
  const roi = ((finalValue - investmentCost) / investmentCost) * 100;
  const profit = finalValue - investmentCost;
  
  return { roi, profit, investmentCost, finalValue };
};

export const calculateGoal = (inputs) => {
  const { targetAmount, annualRate, years, monthlyContribution, initialAmount } = inputs;
  const monthlyRate = annualRate / 100 / 12;
  const periods = years * 12;
  
  // Calculate required initial investment
  const futureValueContributions = monthlyContribution * (Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate;
  const requiredInitial = (targetAmount - futureValueContributions) / Math.pow(1 + monthlyRate, periods);
  
  // Calculate required monthly payment if initial is fixed
  const futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, periods);
  const requiredMonthly = (targetAmount - futureValueInitial) * monthlyRate / (Math.pow(1 + monthlyRate, periods) - 1);
  
  return {
    requiredInitial: Math.max(0, requiredInitial),
    requiredMonthly: Math.max(0, requiredMonthly),
    targetAmount,
    years
  };
};

export const calculatePresentValue = (finalValue, annualRate, years) => {
  const presentValue = finalValue / Math.pow(1 + annualRate / 100, years);
  
  return {
    presentValue,
    futureValue: finalValue,
    discountRate: annualRate,
    years
  };
};

export const exportToCSV = (data) => {
  if (!data || data.length === 0) return;
  
  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'investment-calculation.csv';
  a.click();
  URL.revokeObjectURL(url);
};

export const generateShareLink = (activeTab, inputs) => {
  const calcData = { tab: activeTab, inputs };
  const encoded = btoa(JSON.stringify(calcData));
  return `${window.location.origin}${window.location.pathname}?calc=${encoded}`;
};

export const parseShareLink = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('calc')) {
    try {
      return JSON.parse(atob(urlParams.get('calc')));
    } catch (e) {
      console.error('Failed to load from URL');
      return null;
    }
  }
  return null;
};