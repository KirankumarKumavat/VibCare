import { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class  StorageService extends Component {
   /**
    * storage comman keys 
    */
   static KEYS = {
      USER_DETAILS: "USER_DETAILS",
      // USER_PROFILE_SETUP_STATUS: "USER_PROFILE_SETUP_STATUS",
      USER_LOGIN_STATUS: "USER_LOGIN_STATUS",
   };

   /** save item to local storage */
   static saveItem = async (key, value) => {
      try {
         await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
         console.log("saving error", e);
      }
   };

   /** get items from local storage */
   static getItem = async (key) => {
      try {
         const value = await AsyncStorage.getItem(key);
         if (value !== null) {
            return await JSON.parse(value);
         }
      } catch (e) {
         console.log(" error reading value", e);
      }
   };

   /** delete item from local storage */
   static deleteItem = async (key) => {
      try {
         await AsyncStorage.removeItem(key);
      } catch (e) {
         console.log(`error while removing ${key}`, e);
      }
   };

}
