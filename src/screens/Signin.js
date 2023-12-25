import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';

import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton } from '../components';
import Images from '../assets/images';
import { StorageService, moderateScale, showTostMessage } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';

import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { color } from 'react-native-reanimated';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            mobile_no: '',
            loading: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    {/* <Header backButton rightIcon
                        middleText={'Offers'} /> */}
                    <View style={styles.firstView}>
                        <Image style={{ height: 82, width: 172, marginTop: 60 }} source={Images.SignInLogo} />
                        <Image style={{ marginTop: 16 }} source={Images.SignInImage}></Image>
                        <Text style={{ marginTop: 28, fontSize: 18, fontFamily: fonts.HelveBold, alignItems: 'center', color: colors.black }} >{staticText.LoginText}</Text>
                        <Text style={styles.enterOTPTextStyle}>
                            {staticText.enterOTPText}
                        </Text>
                    </View>

                    <View style={styles.secondView}>
                        <View style={styles.countryCodeStyleView}>
                            <Input
                                rightIcon={Images.downArrow}
                                editable={false}
                                keyboardType="numeric"
                                style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                mainStyle={styles.countryCodeInputStyle}
                                value={'+91'}
                            />
                            <Input
                                rightIcon={Images.callicon}
                                inputRef={(input) => { this.mobileNo = input; }}
                                keyboardType="numeric"
                                placeholder={staticText.phoneNumber}
                                returnKeyType="done"
                                style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                mainStyle={styles.numberInputView}
                                value={this.state.mobile_no}
                                maxLength={10}
                                onChangeText={(mobile_no) => this.setState({ mobile_no })}
                            />
                        </View>


                        <CustomButton
                            mainStyle={styles.customSignUpButtonOneStyle}
                            title={staticText.Login}
                            onPress={() => this.onPressLogin()}
                        // disabled={this.state.loading ? true : false}
                        />
                    </View>
                    <View style={styles.lastView}>
                        <Text style={styles.alreadyHaveAccountTextStyle}>
                            {' Don’t have an account? '}
                        </Text>
                        <Text onPress={() => this.props.navigation.navigate('Signup')}
                            style={styles.signInTextButtonStyle}>
                            {staticText.signIn}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>

                {/* {this.state.loading ? <Loader /> : null} */}
            </View>
        );
    }
    loginFacebook = async () => {
        // Attempt login with permissions
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
        this.setState({ loading: true })
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        this.setState({ loading: false })
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        this.setState({ loading: false })
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        // Create a Firebase credential with the AccessToken
        // const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        // Sign-in the user with the credential
        // console.log('credentialssss----->', facebookCredential);
        StorageService.saveItem('facebookAccessToken', JSON.stringify(data));

        StorageService.getItem('facebookAccessToken').then(async (datakey) => {
            this.setState({ loading: true })
            let response = await Request.post(`${constants.apiSocialLoginVersion}/connect`, { access_token: data.accessToken });
            this.setState({ loading: false })
            // Alert.alert(staticText.projectTitle,
            //     response.data.message)
            showTostMessage(response.data.message);

            this.props.navigation.navigate(datakey != null ? 'App' : 'Auth');
            // return auth().signInWithCredential(facebookCredential);

        });
    }
    checkValidation = () => {
        const { userName, mobile_no } = this.state;
        let phoneRegExp = /^[6-9][0-9]{9}$/;

        if (mobile_no.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.phoneRequireText);
            return false;
        }
        else if (mobile_no.length != 10) {
            Alert.alert(staticText.projectTitle,
                staticText.phoneValid);
            return false;
        }
        else if (!(phoneRegExp.test(mobile_no))) {
            Alert.alert(staticText.projectTitle,
                staticText.phoneValid);
            return false;

        }
        else {

            return true;

        }
    }

    onPressLogin = async () => {

        let reqData = {
            Mobile: this.state.mobile_no,
        }
        if (this.checkValidation()) {
            this.setState({ loading: true })

            let response = await Request.post('Users/SignIn', reqData);
            console.log('responewithout jason', response);
            this.setState({ loading: false })
            let responseJson = await response.json();
            if (response.status == 200) {
                this.props.navigation.navigate('Verification', { mobile_no: this.state.mobile_no, otp: responseJson.message });
            }
            else {
                Alert.alert(
                    staticText.projectTitle,
                    responseJson.message
                )
            }
        }
    }

    // onPressLogin = async () => {

    //     let reqData = {
    //         Mobile: this.state.mobile_no,
    //     }
    //     if (this.checkValidation()) {

    //         try {
    //             this.setState({ loading: true })

    //             let response = await fetch('https://arthcrm.com:2087/Users/SignIn', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     Mobile: this.state.mobile_no,
    //                 }),
    //             });
    //             let responseJson = await response.json();
    //             console.log("responseJson", response, responseJson);
    //             if (response.status == 200) {
    //                 this.props.navigation.navigate('Verification', { mobile_no: this.state.mobile_no, otp: responseJson.message });
    //                 Alert.alert(
    //                     staticText.projectTitle,
    //                     'otp sent successfully'
    //                 )
    //             }
    //             else {
    //                 Alert.alert(
    //                     staticText.projectTitle,
    //                     responseJson.message
    //                 )
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }

    //         // let response = await Request.post('SignIn', reqData);
    //         // console.log('response', response);

    //         // // Alert.alert(
    //         // //     staticText.projectTitle,
    //         // //     response.data.message
    //         // // )
    //         // // showTostMessage(response.data.message);

    //         // if (response == true) {
    //         //     this.props.navigation.navigate('Verification', { mobile_no: this.state.mobile_no });
    //         // }
    //         this.setState({ loading: false })
    //     }
    // }

}

export default Signin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor1,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        width: constants.screenWidth - 25,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    countryCodeInputStyle: {
        width: (constants.screenWidth - 100) / 3,
        // paddingHorizontal: 0,
        flexDirection: 'row',
        paddingLeft: moderateScale(10),
    },
    numberInputView: {
        width: '62%',
    },
    customSignUpButtonOneStyle: {
        marginTop: 30,
    },
    firstView: {
        // marginTop: 45,
        alignItems: 'center',
    },
    secondView: {
        marginTop: 50,
    },
    lastView: {
        paddingBottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    alreadyHaveAccountTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 16,
        color: colors.placeholderColor,
    },
    signInTextButtonStyle: {
        color: colors.Orange,
        fontSize: 16,
        fontFamily: fonts.Helvetica,
    },
    enterOTPTextStyle: {
        // textAlign: 'center',
        // letterSpacing: 0.6,
        textAlign: 'center',
        lineHeight: 24,
        width: constants.screenWidth - 100,
        marginTop: 15,
        fontFamily: fonts.Helvetica,
        fontSize: moderateScale(14),
        color: colors.black,
    },
});