import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ChartVisualization = ({ activeTab, compoundInterestCalc, roiCalc }) => {
  if (!['compound', 'roi'].includes(activeTab)) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Visualization</h3>
      
      {activeTab === 'compound' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={compoundInterestCalc.yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Total Value"
              />
              <Line 
                type="monotone" 
                dataKey="contributions" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Total Contributions"
              />
              <Line 
                type="monotone" 
                dataKey="interest" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Interest Earned"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'roi' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { name: 'Investment', value: roiCalc.investmentCost, color: '#ef4444' },
                { name: 'Final Value', value: roiCalc.finalValue, color: '#22c55e' },
                { name: 'Profit', value: roiCalc.profit, color: '#3b82f6' }
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartVisualization;