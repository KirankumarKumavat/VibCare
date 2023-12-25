import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isIphoneX, StorageService } from '../utilities';

import { verticalScale, moderateScale, scale, showTostMessage } from '../utilities';

class PromotionalMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            PromotionalData: [
                {
                    id: 1,
                    PromotionalImage: Images.Group9496,
                    titleName: 'Thule Blyn Backpack',
                    mrpValue: '₹.120',
                    rateValue: '₹.120',
                    finalPrice: '₹.120',
                    addnumber: '1',
                    quantitys: 1

                },
                {
                    id: 2,
                    PromotionalImage: Images.Group9496,
                    titleName: 'Thule Blyn Backpack',
                    mrpValue: '₹.120',
                    rateValue: '₹.120',
                    finalPrice: '₹.120',
                    addnumber: '1',
                    quantity: 1

                }
            ]
        };
    }

    ListEmptyComponent = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <Text style={styles.itemText}>{'Your cart is empty'}</Text>
        </View>
    )

    handleIncreament = (item, index) => {
        console.log('quantity', item);
        console.log('quantityindex', index)
        // const arrData = [...this.state.PromotionalData]

        // console.log('arrData', arrData);

        this.state.PromotionalData(item.quantity+1)
        console.log('this.state.PromotionalData=(item.quantity+1)', this.state.PromotionalData = (item.quantity + 1));

        // {
        //     arrData.map((obj) =>
        //         arrData[obj.id].quantitys = arrData[obj.id].quantitys + 1   
        //     )
        //     this.setState({PromotionalData:arrData})
        // }

        // tempItem.displayStep = parseFloat(tempKM)
        // tempItem.displayTimer = parseInt(item.quantity ? item.quantity : 0) + parseInt(tempEndTime - dict.startTime)
        // arrData[index] = tempItem
        // this.setState(quantity + 1)

    }

    // handleDecreament = () => {
    //     this.setState({ quantity: this.state.quantity - 1 })
    // }

    componentDidMount = () => {
    };

    PromotionalrenderItem = ({ item, index }) => {
        console.log('itemitemitem', item);
        console.log('indexindex', index);
        return (
            <View style={styles.mainBoxView}>
                <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={item.PromotionalImage}></Image>
                            <Text style={styles.titlrStyle} >{item.titleName}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginStart: 50 }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.mrpStyle}>{'MRP :'}</Text>
                                    <Text style={[styles.mrptextStyle, { marginStart: 5 }]} >{item.mrpValue}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.mrpStyle, { marginStart: 10 }]} >{'Rate :'}</Text>
                                    <Text style={[styles.mrptextStyle, { marginStart: 5 }]}>{item.rateValue}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'flex-end', marginTop: 15, paddingBottom: 10, }}>
                        <Text style={styles.finalPriceStyle} >{item.finalPrice}</Text>

                        {this.state.quantity == false ?
                            <View style={{ marginTop: 10, justifyContent: 'space-around', alignItems: 'center', width: constants.screenWidth / 5, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ height: 5, width: 13 }} onPress={() => this.handleDecreament()} >
                                        <Image source={Images.Rectangle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.HelveBold, fontSize: 18, color: colors.white }}>
                                        {/* {item.addnumber} */}
                                        {item.quantitys}
                                    </Text>
                                    <TouchableOpacity style={{}} onPress={() => this.handleIncreament(index, item)} >
                                        <Image source={Images.WhiteUnion} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null}

                        {this.state.quantity == true ?
                            <View style={{ marginTop: 10 }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: constants.screenWidth / 5, height: 32, borderWidth: 1, borderColor: colors.Orange, backgroundColor: colors.lightOrange, borderRadius: 5 }}>
                                    <Text style={{ fontSize: 16, fontFamily: fonts.HelveBold, color: colors.Orange, }} >{'Add'}</Text>
                                </View>
                                <View style={{ position: 'absolute', right: 12, top: 8 }}>
                                    <TouchableOpacity onPress={() => this.setState({ quantity: false })} >
                                        <Image style={{ width: 9, height: 9, }} source={Images.Union}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            : null}
                    </View>
                </View>
            </View>
        )
    }
    onPressCheckout = () => {
        if (this.state.kyc_status == false) {
            Alert.alert(
                staticText.projectTitle,
                staticText.kyc_notDone);
            return false;
        }

        else if (this.state.kyc_pending == 1) {
            Alert.alert(
                staticText.projectTitle,
                staticText.kyc_notApprovedYet);
            return false;
        }
        else if (this.state.kyc_rejected) {
            Alert.alert(
                staticText.projectTitle,
                staticText.kyc_rejected);
            return false;

        }
        else {
            this.props.navigation.navigate('CheckOut')
        }
    }

    render() {
        let statusBarheight = StatusBar.currentHeight ? StatusBar.currentHeight : 0

        return (
            <View style={{ flex: 1 }}>
                {/* <SafeAreaView
                    edges={constants.isIOS ? ['left'] : ['top']}
                    style={{ backgroundColor: colors.Orange }}
                /> */}

                <View style={{ backgroundColor: colors.Orange, }}>
                    
                    {/* <Header
                        backButton
                        backIconStyle={styles.backIconStyle}
                        backIcon={Images.UnionWhite}
                        middleText={staticText.PromotionalMaterial}
                        middleTextStyle={styles.middleTextStyle}
                        mainStyle={styles.mainStyle}
                        rightIcon={Images.UnionWhite}
                    // onPressRightText={this.onPressApplyButton}
                    /> */}

                    <View style={{ height: Platform.OS === 'ios' ? 52 : 20 + statusBarheight, }} ></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                            <Image style={styles.backIconStyle} source={Images.backIcon}></Image>
                        </TouchableOpacity>

                        <Text style={styles.middleTextStyle}>{staticText.PromotionalMaterial}</Text>

                        <TouchableOpacity>
                            <Image source={Images.UnionWhite}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.creditStyle}>{'Credits :'}</Text>
                        <Text style={styles.scoreStyle} >{'₹.5000'}</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View>
                        <FlatList
                            style={{ flex: 1, }}
                            contentContainerStyle={{ flexGrow: 1, }}
                            data={this.state.PromotionalData}
                            renderItem={(item, index) => this.PromotionalrenderItem(item, index)}
                            keyExtractor={item => item.id}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={this.ListEmptyComponent}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.bottomView}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text
                                style={{ marginTop: 5, color: colors.white, fontSize: 16, fontFamily: fonts.MuliSemiBold }}>
                                Grand Total :
                            </Text> */}
                        <Text style={{ fontFamily: fonts.HelveBold, color: colors.white, fontSize: 22, }}>
                            {'₹.3240'}
                            {/* {' ' + this.state.grand_total} */}
                        </Text>
                    </View>
                    <CustomButton
                        titleStyle={{ color: colors.black, fontSize: 14 }}
                        mainStyle={{ marginTop: 14, width: constants.screenWidth / 3 - 30, height: 40, backgroundColor: colors.white, color: colors.black }} title='Checkout'
                        onPress={this.onPressCheckout}
                    />
                </View>
            </View>
        );
    }
}

export default PromotionalMaterial;

const styles = StyleSheet.create({
    contentContainerStyle: {
        // flexGrow: 1,
        // backgroundColor: colors.backgroundColor,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    creditStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 16,
        color: colors.white
    },
    mainBoxView: {
        marginTop: 10,
        marginBottom: 10,
        //  height: 130,
        borderRadius: 12,
        // marginBottom: 40,

        backgroundColor: colors.white,
        marginHorizontal: 20,
        // paddingBottom: 10,


        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
    },
    mrpStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        // marginRight:30
    },
    mrptextStyle: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.black
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: isIphoneX() ? 100 : 75,
        backgroundColor: colors.Orange,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: colors.shadow,
        shadowRadius: 15,
        shadowOffset: {
            height: -1,
            width: 0,
        },
        paddingHorizontal: 20,
        justifyContent: 'space-between'

    },
    scoreStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 22,
        color: colors.white
    },
    finalPriceStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        color: colors.Orange,
    },
    mainStyle: {
        paddingRight: 10,
        backgroundColor: colors.Orange,
        // height: constants.isIOS ? scale(110) : scale(70),
    },
    backIconStyle: {
        height: moderateScale(19),
        width: moderateScale(11),
        color: colors.textColor
    },
    titlrStyle: {
        fontFamily: fonts.Helvetica,
        color: colors.black,
        fontSize: 16,
        marginStart: 10
    }

});
