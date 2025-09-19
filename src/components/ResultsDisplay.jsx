import React from 'react';

const ResultsDisplay = ({ activeTab, compoundInterestCalc, roiCalc, goalCalc, presentValueCalc }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Results</h2>
      
      {activeTab === 'compound' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ResultCard
            label="Final Value"
            value={`$${compoundInterestCalc.finalValue.toLocaleString()}`}
            color="blue"
          />
          <ResultCard
            label="Total Interest"
            value={`$${compoundInterestCalc.totalInterest.toLocaleString()}`}
            color="green"
          />
          <ResultCard
            label="Contributions"
            value={`$${compoundInterestCalc.totalContributions.toLocaleString()}`}
            color="purple"
          />
          <ResultCard
            label="Effective Rate"
            value={`${compoundInterestCalc.effectiveRate.toFixed(2)}%`}
            color="orange"
          />
        </div>
      )}

      {activeTab === 'roi' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ResultCard
            label="ROI"
            value={`${roiCalc.roi.toFixed(2)}%`}
            color="blue"
          />
          <ResultCard
            label="Profit"
            value={`$${roiCalc.profit.toLocaleString()}`}
            color="green"
          />
          <ResultCard
            label="Investment"
            value={`$${roiCalc.investmentCost.toLocaleString()}`}
            color="purple"
          />
        </div>
      )}

      {activeTab === 'goal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard
            label="Required Initial Investment"
            value={`$${goalCalc.requiredInitial.toLocaleString()}`}
            color="blue"
          />
          <ResultCard
            label="Required Monthly Payment"
            value={`$${goalCalc.requiredMonthly.toLocaleString()}`}
            color="green"
          />
        </div>
      )}

      {activeTab === 'present' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResultCard
            label="Present Value"
            value={`$${presentValueCalc.presentValue.toLocaleString()}`}
            color="blue"
          />
          <ResultCard
            label="Future Value"
            value={`$${presentValueCalc.futureValue.toLocaleString()}`}
            color="green"
          />
        </div>
      )}
    </div>
  );
};

const ResultCard = ({ label, value, color }) => {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  const textColorStyles = {
    blue: 'text-blue-800',
    green: 'text-green-800',
    purple: 'text-purple-800',
    orange: 'text-orange-800'
  };

  return (
    <div className={`${colorStyles[color]} rounded-lg p-4`}>
      <div className={`text-sm font-medium`}>{label}</div>
      <div className={`text-2xl font-bold ${textColorStyles[color]}`}>
        {value}
      </div>
    </div>
  );
};

export default ResultsDisplay;