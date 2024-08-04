import React from 'react';
import {StatusBar} from 'react-native';
import {CalculatorScreen} from './presentation/screens/CalculatorScreen';

function App() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <CalculatorScreen />
    </>
  );
}

export default App;
