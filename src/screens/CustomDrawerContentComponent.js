import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, UIManager, LayoutAnimation, ScrollView, Switch, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { StorageService, showTostMessage, showSimpleAlert, NavigationService } from '../utilities';
import { colors, constants, staticText } from '../config';
import fonts from '../assets';
import Images from '../assets/images';
import { CustomButton } from '../components';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { StackActions } from '@react-navigation/native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { constant } from 'lodash';

let response;
let initialRender = true; // <-- Add this

class CustomDrawerContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editClicked: false,
            name: '',
            loading: false,
            changed: false,
            editPhoneClicked: false,
            expandedIndex: -1,
            modle: false,
            switch1Value: false
        }
    }
    componentDidMount = () => {
        // this.getKYCData();
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    };

    // getKYCData = async () => {
    //     //TODO----->edit name api,set design when kyc pending ,solve webview scroll issue 
    //     response = await Request.get(`${constants.apiCustomerVersion}/getkycdata`);
    //     this.setState({ name: response.data.name, address: response.data.address, gst_number: response.data.gst_number, company: response.data.company, mobile_number: response.data.mobile_number.substr(2), oldPhoneNumber: response.data.mobile_number }, () => {
    //         StorageService.saveItem('cstomerName', this.state.name)
    //     })
    // }

    logout = async () => {
        Alert.alert(
            staticText.projectTitle,
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        await StorageService.saveItem(StorageService.KEYS.USER_DETAILS, '')
                        // this.props.navigation.navigate('Signin');
                        // this.setState({ loading: true })
                        // StorageService.deleteItem('facebookAccessToken');
                        // StorageService.deleteItem('access-token');
                        //StorageService.deleteItem('refresh-token');
                        // this.setState({ loading: true })
                        // let response = await Request.get(`${constants.apiCustomerVersion}/logout`);
                        // this.setState({ loading: false })
                        // Alert.alert(staticText.projectTitle
                        //     , response.data.message)
                        // showTostMessage(response.data.message)
                        // StorageService.deleteItem('facebookAccessToken');
                        // StorageService.deleteItem('access-token');
                        // StorageService.deleteItem('Authorized');
                        // auth()
                        //     .signOut()
                        //     .then(() => console.log('User signed out!'));
                        // LoginManager.logOut();
                        // this.props.navigation.dispatch(DrawerActions.closeDrawer())
                        this.props.navigation.navigate('Auth', { screen: "Signin" });


                        // this.props.navigation.dispatch(StackActions.popToTop());
                        // const resetAction = StackActions.reset({
                        //     index: 0,
                        //     actions: [NavigationActions.navigate({ routeName: 'home' })],
                        // });
                        // this.props.navigation.dispatch(resetAction);
                    }
                }
            ],
            { cancelable: false }
        );
    };

    updateName = () => {
        if (this.checkValidation()) {
            this.setState({ editClicked: !this.state.editClicked, }, () => {
                if (this.state.changed) {
                    this.updateNameApi()
                    this.setState({ changed: false })
                }
                setTimeout(() => {
                    this.setState({ editClicked: false })
                }, 10000)
            })
        }
    }

    updataPhone = async () => {
        Keyboard.dismiss()
        console.log("this.state.mobile_number-->", this.state.mobile_number);
        let phoneRegExp = /^[6-9][0-9]{9}$/;
        if (!this.state.editPhoneClicked) {
            this.setState({ editPhoneClicked: true }, () => {
                setTimeout(() => {
                    this.setState({ editPhoneClicked: false })
                }, 10000)
            })
        }
        else {
            this.setState({ editPhoneClicked: false }, () => {

            })
            let finalPhoneNumber = "91" + this.state.mobile_number.trim();
            console.log("check");
            if (this.state.mobile_number.trim() == "") {
                // showSimpleAlert("Please enter valida mobile number")
                Alert.alert(staticText.projectTitle,
                    staticText.phoneRequireText);
                return false;
            }
            else if (this.state.mobile_number.trim().length < 10) {
                Alert.alert(staticText.projectTitle,
                    staticText.phoneValid);
                return false;
            }
            else if (!(phoneRegExp.test(this.state.mobile_number.trim()))) {
                Alert.alert(staticText.projectTitle,
                    staticText.phoneValid);
                return false;

            }
            else if (this.state.oldPhoneNumber.trim() == finalPhoneNumber) {
                showSimpleAlert("This phone number is already registered, Please use different number");
                return false;
            }
            else {
                const reqData = {
                    mobile_no: finalPhoneNumber
                }
                this.setState({ loading: true })
                let resp = await Request.post(`${constants.apiCustomerVersion}/editmobile`, reqData);
                this.setState({ loading: false, editPhoneClicked: false })
                showTostMessage(resp.data.message)
                if (resp.data.success == 1) {
                    // this.setState({
                    //     mobile_number: resp.data.mobile_number.substr(2), oldPhoneNumber: resp.data.mobile_number
                    // })
                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                    this.props.navigation.navigate("Verification", { isFromDrawer: true })
                }
            }
        }
    }

    updateNameApi = async () => {
        if (this.checkValidation()) {
            let reqData = {
                "name": this.state.name.replace(/\s\s+/g, ' ')
            }
            let resp = await Request.post(`${constants.apiCustomerVersion}/updatename`, reqData);
            this.setState({ editClicked: false })
            if (resp.data.success == 1) {
                // this.setState({ editClicked: !this.state.editClicked })
                showTostMessage(resp.data.message)
            }
        }
    }

    checkValidation = () => {
        if (this.state.name.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterNameText);
            return false;
        }
        else {
            return true;
        }
    }

    render() {
        if (initialRender) {
            // On the first render (when the drawer will flash, return null so 
            //  null will "flash")
            // Don't forget to set this flag to false or you're always going 
            // to have a ghost drawer
            initialRender = false;
            return null;
        }
        return (
            <View style={styles.container}>
                <SafeAreaView
                    style={styles.safeAreaView}
                // forceInset={{ top: 'always', horizontal: 'never' }}
                >
                    <View style={{ marginStart: 22, marginTop: 30 }} >
                        <View style={styles.kycButtonStyle}>
                            <Text style={styles.completeStyle} >{'Complete KYC'}</Text>
                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('MyAccount')}>
                        <View style={styles.ClientStyleView}>
                            <View style={styles.personalInfo}>
                                <Image style={{ height: 28, width: 28 }} source={Images.maleavatar} ></Image>
                                <Text style={styles.nameStyle}>{'Clair wilkinsons'}</Text>
                                <Image style={{ height: 13, width: 13 }} resizeMode='contain' source={Images.editIcon} />
                            </View>
                            <Text style={styles.numberStyle} >{'389-929-7523'}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <View style={styles.secondHalfBox} /> */}
                    <DrawerContentScrollView
                        showsVerticalScrollIndicator={false}
                        style={{}}
                        // {...this.props}
                        bounces={false}>

                        <View style={{ paddingLeft: 10, marginBottom: 10, flex: 1, paddingTop: - 30 }}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image style={{ height: 28, width: 28 }} source={Images.homeicon} />
                                )}
                                label="Home"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    // this.props.navigation.navigate('TabNavigation')
                                }}
                            />
                            <View style={styles.secondHalfBox} />

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image style={{ height: 28, width: 28 }} source={Images.accounticon} />
                                )}
                                label="My Account"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('MyAccount')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image style={{ height: 28, width: 28 }} source={Images.orderIcon} />
                                )}
                                label="View / Manage Orders"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('MyOrders')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image style={{ height: 28, width: 28 }} source={Images.MyDigitalaidicon} />
                                )}
                                label="My Digital Visual Aid"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('Filter')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image style={{ height: 28, width: 28 }} source={Images.offersicon} />
                                )}
                                label="Offers"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    // this.props.navigation.navigate('TabNavigation')

                                }}
                            />
                            <View style={styles.secondHalfBox} />

                            <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 22, alignItems: 'center', }} >
                                <Image source={Images.requesticon} />
                                <Text style={[styles.labeltextStyle, { marginStart: 11, fontFamily: Platform.OS === 'android' ? fonts.Helvetica : fonts.HelveBold, }]}>{'Make a Request'}</Text>
                                <View style={{ marginStart: 50 }} >
                                    <TouchableOpacity onPress={() => { this.setState({ modle: !this.state.modle }) }}  >
                                        <Image style={{ width: 15, height: 8, }} source={this.state.modle ? Images.uparrow : Images.downArrow}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {this.state.modle == true ? null : <View style={styles.secondInnerHalfBox} />}

                        {this.state.modle == true ?
                            <View style={{ backgroundColor: colors.shadowColors, }}>
                                <View style={{}} >
                                    <DrawerItem
                                        label="Request Bulk Rate"
                                        labelStyle={styles.innerlabelStyle}
                                        onPress={() => {
                                            this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                            this.props.navigation.navigate('RequestBulk')
                                        }}
                                    />
                                    <View style={styles.secondInnerHalfBox} />
                                    <DrawerItem
                                        label="Request New Molecule"
                                        labelStyle={[styles.innerlabelStyle, {}]}
                                        onPress={() => {
                                            this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                            this.props.navigation.navigate('RequestNewMolecule')
                                        }}
                                    />
                                    <View style={styles.secondInnerHalfBox} />

                                    <DrawerItem
                                        label="Request Accounts Ledger"
                                        labelStyle={[styles.innerlabelStyle, {}]}
                                        onPress={() => {
                                            this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                            this.props.navigation.navigate('RequestNewMolecule')
                                        }}
                                    />
                                </View>
                            </View>

                            : null}
                        <View style={{ paddingLeft: 10 }} >
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image style={{ height: 28, width: 28 }} source={Images.requesticon} />
                                )}
                                label="Raise a Complaint"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('CustomerSupportScreen')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image source={Images.calculator} />
                                )}
                                label="PTR & PTS Calculator"
                                labelStyle={[styles.labelStyle, {}]}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('PTRAndPTSCalculator')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image source={Images.incentiveicon} />
                                )}
                                label="My Incentive"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('IncentiveProgram')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 22, alignItems: 'center', paddingBottom: 10 }} >
                                    <Image source={Images.requesticon} />
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                        this.props.navigation.navigate('Notification')
                                    }} >
                                        <Text style={[styles.labeltextStyle, { marginStart: 11, fontFamily: Platform.OS === 'android' ? fonts.Helvetica : fonts.HelveBold, }]}>{'Notification'}</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginStart: 50 }} >
                                        <Switch
                                            style={styles.switch}
                                            ios_backgroundColor="grey"
                                            trackColor={{ true: '#24C178', false: 'grey' }}
                                            onValueChange={() => this.setState({ switch1Value: !this.state.switch1Value })}
                                            value={this.state.switch1Value}
                                        >
                                        </Switch>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image source={Images.settingsicon} />
                                )}
                                label="Settings"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('PrivacyPolicy')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image source={Images.Customersupporticon} />
                                )}
                                label="Customer Support"
                                labelStyle={styles.labelStyle}
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer())
                                    this.props.navigation.navigate('CustomerSupportScreen')
                                }}
                            />
                            <View style={styles.secondHalfBox} />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Image source={Images.logout} />
                                )}
                                label="Logout"
                                labelStyle={styles.labelStyle}
                                onPress={() => this.logout()}
                            />
                            <View style={styles.secondHalfBox} />

                            <View style={{ marginTop: 40, paddingBottom: 10 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('PrivacyPolicy')} >
                                    <View style={styles.sortFilterViewWrap}>
                                        <View>
                                            <Text style={styles.privacyTextStyle}>{'Privacy Policy'}</Text>
                                        </View>
                                        <View style={styles.sortButtonView}></View>
                                        <View >
                                            <Text style={styles.privacyTextStyle}>{'Terms and Condition'}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </DrawerContentScrollView>
                </SafeAreaView>
            </View >
        );
    }
    returnLabel = () => {
        return (
            <Text style={styles.labelStyle} numberOfLines={2}>{'Terms and Conditions'}</Text>
        )
    }

    onItemPress = (item, index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        this.setState({
            expandedIndex: this.state.expandedIndex == index ? -1 : index
        })
    }



}
export default CustomDrawerContentComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    safeAreaView: {
        flex: 1,
    },
    completeStyle: {
        color: colors.Orange,
        fontFamily: fonts.Helvetica,
        fontSize: 20
    },
    kycButtonStyle: {
        borderColor: colors.borderColorOrange,
        borderWidth: 1,
        backgroundColor: colors.InsideTextInputColor,
        borderRadius: 4,
        height: 46,
        width: 240,
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    numberStyle: {
        fontFamily: fonts.Helvetica,
        color: colors.number,
        fontSize: 16,
        paddingRight: 35
    },
    ClientStyleView: {
        backgroundColor: colors.lightBlueBackGround,
        marginTop: 15,
        borderRadius: 6,
        height: 85,
        // width: (constants.screenWidth- 120),
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    inputNameStyle: {
        marginLeft: 10,
        borderBottomColor: colors.textColor,
        borderBottomWidth: 1,
        width: '70%',
        paddingHorizontal: 10,
        fontSize: 22,
        fontFamily: fonts.MuliBold,
        color: colors.black
    },
    nameStyle: {
        width: '70%',
        paddingLeft: 12,
        fontSize: 20,
        fontFamily: fonts.Helvetica,
        color: colors.black
    },
    mobileNoStyleView: {
        marginTop: 10,
        paddingLeft: 29,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mobileNoStyleTExt: {
        paddingLeft: 15,
        fontSize: 16,
        fontFamily: fonts.Muli,
        color: colors.black
    },
    kycDetails: {
        paddingLeft: 25,
        color: colors.placeholderColor,
        fontSize: 14,
        fontFamily: fonts.Muli,
    },
    kycDetailsaData: {
        marginHorizontal: 25,
        color: colors.textColor,
        fontSize: 16,
        fontFamily: fonts.MuliSemiBold,
    },
    labelStyle: {
        // flex: 1,
        fontFamily: fonts.Helvetica,
        fontSize: 15,
        color: colors.black,
        marginLeft: -18
    },
    notoficationlabelStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 15,
        color: colors.black,
        marginLeft: -18,
        backgroundColor: 'red',
    },
    innerlabelStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 51
        // alignSelf: 'center',
    },
    labeltextStyle: {
        fontSize: 15,
        color: colors.black
        // marginLeft: -18
    },
    secondHalfBox: {
        width: '95%',
        opacity: 0.3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.placeholderColor,
        marginVertical: 3,
    },
    secondInnerHalfBox: {
        // width: '95%',
        marginHorizontal: 10,
        opacity: 0.3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.placeholderColor,
        marginVertical: 3,
    },
    sortFilterViewWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: constants.screenWidth / 2,
        marginStart: 25
    },
    sortButtonView: {
        borderColor: colors.Orange,
        borderWidth: 0.7,
        height: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    privacyTextStyle: {
        color: colors.Orange,
        fontFamily: fonts.Helvetica,
        fontSize: 14
    },
    switch: {
        // marginLeft: 130,
        marginRight: 22,
        transform: [{ scaleX: .9 }, { scaleY: .9 }]
    }
})