import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {commonPadding} from '../style/constant';
export const Content = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={{color: '#3f3f3f'}}>Hi this is modal content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: commonPadding,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
  },
});
