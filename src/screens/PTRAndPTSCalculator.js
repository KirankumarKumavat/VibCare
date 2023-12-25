import { View, Text, StyleSheet, TextInput, Alert, Platform, InputAccessoryView, Button, Keyboard } from 'react-native';
import React, { Component } from 'react'
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images'
import { colors, staticText, constants } from '../config'
import fonts from '../assets'
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Request from '../api/request';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class PTRAndPTSCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MRP: '',
            GST: '',
            retailerMargin: '',
            stockistMargin: '',
            ptr: '',
            pts: '',
            statesArray: [],
        }
    }


    componentDidMount = () => {

    }

    onPressSubmit = () => {
        // GST [5% / 12% / 18%]
        // P.T.R = (MRP – Stockist Margin) ÷ (100+GST)*100
        // P.T.S (If Stockist Margin is 10%) = PTR-10%

        // GST% of MRP is equal to (GST/MRP) × MRP = GSTVALUE
        const { MRP, GST, retailerMargin, stockistMargin } = this.state
        // First you need to deduct retailer margin from MRP. This will give a net value that in other words we can say PTR including GST like below:

        // NET VAlue = Formula used will be MRP*(1-Retailer Margin %)

        let retailValue = (MRP * retailerMargin) / 100
        let netValue = MRP - retailerMargin
        console.log("netValue ----", netValue);
        let gstValue = (MRP * GST) / 100
        let newNetValue = MRP - retailerMargin

        // /////////////////////////////////////////////////////////////////////////

        // let gstValue = (MRP * GST) / 100 

        let ptrValue = newNetValue / (100 + gstValue) * 100

        let stockValue = (MRP * stockistMargin) / 100
        let ptsValue = ptrValue - stockValue
        // console.log("ptrValueptrValue --", ptrValue, "ptsValue", ptsValue);

        this.setState({
            ptr: ptrValue.toFixed(2),
            pts: ptsValue.toFixed(2),
        })

    }

    render() {
        const inputAccessoryViewID = "doneBtn";
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <Header
                            // onBackButtonPress={() => this.props.navigation.goBack()}
                            // backButton /* rightIcon */
                            onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                            middleText={staticText.ptrptscalculator} 
                            middleTextStyle={styles.middleTextStyle}

                            />

                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={[styles.mainHeadingText, { paddingBottom: 10, marginHorizontal: 28 }]} numberOfLines={1}>{'MRP'}</Text>
                                    <Input
                                        inputRef={(input) => { this.MRP = input; }}
                                        // placeholder={staticText.mrp}
                                        keyboardType='numeric'
                                        returnKeyType="done"
                                        value={this.state.MRP}
                                        onChangeText={(MRP) => this.setState({ MRP })}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={[styles.mainHeadingText, { paddingBottom: 10, marginHorizontal: 28 }]} numberOfLines={1}>{'GST%'}</Text>
                                    <Input
                                        inputRef={(input) => { this.GST = input; }}
                                        // placeholder={staticText.mrp}
                                        keyboardType='numeric'
                                        returnKeyType="done"
                                        value={this.state.GST}
                                        onChangeText={(GST) => this.setState({ GST })}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>

                            <View style={{ marginHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.mainHeadingText} numberOfLines={1}>{'Retailer Margin'}</Text>
                                <Text style={styles.perStyle}>{'%'}</Text>
                            </View>
                            <Input
                                inputRef={(input) => { this.retailerMargin = input; }}
                                // placeholder={staticText.mrp}
                                keyboardType='numeric'
                                returnKeyType="done"
                                value={this.state.retailerMargin}
                                onChangeText={(retailerMargin) => this.setState({ retailerMargin })}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                blurOnSubmit={false}
                            />

                            <View style={{ marginHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.mainHeadingText} numberOfLines={1}>{'Stockist Margin'}</Text>
                                <Text style={styles.perStyle}>{'%'}</Text>
                            </View>
                            <Input
                                inputRef={(input) => { this.stockistMargin = input; }}
                                // placeholder={staticText.mrp}
                                keyboardType='numeric'
                                returnKeyType="done"
                                value={this.state.stockistMargin}
                                onChangeText={(stockistMargin) => this.setState({ stockistMargin })}
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                blurOnSubmit={false}
                            />
                            <CustomButton
                                onPress={this.onPressSubmit}
                                title='Calculation'
                                mainStyle={{ marginVertical: 20 }}
                            />

                            <View style={styles.addressView}>
                                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={styles.ptrptsMainText} numberOfLines={1}>{'PTR'}</Text>
                                        <Text style={styles.ptrptsText}>{this.state.ptr}</Text>

                                        {/* <Input
                                            inputRef={(input) => { this.ptr = input; }}
                                            // placeholder={staticText.mrp}
                                            keyboardType='numeric'
                                            returnKeyType="done"
                                            value={this.state.ptr}
                                            mainStyle={{ borderColor: colors.grey, borderWidth: 1 }}
                                            onChangeText={(ptr) => this.setState({ ptr })}
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                            blurOnSubmit={false}
                                        /> */}

                                    </View>
                                    <View style={{ width: '50%', }}>
                                        <Text style={styles.ptrptsMainText} numberOfLines={1}>{'PTS'}</Text>
                                        <Text style={styles.ptrptsText}>{this.state.pts}</Text>
                                        {/* <Input
                                            inputRef={(input) => { this.pts = input; }}
                                            // placeholder={staticText.mrp}
                                            keyboardType='numeric'
                                            mainStyle={{ borderColor: colors.grey, borderWidth: 1 }}
                                            returnKeyType="done"
                                            value={this.state.pts}
                                            onChangeText={(pts) => this.setState({ pts })}
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                            blurOnSubmit={false}
                                        /> */}
                                    </View>
                                </View>

                            </View>
                            {
                                Platform.OS === "ios" &&
                                <InputAccessoryView nativeID={inputAccessoryViewID}>
                                    <View style={styles.inputAccessory}>
                                        <Button onPress={Keyboard.dismiss} title={"Done"} />
                                    </View>
                                </InputAccessoryView>
                            }
                        </View>
                    </KeyboardAwareScrollView>
                </View >

            </SafeAreaView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    perStyle: {
        color: colors.Orange,
        fontSize: 20,
        // alignItems:'center'
    },
    addressView: {
        marginBottom: 20,
        paddingBottom: 20,
        backgroundColor: colors.white,
        // marginHorizontal: 20,

        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 30,
        shadowOffset: {
            height: 3,
            width: -0.79,
        },
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    inputAccessory: {
        backgroundColor: colors.inputAccessoryBg,
        alignItems: "flex-end",
        paddingHorizontal: 5,
        height: 35,
    },
    ptrptsText: {
        borderColor: colors.grey,
        borderWidth: 1,
        marginHorizontal: 10,
        textAlign: 'center',
        borderRadius: 10,
        paddingVertical: 15,
        fontSize: 18,
        color: colors.Orange,
        fontFamily: fonts.HelveBold
    },
    ptrptsMainText: {
        paddingBottom: 10,
        marginHorizontal: 10,
        fontSize: 15,
        color: colors.black,
        fontFamily: fonts.Helvetica  
    },
    mainHeadingText: {
        paddingBottom: 10,
        fontSize: 14,
        color: colors.placeholderColor,
        fontFamily: fonts.Helvetica
    }
})