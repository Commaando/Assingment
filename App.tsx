import React from 'react';
import {CircularTabView} from './src/circularTabView';
import {CircularTabView2} from './src/circularTabView';
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
