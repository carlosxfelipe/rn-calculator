/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';
import {CalculatorButton} from '../components/CalculatorButton';
import {useCalculator} from '../hooks/useCalculator';

export const CalculatorScreen = (): JSX.Element => {
  const {
    previousValue,
    buildNumber,
    toggleSign,
    clean,
    deleteLastNumber,
    divisionOperation,
    multiplicationOperation,
    subtractionOperation,
    additionOperation,
    calculateResult,
    formula,
  } = useCalculator();

  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.mainResult}>
          {formula}
        </Text>
        {formula !== previousValue && (
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subResult}>
            {previousValue}
          </Text>
        )}
      </View>
      <View style={styles.row}>
        <CalculatorButton
          onPress={clean}
          label="C"
          color={colors.lightGray}
          blackText
        />
        <CalculatorButton
          onPress={toggleSign}
          label="+/-"
          color={colors.lightGray}
          blackText
        />
        <CalculatorButton
          onPress={deleteLastNumber}
          label="del"
          color={colors.lightGray}
          blackText
        />
        <CalculatorButton
          onPress={divisionOperation}
          label="÷"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => buildNumber('7')} label="7" />
        <CalculatorButton onPress={() => buildNumber('8')} label="8" />
        <CalculatorButton onPress={() => buildNumber('9')} label="9" />
        <CalculatorButton
          onPress={multiplicationOperation}
          label="x"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => buildNumber('4')} label="4" />
        <CalculatorButton onPress={() => buildNumber('5')} label="5" />
        <CalculatorButton onPress={() => buildNumber('6')} label="6" />
        <CalculatorButton
          onPress={subtractionOperation}
          label="-"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton onPress={() => buildNumber('1')} label="1" />
        <CalculatorButton onPress={() => buildNumber('2')} label="2" />
        <CalculatorButton onPress={() => buildNumber('3')} label="3" />
        <CalculatorButton
          onPress={additionOperation}
          label="+"
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorButton
          onPress={() => buildNumber('0')}
          label="0"
          doubleSize
        />
        <CalculatorButton onPress={() => buildNumber('.')} label="." />
        <CalculatorButton
          onPress={calculateResult}
          label="="
          color={colors.orange}
        />
      </View>
    </View>
  );
};
