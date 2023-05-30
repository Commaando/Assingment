import React, {PropsWithChildren, useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {H, ModalDirection, W} from '../style/constant';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const isModalTop = props.direction == ModalDirection.top;
  const isModalBottom = props.direction == ModalDirection.bottom;
  const isModalLeft = props.direction == ModalDirection.left;
  const isModalRight = props.direction == ModalDirection.right;

  const isModalVertical = isModalTop || isModalBottom;

  const MODAL_HEIGHT = isModalVertical ? (2 * H) / 3 : '100%';
  const MODAL_WIDTH = isModalVertical ? '100%' : (2 * W) / 3;

  const heightSharedValue = useSharedValue(isModalVertical ? 0 : H);
  const widthSharedValue = useSharedValue(isModalVertical ? W : 0);

  useEffect(() => {
    if (isModalVertical) {
      if (props.visible) {
        heightSharedValue.value = H;
      } else {
        heightSharedValue.value = 0;
      }
    } else {
      if (props.visible) {
        widthSharedValue.value = W;
      } else {
        widthSharedValue.value = 0;
      }
    }
  }, [props.visible]);

  const animStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(widthSharedValue.value),
      height: withTiming(heightSharedValue.value),
    };
  });
  return (
    <Animated.View
      style={[
        {
          zIndex: 100,
          position: 'absolute',
          ...(isModalVertical
            ? {
                height: 0,
                width: W,
                top: isModalTop ? 0 : undefined,
                bottom: isModalBottom ? 0 : undefined,
              }
            : {
                height: H,
                width: 0,
                right: isModalRight ? 0 : undefined,
                left: isModalLeft ? 0 : undefined,
              }),
        },
        animStyles,
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalBackdropContainer}
        onPress={props.onBackDropPress}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            overflow: 'hidden',
            position: 'absolute',
            height: MODAL_HEIGHT,
            width: MODAL_WIDTH,
            ...(isModalVertical
              ? {
                  top: isModalTop ? 0 : undefined,
                  bottom: isModalBottom ? 0 : undefined,
                }
              : {
                  left: isModalLeft ? 0 : undefined,
                  right: isModalRight ? 0 : undefined,
                }),
          }}>
          {props.children ? props.children : null}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};
interface ModalProps {
  direction: ModalDirection;
  visible: boolean;
  onBackDropPress: () => void;
}

const styles = StyleSheet.create({
  modalBackdropContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
});
