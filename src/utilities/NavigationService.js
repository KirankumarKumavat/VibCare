import { NavigationActions, StackActions } from '@react-navigation/compat';

import _ from 'lodash';
import { CommonActions } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
   _navigator = navigatorRef;
};

function navigate(routeName, params) {
   _navigator.dispatch(
      NavigationActions.navigate({
         routeName,
         params,
      })
   );
};

function getState() {
   return _navigator.state.nav;
};

function getCurrentRoute(navigationState) {
   const route = navigationState.routes[navigationState.index];
   // dive into nested navigators
   if (route.routes) {
      return getCurrentRoute(route);
   }
   return route;
};

function setParams(params) {
   const currentRoute = getCurrentRoute(getState());
   let { key } = currentRoute;
   _navigator.dispatch(
      NavigationActions.setParams({
         key,
         params,
      })
   );
};

/** goback method */
function goBack() {
   _navigator.dispatch(
      NavigationActions.back({})
   );
};
// add other navigation functions that you need and export them

function popToTop() {
   _navigator.dispatch(StackActions.popToTop());
}


function resetAction(routeName, params, index = 0) {
   _navigator.dispatch(
      CommonActions.reset({
         routes: [{ name: routeName, params }]
      })
   );
}

export default {
   goBack,
   navigate,
   getState,
   setParams,
   popToTop,
   resetAction,
   getCurrentRoute,
   setTopLevelNavigator,
};