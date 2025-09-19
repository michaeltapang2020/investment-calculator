import React from 'react';
import { Save, Share2, Plus, Minus } from 'lucide-react';
import TooltipInfo from './TooltipInfo';
import { COMPOUND_FREQUENCY_OPTIONS } from '../constants/calculatorConstants';

const InputPanel = ({ 
  activeTab, 
  inputs, 
  handleInputChange, 
  showAdvanced, 
  setShowAdvanced,
  saveCalculation,
  shareCalculation,
  addToComparison,
  exportData
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Input Parameters</h2>
        <div className="flex space-x-2">
          <TooltipInfo text="Save current calculation">
            <button onClick={saveCalculation} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
              <Save className="w-4 h-4" />
            </button>
          </TooltipInfo>
          <TooltipInfo text="Share calculation">
            <button onClick={shareCalculation} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
              <Share2 className="w-4 h-4" />
            </button>
          </TooltipInfo>
        </div>
      </div>

      <div className="space-y-4">
        {/* Common inputs based on active tab */}
        {(activeTab === 'compound' || activeTab === 'goal') && (
          <>
            <InputField
              label="Initial Investment ($)"
              value={inputs.initialAmount}
              onChange={(value) => handleInputChange('initialAmount', value)}
              placeholder="10,000"
            />
            <InputField
              label="Monthly Contribution ($)"
              value={inputs.monthlyContribution}
              onChange={(value) => handleInputChange('monthlyContribution', value)}
              placeholder="500"
            />
            <InputField
              label="Annual Return Rate (%)"
              value={inputs.annualRate}
              onChange={(value) => handleInputChange('annualRate', value)}
              placeholder="7.0"
              step="0.1"
            />
            <InputField
              label="Investment Period (Years)"
              value={inputs.years}
              onChange={(value) => handleInputChange('years', value)}
              placeholder="10"
            />
          </>
        )}

        {activeTab === 'roi' && (
          <>
            <InputField
              label="Investment Cost ($)"
              value={inputs.investmentCost}
              onChange={(value) => handleInputChange('investmentCost', value)}
              placeholder="50,000"
            />
            <InputField
              label="Final Value ($)"
              value={inputs.finalValue}
              onChange={(value) => handleInputChange('finalValue', value)}
              placeholder="75,000"
            />
          </>
        )}

        {activeTab === 'goal' && (
          <InputField
            label="Target Amount ($)"
            value={inputs.targetAmount}
            onChange={(value) => handleInputChange('targetAmount', value)}
            placeholder="100,000"
          />
        )}

        {activeTab === 'present' && (
          <>
            <InputField
              label="Future Value ($)"
              value={inputs.finalValue}
              onChange={(value) => handleInputChange('finalValue', value)}
              placeholder="75,000"
            />
            <InputField
              label="Discount Rate (%)"
              value={inputs.annualRate}
              onChange={(value) => handleInputChange('annualRate', value)}
              placeholder="7.0"
              step="0.1"
            />
            <InputField
              label="Years"
              value={inputs.years}
              onChange={(value) => handleInputChange('years', value)}
              placeholder="10"
            />
          </>
        )}

        {/* Advanced Options Toggle */}
        {(activeTab === 'compound' || activeTab === 'goal') && (
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            {showAdvanced ? <Minus className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
            Advanced Options
          </button>
        )}

        {/* Advanced Options */}
        {showAdvanced && (activeTab === 'compound' || activeTab === 'goal') && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compound Frequency
              </label>
              <select
                value={inputs.compoundFreq}
                onChange={(e) => handleInputChange('compoundFreq', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {COMPOUND_FREQUENCY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              label="Inflation Rate (%)"
              value={inputs.inflationRate}
              onChange={(value) => handleInputChange('inflationRate', value)}
              placeholder="2.5"
              step="0.1"
            />
            <InputField
              label="Tax Rate (%)"
              value={inputs.taxRate}
              onChange={(value) => handleInputChange('taxRate', value)}
              placeholder="20.0"
              step="0.1"
            />
          </div>
        )}

        {/* Action Buttons */}
        <ActionButtons addToComparison={addToComparison} exportData={exportData} />
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, placeholder, step, type = "number" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      step={step}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={placeholder}
    />
  </div>
);

const ActionButtons = ({ addToComparison, exportData }) => (
  <div className="flex space-x-2 pt-4">
    <button
      onClick={addToComparison}
      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
    >
      Add to Compare
    </button>
    <button
      onClick={() => exportData('csv')}
      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    </button>
  </div>
);

export default InputPanel;