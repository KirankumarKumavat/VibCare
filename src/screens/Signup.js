import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Image, Keyboard } from 'react-native';
import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton } from '../components';
import Images from '../assets/images';
import { moderateScale, showTostMessage } from '../utilities';
import { StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Firstname: '',
            Lastname: '',
            Email: '',
            mobile_no: '',
            phoneNumber: '',
            loading: false,
        };
    }
    componentDidMount = async () => {
        let deviceToken = '0';
        if (await StorageService.getItem('deviceToken') == null) {
            await StorageService.saveItem('deviceToken', deviceToken);
            let response = await Request.post(`${constants.apiCustomerVersion}/generatetoken`, {});
            StorageService.saveItem('access-token', response.data.access_token);
            StorageService.saveItem('refresh-token', response.data.refresh_token);
        }

        // let response = await Request.post(`${constants.apiCustomerVersion}/generatetoken`, {});
        // console.log('response', response);

    }
    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View style={styles.firstView}>
                        <Image style={{ height: 82, width: 172, marginTop: 60 }} source={Images.SignInLogo} />
                        <Text style={{ marginTop: 27, fontSize: 20, fontFamily: fonts.HelveBold, alignItems: 'center', color: colors.black }} >{staticText.ReigsterText}</Text>
                        <Text style={styles.enterOTPTextStyle}>
                            {staticText.createText}
                        </Text>
                    </View>

                    <View style={styles.secondView}>
                        <Input
                            inputRef={ref => (this.FirstName = ref)}
                            autoCapitalize='words'
                            rightIcon={Images.usericon}
                            placeholder={staticText.FirstName}
                            returnKeyType="next"
                            value={this.state.Firstname}
                            style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                            onChangeText={(Firstname) => this.setState({ Firstname })}
                            onSubmitEditing={() => this.LastName.focus()}
                            blurOnSubmit={false}
                        />
                        <Input
                            inputRef={ref => (this.LastName = ref)}
                            autoCapitalize='words'
                            rightIcon={Images.usericon}
                            placeholder={staticText.LastName}
                            returnKeyType="next"
                            value={this.state.Lastname}
                            style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                            onChangeText={(Lastname) => this.setState({ Lastname })}
                            // onSubmitEditing={() => this.mobile_no.focus()}
                            blurOnSubmit={false}
                        />
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
                                inputRef={(ref) => (this.mobileNo = ref)}
                                keyboardType="numeric"
                                placeholder={staticText.phoneNumber}
                                returnKeyType="done"
                                style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                mainStyle={styles.numberInputView}
                                value={this.state.mobile_no}
                                maxLength={10}
                                // onSubmitEditing={() => this.Email.focus()}
                                onChangeText={(mobile_no) => this.setState({ mobile_no })}
                            />
                        </View>

                        <Input
                            autoCapitalize='words'
                            rightIcon={Images.emailIcon}
                            placeholder={'Email'}
                            returnKeyType="done"
                            value={this.state.Email}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                            onChangeText={(Email) => this.setState({ Email })}
                            blurOnSubmit={false}
                        />

                        <CustomButton
                            mainStyle={styles.customSignUpButtonOneStyle}
                            title={staticText.signIn}
                            onPress={() => this.onPressLogin()}
                            disabled={this.state.loading == false ? false : true}
                        />
                    </View>

                    <View style={styles.lastView}>
                        <Text style={styles.alreadyHaveAccountTextStyle}>{' Already have an account?'}</Text>
                        <Text onPress={() => this.props.navigation.navigate('Signin')}
                            style={styles.signInTextButtonStyle}>
                            {staticText.Login}
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
                {this.state.loading ? <Loader /> : null}
            </View>
        );
    }

    // onPressLogin = async () => {

    //     let reqData = {
    //         Mobile: this.state.mobile_no,
    //     }
    //     if (this.checkValidation()) {

    //         try {
    //             this.setState({ loading: true })

    //             let response = await fetch('https://arthcrm.com:2087/Users/Signup', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     FirstName: this.state.Firstname,
    //                     LastName: this.state.Lastname,
    //                     Mobile: this.state.mobile_no,
    //                     Email: this.state.Email,
    //                 }),
    //             });
    //             let responseJson = await response.json();
    //             console.log("responseJson", response, responseJson);
    //             if (response.status == 201) {
    //                 this.props.navigation.navigate('Signin', { mobile_no: this.state.mobile_no });
    //                 Alert.alert(
    //                     staticText.projectTitle,
    //                     'SignUp successfully\n you can now login to your account '
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


    onPressLogin = async () => {
        let reqData = {
            FirstName: this.state.Firstname,
            LastName: this.state.Lastname,
            Mobile: this.state.mobile_no,
            Email: this.state.Email,
        }
        if (this.checkValidation()) {
            this.setState({ loading: true })

            let response = await Request.post('Users/Signup', reqData);
            console.log('respones', response);
            let responseJson = await response.json();
            console.log('responewithout jason', responseJson);
            if (response.status == 201) {
                let reqData = {
                    Mobile: this.state.mobile_no,
                }

                let response = await Request.post('Users/GenrateJWT', reqData);
                console.log('responewithout jason', response);
                this.setState({ loading: false })
                let responseJson1 = await response.json();
                console.log('responseJson', responseJson1);
                if (responseJson1) {
                    await StorageService.saveItem(StorageService.KEYS.USER_DETAILS, responseJson1);
                }

                this.props.navigation.navigate('KYCRegister', { mobile_no: this.state.mobile_no });

                // Alert.alert(
                //     staticText.projectTitle,
                //     responseJson.message,
                //     'you can now login to your account'
                // )
            }

            else {
                Alert.alert(
                    staticText.projectTitle,
                    responseJson.message
                )
            }
        }

    }



    checkValidation = () => {
        const { Firstname, Lastname, mobile_no, Email } = this.state;
        let phoneRegExp = /^[6-9][0-9]{9}$/;
        let emailRedExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (Firstname.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.FirstnameText);
            return false;
        }
        else if (Lastname.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.LastnameText);
            return false;
        }
        else if (mobile_no.trim() == '') {
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
        else if (Email.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.EmailText);
            return false;
        }
        else if (!(emailRedExp.test(Email))) {
            Alert.alert(staticText.projectTitle,
                staticText.emailValid);
            return false;
        }
        else {
            return true;
        }
    }
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        // flexGrow: 1,
    },
    enterOTPTextStyle: {
        textAlign: 'center',
        width: constants.screenWidth - 100,
        fontFamily: fonts.Helvetica,
        fontSize: moderateScale(20),
        color: colors.black,
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        width: constants.screenWidth - 46,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    countryCodeInputStyle: {
        width: (constants.screenWidth - 100) / 3,
        paddingHorizontal: 0,
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
        marginTop: 45,
        justifyContent: 'flex-end',
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
});
