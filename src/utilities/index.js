import NavigationService from './NavigationService';
import StorageService from './StorageService';

import { getBottomSpace, getStatusBarHeight, ifIphoneX, isIphoneX } from './iPhoneXHelper';
import { verticalScale, scale, moderateScale } from './scale';
import { showSimpleAlert, showTostMessage, isValidEmail } from './helperFunction';


export {
   NavigationService,
   StorageService,

   getBottomSpace,
   getStatusBarHeight,
   ifIphoneX,
   isIphoneX,

   verticalScale,
   scale,
   moderateScale,

   showSimpleAlert,
   showTostMessage,
   isValidEmail,
}