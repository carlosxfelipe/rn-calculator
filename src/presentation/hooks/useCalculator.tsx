import {useState} from 'react';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');

  const buildNumber = (newValue: string) => {
    if (displayValue.includes('.') && newValue === '.') {
      return;
    }

    if (displayValue.startsWith('0') || displayValue.startsWith('-0')) {
      if (newValue === '.') {
        return setDisplayValue(displayValue + newValue);
      }

      if (newValue === '0' && displayValue.includes('.')) {
        return setDisplayValue(displayValue + newValue);
      }

      if (newValue !== '0' && !displayValue.includes('.')) {
        return setDisplayValue(newValue);
      }

      // Evitar 0000000.00
      if (newValue === '0' && !displayValue.includes('.')) {
        return;
      }

      return setDisplayValue(displayValue + newValue);
    }

    setDisplayValue(displayValue + newValue);
  };

  return {
    // Properties
    displayValue,

    // Methods
    buildNumber,
  };
};
