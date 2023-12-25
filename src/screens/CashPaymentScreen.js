import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, FlatList, Platform, TouchableWithoutFeedback, TouchableOpacity, Alert, Image, ImageBackground, BackHandler } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isIphoneX, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import moment from 'moment';

class CashPaymentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            bank: '',
            utr: '',
            Amount: '',
            childModalVisible: false,
            choosenDate: '',
            choosenTime: '',
            isDatePickerVisible: false,
            isTimePickerVisible: false
        };
    }

    componentDidMount = () => {
        console.log('coming the data');
    }
    componentWillUnmount() {

    }
    showDatePicker = () => {
        this.setState({
            isDatePickerVisible: true,
        });
    };

    hideDatePicker = (date) => {
        this.setState({
            isDatePickerVisible: false,
            choosenDate: moment(date).format('DD/MM/YYYY'),
        })
    };

    handleConfirm = (date) => {
        this.hideDatePicker(date);
    };

    showTimePicker = () => {
        this.setState({
            isTimePickerVisible: true,
        });
    };

    hideTimePicker = (time) => {
        this.setState({
            isTimePickerVisible: false,
            choosenTime: moment(time).format('h:mm a'),
        })
    };

    handleTimeConfirm = (time) => {
        this.hideTimePicker(time);
    };
    onPressNext = async () => {
        this.setState({ childModalVisible: true })
    }
    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <View style={styles.container}>
                    <Header
                        backButton
                        onPress={() => this.props.navigation.goBack()}
                        // onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                        cartCount={this.state.items_count ? (this.state.items_count) : null}
                        middleTextStyle={styles.middleTextStyle}
                        middleText={'Cash Payment'} />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <View style={styles.topView}>
                            <Text style={styles.CastTextStyle} >{'Cash to be Submitted :'}</Text>
                            <Text style={styles.priceStyle} >{'₹.50000'}</Text>
                        </View>

                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 335, height: 170 }} source={Images.bg}></Image>
                            <View style={{ position: 'absolute', top: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={styles.bankTextStyle} >{'ICICI Bank'}</Text>
                                    <View>
                                        <Text style={styles.ifcscodeTextStyle}>{'IFCS Code'}</Text>
                                        <Text style={styles.ifcscodeStyle}>{'ICIC0006592'}</Text>
                                    </View>
                                </View>

                                <Text style={styles.accountnumStyle}>{'4044 1362 6298 4231'}</Text>
                                <View style={{ marginTop: Platform.OS === 'ios' ? 20 : null }}>
                                    <Text style={[styles.addresStyle]}>{'Address'}</Text>
                                    <Text style={styles.AddresTextStyle}>{'Sector 44, Chandigarh'}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 25 }}>
                                <Image source={Images.Thumb} ></Image>
                            </View>
                            <View style={{ marginTop: 11 }} >
                                <Text style={styles.thankTextStyle}>{'Thank you for your order.'}</Text>
                            </View>
                            <View style={{ marginTop: 12 }} >
                                <Text style={styles.pleaseTextStyle} >{'Please note that your payment details are pending, kindly provide the payment details to proceed the order.'}</Text>
                            </View>
                            <View style={[styles.secondHalfBoxLine, {}]} />
                        </View>
                        <View style={{}}>
                            <Text style={styles.enterTextStyle} >{'Please enter the following'}</Text>
                            <View style={{ marginTop: 10, }} >
                                <Input
                                    autoCapitalize='characters'
                                    placeholder={'Bank*'}
                                    returnKeyType="done"
                                    value={this.state.bank}
                                    // onSubmitEditing={() => this.checkValidation()}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    // maxLength={15}
                                    onChangeText={(bank) => this.setState({ bank: bank.replace(/ +/g, '') })}
                                    blurOnSubmit={false}
                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                    rightIcon={Images.building}
                                    mainStyle={{ borderWidth: 1, borderColor: colors.dropdowonBorderColor }}
                                />
                                <Input
                                    autoCapitalize='characters'
                                    placeholder={'UTR*'}
                                    returnKeyType="done"
                                    value={this.state.utr}
                                    // onSubmitEditing={() => this.checkValidation()}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    maxLength={15}
                                    onChangeText={(utr) => this.setState({ utr: utr.replace(/ +/g, '') })}
                                    blurOnSubmit={false}
                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                    rightIcon={Images.building}
                                    mainStyle={{ borderWidth: 1, borderColor: colors.dropdowonBorderColor }}
                                />
                                <Input
                                    autoCapitalize='characters'
                                    placeholder={'Amount*'}
                                    returnKeyType="done"
                                    value={this.state.Amount}
                                    // onSubmitEditing={() => this.checkValidation()}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    // maxLength={15}
                                    onChangeText={(Amount) => this.setState({ Amount: Amount.replace(/ +/g, '') })}
                                    blurOnSubmit={false}
                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                    rightIcon={Images.rupee}
                                    mainStyle={{ borderWidth: 1, borderColor: colors.dropdowonBorderColor }}
                                />
                                <View style={styles.countryCodeStyleView}>

                                    <View style={{ width: '50%', }} >
                                        <TouchableOpacity onPress={() => this.showDatePicker()} >
                                            <Input
                                                autoCapitalize='characters'
                                                placeholder={'DD/MM/YY*'}
                                                returnKeyType="done"
                                                value={this.state.choosenDate}
                                                // onSubmitEditing={() => this.checkValidation()}
                                                onSubmitEditing={() => Keyboard.dismiss()}
                                                // maxLength={15}
                                                editable={false}
                                                // onChangeText={(Amount) => this.setState({ Amount: Amount.replace(/ +/g, '') })}
                                                blurOnSubmit={false}
                                                style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                rightIcon={Images.calendar}
                                                mainStyle={{ marginHorizontal: 0, width: '100%', borderWidth: 1, borderColor: colors.dropdowonBorderColor }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: '42%' }} >
                                        <TouchableOpacity onPress={() => this.showTimePicker()}>
                                            <Input
                                                autoCapitalize='characters'
                                                placeholder={'Time*'}
                                                returnKeyType="done"
                                                value={this.state.choosenTime}
                                                // onSubmitEditing={() => this.checkValidation()}
                                                onSubmitEditing={() => Keyboard.dismiss()}
                                                // maxLength={15}
                                                editable={false}
                                                // onChangeText={(Amount) => this.setState({ Amount: Amount.replace(/ +/g, '') })}
                                                blurOnSubmit={false}
                                                style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                rightIcon={Images.clock}
                                                mainStyle={{ marginHorizontal: 0, width: '100%', borderWidth: 1, borderColor: colors.dropdowonBorderColor }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{}}>
                            <CustomButton
                                mainStyle={styles.customSignUpButtonOneStyle}
                                title={'Submit'}
                                onPress={() => this.onPressNext()}
                            />
                        </View>
                    </KeyboardAwareScrollView>
                    {this.state.loading ? <Loader /> : null}
                </View>
                <Modal
                    transparent={true}
                    animated={true}
                    animationType="slide"
                    visible={this.state.childModalVisible}
                    onRequestClose={() => this.setState({ childModalVisible: false })}
                >
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({ childModalVisible: false })}
                    >
                        <View style={[styles.styles1,]}>
                            <TouchableWithoutFeedback
                                onPress={() => this.setState({ childModalVisible: true })}
                            >
                                <View style={[styles.containerstyles]}>

                                    <View style={styles.modalViews}>
                                        <View style={{ alignSelf: 'flex-end', marginTop: 18, marginEnd: 14 }} >
                                            <TouchableOpacity
                                                onPress={() => this.setState({ childModalVisible: false })}
                                            >
                                                <Image source={Images.IconsClose}></Image>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image source={Images.rating} ></Image>
                                        </View>
                                        <Text style={styles.yourOrederTextStyle} >{'Your Order has been received'}</Text>

                                    </View>
                                    <View style={{ paddingBottom: 30, marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.thankYouStyle} >{'Thank You'}</Text>
                                        <Text style={[styles.thankYouStyles]}>{'for your purchase!'}</Text>
                                        <Text style={styles.YourStyle} >{'Your order ID'}</Text>
                                        <Text style={styles.numberStyle} >{'#21547658'}</Text>
                                        <Text style={styles.textStyle} >{'You will receive an order confirmation\nemail with details of your order.'}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <DateTimePickerModal
                    // customCancelButtonIOS={'Exit'}
                    // customConfirmButtonIOS={'Ok'}
                    isVisible={this.state.isDatePickerVisible}
                    mode={'date'}
                    onConfirm={(date) => this.handleConfirm(date)}
                    onCancel={(date) => this.hideDatePicker(date)}
                    dateTimePickerModal
                />

                <DateTimePickerModal
                    // customCancelButtonIOS={'Exit'}
                    // customConfirmButtonIOS={'Ok'}
                    isVisible={this.state.isTimePickerVisible}
                    mode={'time'}
                    onConfirm={(time) => this.handleTimeConfirm(time)}
                    onCancel={(time) => this.hidetimePicker(time)}
                    dateTimePickerModal
                />


            </SafeAreaView>
        );
    }
}

export default CashPaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView: { flex: 1 },
    topView: {
        height: 49,
        backgroundColor: colors.darkOrange,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        width: constants.screenWidth - 55,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    CastTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 16,
        color: colors.white
    },
    priceStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 22,
        color: colors.white
    },
    bankTextStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 20,
        color: colors.white,
        // textAlign:'center'
    },
    ifcscodeTextStyle: {
        fontSize: 12,
        color: colors.white,
        fontFamily: fonts.Helvetica
    },
    ifcscodeStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        color: colors.white
    },
    accountnumStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 28,
        color: colors.white,
        marginTop: 5
    },
    addresStyle: {
        fontSize: 12,
        color: colors.white,
        fontFamily: fonts.Helvetica
    },
    AddresTextStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        color: colors.white
    },
    thankTextStyle: {
        color: colors.black,
        fontFamily: fonts.HelveBold,
        fontSize: 18,
    },
    pleaseTextStyle: {
        textAlign: 'center',
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.black,
        width: (constants.screenWidth) - 50,
    },
    secondHalfBoxLine: {
        // alignItems: 'center',
        // alignSelf: 'center',
        marginTop: 20,
        height: 1,
        borderWidth: 1,
        // marginHorizontal: 40,
        width: (constants.screenWidth) - 50,
        opacity: 0.5,
        borderColor: colors.straitColor,
        marginVertical: 20
        // backgroundColor: colors.placeholderColor,
        // marginVertical: 10
    },
    enterTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number,
        marginStart: 31
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    styles1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparent,
    },
    containerstyles: {
        alignItems: 'center',
        width: constants.screenWidth - 25,
        backgroundColor: colors.white,
        borderRadius: 12,
        // paddingHorizontal: 20,
        // paddingVertical: 20,
        // height: '50%'
    },
    modalViews: {
        backgroundColor: colors.green,
        height: 207,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    yourOrederTextStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        color: colors.white,
        marginTop: 19,
        alignSelf: 'center'
    },
    thankYouStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 18,
        color: colors.black
    },
    thankYouStyles: {
        fontFamily: fonts.Helvetica,
        fontSize: 18,
        color: colors.black
    },
    YourStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number,
        marginTop: 29
    },
    numberStyle: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.Helvetica,
        marginTop: 9
    },
    textStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.number,
        marginTop: 20
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 50
    },
});
