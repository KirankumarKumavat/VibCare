import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, Keyboard, TouchableOpacity } from 'react-native';

import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { verticalScale, moderateScale, scale, showTostMessage, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { textfieldsArray } from '../config/utility';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Timer from '../components/Timer';
import { useRoute } from '@react-navigation/native';
export const timerOptions = {
    container: {
        borderRadius: 5,
    },
    text: {
        fontSize: 14,
        color: colors.Orange,
        fontFamily: fonts.MuliBold,
    }
};


class Verification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstDigit: '',
            secondDigit: '',
            thirdDigit: '',
            fourthDigit: '',
            fifthDigit: '',
            sixthDigit: '',
            loading: false,
            otpArrayCopy: '',
            textfieldsArray: textfieldsArray(),
            timer: false,
            timerStart: false,
            timerReset: false,
            totalDuration: 60000,
            otp: this.props.route.params.otp ? this.props.route.params.otp : ''
        };
    }

    componentDidMount = () => {
        console.log('coming the data', this.props);
        this.setState({ timerStart: true, timerReset: false, timer: true });
        this.onPressGenerateToken()
    }
    componentWillUnmount() {
        this.setState({ timerStart: false, timerReset: false, timer: false });
        Keyboard.dismiss()
    }

    onOtpChange = (value, index, fieldId) => {
        this.setState({ [fieldId]: value }, () => {

        });
        if (isNaN(Number(value))) {
            // do nothing when a non digit is pressed
            return;
        }
        if (index < this.state.textfieldsArray.length - 1 && value.length == 1) {
            this.state.textfieldsArray[index + 1].ref.focus();
            1
        }
        if (index > 0 && value.length == 0) {
            this.state.textfieldsArray[index - 1].ref.focus();
        }
    };

    // onPressBothVerifyFunction = () => {
    //     if (() => onPressVerify()) {
    //     }
    //     else {
    //         () => onPressGenerateToken()
    //     }
    // }

    onPressGenerateToken = async () => {
        let reqData = {
            Mobile: this.props.route.params.mobile_no,
        }
        this.setState({ loading: true })
        let response = await Request.post('Users/GenrateJWT', reqData);
        console.log('responewithout jason', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        console.log('responseJson', responseJson);
        if (responseJson) {
            await StorageService.saveItem(StorageService.KEYS.USER_DETAILS, responseJson);
        }
    }

    onPressVerify = async () => {
        const isFromDrawer = this.props.route && this.props.route.params && this.props.route.params.isFromDrawer
        console.log("iSfromDrawer", isFromDrawer);
        const otpArrayCopy = this.state.firstDigit + this.state.secondDigit + this.state.thirdDigit + this.state.fourthDigit + this.state.fifthDigit + this.state.sixthDigit;
        console.log('otpArrayCopy', otpArrayCopy, this.state.otpArrayCopy.length);
        console.log();
        this.setState({ otpArrayCopy }, async () => {
            if (this.state.otpArrayCopy == '') {
                Alert.alert(
                    staticText.projectTitle,
                    staticText.OTPRequireText
                )
                return false;
            }
            else if (this.state.otpArrayCopy.length < 6) {
                Alert.alert(
                    staticText.projectTitle,
                    staticText.OTPLengthValidation
                )
                return false;
            }
            else {
                if (otpArrayCopy == this.state.otp) {
                    this.props.navigation.navigate('App');
                }
                else {
                    Alert.alert(
                        staticText.projectTitle,
                        'Wrong otp'
                    );
                }
            }
        })
    }

    onPressResend = async () => {
        this.setState({ loading: true });

        let response = await Request.post(`${constants.apiCustomerVersion}/resendotp`, {});
        this.setState({ loading: false });
        showTostMessage(response.data.message)
        this.setState({ timerStart: true, timerReset: false, timer: true });

        Alert.alert(
            staticText.projectTitle,
            response.data.message
        );

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
                    <Header
                        backButton
                        backIconStyle={styles.backIconStyle}
                        backIcon={Images.backIconGray}
                        middleText={staticText.OTPTitle}
                        middleTextStyle={styles.middleTextStyle}
                        mainStyle={styles.mainStyle} />

                    <View style={styles.OTPImageStyle}>
                        <Image source={Images.OTPgraphic} resizeMode="cover" />
                    </View>

                    <View style={styles.firstView}>
                        <Text style={styles.titleStyle}>
                            {staticText.OTPSent}
                        </Text>
                    </View>

                    <View style={styles.numberView}>
                        <Text style={styles.numberStyle}>
                            {this.props.route.params.mobile_no}
                        </Text>
                    </View>

                    <View style={styles.countryCodeStyleView}>
                        {
                            this.state.textfieldsArray.map((field, i) => (
                                <TextInput
                                    style={styles.countryCodeInputStyle}
                                    key={i}
                                    ref={r => field.ref = r}
                                    onKeyPress={({ nativeEvent }) => {
                                        nativeEvent.key === 'Backspace' ?
                                            (i > 0 ? this.state.textfieldsArray[i - 1].ref.focus() : null)
                                            : console.log('not backspace press')
                                    }}
                                    value={this.state[field.id]}
                                    // placeholder={'-'}
                                    onChangeText={text => this.onOtpChange(text, i, field.id)}
                                    onSubmitEditing={() => this.onPressVerify()}
                                    autoCapitalize={field.autoCapitalize}
                                    keyboardType={'numeric'}
                                    returnKeyType={field.returnKeyType}
                                    //selectionColor={colors.black}
                                    maxLength={1}
                                    autoFocus={i == 0 ? true : false}
                                //secureTextEntry={true}
                                />
                            ))
                        }
                    </View>
                    <CustomButton
                        mainStyle={styles.customSignUpButtonOneStyle}
                        title={staticText.Verify}
                        onPress={
                            () => this.onPressVerify()
                        }
                    />
                    <View>
                        <Text

                            onPress={() => this.onPressResend()} style={{ textAlign: 'center', color: colors.Orange, fontSize: 20, fontFamily: fonts.Muli }}>
                            {staticText.Resend}
                        </Text>
                        {this.renderResendView()}
                    </View>
                </KeyboardAwareScrollView>
                {this.state.loading ? <Loader /> : null}
            </View >
        );
    }

    renderResendView = () => {
        const {
            timer,
            timerStart,
            timerReset,
            totalDuration,
        } = this.state;
        return (
            <View style={{ marginVertical: 15 }}>
                {
                    timer ?
                        <View style={{ alignSelf: 'center' }}>
                            <Timer
                                msec
                                options={timerOptions}
                                start={timerStart}
                                reset={timerReset}
                                totalDuration={totalDuration}
                                style={styles.bottomTextStyle}
                                handleFinish={() => this.setState({ timer: false })}
                            />
                        </View>
                        :
                        <TouchableOpacity activeOpacity={0.5} delayPressIn={0} onPress={this.onPressResend}>
                            <Text style={styles.resend}>{staticText.Resend}</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

export default Verification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    backIconStyle: {
        height: moderateScale(19),
        width: moderateScale(11),
        color: colors.textColor
    },
    middleTextStyle: {
        color: colors.OTPColor,
        fontFamily: fonts.HelveBold,
    },
    mainStyle: {
        paddingRight: 10,
        backgroundColor: colors.white,
        height: constants.isIOS ? scale(110) : scale(70),
    },
    OTPImageStyle: {
        marginTop: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.Helvetica,
        textAlign: 'center',
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        justifyContent: 'space-between',
    },
    countryCodeInputStyle: {
        width: '15%',
        borderRadius: 8,
        backgroundColor: colors.white,
        height: verticalScale(50),
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 22,
        color: colors.black,
        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 8,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
    },
    customSignUpButtonOneStyle: {
        marginTop: 23,
    },
    breakLineStyle: {
        borderBottomWidth: 0.5,
        borderColor: colors.textColor,
        width: constants.screenWidth / 3 - 20,
    },
    signinFBButtonStyle: {
        backgroundColor: colors.Blue,
    },
    firstView: {
        justifyContent: 'center',
        marginTop: 30,
        marginHorizontal: moderateScale(30),
        alignItems: 'center',
        alignSelf: 'center',
    },
    secondView: {
        paddingTop: 50,
        position: 'relative',
        height: constants.screenHeight / 2 + 100,
    },
    numberView: {
        justifyContent: 'center',
        marginVertical: moderateScale(20),
        // marginHorizontal: moderateScale(30),
        alignItems: 'center',
        alignSelf: 'center',
    },
    numberStyle: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.number
    },
    resend: {
        textAlign: 'center',
        color: colors.Orange,
        fontSize: 18,
        fontFamily: fonts.Helvetica
    }
});
