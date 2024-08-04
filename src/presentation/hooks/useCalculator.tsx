import {useEffect, useRef, useState} from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '÷',
}

export const useCalculator = () => {
  const [formula, setFormula] = useState('');

  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('0');

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstPart = formula.split(' ').at(0);
      setFormula(`${firstPart} ${lastOperation.current} ${displayValue}`);
    } else {
      setFormula(displayValue);
    }
  }, [displayValue]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreviousValue(`${subResult}`);
  }, [formula]);

  const buildNumber = (newValue: string) => {
    // Previne adição de um ponto decimal se já houver um no displayValue
    if (displayValue.includes('.') && newValue === '.') {
      return;
    }

    // Verifica se o displayValue começa com '0' ou '-0'
    if (displayValue.startsWith('0') || displayValue.startsWith('-0')) {
      // Permite adicionar um ponto decimal após '0' ou '-0'
      if (newValue === '.') {
        return setDisplayValue(displayValue + newValue);
      }

      // Permite adicionar '0' após um ponto decimal
      if (newValue === '0' && displayValue.includes('.')) {
        return setDisplayValue(displayValue + newValue);
      }

      // Substitui o '0' inicial por outro número, se não houver ponto decimal
      if (newValue !== '0' && !displayValue.includes('.')) {
        return setDisplayValue(newValue);
      }

      // Impede adicionar mais zeros à esquerda se ainda não houver ponto decimal
      if (newValue === '0' && !displayValue.includes('.')) {
        return;
      }

      // Adiciona o novo valor ao displayValue atual
      return setDisplayValue(displayValue + newValue);
    }

    // Caso padrão: adiciona o novo valor ao displayValue
    setDisplayValue(displayValue + newValue);
  };

  const toggleSign = () => {
    if (displayValue.includes('-')) {
      return setDisplayValue(displayValue.replace('-', ''));
    }

    setDisplayValue('-' + displayValue);
  };

  const clean = () => {
    setDisplayValue('0');
    setPreviousValue('0');
    lastOperation.current = undefined;
    setFormula('');
  };

  const deleteLastNumber = () => {
    if (
      displayValue.length === 1 ||
      (displayValue.length === 2 && displayValue.startsWith('-'))
    ) {
      return setDisplayValue('0');
    }

    // Remove o último caractere
    const newValue = displayValue.slice(0, -1);

    // Verifica se o novo valor termina com ponto decimal
    // e, em caso positivo, remove o ponto decimal também
    if (newValue.endsWith('.')) {
      return setDisplayValue(newValue.slice(0, -1));
    }

    setDisplayValue(newValue);
  };

  const setLastValue = () => {
    calculateResult();

    if (displayValue.endsWith('.')) {
      setPreviousValue(displayValue.slice(0, -1));
    } else {
      setPreviousValue(displayValue);
    }

    setDisplayValue('0');
  };

  const divisionOperation = () => {
    setLastValue();
    lastOperation.current = Operator.divide;
  };

  const multiplicationOperation = () => {
    setLastValue();
    lastOperation.current = Operator.multiply;
  };

  const subtractionOperation = () => {
    setLastValue();
    lastOperation.current = Operator.subtract;
  };

  const additionOperation = () => {
    setLastValue();
    lastOperation.current = Operator.add;
  };

  const calculateSubResult = (): number => {
    const [firstValue, operation, secondValor] = formula.split(' ');
    const num1 = Number(firstValue);
    const num2 = Number(secondValor);

    if (isNaN(num2)) {
      return num1;
    }

    switch (operation) {
      case Operator.add:
        return num1 + num2;

      case Operator.subtract:
        return num1 - num2;

      case Operator.multiply:
        return num1 * num2;

      case Operator.divide:
        return num1 / num2;
      default:
        return 0;
    }
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);

    lastOperation.current = undefined;
    setPreviousValue('0');
  };

  return {
    // Properties
    displayValue,
    previousValue,
    formula,

    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteLastNumber,
    divisionOperation,
    multiplicationOperation,
    subtractionOperation,
    additionOperation,
    calculateResult,
    calculateSubResult,
  };
};
