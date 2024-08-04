import {useState} from 'react';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');

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

  return {
    // Properties
    displayValue,

    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteLastNumber,
  };
};
