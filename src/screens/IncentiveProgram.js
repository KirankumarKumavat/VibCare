import { Text, StyleSheet, View, TouchableOpacity, Image, Dimensions, FlatList, StatusBar, SectionList, } from 'react-native'
import React, { Component } from 'react';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import fonts from '../assets';
import { DrawerActions } from '@react-navigation/native';
import { colors, constants, staticText } from '../config';
import BoxView from '../components/BoxView';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const colorEmphasis = {
    high: 0.87,
    medium: 0.6,
    disabled: 0.38,
};

export default class IncentiveProgram extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barGraphData: [
                {
                    id: 1,
                    numberData: '0'
                },
                {
                    id: 2,
                    numberData: '10000000'
                },
                {
                    id: 3,
                    numberData: '15000000'
                },
                {
                    id: 4,
                    numberData: '2000000'
                },
                {
                    id: 5,
                    numberData: '2500000'
                },
                {
                    id: 6,
                    numberData: '3000000'
                }
            ],
            PurchaseData: [
                {
                    id: 1,
                    MedicalboxImage: Images.MedicalboxImage,
                    MedicalData: 'Lorem Ipsum Has Been The Industry’s'
                },
                {
                    id: 1,
                    MedicalboxImage: Images.MedicalboxImage,
                    MedicalData: 'Lorem Ipsum Has Been The Industry’s'
                },
                {
                    id: 1,
                    MedicalboxImage: Images.MedicalboxImage,
                    MedicalData: 'Lorem Ipsum Has Been The Industry’s'
                },
                {
                    id: 1,
                    MedicalboxImage: Images.MedicalboxImage,
                    MedicalData: 'Lorem Ipsum Has Been The Industry’s'
                },
            ],
        }
    }
    renderItemPurchaseData = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', marginStart: 20, alignItems: 'center', marginTop: 12 }} >
                <Image style={{ width: 36, height: 36 }} source={item.MedicalboxImage} ></Image>
                <Text style={styles.MedicalDataStyle} >{item.MedicalData}</Text>
            </View>
        )
    }
    ListEmptyComponent = () => (
        <>{this.state.loading == false && <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <Text style={styles.itemText}>{'Your cart is empty'}</Text>
        </View>}</>
    )

    renderItembarGraphData = ({ item, index }) => {
        return (
            <View style={{}} >
                <Text style={styles.numberDataStyle}>{item.numberData}</Text>
            </View>
        )
    }

    renderItembargraphDashData = ({ item, index }) => {
        return (
            <View style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={[{ color: 'transparent', fontSize: 10, fontFamily: fonts.Helvetica, }]}>{item.numberData}</Text>
                <View style={{ height: 11, width: 1, backgroundColor: colors.lineColor, marginTop: -10 }}></View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
               <Header
                    onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                    middleTextStyle={styles.middleTextStyle}
                    middleText={staticText.incentiveprogram} />
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={styles.ScaleStyle} >{'Your Sale for'}</Text>
                        <Text style={styles.yearStyle}>{'2022 - 2023'}</Text>
                    </View>

                    <View style={{ marginTop: 40, alignSelf: 'center', alignItems: 'center' }}>
                        <View style={{ borderColor: colors.lineColor, height: 60, width: constants.screenWidth - 55, borderWidth: 0.8, justifyContent: 'center', alignItems: 'center' }} >
                            <View style={{ position: 'absolute', }}>
                                <FlatList
                                    data={this.state.barGraphData}
                                    renderItem={(item, index) => this.renderItembargraphDashData(item, index)}
                                    keyExtractor={(item, index) => (index.toString())}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    contentContainerStyle={{ width: constants.screenWidth - 55, justifyContent: 'space-between', alignItems: 'center' }}
                                    bounces={false}
                                    scrollEnabled={false}
                                />
                            </View>
                            <View style={{ position: 'absolute' }} >
                                <View style={styles.InsideBorderLine}></View>
                            </View>
                            <View style={{}} >
                                <Progress.Bar
                                    progress={0.1}
                                    width={constants.screenWidth - 55}
                                    height={40}
                                    borderWidth={0}
                                    borderRadius={0}
                                    color={'#24C178'}
                                />
                            </View>

                        </View>
                        <View style={{ width: constants.screenWidth - 55 }} >
                            <FlatList
                                data={this.state.barGraphData}
                                renderItem={(item, index) => this.renderItembarGraphData(item, index)}
                                keyExtractor={(item, index) => (index.toString())}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={{ marginTop: 10, width: constants.screenWidth - 55, justifyContent: 'space-between' }}
                                bounces={false}
                                scrollEnabled={false}
                            />
                        </View>
                        <View style={{  }} >
                            <View style={styles.itemSeparator} />
                            <View style={{ marginTop: 23, flexDirection: 'row', alignSelf: 'center' }} >
                                <View>
                                    <Text style={styles.saletextStyle} >{'Sale'}</Text>
                                    <Text style={styles.numberStyle} >{'₹4,80,000'}</Text>
                                </View>
                                <View style={styles.StraightLine} ></View>
                                <View>
                                    <Text style={styles.saletextStyle}>{'Points'}</Text>
                                    <Text style={styles.pointStyle} >{'145'}</Text>
                                </View>
                            </View>
                            <View style={styles.borderLineStyle}></View>

                            <Text style={styles.textStyle} >{'You are eligible for'}</Text>
                            <View style={styles.SeconditemSeparator} />
                            <View style={{}} >
                                <FlatList
                                    data={this.state.PurchaseData}
                                    renderItem={(item, index) => this.renderItemPurchaseData(item, index)}
                                    keyExtractor={(item, index) => (index.toString())}
                                    showsHorizontalScrollIndicator={false}
                                    style={{ paddingBottom: 35 }}
                                    ListEmptyComponent={this.ListEmptyComponent}
                                    bounces={false}
                                    scrollEnabled={false}
                                />
                            </View>
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    ScaleStyle: {
        marginTop: 33,
        fontFamily: fonts.Helvetica,
        fontSize: 18,
        color: colors.black
    },
    yearStyle: {
        marginTop: 10,
        fontFamily: fonts.HelveBold,
        fontSize: 18,
        color: colors.black
    },
    itemSeparator: {
        alignSelf: 'center',
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.placeholderColor,
        opacity: colorEmphasis.medium,
        marginTop: 50,
        width: constants.screenWidth - 40
    },
    saletextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 16,
        color: colors.placeholderColor,
        textAlign: 'center'
    },
    numberStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 20,
        color: colors.Orange,
        marginTop: 7
    },
    pointStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 20,
        color: colors.ReOrder,
        marginTop: 7,
        marginStart: 5
    },
    InsideBorderLine: {
        width: constants.screenWidth - 55,
        backgroundColor: colors.lineColor,
        height: 1
    },
    GraphtLine: {
        flexDirection: 'row',
        height: 12,
        borderWidth: 1,
        backgroundColor: colors.placeholderColor,
        opacity: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    StraightLine: {
        flexDirection: 'row',
        height: 70,
        borderWidth: 1,
        backgroundColor: colors.placeholderColor,
        opacity: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 70,
    },
    borderLineStyle: {
        marginTop: 15,
        backgroundColor: colors.placeholderColor,
        height: '1%',
        opacity: 0.12,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
    },
    textStyle: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.HelveBold,
        marginTop: 17,
        marginStart: 20
    },
    SeconditemSeparator: {
        alignSelf: 'center',
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.placeholderColor,
        opacity: colorEmphasis.medium,
        width: constants.screenWidth - 40,
        marginVertical: 15
    },
    MedicalDataStyle: {
        color: colors.black,
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        marginStart: 14,
        width: constants.screenWidth - 90
    },
    itemText: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.Helvetica,
    },
    numberDataStyle: {
        color: colors.placeholderColor,
        fontSize: 10,
        fontFamily: fonts.Helvetica,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },

})