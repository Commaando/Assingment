import { Dimensions } from "react-native";

const { height: H, width: W } = Dimensions.get('window')
const commonPadding =16

enum ModalDirection {
    top = 'TOP',
    bottom = 'BOTTOM',
    left = 'LEFT',
    right = 'RIGHT',
  }
export {
    ModalDirection,
    H,
    W,
    commonPadding
}