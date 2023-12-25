import React from 'react';
import WalkThroughScreen from '../screens/WalkThroughScreen';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import Verification from '../screens/Verification';
import { createStackNavigator } from '@react-navigation/stack';

// import finalKYCSubmitForm from '../screens/finalKYCSubmitForm';
import Category from '../screens/Category';
import CheckOut from '../screens/CheckOut';
import Cart from '../screens/Cart';
import EditAdress from '../screens/EditAdress';
import Home from '../screens/Home';
import DetailScreen from '../screens/DetailScreen';
import KYCRegister from '../screens/KYCRegister';
import OrderDetails from '../screens/OrderDetails';
import TitleScreen from '../screens/TitleScreen';
import TherapeuticSegment from '../screens/TherapeuticSegment';
// import DetailScreen from '../screens/DetailScreen';
import MyAccount from '../screens/MyAccount';
import PromotionalMaterial from '../screens/PromotionalMaterial';
import PayOnDelivery from '../screens/PayOnDelivery';
import CashPaymentScreen from '../screens/CashPaymentScreen';
// import RequestBulk from '../screens/RequestBulk';
const AuthTab = createStackNavigator();

function AuthNavigator() {
   return (
      <AuthTab.Navigator
         initialRouteName={'WalkThroughScreen'}

         // initialRouteName={'CheckOut'}
         // initialRouteName={'DetailScreen'}
         screenOptions={({ route, navigation }) => (
            {
               headerShown: false,
            })}
      >

         <AuthTab.Screen name={'WalkThroughScreen'} component={WalkThroughScreen} />
         <AuthTab.Screen name={'Signup'} component={Signup} />
         <AuthTab.Screen name={'Signin'} component={Signin} />
         <AuthTab.Screen name={'Verification'} component={Verification} />

         {/* <AuthTab.Screen name={'finalKYCSubmitForm'} component={finalKYCSubmitForm} /> */}
         <AuthTab.Screen name={'Category'} component={Category} />
         <AuthTab.Screen name={'KYCRegister'} component={KYCRegister} />
         <AuthTab.Screen name={'CheckOut'} component={CheckOut} />
         <AuthTab.Screen name={'Cart'} component={Cart} />
         <AuthTab.Screen name={'EditAdress'} component={EditAdress} />
         <AuthTab.Screen name={'Home'} component={Home} />
         <AuthTab.Screen name={'HomDetailScreene'} component={DetailScreen} />
         <AuthTab.Screen name={'OrderDetails'} component={OrderDetails} />
         <AuthTab.Screen name={'DetailScreen'} component={DetailScreen} />
         <AuthTab.Screen name={'TitleScreen'} component={TitleScreen} />
         <AuthTab.Screen name={'TherapeuticSegment'} component={TherapeuticSegment} />
         <AuthTab.Screen name={'PromotionalMaterial'} component={PromotionalMaterial} />
         <AuthTab.Screen name={'PayOnDelivery'} component={PayOnDelivery} />
         <AuthTab.Screen name={'CashPaymentScreen'} component={CashPaymentScreen} />

         {/* <AuthTab.Screen name={'MyAccount'} component={MyAccount} /> */}
      </AuthTab.Navigator>
   )
}

export default AuthNavigator;