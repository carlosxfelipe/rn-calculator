/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from '../../config/theme/app-theme';

export const CalculatorScreen = (): JSX.Element => {
  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text style={styles.mainResult}>1500</Text>
        <Text style={styles.subResult}>15</Text>
      </View>
      <View style={styles.row}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>1</Text>
        </Pressable>
      </View>
    </View>
  );
};
