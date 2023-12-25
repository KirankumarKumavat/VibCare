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
import { isIphoneX, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const items = [
    {
        id: 1,
        imageLogo: Images.LogoMedicine,
        medcineName: 'PRIMA',
        brandname: 'Apofec',
        deleteImage: Images.DeleteImage,
        medicineDescription: 'Aceclofenac 100mg + Paracetamol 325mg serratiopeptidase…',
        tabletIcon: Images.tableticon,
        tabletType: 'Tablet',
        tabletSize: '10x10',
        finalValue: '₹.900',
        expireDate: '12/24',
        MrpValue: '₹.200',
        ratePrice: '₹.100',
        rateDic: '(10%)',
        rateValue: '₹.90',
        subtotal: '₹.1620',
        addnumber: '1',
    },
    {
        id: 2,
        imageLogo: Images.LogoMedicine,
        medcineName: 'PRIMA',
        brandname: 'Apofec',
        deleteImage: Images.DeleteImage,
        medicineDescription: 'Aceclofenac 100mg + Paracetamol 325mg serratiopeptidase…',
        tabletIcon: Images.tableticon,
        tabletType: 'Tablet',
        tabletSize: '10x10',
        finalValue: '₹.900',
        expireDate: '12/24',
        MrpValue: '₹.200',
        ratePrice: '₹.100',
        rateDic: '(10%)',
        rateValue: '₹.90',
        subtotal: '₹.1620',
        addnumber: '1',
    },
];

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            itemCount: '',
            basicItems: items,
            isSearched: false,
            dataArray: items,
            selectedGST: 0,
        };
    }

    componentDidMount = () => {
        console.log('coming the data');
        //TODO----show tabbar in result screen
        // this.getCartItemsData();
        // this.backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     this.onBackPress
        // );
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        // if (this.props.route.params && this.props.route.params.fromHomeScreen == true) {
        //     this.props.navigation.navigate('Home', { itemCount: this.state.items_count })
        // } else if (this.props.route.params && this.props.route.params.fromResultScreen) {
        //     this.props.navigation.navigate('SearchResult', { itemCount: this.state.items_count })
        // }
        // return true;

    }
    // getCartItemsData = async () => {
    //     this.setState({ loading: true });
    //     let response = await Request.get(`${constants.apiCartVersion}/list`);
    //     this.setState({
    //         loading: false,
    //         items: response.data.items,
    //         delivery_address: response.data.delivery_address,
    //         delivery_method: response.data.delivery_method,
    //         grand_total: response.data.grand_total,
    //         discount_amount: response.data.discount_amount,
    //         shipping_amount: response.data.shipping_amount,
    //         sub_total: response.data.sub_total,
    //         tax_amount: response.data.tax_amount,
    //         items_count: response.data.items_count,
    //         kyc_status: response.data.kyc_status,
    //         kyc_rejected: response.data.kyc_rejected,
    //         kyc_pending: response.data.kyc_pending

    //     });
    //     await StorageService.saveItem('ItemCount', this.state.items_count)
    // }

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <View style={styles.container}>
                    <Header
                        backButton
                        // onPress={() => this.props.navigation.goBack()}
                        // onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                        cartCount={this.state.items_count ? (this.state.items_count) : null}
                        middleTextStyle={styles.middleTextStyle}
                        middleText={'Cart'} />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        {/* <View style={{ width: '60%', flex: 1 }}> */}
                        <View style={{ marginTop: 12 }} >
                            <Input
                                value={this.state.search}
                                onChangeText={text => this.handleSearch(text.trim())}
                                mainStyle={styles.searchInputStyle}
                                style={styles.inputStyle}
                                rightIconStyle={styles.searchIconStyle}
                                placeholder='Search and add products'
                                rightIcon={Images.searchIcon}
                                returnKeyType='search'
                            />
                        </View>

                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStyle={{ flexGrow: 1, }}
                            //data={this.props.route.params.productsArray && !this.props.route.params.backPressed && !this.state.sortClicked ? this.props.route.params.productsArray : this.state.products}
                            data={this.state.dataArray}
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
                            ListFooterComponent={this.renderFooter}
                        />
                        {/* </View> */}
                        {/* {this.state.items_count > 0 && this.state.kyc_status && <View style={styles.addressView}>
                        <Text style={{ paddingLeft: 20, fontSize: 18, color: colors.textColor, marginVertical: 10, fontFamily: fonts.MuliSemiBold }}>
                            Delivery Address
                            </Text>
                        <Text style={{ paddingHorizontal: 20, fontFamily: fonts.Muli, color: colors.textColor, fontSize: 14 }}>
                            {this.state.delivery_address ? this.state.delivery_address.trim() : ''}
                        </Text>
                    </View>} */}
                        {/* {this.state.items_count > 0 &&
                            <View style={styles.bottomView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text
                                        style={{ marginTop: 5, color: colors.white, fontSize: 16, fontFamily: fonts.MuliSemiBold }}>
                                        Grand Total :
                            </Text>
                                    <Text style={{ fontFamily: fonts.MuliBold, color: colors.white, fontSize: 22, }}>
                                        {' ' + this.state.grand_total}
                                    </Text>
                                </View>
                                <CustomButton
                                    titleStyle={{ color: colors.black, fontSize: 14 }}
                                    mainStyle={{ marginTop: 14, width: constants.screenWidth / 3 - 30, height: 40, backgroundColor: colors.white, color: colors.black }} title='Checkout'
                                    onPress={this.onPressCheckout}
                                />
                            </View>} */}

                    </KeyboardAwareScrollView>
                    {/* {this.state.items_count > 0 && */}
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
                            onPress={() => this.onPressCheckout()}
                        />
                    </View>
                    {/* } */}
                    {this.state.loading ? <Loader /> : null}
                </View>
            </SafeAreaView>
        );
    }

    // renderFooter = ({ item, index }) => {
    //     return (
    //         <>
    //             {/* {this.state.items_count > 0 && this.state.kyc_status &&  */}
    //             <View style={[styles.addressView, { alignItems: 'center', justifyContent: 'center' }]}>
    //                 <View style={{ width: constants.screenWidth - 38, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
    //                     <Text style={{ fontSize: 18, color: colors.textColor, fontFamily: fonts.MuliSemiBold }}>
    //                         Delivery Address
    //                     </Text>
    //                     <TouchableOpacity
    //                         // disabled={item.max_qty == item.qty ? true : false}
    //                         onPress={() => this.addRemoveProductFromCart(item, index, 'add')}
    //                         activeOpacity={0.8}>
    //                         <Image
    //                             resizeMode='cover'
    //                             source={Images.plusIcon} />
    //                     </TouchableOpacity>
    //                 </View>

    //                 <View style={styles.secondHalfBoxLine} />
    //                 <View style={{ width: constants.screenWidth - 38, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
    //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                         <TouchableOpacity onPress={() => this.setState({ selectedGST: 0 })}>
    //                             <View style={{ borderWidth: this.state.selectedGST == 0 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 0 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
    //                                 {this.state.selectedGST == 0 ?
    //                                     <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
    //                                     : null}
    //                             </View>
    //                         </TouchableOpacity>
    //                         <Text style={styles.addresStyle}>
    //                             {'dsjfg fdgfs gfdsgf dhfjdhf sfhdfhks fjksdhdfhjsfhjksdfhjksfhs f fdjfhk '}
    //                             {/* {this.state.delivery_address ? this.state.delivery_address.trim() : ''} */}
    //                         </Text>
    //                     </View>

    //                     <TouchableOpacity
    //                         style={{}}
    //                         onPress={() => this.props.navigation.navigate('EditAdress')}
    //                     >
    //                         <Image source={Images.EditiconCircle}></Image>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //             {/* } */}
    //         </>
    //     )
    // }

    deleteFunctionality = (item, index) => {
        console.log('dlelete');
        this.state.dataArray=[]
             delete this.setState({})
        this.state.dataArray[0]
    }

    // deleteFunctionality = (item, index) => {
//     this.state.dataArray = []
//     delete this.state.dataArray[item.number]
//     //  myArray[0]
//     // console.log('dlelete');
//     // this.state.items = Array.indexOf(item.number);
//     // if(this.state.items > -1){
//     //     Array.splice(index, 1);
//     // }
// }

    handleSearch = (text) => {
        const newData = this.state.basicItems.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ dataArray: newData });
    }

    onPressCheckout = () => {
        this.props.navigation.navigate('PromotionalMaterial')
        // if (this.state.kyc_status == false) {
        //     Alert.alert(
        //         staticText.projectTitle,
        //         staticText.kyc_notDone);
        //     return false;
        // }

        // else if (this.state.kyc_pending == 1) {
        //     Alert.alert(
        //         staticText.projectTitle,
        //         staticText.kyc_notApprovedYet);
        //     return false;
        // }
        // else if (this.state.kyc_rejected) {
        //     Alert.alert(
        //         staticText.projectTitle,
        //         staticText.kyc_rejected);
        //     return false;

        // }
        // else {
        //     this.props.navigation.navigate('PromotionalMaterial')
        // }
    }
    renderItem = ({ item, index }) => {
        return (
            <View style={styles.mainBoxView}>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginStart: 14 }}>
                    <Image style={{ width: 26, height: 26, }} source={item.imageLogo} />
                    <Text style={styles.medicineNameStyle}>{item.medcineName}</Text>
                </View>
                <View style={styles.secondHalfBoxLine} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ marginStart: 14, }}>

                        <View style={{}}>
                            <Text style={styles.nameStyle}>{item.brandname}</Text>
                        </View>

                        <View style={{ width: (constants.screenWidth) / 2, marginTop: 6 }}>
                            <Text numberOfLines={2} style={styles.descTextStyle}>{item.medicineDescription}</Text>
                        </View>

                        <View style={{ marginTop: 9, flexDirection: 'row', justifyContent: 'space-between', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                            <Image source={item.tabletIcon} />
                            <View style={{ flexDirection: 'row', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                                <Text style={styles.tableticonStyle} >{item.tabletType}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                    <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.number, marginStart: 10 }} >{item.tabletSize}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 12, }}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.mrpStyle}>{'Exp'}</Text>
                                    <View style={{ marginStart: 20, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                    <Text style={[styles.mrpStyle, { marginStart: 10 }]}>{'MRP'}</Text>
                                    <View style={{ marginStart: 10, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number, }} />
                                    <Text style={[styles.mrpStyle, { marginTop: 5, marginStart: 7 }]}>{'Rate'}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text style={[styles.CurrancyStyle, {}]}>{item.expireDate}</Text>
                                    <Text style={[styles.CurrancyStyle, { marginStart: 18 }]}>{item.MrpValue}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.ratePriceStyle, { marginStart: 13 }]}>{item.ratePrice}</Text>
                                        <Text style={[styles.rateDicStyle, { marginStart: 5 }]}>{item.rateDic}</Text>
                                        <Text style={[styles.CurrancyStyle, { marginStart: 5 }]}>{item.rateValue}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10, alignItems: 'flex-end', marginEnd: 14, height: '100%', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => this.deleteFunctionality(item, index)} style={{}}>
                            <Image style={{}} source={Images.DeleteImage} />
                        </TouchableOpacity>

                        <View style={{ marginTop: 40 }}>
                            <Text style={[styles.discStyle, {}]}>{item.finalValue}</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: 11 }}>
                            <View style={{ justifyContent: 'space-around', alignItems: 'center', width: constants.screenWidth / 5, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image source={Images.Rectangle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.HelveBold, fontSize: 18, color: colors.white }}>{item.addnumber}</Text>
                                    <TouchableOpacity>
                                        <Image source={Images.WhiteUnion} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.secondHalfBoxLines, {}]} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ marginStart: 14, }}>

                        <View style={{}}>
                            <Text style={styles.nameStyle}>{item.brandname}</Text>
                        </View>

                        <View style={{ width: (constants.screenWidth) / 2, marginTop: 6 }}>
                            <Text numberOfLines={2} style={styles.descTextStyle}>{item.medicineDescription}</Text>
                        </View>

                        <View style={{ marginTop: 9, flexDirection: 'row', justifyContent: 'space-between', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                            <Image source={item.tabletIcon} />
                            <View style={{ flexDirection: 'row', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                                <Text style={styles.tableticonStyle} >{item.tabletType}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                    <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.number, marginStart: 10 }} >{item.tabletSize}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 12, }}>
                            <View style={{}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={styles.mrpStyle}>{'Exp'}</Text>
                                    <View style={{ marginStart: 20, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                    <Text style={[styles.mrpStyle, { marginStart: 10 }]}>{'MRP'}</Text>
                                    <View style={{ marginStart: 10, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number, }} />
                                    <Text style={[styles.mrpStyle, { marginTop: 5, marginStart: 7 }]}>{'Rate'}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text style={[styles.CurrancyStyle, {}]}>{item.expireDate}</Text>
                                    <Text style={[styles.CurrancyStyle, { marginStart: 18 }]}>{item.MrpValue}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.ratePriceStyle, { marginStart: 13 }]}>{item.ratePrice}</Text>
                                        <Text style={[styles.rateDicStyle, { marginStart: 5 }]}>{item.rateDic}</Text>
                                        <Text style={[styles.CurrancyStyle, { marginStart: 5 }]}>{item.rateValue}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'flex-end', marginEnd: 14, height: '100%', marginTop: 20 }}>
                        <View style={{}}>
                            <Image style={{}} source={Images.DeleteImage} />
                        </View>

                        <View style={{ marginTop: 40 }}>
                            <Text style={[styles.discStyle, {}]}>{item.finalValue}</Text>
                        </View>

                        <View style={{ position: 'absolute', bottom: 11 }}>
                            <View style={{ justifyContent: 'space-around', alignItems: 'center', width: constants.screenWidth / 5, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image source={Images.Rectangle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.HelveBold, fontSize: 18, color: colors.white }}>{item.addnumber}</Text>
                                    <TouchableOpacity>
                                        <Image source={Images.WhiteUnion} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', height: 34, backgroundColor: colors.lightOrange, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                    <Text style={styles.descTextStyle}>{'Sub Total:'}</Text>
                    <Text style={[styles.discStyle, { marginEnd: 14 }]}>{item.subtotal}</Text>
                </View>
            </View>
        )
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
            <Text style={styles.itemText}>Your cart is empty</Text>
        </View>}</>
    )
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView: { flex: 1 },
    contentContainerStyle: {
        flexGrow: 1,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
        // marginRight:20
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
        // paddingBottom: 20,

        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
    },
    medicineNameStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.Orange,
    },
    nameStyle: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginTop: 4
    },
    descTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.number
    },
    tableticonStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        marginStart: 5
    },
    discStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        marginStart: 12,
        color: colors.Orange,
    },
    mrpStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        // marginRight:30
    },
    CurrancyStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
        // marginLeft:9
        // paddingRight:20
        // paddingEnd: 15,
    },
    ratePriceStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.number,
    },
    rateDicStyle: {
        fontSize: 10,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginTop: 3
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
    firsthalfBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: constants.screenWidth - 50,
        padding: 10,
    },
    secondHalfBox: {
        alignItems: 'center',
        alignSelf: 'center',
        height: 1,
        width: constants.screenWidth - 64,
        opacity: 0.5,
        backgroundColor: colors.placeholderColor
    },
    secondHalfBoxLine: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
        marginTop: 10,
        marginHorizontal: 14,
    },
    secondHalfBoxLines: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
        marginTop: 10,
        marginHorizontal: 14,
    },
    priceStyle: {
        fontSize: 16,
        fontFamily: fonts.MuliSemiBold,
        color: colors.Orange
    },
    addresStyle: {
        marginVertical: 15,
        marginHorizontal: 15,
        fontFamily: fonts.Muli,
        color: colors.textColor,
        fontSize: 14
    },
    searchInputStyle: {
        // marginTop: 15,
        marginHorizontal: 20,
        height: 50,
        borderRadius: 6,
        // borderWidth: 1,
        // borderColor: colors.borderDark,
    },
    oldPriceStyle: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontFamily: fonts.MuliSemiBold,
        color: colors.placeholderColor
    },
    inputStyle:
    {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        marginLeft: -10,
        marginTop:4,
        color: colors.number
    },
    searchIconStyle: {
        marginRight: 5,
        height: 16,
        width: 16
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
        marginHorizontal: 5,
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
    itemText: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.Helvetica,
    },
});
