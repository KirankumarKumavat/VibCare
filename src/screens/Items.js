import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, ImageBackground, BackHandler } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationService, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            items: ''
        };
    }

    componentDidMount = () => {
        //TODO----show tabbar in result screen,logout fb,
        //add pincode in kyc
        this.getItemsData();
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.onBackPress
        );

    }

    onBackPress = () => {
        if (this.props.route && this.props.route.params && this.props.route.params.fromHomeScreen == true) {
            this.props.navigation.navigate('Home', { itemCount: this.state.items_count })
        } else if (this.props.route && this.props.route.params && this.props.route.params.fromResultScreen) {
            this.props.navigation.navigate('SearchResult', { itemCount: this.state.items_count })
        }
        else {
            NavigationService.goBack()
        }
        return true;

    }
    getItemsData = async () => {
        let addedItems = this.props.addedItems
        this.setState({
            loading: false,
            items: addedItems,


            grand_total: addedItems.grand_total,


        }, () => {

        });

    }
    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <View style={styles.container}>

                    {/* <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    > */}

                    <FlatList
                        style={{ marginTop: 20, flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        //data={this.props.route.params.productsArray && !this.props.route.params.backPressed && !this.state.sortClicked ? this.props.route.params.productsArray : this.state.products}
                        data={this.state.items}
                        renderItem={(item, index) => this.renderItem(item, index)}
                        keyExtractor={item => item.id}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                        ListEmptyComponent={this.ListEmptyComponent}
                        // onEndReached={this.loadMoreData}
                        // onEndReachedThreshold={0.3}
                        // ListFooterComponent={this.renderFooter}
                        initialNumToRender={10}

                    />

                    {this.state.loading == false && this.state.items_count > 0 && <View style={styles.bottomView}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text
                                style={{ marginTop: 5, color: colors.white, fontSize: 16, fontFamily: fonts.MuliSemiBold }}>
                                Grand Total :
                            </Text>
                            <Text style={{
                                fontFamily: fonts.MuliBold,
                                color: colors.white,
                                fontSize: 22,
                                alignItems: 'center'
                            }}>
                                {' ' + this.state.grand_total}
                            </Text>
                        </View>

                    </View>}
                    {/* {this.state.loading ? <Loader /> : null} */}

                    {/* </KeyboardAwareScrollView> */}
                </View>
            </SafeAreaView>
        );
    }

    renderItem = ({ item, index }) => {

        return (

            <TouchableOpacity
                disabled
                //activeOpacity={0.7}
                //onPress={() => this.props.navigation.navigate('Productdetails', { item })}
                style={styles.mainBoxView}
            >
                <View style={styles.firsthalfBox}>
                    <ImageBackground resizeMode='cover' style={styles.productImageStyle} width={100}
                        source={{ uri: item.image }}>
                    </ImageBackground>

                    <View style={{ marginVertical: 10, width: '60%' }} >
                        <Text style={styles.productNameStyle} numberOfLines={1}>{item.name}</Text>
                        <Text style={[styles.commonTextStyle, { color: colors.placeholderColor }]} numberOfLines={1}>{item.type}</Text>
                        <Text style={styles.commonTextStyle} numberOfLines={1}>{item.brand}</Text>
                        <Text style={styles.commonTextStyle} numberOfLines={1}>{item.info}</Text>

                    </View>

                </View>
                <View style={styles.secondHalfBox} />
                <View style={[styles.priceViewWrap, {
                    justifyContent: item.in_stock ? 'space-around' : 'space-between',

                }]}>
                    <View style={{}}>
                        <Text style={styles.priceStyle}>
                            {item.price}
                        </Text>
                        {item.old_price ?
                            <View>
                                <Text style={styles.oldPriceStyle}>
                                    {item.old_price}
                                </Text>
                            </View> : null
                        }
                    </View>

                    <View style={{ width: '30%' }}>
                        <Text numberOfLines={2} style={[styles.commonTextStyle, { textAlign: "center" }]}>
                            {item.offer_label}
                        </Text>
                        <Text style={[styles.priceStyle, { marginLeft: 10, textAlign: "center" }]}>
                            {item.offer_amount}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.commonTextStyle}>
                            GST
                        </Text>
                        <Text style={[styles.priceStyle, { marginLeft: 10, }]}>
                            {item.tax}
                        </Text>
                    </View>
                    {this.props.hidePlusMinusButton ? null :
                        <>
                            <TouchableOpacity
                                onPress={() => this.addRemoveProductFromCart(item, index, 'minus')}
                                disabled={item.qty == 1 ? true : false}
                                activeOpacity={0.8}>
                                <Image style={{ marginRight: -6, }}
                                    resizeMode={'cover'}
                                    source={Images.minusIcon} />
                            </TouchableOpacity>
                            <Text
                                style={styles.productCount}>
                                {item.qty}
                            </Text>
                            <TouchableOpacity
                                onPress={() => this.addRemoveProductFromCart(item, index, 'add')}
                                activeOpacity={0.8}>
                                <Image style={{ marginLeft: -6, }}
                                    resizeMode='cover'
                                    source={Images.plusIcon} />
                            </TouchableOpacity>
                        </>}
                    {/* <CustomButton
                        onPress={() => this.onPressAddToCart(item)}
                        disabled={item.in_stock ? false : true}
                        titleStyle={{ fontSize: 14 }}
                        mainStyle={[styles.buttonStyle, { backgroundColor: item.in_stock ? colors.Orange : colors.outOfStock }]}
                        title={item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                    /> */}

                </View>
                <View style={styles.secondHalfBox} />
                <View style={{ paddingRight: 20, flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.commonTextStyle}>
                            Sub Total :
                        </Text>
                        <Text style={styles.priceStyle}>
                            {item.row_total}
                        </Text>
                    </View>
                    {this.props.hideDeleteButton ? null : <TouchableOpacity onPress={() => this.onPressDeleteItem(item)}>
                        <Image resizeMode='cover' source={Images.deleteIcon} />
                    </TouchableOpacity>}
                </View>
            </TouchableOpacity>
        )
    };

    onPressDeleteItem = (item) => {
        Alert.alert(
            staticText.projectTitle,
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        let reqData = {
                            "item_id": item.id

                        }
                        this.setState({ loading: true })
                        let response = await Request.post(`${constants.apiCartVersion}/remove`, reqData);
                        this.setState({ loading: false, grand_total: response.data.grand_total, items_count: response.data.items_count, items: response.data.items })
                    }
                }
            ],
            { cancelable: false }
        );
    };

    addRemoveProductFromCart = (item, index, type) => {
        let product = this.state.items;
        product.map((p) => {
            if (p.id == item.id) {
                if (type == 'add' && item.qty < item.max_qty) {
                    item.qty = item.qty + 1;
                } else if (type == 'minus') {
                    item.qty = item.qty - 1;
                }
            }
        })
        this.setState({ items: product, selectedIndex: index }, async () => {
            let reqData = {
                "items": [
                    {
                        "item_id": item.id
                        , "qty": item.qty
                    }
                ]

            }
            this.setState({ loading: true })
            let response = await Request.post(`${constants.apiCartVersion}/update`, reqData);
            response.data.items.map((items) => {
                if (item.id == items.id) {
                    item.row_total = items.row_total
                }

            })
            this.setState({
                loading: false,
                sub_total: response.data.sub_total,
                grand_total: response.data.grand_total
            })
        })

    };

    ListEmptyComponent = () => (
        <>{this.state.loading == false && <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <Text style={styles.itemText}>{this.props.emptyMessage || 'Your cart is empty'}</Text>
        </View>}</>
    )
}

export default Items;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView: { flex: 1 },
    contentContainerStyle: {
        flexGrow: 1,
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    mainBoxView: {
        //  height: 130,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: colors.white,
        marginHorizontal: 20,

        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },

    },
    addressView: {
        marginBottom: 20,
        paddingBottom: 20,
        backgroundColor: colors.white,
        marginHorizontal: 20,

        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 30,
        shadowOffset: {
            height: 3,
            width: -0.79,
        },

    },
    firsthalfBox: {
        /* backgroundColor: 'pink',  */
        flexDirection: 'row',
        width: constants.screenWidth - 40,
        paddingBottom: 20,
    },
    secondHalfBox: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 1,
        width: constants.screenWidth - 64,
        opacity: 0.5,
        backgroundColor: colors.placeholderColor
    },
    priceViewWrap: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    priceStyle: {
        fontSize: 16,
        fontFamily: fonts.MuliSemiBold,
        color: colors.Orange
    },
    oldPriceStyle: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontFamily: fonts.MuliSemiBold,
        color: colors.placeholderColor
    },
    productImageStyle: {
        height: 100,
        borderRadius: 6,
        marginLeft: 3,
        position: 'relative',
        marginTop: 3,
        width: 120,
        overflow: "hidden"
    },
    offerApplyView: {
        backgroundColor: colors.green,
        position: 'absolute',
        bottom: 10,
        right: 0,
        paddingBottom: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    offerApplyTextStyle: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.MuliSemiBold,
        paddingHorizontal: 4,
    },
    productNameStyle: {
        fontFamily: fonts.Muli,
        fontSize: 16,
        color: colors.textColor,
        paddingHorizontal: 10,
        width: constants.screenWidth / 2,
        // backgroundColor: 'pink'
    },
    commonTextStyle: {
        fontFamily: fonts.Muli,
        fontSize: 12,
        color: colors.textColor,
        paddingHorizontal: 10,
        paddingHorizontal: 10,
        //width: '60%'
    },
    productCount: {
        marginBottom: 7,
        color: colors.Orange,
        fontFamily: fonts.MuliSemiBold,
        fontSize: 18
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    buttonStyle: {
        marginTop: 12,
        width: constants.screenWidth / 3 - 20,
        height: 28,
    },

    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',

        height: 75,
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
        justifyContent: 'center'

    },
});
