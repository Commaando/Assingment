import React from 'react';
import {HomeView} from './src/swipingModal';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <HomeView />
    </GestureHandlerRootView>
  );
};
export default App;
