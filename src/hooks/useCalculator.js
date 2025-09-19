import { useState, useEffect, useMemo } from 'react';
import { DEFAULT_INPUTS } from '../constants/calculatorConstants';
import {
  calculateCompoundInterest,
  calculateROI,
  calculateGoal,
  calculatePresentValue,
  exportToCSV,
  generateShareLink,
  parseShareLink
} from '../utils/calculatorUtils';

const useCalculator = () => {
  const [activeTab, setActiveTab] = useState('compound');
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [comparison, setComparison] = useState([]);

  // Load saved calculations and URL params on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
    setSavedCalculations(saved);
    
    const sharedData = parseShareLink();
    if (sharedData) {
      setInputs(prev => ({ ...prev, ...sharedData.inputs }));
      setActiveTab(sharedData.tab);
    }
  }, []);

  // Calculation memoization
  const compoundInterestCalc = useMemo(() => 
    calculateCompoundInterest(inputs), [inputs]);

  const roiCalc = useMemo(() => 
    calculateROI(inputs.investmentCost, inputs.finalValue), 
    [inputs.investmentCost, inputs.finalValue]);

  const goalCalc = useMemo(() => 
    calculateGoal(inputs), [inputs]);

  const presentValueCalc = useMemo(() => 
    calculatePresentValue(inputs.finalValue, inputs.annualRate, inputs.years),
    [inputs.finalValue, inputs.annualRate, inputs.years]);

  // Input handlers
  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  // Save calculation
  const saveCalculation = () => {
    const calculation = {
      id: Date.now(),
      name: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} - ${new Date().toLocaleDateString()}`,
      tab: activeTab,
      inputs: { ...inputs },
      timestamp: new Date().toISOString()
    };
    
    const updated = [...savedCalculations, calculation];
    setSavedCalculations(updated);
    localStorage.setItem('savedCalculations', JSON.stringify(updated));
  };

  // Share calculation
  const shareCalculation = () => {
    const url = generateShareLink(activeTab, inputs);
    navigator.clipboard.writeText(url);
    alert('Share link copied to clipboard!');
  };

  // Export data
  const exportData = (format) => {
    const data = activeTab === 'compound' ? compoundInterestCalc.yearlyData : [];
    if (format === 'csv') {
      exportToCSV(data);
    }
  };

  // Add to comparison
  const addToComparison = () => {
    const result = activeTab === 'compound' ? compoundInterestCalc : 
                   activeTab === 'roi' ? roiCalc :
                   activeTab === 'goal' ? goalCalc : presentValueCalc;
    
    const comparisonItem = {
      id: Date.now(),
      name: `${activeTab} - ${inputs.initialAmount || inputs.investmentCost || inputs.finalValue}`,
      tab: activeTab,
      result,
      inputs: { ...inputs }
    };
    
    setComparison(prev => [...prev, comparisonItem]);
  };

  return {
    activeTab,
    setActiveTab,
    inputs,
    setInputs,
    showAdvanced,
    setShowAdvanced,
    savedCalculations,
    setSavedCalculations,
    comparison,
    setComparison,
    compoundInterestCalc,
    roiCalc,
    goalCalc,
    presentValueCalc,
    handleInputChange,
    saveCalculation,
    shareCalculation,
    exportData,
    addToComparison
  };
};

export default useCalculator;