import React from 'react';
import { View } from 'react-native';
import Page from './components/Page';
import Taskbar from './components/Taskbar';

const App: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Page />
      <Taskbar />
    </View>
  );
};

export default App;
