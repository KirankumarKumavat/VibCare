import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert, Image, ImageBackground, BackHandler } from 'react-native';
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

class PayOnDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedGST: 0,

        };
    }

    componentDidMount = () => {
        console.log('coming the data');
    }
    componentWillUnmount() {

    }
    onPressNext = async () => {
        this.props.navigation.navigate('CashPaymentScreen')
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
                        middleText={'Pay On Delivery'} />
                    <ScrollView
                        bounces={false}
                        style={{}}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <View style={styles.InsideContainer} >
                            <Text style={{ textAlign: 'center' }} >{'Please make 25% payment in advance\nto use this mode.'}</Text>
                        </View>
                        <View style={styles.BottomView}>
                            <View style={styles.sortFilterViewWrap}>
                                <View style={styles.sortButtonView}>
                                    <Text style={styles.orderAmount}>{'₹.4124'}</Text>
                                    <Text style={styles.sortTextStyle}>{'Order Amount'}</Text>
                                </View>

                                <View style={styles.sortButtonView}>
                                    <Text style={styles.orderAmount}>{'₹.4124'}</Text>
                                    <Text style={styles.sortTextStyle}>{'POD Adv. Amount'}</Text>
                                </View>
                            </View>
                            <View style={[styles.secondHalfBoxLine, {}]} />
                            <Text style={styles.payingTextStyle}>{'You can pay by the following options'}</Text>
                            <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{}}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <View>
                                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ selectedGST: 0 })}>
                                                <View style={{ borderWidth: this.state.selectedGST == 0 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 0 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                    {this.state.selectedGST == 0 ?
                                                        <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                        : null}
                                                </View>

                                                <Text style={{ marginLeft: 5 }}>{'Cash'}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View>
                                            <TouchableOpacity style={{ flexDirection: 'row', marginStart: 50 }} onPress={() => this.setState({ selectedGST: 1 })}>
                                                <View style={{ borderWidth: this.state.selectedGST == 1 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 1 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                    {this.state.selectedGST == 1 ?
                                                        <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                        : null}
                                                </View>
                                                <Text style={{ marginLeft: 5 }}>{'Pay Online'}</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                <Image style={{}} source={Images.bank}></Image>
                            </View>
                            <View style={[styles.secondHalfBoxLine, {}]} />
                            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Text style={styles.accountStyle} >{'Account'}</Text>
                                    <Text style={styles.accountStyle}>{'IFSC Code'}</Text>
                                    <Text style={styles.accountStyle}>{'Branch'}</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={styles.dotStyle} >{'   :'}</Text>
                                    <Text style={styles.dotStyle} >{'   :'}</Text>
                                    <Text style={styles.dotStyle} >{'   :'}</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={styles.numberStyle} >{'  659205600329'}</Text>
                                    <Text style={styles.numberStyle} >{'  ICIC0006592'}</Text>
                                    <Text style={styles.numberStyle} >{'  Sector 44, Chandigarh'}</Text>
                                </View>
                            </View>
                        </View>
                        {this.state.loading ? <Loader /> : null}
                    </ScrollView>
                </View>
                <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                    <CustomButton
                        mainStyle={styles.customSignUpButtonOneStyle}
                        title={'Pay Now!'}
                        onPress={() => this.onPressNext()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default PayOnDelivery;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightOrange,
    },
    BottomView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingBottom:'100%'
    },
    InsideContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightOrange,
        height: 100
    },
    safeAreaView: { flex: 1 },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    sortFilterViewWrap: {
        marginTop: 20,
        flexDirection: 'row',
        width: constants.screenWidth,
        paddingVertical: 6,
        alignItems: 'center',
    },
    orderAmount: {
        fontFamily: fonts.HelveBold,
        fontSize: 20,
        color: colors.black
    },
    sortTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number
    },
    sortButtonView: {
        borderRightColor: colors.straitColor,
        // padding: 1,
        borderRightWidth: 1,
        // flexDirection: 'row',
        width: constants.screenWidth / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondHalfBoxLine: {
        // alignItems: 'center',
        // alignSelf: 'center',
        marginTop: 20,
        height: 1,
        borderWidth: 1,
        marginHorizontal: 40,
        // width: (constants.screenWidth) - 60,
        opacity: 0.5,
        borderColor: colors.straitColor,
        // backgroundColor: colors.placeholderColor,
        // marginVertical: 10
    },
    payingTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number,
        alignSelf: 'center',
        marginVertical: 30
    },
    accountStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number,
        marginTop: 20,
    },
    dotStyle: {
        color: colors.number,
        marginTop: 20,

    },
    numberStyle: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.Helvetica,
        marginTop: 20,
    },
    customSignUpButtonOneStyle: {
        marginTop: 30,
    },
});
