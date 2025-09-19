import React from 'react';

const SavedCalculations = ({ savedCalculations, setSavedCalculations, setInputs, setActiveTab }) => {
  if (savedCalculations.length === 0) return null;

  const handleClearAll = () => {
    setSavedCalculations([]);
    localStorage.removeItem('savedCalculations');
  };

  const handleDelete = (e, calcId) => {
    e.stopPropagation();
    const updated = savedCalculations.filter(c => c.id !== calcId);
    setSavedCalculations(updated);
    localStorage.setItem('savedCalculations', JSON.stringify(updated));
  };

  const handleLoad = (calc) => {
    setInputs(calc.inputs);
    setActiveTab(calc.tab);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Saved Calculations</h3>
        <button
          onClick={handleClearAll}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Clear All
        </button>
      </div>
      <div className="grid gap-3">
        {savedCalculations.slice(-5).map((calc) => (
          <div
            key={calc.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => handleLoad(calc)}
          >
            <div>
              <div className="font-medium text-gray-800">{calc.name}</div>
              <div className="text-sm text-gray-600">
                {new Date(calc.timestamp).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {calc.tab}
              </span>
              <button
                onClick={(e) => handleDelete(e, calc.id)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCalculations;