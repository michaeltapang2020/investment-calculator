import React from 'react';
import { Info } from 'lucide-react';

const EducationalTips = ({ activeTab }) => {
  const tips = {
    compound: {
      title: "Compound Interest",
      content: [
        { label: "Compound Interest:", text: "The power of compound interest means your money grows exponentially over time. Starting early, even with small amounts, can lead to significant wealth." },
        { label: "Regular Contributions:", text: "Consistent monthly contributions can dramatically increase your final balance through dollar-cost averaging." },
        { label: "Time Horizon:", text: "The longer your investment period, the more compound interest works in your favor." }
      ]
    },
    roi: {
      title: "ROI Calculation",
      content: [
        { label: "ROI Calculation:", text: "Return on Investment measures the efficiency of an investment. A positive ROI indicates a profitable investment." },
        { label: "Benchmark Comparison:", text: "Compare your ROI against market benchmarks like the S&P 500 to evaluate performance." },
        { label: "Risk Consideration:", text: "Higher returns often come with higher risk. Consider your risk tolerance when evaluating investments." }
      ]
    },
    goal: {
      title: "Goal Planning",
      content: [
        { label: "Goal Planning:", text: "Setting specific financial goals helps create a clear investment strategy and timeline." },
        { label: "Flexibility:", text: "Adjust your contributions or timeline based on market conditions and life changes." },
        { label: "Emergency Fund:", text: "Maintain 3-6 months of expenses in a liquid emergency fund before investing for long-term goals." }
      ]
    },
    present: {
      title: "Present Value",
      content: [
        { label: "Present Value:", text: "This calculation helps determine what future money is worth today, considering inflation and opportunity cost." },
        { label: "Discount Rate:", text: "Use a discount rate that reflects your required rate of return or current interest rates." },
        { label: "Decision Making:", text: "Present value calculations help compare investment opportunities and make informed financial decisions." }
      ]
    }
  };

  const currentTips = tips[activeTab];
  if (!currentTips) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg">
      <div className="flex items-start">
        <Info className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Investment Tips</h3>
          <div className="text-gray-700 space-y-2">
            {currentTips.content.map((tip, index) => (
              <p key={index}>
                <strong>{tip.label}</strong> {tip.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalTips;