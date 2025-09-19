import React from 'react';

const ComparisonPanel = ({ comparison, setComparison }) => {
  if (comparison.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Comparison</h3>
        <button
          onClick={() => setComparison([])}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Clear All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-medium">Scenario</th>
              <th className="text-right p-3 font-medium">Initial</th>
              <th className="text-right p-3 font-medium">Rate</th>
              <th className="text-right p-3 font-medium">Years</th>
              <th className="text-right p-3 font-medium">Result</th>
              <th className="text-center p-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-right">
                  ${item.inputs.initialAmount?.toLocaleString() || 'N/A'}
                </td>
                <td className="p-3 text-right">
                  {item.inputs.annualRate || item.inputs.discountRate || 'N/A'}%
                </td>
                <td className="p-3 text-right">{item.inputs.years || 'N/A'}</td>
                <td className="p-3 text-right font-medium text-blue-600">
                  ${(item.result.finalValue || item.result.presentValue || item.result.roi || 0).toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setComparison(prev => prev.filter(c => c.id !== item.id))}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonPanel;