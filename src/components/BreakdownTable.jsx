import React from 'react';

const BreakdownTable = ({ activeTab, compoundInterestCalc }) => {
  if (activeTab !== 'compound') return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Year-by-Year Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-medium">Year</th>
              <th className="text-right p-3 font-medium">Total Value</th>
              <th className="text-right p-3 font-medium">Contributions</th>
              <th className="text-right p-3 font-medium">Interest</th>
              <th className="text-right p-3 font-medium">After Tax</th>
              <th className="text-right p-3 font-medium">Inflation Adj.</th>
            </tr>
          </thead>
          <tbody>
            {compoundInterestCalc.yearlyData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 font-medium">{row.year}</td>
                <td className="p-3 text-right font-medium text-blue-600">
                  ${row.value.toLocaleString()}
                </td>
                <td className="p-3 text-right">
                  ${row.contributions.toLocaleString()}
                </td>
                <td className="p-3 text-right text-green-600">
                  ${row.interest.toLocaleString()}
                </td>
                <td className="p-3 text-right">
                  ${row.afterTax.toLocaleString()}
                </td>
                <td className="p-3 text-right text-orange-600">
                  ${row.inflationAdjusted.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreakdownTable;