/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// In theory you don't have to install `react-native-root-siblings` because it's a dep of root-toast
// But you can install it explicitly if your editor complains about it.
// import { RootSiblingParent } from 'react-native-root-siblings';
import MainRouteNavigation from './src/navigator/RootNavigator';
import { RootSiblingParent } from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';

class App extends Component {
  componentDidMount = () => {
    SplashScreen.hide()

  }
  render() {
    return <RootSiblingParent><MainRouteNavigation /></RootSiblingParent>
  }
};

export default App;
