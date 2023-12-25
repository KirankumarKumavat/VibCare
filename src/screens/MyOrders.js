import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CancelOrderModal from '../components/CancelOrderModal';
import _ from 'lodash';
import { NavigationEvents } from '@react-navigation/compat';

class MyOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            linestatus: false,
            orderList: '',
            loading: false,
            onScrollLoading: false,
            has_more: 0,
            detailsPressed: true,
            flag: 1,
            page: 1,
            modalVisible: false,
            total_count: 0,
            ispending: true,
            orderList: [
                {
                    id: 1,
                    increment_id: '#10212420251024',
                    created_at: '10 Nov, 2022',
                    Invoice_No: 'S2-3023',
                    Transporter: 'http://echo.jsontest.com',
                    linkImage: Images.linkImage,
                    qty: '03',
                    grand_total: '₹.36,742',
                    status: 'Payment Verification Pending',
                },
                {
                    id: 2,
                    increment_id: '#10212420251024',
                    created_at: '10 Nov, 2022',
                    Invoice_No: 'S2-3023',
                    Transporter: 'http://echo.jsontest.com',
                    linkImage: Images.linkImage,
                    qty: '03',
                    grand_total: '₹.36,742',
                    status: 'Payment Verification Pending',
                },
            ],
        };
    }
    componentDidMount = () => {
        // this.getOrderList()
    }

    componentWillUnmount() {
    }

    // getOrderList = async (isFromPagination) => {
    //     if (!isFromPagination) this.setState({ loading: true })
    //     let response = await Request.get(`${constants.apiVersion}/order/list?page=${this.state.page}`);
    //     if (response) {
    //         let finalArray = _.uniqBy([...this.state.orderList, ...response.data.order_list], "id")
    //         this.setState({
    //             loading: false,
    //             orderList: response.data.order_list && response.data.order_list.length ? finalArray : this.state.orderList,
    //             has_more: response.data.has_more,
    //             onScrollLoading: false,
    //             total_count: response.data.total_count
    //         })
    //     }
    // }

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <View style={styles.container}>
                    {/* <NavigationEvents onWillFocus={this.getOrderList} /> */}
                    <View style={{ backgroundColor: colors.Orange, height: '14%' }}>
                        <Header
                            onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                            middleTextStyle={styles.middleTextStyle}
                            middleText={staticText.MyOrders} />

                        <View style={styles.headerTab}>
                            <TouchableOpacity style={styles.detailsMainView}
                                onPress={() => {
                                    console.log('Pressed'),
                                        this.setState({ ispending: true })
                                }
                                }
                            // onPress={() => this.setState({ ispending: true })} 
                            >
                                <View style={[styles.underlineView,
                                { borderBottomWidth: this.state.flag == 1 ? 3 : 0, borderBottomColor: this.state.ispending == true ? colors.white : colors.Orange, width: 180, alignItems: 'center', alignSelf: 'flex-start' }
                                ]}>
                                    <Text style={[styles.detailsItemText,]}>{'Pending'}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.detailsMainView} onPress={() => this.setState({ ispending: false })} >
                                <View style={[styles.underlineView,
                                { borderBottomWidth: this.state.flag == 1 ? 3 : 0, borderBottomColor: this.state.ispending == false ? colors.white : colors.Orange, width: 180, alignItems: 'center', alignSelf: 'flex-end' }
                                ]}>
                                    <Text style={[styles.detailsItemText,]}>{'Completed'}</Text>
                                </View>
                                {/* {!this.state.detailsPressed && <View style={{ height: 2, width: "50%", backgroundColor: colors.Orange }} />} */}
                            </TouchableOpacity>
                        </View>

                    </View>
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 35 }}
                        contentContainerStyle={{}}
                    >
                        {this.state.ispending == true && <FlatList
                            // style={{ marginTop: 10, flex: 1 }}
                            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}
                            data={this.state.orderList}
                            renderItem={(item, index) => this.renderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            ListEmptyComponent={() => this.ListEmptyComponent()}
                            onEndReached={this.loadMoreData}
                            onEndReachedThreshold={0.3}
                            ListFooterComponent={this.renderFooter}
                        // initialNumToRender={10}
                        />}

                        {this.state.modal &&
                            <ModalComponent
                                data={this.state.sorting}
                                onRequestClose={() => this.setState({ modal: false })}
                                closeModal={() => this.setState({ modal: false })}
                                renderItem={(item, index) => this.renderModalItem(item, index)} modalVisible={true} />
                        }
                    </KeyboardAwareScrollView>
                </View>
                {/* {this.state.loading ? <Loader /> : null} */}
                <CancelOrderModal
                    modalVisible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                />

            </SafeAreaView>
        );
    }
    renderItem = ({ item, index }) => {
        let orderId = item && item.id
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.onPressTrackOrderbutton({ item, index })} style={styles.mainBoxView}>
                <View style={styles.itemContainer}>
                    <View style={styles.dateOrderNumberView}>
                        <Text style={styles.orderNumber}>{item.increment_id}</Text>
                        <Text style={styles.date}>{item.created_at}</Text>
                    </View>
                    <View style={styles.flexDirectionStyle}>
                        <Text style={styles.items}>{'Invoice No.'}</Text>
                        <Text style={styles.dotStyle}>:</Text>
                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{item.Invoice_No}</Text>
                    </View>
                    <View style={styles.flexDirectionStyle}>
                        <Text style={styles.items}>{'Items'}</Text>
                        <Text style={styles.dotStyle}>:</Text>
                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{item.qty}</Text>
                    </View>
                    <View style={styles.flexDirectionStyle}>
                        <Text style={styles.items}>{'Paid'}</Text>
                        <Text style={styles.dotStyle}>:</Text>
                        <Text style={[styles.dotStyle, { color: colors.black, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{item.grand_total}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={styles.items}>{'Transporter'}</Text>
                            <Text style={styles.dotStyle}>:</Text>
                            <Text style={[styles.dotStyle, { color: colors.Orange, marginLeft: 10, fontSize: 14, fontFamily: fonts.Helvetica }]}>{item.Transporter}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={item.linkImage}></Image>
                        </View>
                    </View>
                </View>
                <View style={styles.separator}></View>
                <View>
                    <View style={styles.bottomView}>
                        <View style={styles.flexDirectionStyle}>
                            <View style={styles.circle}></View>
                            <Text style={styles.onWay}>{item.status}</Text>
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
            </TouchableOpacity>
        )
    }
    onPressTrackOrderbutton = ({ item, index }) => {
        this.props.navigation.navigate('OrderDetails', { orderDetails: item })
    }

    ListEmptyComponent = () => (
        <View style={{ alignItems: "center", justifyContent: 'center', flex: 1 }}>
            <Text style={styles.itemText}>{this.state.loading ? "Your list of orders will displayed here." : 'You have not placed any order yet.'}</Text>
        </View>
    )
    // loadMoreData = ({ distanceFromEnd }) => {
    //     if (distanceFromEnd < 0) return;
    //     if (!this.state.onScrollLoading && this.state.has_more > 0 &&
    //         this.state.orderList.length != this.state.total_count
    //     ) {
    //         this.setState({ page: this.state.page + 1, onScrollLoading: true, loading: false, }, () => {
    //             this.getOrderList(true)
    //         })
    //     }
    // }

    renderFooter = () => {
        return (
            <View style={[styles.footerView,]} >
                {this.state.loading == false && <ActivityIndicator
                    style={{ marginBottom: 20 }}
                    animating={this.state.onScrollLoading}
                    size={"large"}
                    color={colors.Orange}
                />}
            </View>
        )
    }

}

export default MyOrders;

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
    headerTab: {
        flexDirection: 'row',
        backgroundColor: colors.Orange,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statusStyle: {
        fontSize: 14,
        fontFamily: fonts.HelveBold,
        color: colors.white
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    mainBoxView: {
        // height: constants.screenWidth / 3,

        borderRadius: 12,
        // marginBottom: 10,
        backgroundColor: colors.white,
        marginHorizontal: 20,
        width: constants.screenWidth - 30,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
        marginTop: 30
    },
    buttonStyle: {
        backgroundColor: colors.ReOrder,
        width: (constants.screenWidth - 40) / 4,
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
    items: {
        paddingTop: 10,
        color: colors.number,
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        width: 80,
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
    itemContainer: {
        marginHorizontal: 20,
        paddingVertical: 15,
    },
    flexDirectionStyle: {
        flexDirection: 'row'
    },
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center'
    },
    separator: {
        borderTopWidth: 1,
        marginHorizontal: 10,
        borderTopColor: colors.shadow
    },
    onWay: {
        marginLeft: 10,
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.OnwayColor
    },
    itemText: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.Helvetica,
    },
    footerView: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    },
    detailsMainView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // separatorTab: {
    //     borderRightWidth: 1,
    //     borderRightColor: colors.placeholderColor,
    //     marginVertical: 5,
    //     shadowColor: colors.shadow,
    //     shadowOpacity: 1,
    //     elevation: 1,
    //     shadowRadius: 30,
    //     shadowOffset: {
    //         height: 2,
    //         width: -0.79,
    //     },
    // },
    underlineView: {
        paddingVertical: 10,
        // borderBottomWidth: 2,
        // borderBottomColor: colors.Orange
    },
    detailsItemText: {
        color: colors.white,
        fontFamily: fonts.Helvetica,
        fontSize: 16
    },
});
