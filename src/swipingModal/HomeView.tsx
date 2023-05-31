import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {H, ModalDirection, W, commonPadding} from '../style/constant';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Content, Modal} from '../components';

export const HomeView = () => {
  //different direction modal states
  const [modalTVisible, setModalTVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [modalLVisible, setModalLVisible] = useState(false);
  const [modalRVisible, setModalRVisible] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* corresponding button on edges , for calling modals to open */}
      <Pressable
        style={[styles.roundButtonContainer, styles.topCenter]}
        onPress={() => setModalTVisible(true)}>
        <Text>T</Text>
      </Pressable>
      <Pressable
        style={[styles.roundButtonContainer, styles.bottomCenter]}
        onPress={() => setModalBVisible(true)}>
        <Text>B</Text>
      </Pressable>
      <Pressable
        style={[styles.roundButtonContainer, styles.leftCenter]}
        onPress={() => setModalLVisible(true)}>
        <Text>L</Text>
      </Pressable>
      <Pressable
        style={[styles.roundButtonContainer, styles.rightCenter]}
        onPress={() => setModalRVisible(true)}>
        <Text>R</Text>
      </Pressable>

      <Text>Home Content</Text>

      <Modal
        direction={ModalDirection.top}
        visible={modalTVisible}
        onBackDropPress={() => setModalTVisible(false)}>
        <Content />
      </Modal>
      <Modal
        direction={ModalDirection.bottom}
        visible={modalBVisible}
        onBackDropPress={() => setModalBVisible(false)}>
        <Content />
      </Modal>
      <Modal
        direction={ModalDirection.left}
        visible={modalLVisible}
        onBackDropPress={() => setModalLVisible(false)}>
        <Content />
      </Modal>
      <Modal
        direction={ModalDirection.right}
        visible={modalRVisible}
        onBackDropPress={() => setModalRVisible(false)}>
        <Content />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  roundButtonContainer: {
    backgroundColor: 'powderblue',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topCenter: {
    position: 'absolute',
    left: W / 2 - 20,
    top: commonPadding + 20,
  },
  bottomCenter: {
    position: 'absolute',
    left: W / 2 - 20,
    bottom: commonPadding,
  },

  leftCenter: {
    position: 'absolute',
    top: H / 2 - 20,
    left: commonPadding,
  },
  rightCenter: {
    position: 'absolute',
    top: H / 2 - 20,
    right: commonPadding,
  },
});
