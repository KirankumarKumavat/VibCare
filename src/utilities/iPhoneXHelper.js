
import { Dimensions, Platform, StatusBar } from 'react-native';

export function isIphoneX() {
   const dimen = Dimensions.get('window');
   return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      // ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
      ((dimen.height === 780 || dimen.width === 780) || (dimen.height === 812 || dimen.width === 812) || (dimen.height === 844 || dimen.width === 844) || (dimen.height === 896 || dimen.width === 896) || (dimen.height === 926 || dimen.width === 926))
   );
}

/** cheking iphone x or notch device */
export function ifIphoneX(iphoneXStyle, regularStyle) {
   if (isIphoneX()) {
      return iphoneXStyle;
   }
   return regularStyle;
}

/** getting status bar height */
export function getStatusBarHeight(safe) {
   return Platform.select({
      ios: ifIphoneX(safe ? 44 : 30, 35),
      android: StatusBar.currentHeight,
      default: 0
   });
}

/** getting bottom space of notch */
export function getBottomSpace() {
   return isIphoneX() ? 34 : 0;
}

// const iphoneXHelper = {
//    getBottomSpace,
//    getStatusBarHeight,
//    ifIphoneX,
//    isIphoneX,
// }
// export default iphoneXHelper;