import React from 'react';
import { Calculator } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Calculator className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-4xl font-bold text-gray-800">Investment Calculator</h1>
      </div>
      <p className="text-gray-600 text-lg">Professional financial planning tools for smart investing</p>
    </div>
  );
};

export default Header;