import { Alert, Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import { moderateScale } from './scale';
import { fonts } from '../assets';
import { constants } from '../config';


export function showSimpleAlert(message) {
   Alert.alert(
      constants.appName,
      message,
      [
         { text: "OK", onPress: () => { } }
      ],
      { cancelable: false }
   );
}

export function showTostMessage(message) {
   Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,     //isIphoneX() ? 200 : 170,
      visible: true,
      textStyle: {
         fontSize: moderateScale(18),
         // fontFamily: fonts.latoMedium
      }
   })
}

export function isValidEmail(string) {
   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if (reg.test(string) === true) {
      return true
   }
   return false
}

export function isValidPassword(string) {
   let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
   if (passwordRegex.test(string) === true) {
      return true
   }
   return false
}

export function formatTimeString(time) {
   let msecs = time % 1000;

   if (msecs < 10) msecs = `00${msecs}`;
   else if (msecs < 100) msecs = `0${msecs}`;

   let seconds = Math.floor(time / 1000);
   let minutes = Math.floor(time / 60000);
   seconds = seconds - minutes * 60;
   let formatted;
   formatted = `${minutes < 10 ? 0 : ""
      }${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
   return formatted;
}
