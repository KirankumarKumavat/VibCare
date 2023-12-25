import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Image,
    ImageBackground,
    Alert,
    Animated
} from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header, List } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageService, NavigationService, isIphoneX } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import AutoHeightWebView from 'react-native-autoheight-webview'
import BoxView from '../components/BoxView';
import { NavigationEvents } from '@react-navigation/compat';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { result } from 'lodash';

class Productdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            homeDetailsArray: [],
            similarProducts: [],
            loadingCart: false,
            product: []
            // storedata:''
        };
        this.scrollX = new Animated.Value(0);
    }

    componentDidMount = async () => {
        this.getProductDetails();
    }

    getProductDetails = async () => {
        console.log("props of previous page- --", this.props.route.params.item);
        // let response;
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        //   let Productdetails = [];
        await fetch(`https://arthcrm.com:2087/Items/ItemDetailsById?id=${this.props.route.params.item.itemId}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                this.setState({ product: JSON.parse(result) })
                // this.state.product = JSON.parse(result)
                console.log("response of new lunches ----", JSON.parse(result));
                console.log("response of new storedata ---->", this.state.product.indications);
            })
            .catch(error => console.log('error', error));

        // var requestOptions = {
        //     method: 'POST',
        //     redirect: 'follow'
        //   };

        var similarProductsTemp;
        await fetch(`https://arthcrm.com:2087/Items/GetSimilarItems?ItemId=${this.props.route.params.item.itemId}\n`, requestOptions)
            .then(response => response.text())
            .then(result => {
                similarProductsTemp = JSON.parse(result)
                console.log("response of similarProductsTemp ----", JSON.parse(result));
            })
            .catch(error => console.log('error', error));



        let similarProducts = [];

        similarProducts.push(
            {
                data: similarProductsTemp
            },
        );
        // console.log("response data--->",product);
        this.setState({ similarProducts }, async () => {
        });

        return
        this.setState({ loading: true });
        // if (this.props.route.params.similarProduct) {
        //     response = await Request.get(`${constants.apiVersion}/product?product_id=${this.props.route.params.similarProduct}`);
        // }
        // else {
        //     response = await Request.get(`${constants.apiVersion}/product?product_id=${this.props.route.params.item.id}`);
        // }
        // this.setState({ loading: false, product: response.data.product, offers: response.data.offers, similarProducts: response.data.related_products }, () => {
        // })
    }
    render() {
        if (this.state.loading == false) {

            return (
                <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                    style={styles.safeAreaView}
                >
                    <NavigationEvents onWillFocus={() => this.getProductDetails()} />
                    <View style={styles.container}>
                        <StatusBar
                            translucent
                            barStyle={'light-content'}
                            backgroundColor={'transparent'}
                        />
                        <KeyboardAwareScrollView
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.contentContainerStyle}
                        >
                            <FlatList
                                style={{ height: 300 }}
                                data={this.state.product && this.state.product.image}
                                renderItem={(item, index) => this.renderItem(item, index)}
                                keyExtractor={item => item.id}
                                horizontal
                                pagingEnabled={true}
                                bounces={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: this.scrollX } } }], {
                                    useNativeDriver: false
                                }
                                )}
                                showsHorizontalScrollIndicator={false}
                            />
                            {this.renderNav(this.state.product && this.state.product.image)}
                            <View style={{
                                paddingVertical: 20,
                                shadowColor: colors.shadowColor,
                                shadowOpacity: 1,
                                elevation: 4,
                                shadowRadius: 30,
                                shadowOffset: {
                                    height: 3,
                                    width: 0,
                                },
                                backgroundColor: colors.white,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text numberOfLines={3} style={{
                                        paddingLeft: 14,
                                        width: constants.screenWidth / 2 + 50,
                                        fontFamily: fonts.MuliBold,
                                        color: colors.Orange,
                                        fontSize: 24,
                                    }}>
                                        {this.state.product && this.state.product.name}
                                    </Text>
                                    <View style={{ paddingTop: 10, alignItems: 'flex-end' }}>
                                        <Text style={{ paddingRight: 20, fontFamily: fonts.MuliSemiBold, color: colors.Orange, fontSize: 16, }}>
                                            {this.state.product && this.state.product.mrp}
                                        </Text>
                                        {/* {this.state.product && this.state.product.old_price != null && */}
                                        <Text style={{ paddingRight: 20, textDecorationLine: 'line-through', fontFamily: fonts.MuliSemiBold, color: colors.textColor, fontSize: 14 }}>
                                            {'1233'}
                                            {/* {this.state.product && this.state.product.old_price} */}
                                        </Text>
                                        {/* } */}
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text numberOfLines={2} style={{ paddingLeft: 14, width: constants.screenWidth / 2 + 50, fontFamily: fonts.Muli, color: colors.textColor, fontSize: 16, }}>
                                        {'jfdkfufhjsd'}
                                        {/* {this.state.product && this.state.product.type} */}
                                    </Text>
                                    {/* {this.state.product && this.state.product.old_price != null &&
                                    <Text style={{ paddingRight: 20, textDecorationLine: 'line-through', fontFamily: fonts.MuliSemiBold, color: colors.textColor, fontSize: 14 }}>
                                        {this.state.product && this.state.product.old_price}
                                    </Text>} */}
                                </View>
                                <Text style={{ paddingLeft: 14, fontFamily: fonts.Muli, color: colors.textColor, fontSize: 16, }}>
                                    {this.state.product && this.state.product.brand}
                                </Text>
                            </View>
                            {this.state.loading == false && <AutoHeightWebView
                                originWhitelist={['*']}
                                scalesPageToFit={constants.isAndroid ? false : true}
                                // automaticallyAdjustContentInsets={false}
                                // style={{ flex: 1, paddingHorizontal: 20, fontSize: 16, fontFamily: fonts.MuliBold }}
                                bounces={false}
                                // javaScriptEnabled={true}
                                // domStorageEnabled={true}
                                // startInLoadingState={true}
                                //scrollEnabled
                                // containerStyle={{ height: 220, paddingHorizontal: 20, marginTop: 20, fontSize: 16, fontFamily: fonts.MuliBold }}
                                // style={{ marginTop: 40, backgroundColor: colors.Orange, width: constants.screenWidth - 30, paddingHorizontal: 20, marginHorizontal: 20, }}
                                style={{ marginTop: 20, marginBottom: 20, backgroundColor: colors.backgroundColor, width: constants.screenWidth - 30, marginLeft: 15, }}
                                customScript={`document.body.style.background = '#F8F8F8';`}
                                source={{
                                    html: `<head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body {font-size:${constants.isIOS ? 15 : 16} ;font-family:${fonts.Muli}; line-height: 1.4; color: ${colors.textColor};background-color:'red';}
                            ul {
                                list-style: none;
                              }
                              
                              ul li::before {
                                content: "• ";
                                color: ${colors.Orange};
                                font-weight: bold;
                                display: inline-block; 
                                width: 1em;
                                margin-left: -1em;
                              }
                            </style></head><body>${this.state.product && this.state.product.description}</body>`,
                                }}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                            />


                            }
                            {/* {this.state.loading == false && */}
                            <Text style={[styles.headingTextStyle, { marginTop: 10 }]}>{'Composition'}</Text>
                            <Text style={{ paddingHorizontal: 20, fontFamily: fonts.Muli, fontSize: 14, color: colors.textColor, width: constants.screenWidth / 3 }}>{'ibuprofen 15687-27-1 2-(4-Isobutylphenyl)propanoic acid Brufen Motrin'}</Text>
                            <>
                                <View>
                                    <View style={{ backgroundColor: colors.white }}>
                                        <Text style={[styles.headingTextStyle, { marginTop: 10 }]}>
                                            Offers
                                        </Text>
                                        <BoxView
                                            data={this.state.offers} /* ListHeaderComponent={this.ListHeaderComponentOffer} */
                                        />
                                    </View>
                                    {this.state.product && this.state.product.indications != '' &&
                                        <Text style={styles.headingTextStyle}>
                                            Indication
                                        </Text>
                                    }
                                    <Text style={{ paddingHorizontal: 20, fontFamily: fonts.Muli, fontSize: 14, color: colors.textColor, }}>
                                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
                                        {this.state.product.indications}
                                        {/* {this.state.product.indications} */}
                                    </Text>
                                    {this.state.product && this.state.product.side_effects != '' && <Text style={styles.headingTextStyle}>
                                        Side Effects
                                    </Text>}
                                    <Text style={{ paddingHorizontal: 20, fontFamily: fonts.Muli, fontSize: 14, color: colors.textColor, }}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        {/* {this.state.product && this.state.product.side_effects} */}
                                    </Text>

                                    {this.state.product && this.state.product.return_policy_details != '' && <Text style={styles.headingTextStyle}>
                                        Return Policy Details
                                    </Text>}
                                    <Text style={{ paddingHorizontal: 20, fontFamily: fonts.Muli, fontSize: 14, color: colors.textColor, }}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        {/* {this.state.product && this.state.product.return_policy_details} */}
                                    </Text>
                                    {this.state.loading == false &&
                                        <AutoHeightWebView
                                            originWhitelist={['*']}
                                            scalesPageToFit={constants.isAndroid ? false : true}
                                            // automaticallyAdjustContentInsets={false}
                                            // style={{ flex: 1, paddingHorizontal: 20, fontSize: 16, fontFamily: fonts.MuliBold }}
                                            bounces={false}
                                            // javaScriptEnabled={true}
                                            // domStorageEnabled={true}
                                            // startInLoadingState={true}
                                            //scrollEnabled
                                            // containerStyle={{ height: 220, paddingHorizontal: 20, marginTop: 20, fontSize: 16, fontFamily: fonts.MuliBold }}
                                            // style={{ marginTop: 40, backgroundColor: colors.Orange, width: constants.screenWidth - 30, paddingHorizontal: 20, marginHorizontal: 20, }}
                                            style={{ marginTop: 20, marginBottom: 20, backgroundColor: colors.backgroundColor, width: constants.screenWidth - 30, }}
                                            customScript={`document.body.style.background = '#F8F8F8';`}
                                            source={{
                                                html: `<head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body {font-size:${constants.isIOS ? 18 : 16} ;font-family:${fonts.Muli}; line-height: 1.4; color: ${colors.textColor};background-color:'red';}
                            ul {
                                list-style: none;
                              }
                              
                              ul li::before {
                                content: "• ";
                                color: ${colors.Orange};
                                font-weight: bold;
                                display: inline-block; 
                                width: 1em;
                                margin-left: -1em;
                              }
                            </style></head><body>${this.state.product && this.state.product.return_policy_details}</body>`,
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            scrollEnabled={true}
                                        />

                                    }
                                    {this.state.similarProducts && this.state.similarProducts.length > 0 &&
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.headingTextStyle}>
                                                Similar Products
                                            </Text>
                                            <Text onPress={() => { this.onpressViewAll(this.state.similarProducts) }} style={[styles.headingTextStyle, { marginHorizontal: 10, color: colors.Orange, fontSize: 14 }]}>View All</Text>
                                        </View>
                                    }
                                    <BoxView
                                        data={this.state.similarProducts || this.state.similarProducts.slice(0, 2)}
                                        relatedProductDataView
                                        cartButtton
                                        onPressAddToCart={this.onPressAddToCart}
                                        addRemoveProductFromCart={this.addRemoveProductFromCart}
                                        onPress={this.onPressSimilarProduct}
                                    />
                                    {/* <View style={styles.bottomView}>
                                        {this.state.product && this.state.product.in_stock
                                            ?
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <TouchableOpacity
                                                    onPress={() => this.addRemoveMainProductFromCart(this.state.product, 'minus')}
                                                    disabled={this.state.product && this.state.product.min_qty == 1 ? true : false}
                                                    activeOpacity={0.8}>
                                                    <Image style={{}}
                                                        resizeMode={'cover'}
                                                        source={Images.minusIcon} />
                                                </TouchableOpacity>
                                                <Text
                                                    style={styles.productCount}>
                                                    {this.state.product && this.state.product.min_qty}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => this.addRemoveMainProductFromCart(this.state.product, 'add')}
                                                    activeOpacity={0.8}>
                                                    <Image style={{}}
                                                        resizeMode='cover'
                                                        source={Images.plusIcon} />
                                                </TouchableOpacity>
                                            </View>
                                            : null}
                                        <CustomButton
                                            onPress={() => this.onPressAddToCart(this.state.product)}
                                            disabled={this.state.product && this.state.product.in_stock ? false : true}
                                            titleStyle={{ fontSize: 12, color: colors.textColor }}
                                            mainStyle={styles.buttonStyle}
                                            title={this.state.product && this.state.product.in_stock ? 'Add to Cart' : 'Out Of Stock'}
                                        />

                                    </View> */}
                                </View>
                            </>
                            {/* } */}

                        </KeyboardAwareScrollView>
                        {/* <View style={styles.bottomView}>
                            {this.state.product && this.state.product.in_stock
                                ?
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.addRemoveMainProductFromCart(this.state.product, 'minus')}
                                        disabled={this.state.product && this.state.product.min_qty == 1 ? true : false}
                                        activeOpacity={0.8}>
                                        <Image style={{}}
                                            resizeMode={'cover'}
                                            source={Images.minusIcon} />
                                    </TouchableOpacity>
                                    <Text
                                        style={styles.productCount}>
                                        {this.state.product && this.state.product.min_qty}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => this.addRemoveMainProductFromCart(this.state.product, 'add')}
                                        activeOpacity={0.8}>
                                        <Image style={{}}
                                            resizeMode='cover'
                                            source={Images.plusIcon} />
                                    </TouchableOpacity>
                                </View>
                                : null}
                            <CustomButton
                                onPress={() => this.onPressAddToCart(this.state.product)}
                                disabled={this.state.product && this.state.product.in_stock ? false : true}
                                titleStyle={{ fontSize: 12, color: colors.textColor }}
                                mainStyle={styles.buttonStyle}
                                title={this.state.product && this.state.product.in_stock ? 'Add to Cart' : 'Out Of Stock'}
                            />

                        </View> */}
                    </View>
                    {this.state.loadingCart ? <Loader /> : null}
                </SafeAreaView>
            );
        }
        else {
            return (<Loader />)
        }
    };

    renderNav = (banners) => {
        if (this.state.product && this.state.product.image && this.state.product.image.length > 1) {
            let position = Animated.divide(this.scrollX, constants.screenHeight / 2);
            return (
                <View style={{}}>
                    <View style={styles.renderDotView}>
                        {banners.map((_, i) => {
                            let opacity = position.interpolate({
                                extrapolate: 'clamp',
                                outputRange: [1, 1, 1],
                                inputRange: [i - 1, i, i + 1],
                            });
                            var color = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [colors.white, colors.Orange, colors.white]
                            });
                            return (
                                <Animated.View key={i} style={[styles.animationStyle, { opacity, backgroundColor: color }]} />
                            );
                        })}
                    </View>
                </View>
            );
        }
    }

    addRemoveProductFromCart = (item, index, type) => {
        let product = this.state.similarProducts;
        product.map((p) => {
            if (p.id == item.id) {
                if (type == 'add' && item.max_qty != item.min_qty) {
                    item.min_qty = item.min_qty + 1;
                } else if (type == 'minus' && item.min_qty != 1) {
                    item.min_qty = item.min_qty - 1;

                }
            }
        })
        this.setState({ similarProducts: product, selectedIndex: index }, () => {
        })
    };

    addRemoveMainProductFromCart = (item, type) => {
        if (type == 'add' && item.max_qty != item.min_qty) {
            item.min_qty = item.min_qty + 1;
        } else if (type == 'minus' && item.min_qty != 1) {
            item.min_qty = item.min_qty - 1;
        }
        this.setState({ product: item })
    }

    onPressAddToCart = async (item) => {
        let reqData = {
            product_id: item.id,
            qty: item.min_qty
        }
        this.setState({ loadingCart: true })
        let response = await Request.post(`${constants.apiVersion}/cart/add`, reqData);
        this.setState({ loadingCart: false })
        Alert.alert(staticText.projectTitle,
            response.data.message)
    }

    ListHeaderComponentOffer = () => {
        return (
            <View style={{}}>
                <Text style={{ fontFamily: fonts.MuliSemiBold, fontSize: 18, color: colors.textColor }}>
                    Offers
                </Text>
            </View>
        )
    }

    renderItem = ({ item, index }) => {
        return (

            <View >
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{ zIndex: 1, position: 'absolute', top: 60, left: 20, }} >
                    <Image source={Images.backIcon} width={20} height={20} />
                </TouchableOpacity>

                <ImageBackground
                    defaultSource={Images.placeholderImageBig}
                    resizeMode="contain"
                    source={item ? { uri: item } : Images.placeholderImageBig}
                    style={{ zIndex: 0, }}
                    width={constants.screenWidth}
                    height={300} >
                    <Image
                        resizeMode="stretch"
                        source={Images.blackOverlay}
                        style={{ zIndex: 0 }}
                        width={constants.screenWidth}
                        height={300} />
                </ImageBackground>
            </View>
        )
    }

    onPressSimilarProduct = async (item) => {
        this.props.navigation.push('Productdetails', { similarProduct: item.itemId })
    }

    onpressViewAll = (similarProducts) => {
        this.props.navigation.push('ViewAllProducts', { products: similarProducts, title: 'Similar Products' })
    }
}

export default Productdetails;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.Orange
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: 300,
        backgroundColor: '#4D4D4D6F',
        opacity: 0.8
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
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
    headingTextStyle: {
        marginTop: 20,
        paddingLeft: 20,
        fontFamily: fonts.MuliSemiBold,
        fontSize: 18,
        color: colors.textColor
    },
    bottomView: {
        flexDirection: 'row',
        height: isIphoneX() ? 90 : 75,
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
    buttonStyle: {
        backgroundColor: colors.white,
        width: 120,
        alignSelf: 'center',
        height: 34,
        marginBottom: 0
    },
    productCount: {
        marginBottom: 7,
        color: colors.white,
        fontFamily: fonts.MuliSemiBold,
        fontSize: 18
    },
    animationStyle: {
        width: 10,
        margin: 3,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.Orange,
        bottom: 40
    },
    renderDotView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
