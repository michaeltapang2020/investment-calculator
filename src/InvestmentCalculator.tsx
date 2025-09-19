import React from 'react';
import useCalculator from './hooks/useCalculator';
import { CALCULATOR_TABS } from './constants/calculatorConstants';

// Component imports
import Header from './components/Header';
import Footer from './components/Footer';
import TabNavigation from './components/TabNavigation';
import InputPanel from './components/InputPanel';
import ResultsDisplay from './components/ResultsDisplay';
import ChartVisualization from './components/ChartVisualization';
import BreakdownTable from './components/BreakdownTable';
import ComparisonPanel from './components/ComparisonPanel';
import EducationalTips from './components/EducationalTips';
import SavedCalculations from './components/SavedCalculations';

const InvestmentCalculator = () => {
  const {
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
  } = useCalculator();

  const showVisualization = !['goal', 'present'].includes(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <TabNavigation 
          tabs={CALCULATOR_TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <InputPanel
              activeTab={activeTab}
              inputs={inputs}
              handleInputChange={handleInputChange}
              showAdvanced={showAdvanced}
              setShowAdvanced={setShowAdvanced}
              saveCalculation={saveCalculation}
              shareCalculation={shareCalculation}
              addToComparison={addToComparison}
              exportData={exportData}
            />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <ResultsDisplay
                activeTab={activeTab}
                compoundInterestCalc={compoundInterestCalc}
                roiCalc={roiCalc}
                goalCalc={goalCalc}
                presentValueCalc={presentValueCalc}
              />

              {showVisualization && (
                <ChartVisualization
                  activeTab={activeTab}
                  compoundInterestCalc={compoundInterestCalc}
                  roiCalc={roiCalc}
                />
              )}

              <BreakdownTable
                activeTab={activeTab}
                compoundInterestCalc={compoundInterestCalc}
              />

              <ComparisonPanel
                comparison={comparison}
                setComparison={setComparison}
              />

              <EducationalTips activeTab={activeTab} />

              <SavedCalculations
                savedCalculations={savedCalculations}
                setSavedCalculations={setSavedCalculations}
                setInputs={setInputs}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default InvestmentCalculator;