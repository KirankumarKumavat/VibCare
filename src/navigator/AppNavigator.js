import React from 'react';
import { Image, View, Text } from 'react-native';
import Home from '../screens/Home';
import DetailScreen from '../screens/DetailScreen';
import KYCRegister from '../screens/KYCRegister';
import Category from '../screens/Category';
import PromotionalMaterial from '../screens/PromotionalMaterial';
// import finalKYCSubmitForm from '../screens/finalKYCSubmitForm';
import SubCategory from '../screens/SubCategory';
import Offers from '../screens/Offers';
import MyOrders from '../screens/MyOrders';
import OrderDetails from '../screens/OrderDetails';

import Productdetails from '../screens/ProductDetails';
import SearchResult from '../screens/SearchResult';
import Filter from '../screens/Filter';
import ViewAllProducts from '../screens/ViewAllProducts';
import CustomDrawerContentComponent from '../screens/CustomDrawerContentComponent';
import { colors, constants, staticText } from '../config';
import Images from '../assets/images';
import ContactUS from '../screens/ContactUS';
import MyAccount from '../screens/MyAccount';
import SendMessage from '../screens/SendMessage';
import EditAdress from '../screens/EditAdress';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Cart from '../screens/Cart';
import TrackOrder from '../screens/TrackOrder';
import CheckOut from '../screens/CheckOut';
import Verification from '../screens/Verification';
import Notification from '../screens/Notification';
import TitleScreen from '../screens/TitleScreen';
import TherapeuticSegment from '../screens/TherapeuticSegment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import RequestBulk from '../screens/RequestBulk'
import RequestNewMolecule from '../screens/RequestNewMolecule';
import CustomerSupportScreen from '../screens/CustomerSupportScreen';
import ProductQualityIssue from '../screens/ProductQualityIssue';
import RequestProduct from '../screens/RequestProduct';
import PTRAndPTSCalculator from '../screens/PTRAndPTSCalculator';
import IncentiveProgram from '../screens/IncentiveProgram';
import AddDivision from '../screens/AddDivision';
import PayOnDelivery from '../screens/PayOnDelivery';
import CashPaymentScreen from '../screens/CashPaymentScreen';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const AppTab = createStackNavigator();
const HomeTab = createStackNavigator();
const OffersTab = createStackNavigator();
const OrdersTab = createStackNavigator();
const DrugTab = createStackNavigator();




/**
* Home Stack for Home Tab
*/
function HomeStack() {
    return (
        <HomeTab.Navigator
            // headerMode='none'
            initialRouteName='Home'
            // initialRouteName='SearchResult'
            screenOptions={({ route, navigation }) => (
                {
                    headerShown: false,
                    tabBarVisible: route.name == 'ProductDetails' ? false : true,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal'
                })}
        >
            <HomeTab.Screen name={'Home'} component={Home} />
            <HomeTab.Screen name={'Productdetails'} component={Productdetails} />
            <HomeTab.Screen name={'SearchResult'} component={SearchResult} />
            <HomeTab.Screen name={'ViewAllProducts'} component={ViewAllProducts} />
            <HomeTab.Screen name={'Cart'} component={Cart} />
            <HomeTab.Screen name={'CheckOut'} component={CheckOut} />
        </HomeTab.Navigator>
    );
}

// /**
// * Message Stack for Messages Tab
// */
// function DrugStack() {
//     return (
//         <DrugTab.Navigator
//             // headerMode={'none'}
//             initialRouteName={'Drug'}
//             screenOptions={({ route, navigation }) => ({
//                 headerShown: false,
//                 gestureEnabled: true,
//                 gestureDirection: 'horizontal'
//             })}
//         >
//             <DrugTab.Screen name={'Drug'} component={Category} />
//             <DrugTab.Screen name={'SubCategory'} component={SubCategory} />
//             <DrugTab.Screen name={'SearchResult'} component={SearchResult} />
//             <DrugTab.Screen name={'Productdetails'} component={Productdetails} />
//             <DrugTab.Screen name={'Filter'} component={Filter} />
//             <DrugTab.Screen name={'ViewAllProducts'} component={ViewAllProducts} />
//             <DrugTab.Screen name={'Cart'} component={Cart} />
//             <DrugTab.Screen name={'CheckOut'} component={CheckOut} />
//             <DrugTab.Screen name={'KYCRegister'} component={KYCRegister} />
//             <DrugTab.Screen name={'Verification'} component={Verification} />

//             {/* <DrugTab.Screen name={'Messages'} component={Messages} />
//             <DrugTab.Screen name={'ChatProfile'} component={ChatProfile} />
//             <DrugTab.Screen name={'ZoomableImage'} component={ZoomableImage} /> */}
//         </DrugTab.Navigator>
//     );
// }

// function OffersStack() {
//     return (
//         <OffersTab.Navigator
//             // headerMode={'none'}
//             // initialRouteName={'Search'}
//             screenOptions={({ route, navigation }) => ({
//                 headerShown: false,
//                 gestureEnabled: true,
//                 gestureDirection: 'horizontal'
//             })}
//         >
//             <OffersTab.Screen name={'Offers'} component={Offers} />
//             <OffersTab.Screen name={'KYCRegister'} component={KYCRegister} />
//             <OffersTab.Screen name={'finalKYCSubmitForm'} component={finalKYCSubmitForm} />
//             {/* <OffersTab.Screen name={'Search'} component={Search} />
//             <OffersTab.Screen name={'Clients'} component={Clients} /> */}
//             <OffersTab.Screen name={'Verification'} component={Verification} />

//         </OffersTab.Navigator>
//     );
// }

// function OrdersStack() {
//     return (
//         <OrdersTab.Navigator

//             screenOptions={({ route, navigation }) => ({
//                 headerShown: false,
//                 gestureEnabled: true,
//                 gestureDirection: 'horizontal'
//             })}
//         >
//             <OrdersTab.Screen name={'myOrders'} component={MyOrders} />
//             <OrdersTab.Screen name={'OrderDetails'} component={OrderDetails} />
//             <OrdersTab.Screen name={'trackOrder'} component={TrackOrder} />
//             <OrdersTab.Screen name={'KYCRegister'} component={KYCRegister} />
//             <OrdersTab.Screen name={'finalKYCSubmitForm'} component={finalKYCSubmitForm} />
//             {/* <OrdersTab.Screen name={'Profile'} component={Profile} />
//             <OrdersTab.Screen name={'ContactUs'} component={ContactUs} /> */}
//             <OrdersTab.Screen name={'Verification'} component={Verification} />

//         </OrdersTab.Navigator>
//     );
// }


function hideTabBar({ route, navigation }) {
    console.log("route, navigation", route, navigation);
    // let tabBarVisible = true;
    // if (route.state && route.name == 'Home' && ((route.state.routes[1] && route.state.routes[1].name == ("KYCRegister")) || route.state.routes[2] && (route.state.routes[2].name == ("Cart") || (route.state.routes[2].name == ("Productdetails") || (route.state.routes[2].name == ("Filter")))))) {
    //     tabBarVisible = false;
    // }
    // if (route.state && route.name == 'myOrders' && (route.state.index > 0)) tabBarVisible = false;
    // if (route.state && route.name == 'Drug' && (route.state.index > 0)) tabBarVisible = false;
    // if (route.state && route.state.routes[1] && route.state.routes[1].name == "Productdetails") tabBarVisible = false
    // if (route.state && route.state.routes[2] && route.state.routes[2].name == "CheckOut") tabBarVisible = false
    // if (route.state && route.state.routes[1] && route.state.routes[1].name == "Cart") tabBarVisible = false
    // return { tabBarVisible };

    let tabBarVisible = true;
    let unmountOnBlur = true;
    if (route.state && route.state.index > 0) tabBarVisible = false;
    if (route.name == 'ProductDetails') {
        tabBarVisible = false
    }
    return { tabBarVisible, unmountOnBlur };
}

function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={
                ({ route, navigation }) => (
                    {
                        headerShown: false,
                        gestureEnabled: true,
                        unmountOnBlur: true,
                        tabBarShowLabel: false,
                        tabBarHideOnKeyboard: true,
                        tabBarVisible: true,

                        tabBarStyle: {
                            backgroundColor: colors.white,
                        },

                        tabBarIcon: ({ focused }) => {
                            const { name } = route;
                            if (name === 'Home') {
                                return <Image style={{ height: 45, width: 45 }} source={focused ? Images.homeSelectTabIcon : Images.homeDeSelectTabIcon} />;
                            }
                            // else if (name === 'Drug') {
                            //     return <Image style={{ height: 45, width: 45 }} source={focused ? Images.drugSelectTabIcon : Images.drugDeSelectTabIcon} />;
                            // }
                            else if (name === 'Offers') {
                                return <Image style={{ height: 45, width: 45 }} source={focused ? Images.saleSelectTabIcon : Images.saleDeSelectTabIcon} />;
                            }
                            else if (name === 'MyOrders') {
                                return <Image style={{ height: 45, width: 45 }} source={focused ? Images.ordersSelectTabIcon : Images.ordersDeSelectTabIcon} />;
                            }

                        },
                    }
                )
            }
            backBehavior={'initialRoute'}
        >
            <Tab.Screen name={'Home'} component={HomeStack} options={hideTabBar}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        navigation.reset({
                            routes: [{ name: 'Home', params: undefined }],
                        });
                        delete route.params
                    }
                })}
                 />
            {/* <Tab.Screen name={'Drug'} component={Category} options={hideTabBar}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        navigation.reset({
                            routes: [{ name: 'Drug', params: undefined }],
                        });
                        delete route.params
                    }
                })}
            /> */}
            <Tab.Screen name={'Offers'} component={Offers} options={hideTabBar}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        navigation.reset({
                            routes: [{ name: 'Offers', params: undefined }],
                        });
                        delete route.params
                    }
                })}
            />
            <Tab.Screen name={'MyOrders'} component={MyOrders} options={hideTabBar}
                listeners={({ navigation, route }) => ({
                    tabPress: (e) => {
                        e.preventDefault()
                        navigation.reset({
                            routes: [{ name: 'MyOrders', params: undefined }],
                        });
                        delete route.params
                    }
                })}
            />
        </Tab.Navigator>
    );
}

function MainStackNavigation() {
    return (
        <MainStack.Navigator
            // initialRouteName='Notification'
            screenOptions={({ route, navigation }) => (
                {
                    headerShown: false,
                    tabBarVisible: true,
                    gestureEnabled: false,
                    gestureDirection: 'horizontal'
                }
            )}>

            <MainStack.Screen name={'HomeDrawer'} component={TabNavigation} />
            <MainStack.Screen name={'Home'} component={HomeStack} />
            <MainStack.Screen name={'KYCRegister'} component={KYCRegister} />
            <MainStack.Screen name={'Productdetails'} component={Productdetails} />
            <MainStack.Screen name={'DetailScreen'} component={DetailScreen} />
            <MainStack.Screen name={'Filter'} component={Filter} />
            <MainStack.Screen name={'ViewAllProducts'} component={ViewAllProducts} />
            <MainStack.Screen name={'Cart'} component={Cart} />
            <MainStack.Screen name={'CheckOut'} component={CheckOut} />
            <MainStack.Screen name={'Verification'} component={Verification} />
            {/* <MainStack.Screen name={'Drug'} component={Category} /> */}
            <MainStack.Screen name={'SubCategory'} component={SubCategory} />
            <MainStack.Screen name={'Offers'} component={Offers} />
            <MainStack.Screen name={'MyOrders'} component={MyOrders} />
            <MainStack.Screen name={'OrderDetails'} component={OrderDetails} />
            <MainStack.Screen name={'trackOrder'} component={TrackOrder} />
            <MainStack.Screen name={'RequestBulk'} component={RequestBulk} />
            <MainStack.Screen name={'RequestNewMolecule'} component={RequestNewMolecule} />
            <MainStack.Screen name={'CustomerSupportScreen'} component={CustomerSupportScreen} />
            <MainStack.Screen name={'Notification'} component={Notification} />
            <MainStack.Screen name={'AddDivision'} component={AddDivision} />
            <MainStack.Screen name={'TitleScreen'} component={TitleScreen} />

            <MainStack.Screen name={'TherapeuticSegment'} component={TherapeuticSegment} />
            <MainStack.Screen name={'PromotionalMaterial'} component={PromotionalMaterial} />
            <MainStack.Screen name={'PayOnDelivery'} component={PayOnDelivery} />
            <MainStack.Screen name={'CashPaymentScreen'} component={CashPaymentScreen} />

            <MainStack.Screen name={'TabNavigation'} component={TabNavigation} />

            
        </MainStack.Navigator>
    )
}

{/* <OffersTab.Screen name={'Search'} component={Search} />
<OffersTab.Screen name={'Clients'} component={Clients} /> */}
{/* <OrdersTab.Screen name={'Profile'} component={Profile} />
            <OrdersTab.Screen name={'ContactUs'} component={ContactUs} /> */}

function AppNavigator() {
    return (
        <Drawer.Navigator
            // initialRouteName={'IncentiveProgram'}
            screenOptions={({ route, navigation }) => (
                {
                    headerShown: false,
                    tabBarVisible: true,
                    gestureEnabled: false,
                    gestureDirection: 'horizontal'
                }

            )}
            drawerStyle={{ backgroundColor: 'transparent' }}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
            drawerType={constants.screenWidth >= 768 ? 'permanent' : 'front'}>
            <Drawer.Screen name={"MainDrawer"} component={MainStackNavigation} />
            <Drawer.Screen name={"ContactUS"} component={ContactUS} />
            <Drawer.Screen name={"MyAccount"} component={MyAccount} />
            <Drawer.Screen name={"SendMessage"} component={SendMessage} />
            <Drawer.Screen name={"EditAdress"} component={EditAdress} />
            <Drawer.Screen name={"TermsAndConditions"} component={TermsAndConditions} />
            <Drawer.Screen name={"PrivacyPolicy"} component={PrivacyPolicy} />
            <Drawer.Screen name={'Verification'} component={Verification} />
            <Drawer.Screen name={'ProductQualityIssue'} component={ProductQualityIssue} />
            <Drawer.Screen name={'RequestProduct'} component={RequestProduct} />
            <Drawer.Screen name={'PTRAndPTSCalculator'} component={PTRAndPTSCalculator} />
            <Drawer.Screen name={'IncentiveProgram'} component={IncentiveProgram} />
            <Drawer.Screen name={'Notification'} component={Notification} />
            <Drawer.Screen name={'CustomerSupportScreen'} component={CustomerSupportScreen} />
            <Drawer.Screen name={'RequestBulk'} component={RequestBulk} />
            <Drawer.Screen name={'RequestNewMolecule'} component={RequestNewMolecule} />

        </Drawer.Navigator>
    );
}

export default AppNavigator;
