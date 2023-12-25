import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ImageBackground, Alert, BackHandler } from 'react-native';
import { colors, constants, staticText, common } from '../config';
import fonts from '../assets/index';
import { CustomButton, Header } from '../components';
import Images from '../assets/images';
import { moderateScale, NavigationService, } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationEvents } from '@react-navigation/compat';
import { DrawerActions } from '@react-navigation/native';
import _ from 'lodash';

class ViewAllProducts extends Component {
    constructor(props) {
        super(props);
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            homeDetailsArray: [],
            productCount: 1,
            qty: 1,
            products: [],
            filters: [],
            modal: false,
            selectedSortOption: -1,
            onScrollLoading: false,
            has_more: 0,
            page: 1,
            sortingDone: '',
            sortClicked: false,
            total_count: 0,
        };
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.route.params && this.props.route.params.title == "Similar Products") {
            NavigationService.goBack
        }
        else {
            NavigationService.goBack;
        }
    }

    getProducts = async () => {
        let { isFromTrending, isFromNewLaunch, isFromPastOrders, categoryId, categories } = this.props.route && this.props.route.params;
        if (categories) {
            this.getCategoryProducts()
        }
        else if (isFromTrending) {
            this.getTredningData()
        }
        else if (isFromNewLaunch) {
            this.getNewLaunchProducts()
        }
        else if (isFromPastOrders) {
            this.getPastOrderProducts()
        }
        else {
            this.setState({ products: this.props.route.params.products })
        }
    }

    getCategoryProducts = async (isFromPagination) => {
        if (isFromPagination) { }
        else { this.setState({ loading: true, }) }
        let response = await Request.get(`${constants.apiVersion}/products?category_id=${this.props.route.params.categoryId}&page=${this.state.page}`);
        this.setState({ loading: false, onScrollLoading: false, })
        if (response && response.data && response.data.success == 1) {
            let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id")
            this.setState({ products: response.data.products && response.data.products.length ? finalArray : this.state.products, has_more: response.data.has_more, total_count: response.data.total_count })
        }
        else {

        }
    }

    getTredningData = async (isFromPagination) => {
        if (isFromPagination) { }
        else { this.setState({ loading: true, }) }
        let response = await Request.get(`${constants.apiVersion}/trendingProducts?page=${this.state.page}`);
        this.setState({ loading: false, onScrollLoading: false, })
        if (response && response.data && response.data.success == 1) {
            let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id")
            this.setState({ products: response.data.products && response.data.products.length ? finalArray : this.state.products, has_more: response.data.has_more, total_count: response.data.total_count })
        }
        else {

        }
    }

    getNewLaunchProducts = async (isFromPagination) => {
        console.log("hello123");
        if (isFromPagination) { }
        else { this.setState({ loading: true, }) }

        // let response = await Request.get(`${constants.apiVersion}/newlaunches?page=${this.state.page}`);



        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        var response;
        await fetch(`https://arthcrm.com:2087/Items/NewLaunchItems?pageNumber=${this.state.page}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                response = JSON.parse(result)
                console.log(response)
            })
            .catch(error => console.log('error', error));

        this.setState({ loading: false, onScrollLoading: false, })
        // if (response && response.data && response.data.success == 1) {
        //     let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id")
        //     this.setState({ products: response.data.products && response.data.products.length ? finalArray : this.state.products, has_more: response.data.has_more, total_count: response.data.total_count })
        // }

        if (response) {
            let finalArray = []
            this.setState({ products: response.list, total_count: response.itemsCount })
        }
    }

    getPastOrderProducts = async (isFromPagination) => {
        if (isFromPagination) { }
        else { this.setState({ loading: true, }) }

        let response = await Request.get(`${constants.apiVersion}/pastorder?page=${this.state.page}`);
        this.setState({ loading: false, onScrollLoading: false, })
        if (response && response.data && response.data.success == 1) {
            let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id")
            this.setState({ products: response.data.products && response.data.products.length ? finalArray : this.state.products, has_more: response.data.has_more, total_count: response.data.total_count })
        }
    }

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <NavigationEvents onWillFocus={this.getProducts} />
                <Header
                    backIcon={Images.list}
                    backButton
                    //rightIcon
                    onBackButtonPress={() =>
                        this.props.navigation.dispatch(DrawerActions.openDrawer())
                    }
                    rightImage={Images.whiteCart}
                    middleText={this.props.route.params.title}
                />

                <FlatList
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 20 }}
                    data={this.state.products}
                    renderItem={this.renderItem}
                    // keyExtractor={item => item.id}
                    keyExtractor={(item, index) => index.toString()}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    extraData={this.state}
                    ListEmptyComponent={this.ListEmptyComponent}
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={this.renderFooter}
                    initialNumToRender={10}

                />

                {/* {this.state.loading ? <Loader /> : null} */}
            </SafeAreaView>
        );
    };

    loadMoreData = ({ distanceFromEnd }) => {
        let { isFromTrending, isFromNewLaunch, isFromPastOrders, categoryId, categories } = this.props.route && this.props.route.params;

        if (distanceFromEnd < 0) return;

        if (!this.state.onScrollLoading && this.state.products.length != this.state.total_count) {
            this.setState({ page: this.state.page + 1, onScrollLoading: true, loading: false }, () => {
                // this.getSearchResult()
                if (categories) this.getCategoryProducts(true)
                else if (isFromTrending) this.getTredningData(true)
                else if (isFromNewLaunch) this.getNewLaunchProducts(true)
                else if (isFromPastOrders) this.getPastOrderProducts(true)
                else {

                }
            })
        }
        else {
            console.log("inside load more else part");
        }
    };

    renderFooter = () => {
        if (this.state.has_more > 0 && this.state.products.length != this.state.total_count) {

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
        else {
            return (<View />)
        }
    }

    renderModalItem = ({ item, index }) => {
        return (<TouchableOpacity activeOpacity={0.8} onPress={() => this.onPressSortOption(item, index)} style={{ paddingLeft: 20, paddingVertical: 20 }}>
            <Text style={{ color: this.state.selectedSortOption == index ? colors.Orange : colors.black, fontFamily: fonts.Muli, fontSize: 16 }}>
                {item.label}
            </Text>
        </TouchableOpacity>)
    }
    onPressSortOption = (item, index) => {
        this.setState({ selectedSortOption: index, loading: true, sortingDone: item.code, sortClicked: true }, async () => {
            let response = await Request.get(`${constants.apiVersion}/products/search?query=extended&sort=${item.code}`);
            this.setState({ modal: false, loading: false }, () => {
                let product = response.data.products;
                product.map((p) => {
                    p.qty = 1;
                })
                this.setState({ products: product }, () => {
                })
            })
        })


    }
    onPressSortButton = () => {
        this.setState({ modal: true })
    };

    renderItem = ({ item, index }) => {
        console.log("items ---------------------", item);
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Productdetails', { item })} style={styles.mainBoxView}>
                <View style={styles.firsthalfBox}>
                    <ImageBackground defaultSource={Images.placeholderDefault} resizeMode='cover' style={styles.productImageStyle} width={100}
                        // source={item.image && common.checkUrl(item.image) ? { uri: item.image } : Images.placeholderImageSmall}
                        source={{ uri: item.imageUrl }}>
                        {item.old_price ?
                            <View style={styles.offerApplyView}>
                                <Text style={styles.offerApplyTextStyle}>Offer Applicable</Text>
                            </View> : null}
                    </ImageBackground>

                    <View style={{ marginVertical: 10, width: '60%' }} >
                        {/* <Text style={styles.productNameStyle} numberOfLines={1}>{item.name}</Text>
                        <Text style={[styles.commonTextStyle, { color: colors.placeholderColor }]} numberOfLines={1}>{item.type}</Text>
                        <Text style={styles.commonTextStyle} numberOfLines={1}>{item.brand}</Text>
                        <Text style={styles.commonTextStyle} numberOfLines={1}>{item.info}</Text> */}

                        <Text style={styles.productNameStyle} numberOfLines={1}>{item.name}</Text>
                        <Text style={[styles.commonTextStyle, { color: colors.placeholderColor }]} numberOfLines={1}>{item.form}</Text>
                        <Text style={styles.commonTextStyle} numberOfLines={1}>{item.division}</Text>
                        <Text style={styles.commonTextStyle} numberOfLines={1}>{item.composition}</Text>
                    </View>

                </View>
                <View style={styles.secondHalfBox} />
                <View style={[styles.priceViewWrap, {
                    justifyContent: item.in_stock ? 'space-around' : 'space-between',

                }]}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.priceStyle}>
                            {/* {item.price} */}
                            {item.mrp}
                        </Text>
                        {item.old_price ?
                            <View>
                                <Text style={styles.oldPriceStyle}>
                                    {item.old_price}
                                </Text>
                            </View> : null
                        }
                    </View>
                    {!item.in_stock ? <TouchableOpacity
                        onPress={() => this.addRemoveProductFromCart(item, index, 'minus')}
                        disabled={item.qty == 1 ? true : false}
                        activeOpacity={0.8}>
                        <Image style={{ marginRight: -10 }}
                            resizeMode={'cover'}
                            source={Images.minusOld} />
                    </TouchableOpacity> : null
                    }
                    {!item.in_stock ? <Text
                        style={[styles.productCount]}>
                        {/* {item.min_qty} */}
                        1
                    </Text> : null
                    }
                    {!item.in_stock ? <TouchableOpacity
                        onPress={() => this.addRemoveProductFromCart(item, index, 'add')}
                        activeOpacity={0.8}>
                        <Image style={{ marginLeft: -10, }}
                            resizeMode='cover'
                            source={Images.plusOld} />
                    </TouchableOpacity> : null
                    }
                    <CustomButton
                        onPress={() => this.onPressAddToCart(item)}
                        disabled={item.in_stock ? false : true}
                        titleStyle={{ fontSize: 12 }}
                        mainStyle={[styles.buttonStyle, { backgroundColor: item.in_stock ? colors.Orange : colors.outOfStock }]}
                        title={item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                    />

                </View>

            </TouchableOpacity >
        )
    }
    onPressAddToCart = async (item) => {
        let reqData = {
            product_id: item.id,
            qty: item.min_qty
        }
        this.setState({ loading: true })
        let response = await Request.post(`${constants.apiVersion}/cart/add`, reqData);
        this.setState({ loading: false })
        Alert.alert(staticText.projectTitle,
            response.data.message)
        if (response.data.success == 1) {
            let product = this.state.products;
            product.map((p) => {
                if (p.id == item.id) {
                    item.qty = 1;
                }
            })
            this.setState({ products: product, }, () => {
            })
        }
    }

    addRemoveProductFromCart = (item, index, type) => {
        let product = this.state.products;
        product.map((p) => {
            if (p.id == item.id) {
                if (type == 'add' && item.max_qty != item.min_qty) {
                    item.min_qty = item.min_qty + 1;
                } else if (type == 'minus' && item.min_qty != 1) {
                    item.min_qty = item.min_qty - 1;

                }
            }
        })
        this.setState({ products: product, selectedIndex: index }, () => {
            // console.log(this.state.products);
        })

    };

    ListEmptyComponent = () => {
        let emptyMessage = this.props.route && this.props.route.params && this.props.route.params.title
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                <Text style={styles.itemText}>{this.state.loading ? "List of products will be displayed here." : emptyMessage ? "No " + emptyMessage.toLowerCase() + " products found" : staticText.noData}</Text>
            </View>
        )
    }
}

export default ViewAllProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        justifyContent: 'space-between',
    },
    sortFilterViewWrap: {
        flexDirection: 'row',
        width: constants.screenWidth,
        paddingVertical: 6,
        alignItems: 'center',

        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 13,
        shadowRadius: 30,
        shadowOffset: {
            height: 3,
            width: 0,
        },
        backgroundColor: colors.white,
    },
    sortButtonView: {
        borderRightColor: colors.placeholderColor,
        padding: 8,
        borderRightWidth: 1,
        flexDirection: 'row',
        width: constants.screenWidth / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sortTextStyle: {
        paddingLeft: 10,
        color: colors.textColor,
        fontFamily: fonts.Muli,
        fontSize: 16
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    itemText: {
        fontSize: moderateScale(16),
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
        textAlign: "center"
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
    firsthalfBox: {
        /* backgroundColor: 'pink',  */
        flexDirection: 'row',
        width: constants.screenWidth - 40,
        paddingBottom: 20,
    },
    secondHalfBox: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 0.5,
        width: constants.screenWidth - 64,
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
        width: constants.screenWidth / 3 - 15,
        height: 28,
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        // backgroundColor: 'green',
        width: constants.screenWidth - 46,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    countryCodeInputStyle: {
        width: '32%',
        paddingHorizontal: 0,
    },
    numberInputView: {
        width: '62%',
    },
    customSignUpButtonOneStyle: {
        marginTop: 50,
    },
    ORTextStyleView: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    ORTextStyleTextStyle: {
        color: colors.placeholderColor,
        fontSize: 20,
        fontFamily: fonts.Muli,
        paddingHorizontal: 30,
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
        // height: 250,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        height: constants.screenHeight / 3 - 60,
        alignItems: 'center',
    },
    secondView: {
        // flex: 1,
        // backgroundColor: 'red',
        paddingTop: 50,
        position: 'relative',
        height: constants.screenHeight / 2 + 100,
    },
    lastView: {
        //height: constants.screenHeight / 3,
        // backgroundColor: 'pink',
        bottom: 30,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    alreadyHaveAccountTextStyle: {
        fontFamily: fonts.Muli,
        fontSize: 20,
        color: colors.placeholderColor,
    },
    signInTextButtonStyle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Muli,
    },
    footerView: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    }
});
