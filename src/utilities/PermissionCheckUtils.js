import { openSettings, PERMISSIONS, request, check } from 'react-native-permissions';
import {
   Platform,
   Linking,
   Alert
} from 'react-native';

export async function onCameraPermissionCheck() {
   /**
   * Component method for checking the permission
   * if permission is not granted its request again 
   */

   const cameraPermission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA
   });
   return new Promise((resolve) => {
      check(cameraPermission).then(async (response) => {
         if (response == 'unavailable') {
            request(cameraPermission)
               .then(async (response) => {
                  if (response == 'denied') {
                     request(cameraPermission)
                        .then(async (response) => {
                           if (response == 'granted') {
                              resolve('granted')
                           }
                        })
                  }
                  else if (response == 'granted') {
                     resolve('granted')
                  }
               })
         }
         else if (response == 'granted') {
            resolve('granted')
         }
         else if (response == 'denied') {
            request(cameraPermission)
               .then(async (response) => {
                  if (response == 'granted') {
                     resolve('granted')
                  }
               })
         }
         else {

            // /**
            //  * Alert display while permission not assigned
            //  * take permission from settings.
            //  */
            Alert.alert(
               //   CONSTANTS.appName,
               "Digital Signage",
               //   COMMANMESSAGE.cameraPermission,
               "Camera Permisssion Not Allowed",
               Platform.OS == 'ios' ?
                  [
                     { text: 'Cancel', onPress: () => console.log('cancel') },
                     { text: 'Okay', onPress: () => { Linking.openURL('app-settings:'); } },
                  ] :
                  [
                     { text: 'Cancel', onPress: () => console.log('cancel') },
                     { text: 'Okay', onPress: () => { openSettings().catch(() => console.log('cannot open settings')) } },
                  ],
               { cancelable: false }
            )
         }
      })
   })

}
export async function onPhotoPermissionCheck() {
   /**
   * Component method for checking the permission
   * if permission is not granted its request again 
   */

   const photoLibraryPermission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
   });
   return new Promise((resolve) => {
      check(photoLibraryPermission).then(async (response) => {
         if (response == 'unavailable') {
            request(photoLibraryPermission)
               .then(async (response) => {
                  if (response == 'denied') {
                     request(photoLibraryPermission)
                        .then(async (response) => {
                           if (response == 'granted') {
                              resolve('granted')
                           }
                        })
                  }
                  else if (response == 'granted') {
                     resolve('granted')
                  }
               })
         }
         else if (response == 'granted') {
            resolve('granted')
         }
         else if (response == 'denied') {
            request(photoLibraryPermission)
               .then(async (response) => {
                  if (response == 'granted') {
                     resolve('granted')
                  }
               })
         }
         else {

            // /**
            //  * Alert display while permission not assigned
            //  * take permission from settings.
            //  */
            Alert.alert(
               //   CONSTANTS.appName,
               "Digital Signage",
               //   COMMANMESSAGE.photoPermission,
               "Gallary Permission not Allowed",
               Platform.OS == 'ios' ?
                  [
                     { text: 'Cancel', onPress: () => console.log('cancel') },
                     { text: 'Okay', onPress: () => { Linking.openURL('app-settings:'); } },
                  ] :
                  [
                     { text: 'Cancel', onPress: () => console.log('cancel') },
                     { text: 'Okay', onPress: () => { openSettings().catch(() => console.log('cannot open settings')) } },
                  ],
               { cancelable: false }
            )
         }
      })
   })

}
