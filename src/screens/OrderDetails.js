import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, BackHandler } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isIphoneX, showTostMessage, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Items from './Items';
import CancelOrderModal from '../components/CancelOrderModal';
import r from '../api/request';


class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            detailsPressed: true,
            downArrowPressed: false,
            detailsList: '',
            modalVisible: false,
            ItemsDetails: [
                {
                    id: 1,
                    brandName: 'Acrimol',
                    brandNamePrice: '45',
                },
                {
                    id: 2,
                    brandName: 'Acrimol',
                    brandNamePrice: '45',
                },
                {
                    id: 3,
                    brandName: 'Acrimol',
                    brandNamePrice: '45',
                }
            ],



        };
    }

    componentDidMount = () => {
        // console.log("this.props.route.params.orderDetails", this.props.route.params.orderDetails);
        this.orderDetailsList()
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.onBackPress
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

    }

    onBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    orderDetailsList = async () => {
        let orderId = this.props.route.params.orderDetails.id
        this.setState({ loading: true })
        let response = await Request.get(`${constants.apiVersion}/order/detail?order_id=${orderId}`);
        this.setState({ loading: false, detailsList: response.data })
    }

    render() {
        let detailsList = this.state.detailsList
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >

                {/* <ScrollView contentContainerStyle={styles.container}> */}
                <Header
                    backButton /* rightIcon */
                    middleTextStyle={styles.middleTextStyle}
                    middleText={staticText.OrderDetails} />

                {/* {this.state.detailsPressed && */}
                <>
                    <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
                        {/* {this.state.detailsList ?  */}
                        <View activeOpacity={1} style={styles.mainBoxView}>
                            <Text style={[styles.orderStatus, {}]}>{'Order Status'}</Text>

                            <View style={styles.Firstseparator}></View>
                            <View>
                                <View style={{ marginHorizontal: 15 }}>
                                    <View style={styles.dateOrderNumberView}>
                                        <Text style={styles.orderNumber}>{'#10212420251024'}</Text>
                                        <Text style={styles.date}>{'10 Nov, 2022'}</Text>
                                    </View>
                                    <View style={styles.flexDirectionStyle}>
                                        <Text style={styles.items}>{'Invoice No.'}</Text>
                                        <Text style={styles.dotStyle}>:</Text>
                                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{'S2-3023'}</Text>
                                    </View>
                                    <View style={styles.flexDirectionStyle}>
                                        <Text style={styles.items}>{'Payment Items'}</Text>
                                        <Text style={styles.dotStyle}>:</Text>
                                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{'Pay Online'}</Text>
                                    </View>
                                    <View style={styles.flexDirectionStyle}>
                                        <Text style={styles.items}>{'Items'}</Text>
                                        <Text style={styles.dotStyle}>:</Text>
                                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{'03'}</Text>
                                    </View>
                                    <View style={styles.flexDirectionStyle}>
                                        <Text style={styles.items}>{'Total'}</Text>
                                        <Text style={styles.dotStyle}>:</Text>
                                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{'₹.36,742'}</Text>
                                    </View>
                                    <View style={styles.flexDirectionStyle}>
                                        <Text style={styles.items}>{'LR/Docket No'}</Text>
                                        <Text style={styles.dotStyle}>:</Text>
                                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{'L353422'}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Text style={styles.items}>{'Transporter'}</Text>
                                            <Text style={styles.dotStyle}>:</Text>
                                            <Text style={[styles.dotStyle, { color: colors.Orange, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{'http://echo.jsontest.com'}</Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image source={Images.linkImage}></Image>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.separator}></View>

                            <View>
                                <View style={styles.bottomView}>
                                    <View style={styles.flexDirectionStyle}>
                                        <View style={styles.circle}></View>
                                        <Text style={styles.onWay}>{'Payment Pending'}</Text>
                                    </View>
                                    <CustomButton
                                        onPress={() => this.props.navigation.navigate('trackOrder', { orderId })}
                                        // disabled={this.state.product && this.state.product.in_stock ? false : true}
                                        titleStyle={{ fontSize: 14, fontFamily: fonts.HelveBold, color: colors.white }}
                                        mainStyle={styles.buttonStyle}
                                        title={'Re-Order'}
                                    />
                                </View>

                            </View>
                        </View>

                        <View style={[styles.addressContainerView, { marginVertical: 10 }]}>
                            <Text style={styles.itemStyle} >{'Items Details'}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, }} >
                                <Text style={styles.nameStyle}>{'Name'}</Text>
                                <Text style={styles.nameStyle}>{'Qty.'}</Text>
                            </View>
                            <View style={styles.shippingContainerView}>
                                <FlatList
                                    style={{ flex: 1, }}
                                    contentContainerStyle={{ flexGrow: 1, }}
                                    data={this.state.ItemsDetails}
                                    renderItem={(item, index) => this.ItemsDetailsrenderItem(item, index)}
                                    keyExtractor={item => item.id}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    extraData={this.state}
                                // ListEmptyComponent={this.ListEmptyComponent}
                                // ItemSeparatorComponent={this.itemSeparatorComponent}
                                />
                            </View>
                        </View>

                    </ScrollView>
                    <View style={{ marginBottom: 20, marginHorizontal: 10 }} >
                        <View style={styles.BottombuttonView}>
                            <CustomButton
                                onPress={() => this.onPressTrackOrderbutton()}
                                // disabled={this.state.product && this.state.product.in_stock ? false : true}
                                titleStyle={{ fontSize: 14, }}
                                mainStyle={[styles.BottombuttonStyle,]}
                                title={'Download LR'}
                            />
                            <CustomButton
                                onPress={() => this.onPressCancelOrder()}
                                // disabled={this.state.product && this.state.product.in_stock ? false : true}
                                titleStyle={{ fontSize: 14, fontFamily: fonts.HelveBold }}
                                mainStyle={[styles.BottombuttonStyle,]}
                                title={'Download Invoice'}
                            />
                        </View>
                        <View style={styles.BottombuttonView}>
                            <CustomButton
                                onPress={() => this.onPressTrackOrderbutton()}
                                // disabled={this.state.product && this.state.product.in_stock ? false : true}
                                titleStyle={{ fontSize: 14, }}
                                mainStyle={[styles.BottombuttonStyle,]}
                                title={'Pay POD'}
                            />
                            <CustomButton
                                onPress={() => this.onPressCancelOrder()}
                                // disabled={this.state.product && this.state.product.in_stock ? false : true}
                                titleStyle={{ fontSize: 14, }}
                                mainStyle={[styles.BottombuttonStyle,]}
                                title={'Cash Payment'}
                            />
                        </View>
                    </View>



                </>
                {
                    !this.state.detailsPressed &&
                    <Items addedItems={detailsList.items}
                        emptyMessage={'Your order item list will appear here'}
                        hidePlusMinusButton hideDeleteButton />
                }
                {/* {this.state.loading ? <Loader /> : null} */}
                <CancelOrderModal
                    modalVisible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                    onPressSubmit={this.onPressSubmit}
                />
            </SafeAreaView >
        );
    }

    ItemsDetailsrenderItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.PromotionLine} />
                <View style={{ marginVertical: 7, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.typeNameStyle} >{item.brandName}</Text>
                    <Text style={styles.brandNamePriceTextStyle}>{item.brandNamePrice}</Text>
                </View>
            </View>
        )
    };

    onPressTrackOrderbutton = () => {
        let orderId = this.props.route.params.orderDetails.id
        this.props.navigation.navigate('trackOrder', { orderId })
    }

    onPressDownArrow = () => {
        this.setState({ downArrowPressed: !this.state.downArrowPressed })
    }

    onPressCancelOrder = () => {
        this.setState({ modalVisible: true })
    }

    onPressSubmit = async (message) => {
        let orderId = this.props.route.params.orderDetails.id
        const params = {
            order_id: orderId,
            comment: message
        };
        this.setState({ loading: true, modalVisible: false })
        const response = await r.post(`${constants.apiVersion}/order/cancel`, params);
        this.setState({ loading: false })
        console.log("Response-->", response);
        if (response && response.data && response.data.success == 1) {
            showTostMessage(response.data.message);
            this.orderDetailsList()
        }
    }

}

export default OrderDetails;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    items: {
        paddingTop: 10,
        color: colors.number,
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        width: 115,
    },
    flexDirectionStyle: {
        flexDirection: 'row'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        padding: 10,
        alignItems: 'center'
    },
    Firstseparator: {
        borderTopWidth: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderTopColor: colors.shadow
    },
    separator: {
        borderTopWidth: 1,
        marginTop: 10,
        marginHorizontal: 5,
        borderTopColor: colors.shadow
    },
    BottombuttonStyle: {
        backgroundColor: colors.Orange,
        width: (constants.screenWidth - 120) / 2,
        alignSelf: 'center',
        height: 42,
        borderRadius: 6,
        marginBottom: 20,
    },
    BottombuttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
    },
    mainBoxView: {
        // height: constants.screenWidth / 3,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: colors.white,
        // marginHorizontal: 20,
        marginHorizontal: 15,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
        marginTop: 10
    },
    buttonStyle: {
        backgroundColor: colors.ReOrder,
        width: 100,
        alignSelf: 'center',
        height: 34,
        marginBottom: 0,
    },
    circle: {
        height: 8,
        width: 8,
        borderRadius: 6,
        backgroundColor: colors.orangeLight,
        alignSelf: 'center',
        shadowColor: colors.shadowOrange,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 3,
            width: 0,
        },
    },
    orderStatus: {
        color: colors.black,
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        marginStart: 15,
        marginTop: 10
    },
    orderNumber: {
        color: colors.black,
        fontFamily: fonts.HelveBold,
        fontSize: 16
    },
    date: {
        color: colors.placeholderColor,
        fontSize: 12,
        fontFamily: fonts.Helvetica
    },
    dotStyle: {
        justifyContent: 'flex-end',
        paddingTop: 12,
        color: colors.number,
        fontFamily: fonts.Helvetica,
        fontSize: 14,
    },
    dateOrderNumberView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    onWay: {
        marginLeft: 10,
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.OnwayColor
    },
    addressContainerView: {
        backgroundColor: colors.white,
        marginHorizontal: 15,
        marginVertical: 20,
        // marginBottom: 8,
        borderRadius: 12,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 3,
        },
    },
    shippingContainerView: {
        // flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 15,
        backgroundColor: colors.white,
        // backgroundColor:'red',
        // alignItems: 'center',
    },
    PromotionLine: {
        borderBottomWidth: 1,
        borderBottomColor: colors.shadow,
        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 0.3,
        shadowRadius: 30,
        shadowOffset: {
            height: 3,
            width: 0,
        },
    },
    typeNameStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black
    },
    brandNamePriceTextStyle: {
        fontFamily: fonts.Helvetica,
        color: colors.Orange,
        fontSize: 16
    },
    itemStyle: {
        marginStart: 25,
        marginVertical: 15,
        fontFamily: fonts.HelveBold,
        fontSize: 18,
        color: colors.smallFont
    },
    nameStyle: {
        color: colors.placeholderColor,
        fontFamily: fonts.Helvetica,
        fontSize: 14
    }



});
