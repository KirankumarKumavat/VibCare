import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator } from '@react-navigation/compat';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { NavigationService, verticalScale, } from '../utilities';
import AuthLoading from './AuthLoading';
import { StatusBar } from 'react-native';
import { colors } from '../config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const RootTab = createSwitchNavigator(
   {
      AuthLoading: AuthLoading,
      Auth: AuthNavigator,
      App: AppNavigator,
   },
   {
      // initialRouteName: 'AuthLoading',
      defaultNavigationOptions: { header: null },
      backBehavior: 'none',
   }
);

function RootNavigator() {
   return (
      <SafeAreaProvider>
         <NavigationContainer
            onStateChange={(prevState, currentState) => { }}
            ref={navigator => NavigationService.setTopLevelNavigator(navigator)}
         >
            <RootTab />
         </NavigationContainer>
      </SafeAreaProvider>
   );
}

const MainRouteNavigation = props => {
   return (
      <>
         <StatusBar
            barStyle={'dark-content'}
            backgroundColor={colors.white}
         />
         <RootNavigator />
      </>
   );
};

export default MainRouteNavigation;
