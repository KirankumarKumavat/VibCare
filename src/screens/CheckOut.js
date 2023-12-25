import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, UIManager, TouchableWithoutFeedback, LayoutAnimation, FlatList, TouchableOpacity, Alert, Image, ImageBackground, BackHandler } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Input, CustomButton, Header, List,  } from '../components';
import fonts from '../assets/index';
import { Input, CustomButton, Header, ModalComponent } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isIphoneX, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shippingItems } from '../config/utility'
import { color } from 'react-native-reanimated';
// import RazorpayCheckout from 'react-native-razorpay';
import DropDownPicker from '../components/DropDownPicker';



class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            loading: false,
            Text: '',
            childModalVisible: false,
            expandedIndex: -1,
            scrolllItem: false,
            showdata: false,

            selected: false,
            selectedGST: 0,
            issueArray: [{ name: 'Brakage' }, { name: 'damage' }],
            selectedItem: '',
            selectedIssueItem: '',
            SelectModal: false,
            selectedSortOption: -1,
            MedicineDetails: [
                {
                    id: 1,
                    logoImage: Images.LogoMedicine,
                    logoName: 'Prima',
                    totalPrice: '₹.4032',
                    minusImage: Images.MinusOrangeicon,
                    PlusImage: Images.PlusiconOrange,
                    scrolllItem: false,
                    PriceDetailsMedicine: [
                        {
                            id: 1,
                            brandName: 'Acrimol',
                            number: '30',
                            brandNamePrice: '₹.1000',
                        },
                        {
                            id: 2,
                            brandName: 'Acrimol',
                            number: '30',
                            brandNamePrice: '₹.1000',
                        },
                        {
                            id: 3,
                            brandName: 'Acrimol',
                            number: '30',
                            brandNamePrice: '₹.1000',
                        },
                    ],
                },
                {
                    id: 2,
                    logoImage: Images.LogoMedicine,
                    logoName: 'Acrimol',
                    totalPrice: '₹.4032',
                    minusImage: Images.MinusOrangeicon,
                    PlusImage: Images.PlusiconOrange,
                    scrolllItem: false,
                    PriceDetailsMedicine: [
                        {
                            id: 1,
                            brandName: 'Acrimol',
                            number: '30',
                            brandNamePrice: '₹.1000',
                        },
                        {
                            id: 2,
                            brandName: 'Acrimol',
                            number: '30',
                            brandNamePrice: '₹.1000',
                        },
                        {
                            id: 3,
                            brandName: 'Acrimol',
                            number: '30',
                            brandNamePrice: '₹.1000',
                        },
                    ],
                },

            ],

            PromotionItemData: [
                {
                    id: 1,
                    typeName: 'LBL',
                    number: '2',
                    brandNamePrice: '₹.1000',
                },
                {
                    id: 2,
                    typeName: 'LBL',
                    number: '2',
                    brandNamePrice: '₹.1000',
                },
            ],
            paymentOptionData: [
                {
                    id: 1,
                    paymentType: 'Cash',
                    discDescription: 'Please submit your following Bank ( ICICI ) Details'
                },
                {
                    id: 2,
                    paymentType: 'Pay Online'
                },
                {
                    id: 3,
                    paymentType: 'POD',
                    discDescription: 'Please make 25% payment in advance to use this mode.'
                },
                {
                    id: 4,
                    paymentType: 'Credit'
                }
            ],

            selectedShippingType: '',
            code: '',
            shippingClicked: false,
            shippingMessage: '',
            orderDetails: '',
            myTerritoryData: [
                { id: 1, brandName: 'PRIMA', institution: 'Franchise', adress: 'Saharanpur, Uttar Pradesh' },
                { id: 2, brandName: 'NURALZ', institution: 'Franchise', adress: 'Saharanpur, Uttar Pradesh' },
                { id: 3, brandName: 'GRACE', institution: 'Non-Franchise', adress: 'Saharanpur, Uttar Pradesh' },
                { id: 4, brandName: 'PRIMA', institution: 'Franchise', adress: 'Saharanpur, Uttar Pradesh' },
                { id: 5, brandName: 'PRIMA', institution: 'Franchise', adress: 'Saharanpur, Uttar Pradesh' },
            ]
        };
    }

    componentDidMount = () => {
        this.checkOutDetails()
        this.orderDetails()
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentWillUnmount() {
    }

    onBackPress = () => {

    }

    checkOutDetails = async () => {
        this.setState({ loading: true })
        let response = await Request.get(`${constants.apiVersion}/checkout/detail`);
        this.setState({ details: response.data, loading: false, shippingMessage: response.data.shipping_method[0].shipping_message })
    }

    orderDetails = async () => {
        this.setState({ loading: true })
        let response = await Request.post(`${constants.apiVersion}/checkout/initpayment`);
        this.setState({ orderDetails: response.data }, () => {
        })
    }

    setShipping = async (code) => {
        let response
        this.setState({ loading: true, shippingClicked: true })
        if (code) {
            response = await Request.post(`${constants.apiVersion}/checkout/setshipping`, { code: code });
        }
        else {
            response = await Request.post(`${constants.apiVersion}/checkout/setshipping`);
        }
        this.setState({ details: response.data, loading: false },
            () => {
                console.log("details", this.state.details && this.state.details.shipping_method.map((item) => {
                    if (item.is_selected) {
                        this.setState({ shippingMessage: item.shipping_message })
                    }
                }));
            })
    }

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <Header
                    backButton
                    middleText={'Cart'}
                    middleTextStyle={styles.middleTextStyle}
                />
                {/* {this.state.loading == false && */}
                <>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <View style={styles.TopAdressView}>
                            <Text style={styles.addressHeading}>{'Delivery Address'}</Text>
                            <View style={styles.itemSeparator}></View>
                            <Text style={styles.addressText}>
                                {/* {this.state.details.addresses} */}
                                {'3179 State 114 Rte, Bradford, NH, 03221'}
                            </Text>
                        </View>

                        <View style={[styles.addressContainerView, { marginVertical: 9 }]}>
                            <Text style={styles.addressHeading}>{'Items Summary'}</Text>
                            <View style={styles.itemSeparatorItems}></View>

                            <View style={styles.shippingContainerView}>

                                <FlatList
                                    style={{ flex: 1, }}
                                    contentContainerStyle={{}}
                                    // data={this.state.details && this.state.details.shipping_method}
                                    data={this.state.MedicineDetails}
                                    // horizontal={true}
                                    renderItem={(item, index) => this.MedicineDetailsRenderItem(item, index)}
                                    keyExtractor={index => index}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    extraData={this.state}
                                />
                            </View>
                        </View>

                        <View style={[styles.addressContainerView, { marginVertical: 0, }]}>
                            <View style={{ marginHorizontal: 15, marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.PromotionItems}>{'Promotion Items'}</Text>
                                <TouchableOpacity onPress={() => { this.setState({ SelectModal: !this.state.SelectModal }) }} >
                                    <Image style={{}} source={this.state.SelectModal ? Images.MinusOrangeicon : Images.PlusiconOrange}></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.shippingContainerView}>
                                {/* {this.state.SelectModal ? */}
                                <FlatList
                                    contentContainerStyle={{}}
                                    data={this.state.PromotionItemData}
                                    renderItem={(item, index) => this.PromotionItemDatarenderItem(item, index)}
                                    keyExtractor={item => item.id}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    extraData={this.state}
                                    ListEmptyComponent={this.ListEmptyComponent}
                                    ItemSeparatorComponent={this.itemSeparatorComponent}
                                />
                                {/* : null} */}
                            </View>
                        </View>

                        <View style={[styles.addressContainerView, { marginVertical: 0 }]}>
                            <View style={styles.addressView}>
                                <Text style={styles.PaymentHeading}>{'Payment Options'}</Text>
                            </View>
                            <View style={styles.shippingContainerView}>
                                <FlatList
                                    style={{}}
                                    contentContainerStyle={{}}
                                    data={this.state.paymentOptionData}
                                    horizontal={true}
                                    renderItem={(item, index) => this.paymentOptionDatarenderItem(item, index)}
                                    keyExtractor={index => index}
                                    bounces={false}
                                    pagingEnabled={true}
                                    // scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    extraData={this.state}
                                />

                                <View>
                                    {this.state.paymentOptionData && this.state.paymentOptionData.map((itemObj, index) => {
                                        return (
                                            <View>
                                                {
                                                    index == this.state.showdata ?
                                                        <Text style={styles.discDescriptionStyle}>{itemObj.discDescription}</Text>
                                                        :
                                                        null
                                                }
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>

                        <View style={[styles.addressContainerView, { marginVertical: 0 }]}>
                            <View style={styles.addressView}>
                                <Text style={styles.ModesHeading}>{'Mode of Delivery'}</Text>
                            </View>
                            <View style={styles.shippingContainerView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{}}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <View>
                                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ selectedGST: 0 })}>
                                                    <View style={{ borderWidth: this.state.selectedGST == 0 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 0 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                        {this.state.selectedGST == 0 ?
                                                            <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                            : null}
                                                    </View>
                                                    <Text style={{ marginLeft: 5 }}>{'Transport'}</Text>
                                                </TouchableOpacity>
                                            </View>

                                            <View>
                                                <TouchableOpacity style={{ flexDirection: 'row', marginStart: 50 }} onPress={() => this.setState({ selectedGST: 1 })}>
                                                    <View style={{ borderWidth: this.state.selectedGST == 1 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 1 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                        {this.state.selectedGST == 1 ?
                                                            <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                            : null}
                                                    </View>
                                                    <Text style={{ marginLeft: 5 }}>{'Courier Services'}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 15, }}>
                                    <DropDownPicker onPressItem={(item, index) => {
                                        this.setState({ selectedItem: item, index: -1, changedItem: !this.state.changedItem, selectedIssueItem: '' })

                                    }}
                                        mainStyle={{}}
                                        listData={this.state.issueArray}
                                        titleStyle={{ color: this.state.selectedItem && this.state.selectedItem.name ? colors.black : colors.placeholderColor }}
                                        value={this.state.selectedItem ? this.state.selectedItem.name : 'Select Transport'} imageSource={Images.downArrow} />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.addressAddContainerView, { marginVertical: 0 }]}>
                            <Text style={[styles.addressHeading, { marginStart: 30 }]}>{'Add Remarks'}</Text>
                            <View style={{ marginTop: 10, }}>
                                <Input
                                    autoCapitalize='words'
                                    // rightIcon={Images.usericon}
                                    placeholder={'Text'}
                                    returnKeyType="next"
                                    value={this.state.Text}
                                    style={{ marginBottom: 20, color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                    onChangeText={(Text) => this.setState({ Text })}
                                    onSubmitEditing={() => { this.mobileNo.focus(); }}
                                    blurOnSubmit={false}
                                    mainStyle={{ width: constants.screenWidth - 50, height: 85, borderWidth: 1, borderColor: colors.dropdowonBorderColor }}
                                />
                            </View>
                        </View>

                        <View style={[styles.addressContainerView, { marginVertical: 0 }]}>
                            <View style={styles.shippingContainerView}>
                                <Text style={styles.addRemarkStyle}>{'Please note you have been allocated following\ndivision'}</Text>
                                <TouchableOpacity onPress={() => this.onPressSortButton()}>
                                    <View style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.Orange, backgroundColor: colors.InsideTextInputColor, borderRadius: 8, height: 50, }}>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                            <Text style={styles.myTerritoryStyle}>{'My Territory'}</Text>
                                            <Image style={{ marginEnd: 10 }} source={Images.nextarrow}></Image>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Modal
                            transparent={true}
                            animated={true}
                            animationType="slide"
                            visible={this.state.childModalVisible}
                            onRequestClose={() => this.setState({ childModalVisible: false })}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => this.setState({ childModalVisible: false })}
                            >
                                <View style={[styles.styles1,]}>
                                    <TouchableWithoutFeedback
                                        onPress={() => this.setState({ childModalVisible: true })}
                                    >
                                        <View style={[styles.containerstyle]}>
                                            <View style={styles.modalViews}>
                                                <Text style={styles.modalmyTerritoryStyle} >{'My Territory'}</Text>
                                                <FlatList
                                                    // style={{ marginTop: 10, }}
                                                    data={this.state.myTerritoryData}
                                                    renderItem={(item, index) => this.modalRenderItem(item, index)}
                                                    keyExtractor={item => item.id}
                                                    bounces={false}
                                                    // horizontal
                                                    scrollEnabled
                                                    showsVerticalScrollIndicator={false}
                                                />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <Text style={styles.billSummaryStyle} >{'Bill Summary'}</Text>
                        <View style={{ marginHorizontal: 20, }}>

                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'Gross Amount'}</Text>
                                <Text style={styles.detailsInfoText}>{'₹.800'}</Text>
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'Discount 10%'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.shipping_amount}</Text> */}
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'Taxable Amount'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.tax_amount}</Text> */}
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'GST 0%'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.discount_amount}</Text> */}
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'GST 5%'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.discount_amount}</Text> */}
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'GST 12%'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.discount_amount}</Text> */}
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'GST 18%'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.discount_amount}</Text> */}
                            </View>
                            <View style={styles.viewWrap}>
                                <Text style={styles.detailsText}>{'GST 28%'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.discount_amount}</Text> */}
                            </View>
                            <View style={[styles.viewWrap, { borderBottomWidth: 0, paddingBottom: 10 }]}>
                                <Text style={styles.detailsText}>{'Total'}</Text>
                                {/* <Text style={styles.detailsInfoText}>{this.state.details.grand_total}</Text> */}
                            </View>

                            <View style={{ paddingBottom: 20, marginTop: 20 }} >
                                <Text style={styles.paymenterrorStyle}>{'Please Note Freight Charges Are Borne By The Customer..'}</Text>
                                <Text style={styles.paymenterrorStyle}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.lastbottomView}>
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

                    {/* <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => this.onPressPayNow()}>
                            <Text style={styles.payNow}>{'Pay Now'}</Text>
                        </TouchableOpacity>
                    </View> */}
                </>
                {/* } */}
                {/* {this.state.loading ? <Loader /> : null} */}
            </SafeAreaView >
        );
    }

    // modalRenderItem = ({ item, index }) => {
    //     return (<TouchableOpacity activeOpacity={0.8} onPress={() => this.onPressSortOption(item, index)} style={{ paddingLeft: 20, paddingVertical: 20 }}>
    //         <Text style={{ color: this.state.selectedSortOption == index ? colors.Orange : colors.black, fontFamily: fonts.Helvetica, fontSize: 16 }}>
    //             {item.label}
    //         </Text>
    //     </TouchableOpacity>)
    // }

    onPressCheckout = () => {
        this.props.navigation.navigate('PayOnDelivery')

    }

    onPressSortButton = () => {
        this.setState({ childModalVisible: true })
    };
    modalRenderItem = ({ item, index }) => {
        return (
            <View>

                <View style={styles.modalViewLine} />
                <View style={{ marginStart: 27, marginVertical: 15 }}>
                    <Text style={styles.brandNameTextStyle} >{item.brandName}</Text>
                    <Text style={styles.institutionTextStyle}>{item.institution}</Text>
                    <Text style={styles.adressStyle}>{item.adress}</Text>
                </View>
                <View style={styles.modalViewLine} />
            </View>
        )
    };

    /**RazorpayCheckout */
    // onPressPayNow = () => {
    //     let orderDetails = this.state.orderDetails
    //     var options = {
    //         // description: 'Credits towards consultation',
    //         // image: 'https://i.imgur.com/3g7nmJC.png',
    //         currency: orderDetails.currency,
    //         key: orderDetails.key_id,
    //         amount: orderDetails.amount,
    //         name: orderDetails.name,
    //         order_id: orderDetails.order_id,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
    //         prefill: {
    //             email: orderDetails.email,
    //             contact: orderDetails.contact,
    //             name: orderDetails.name
    //         },
    //         theme: { color: colors.Orange }
    //     }
    //     RazorpayCheckout.open(options).then(async (data) => {
    //         // handle success
    //         // alert(`Success: ${data.razorpay_payment_id}`);
    //         let reqData = {
    //             razorpay_payment_id: data.razorpay_payment_id,
    //             razorpay_order_id: data.razorpay_order_id,
    //             razorpay_signature: data.razorpay_signature,
    //             order_id: orderDetails.order_id

    //         }

    //         // if (data) {
    //         this.setState({ loading: true })
    //         let response = await Request.post(`${constants.apiVersion}/checkout/placeorder`, reqData);
    //         this.setState({ loading: false }, () => {
    //             if (response.data.success) {
    //                 Alert.alert(
    //                     staticText.projectTitle,
    //                     response.data.message);
    //                 this.props.navigation.navigate('Home')
    //             }

    //         })
    //         // 
    //         //  }
    //     }).catch((error) => {
    //         Alert.alert(
    //             staticText.projectTitle,
    //             error.error.description);
    //     }
    //     );
    // }

    paymentOptionDatarenderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity style={{ marginEnd: 18, }} onPress={() => paymentTextData(item, index)} >
                    <View style={{ backgroundColor: this.state.selected = true ? '#F58734' : 'white', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 6, borderColor: colors.borderColor, height: 32 }}>
                        <Text style={[styles.paymentTypeStyle, { color: this.state.selected = true ? 'white' : 'black' }]}>{item.paymentType}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    expandArray = (item, index) => {
        console.log("item", item, index);
        var tempArray = this.state.MedicineDetails
        tempArray[index].scrolllItem = item.scrolllItem == false ? true : false
        console.log("tempArray", tempArray);
        this.setState({ MedicineDetails: tempArray })
    }


    MedicineDetailsRenderItem = ({ item, index }) => {
        console.log('indexindexindex', item, index);

        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 26, height: 26 }} source={item.logoImage}></Image>
                        <Text style={styles.lgogNameStyle} >{item.logoName}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.totalPriceStyle}>{item.totalPrice}</Text>
                        <TouchableOpacity
                            onPress={() => { this.expandArray(item, index) }}
                        // onPress={() => { this.setState({ scrolllItem: !this.state.scrolllItem })}}
                        >
                            <Image style={{ width: 22, height: 22 }} source={item.scrolllItem ? item.minusImage : item.PlusImage}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {item.scrolllItem ?
                    <FlatList
                        style={{ flex: 1, marginTop: 14 }}
                        contentContainerStyle={{}}
                        // data={this.state.details && this.state.details.shipping_method}
                        data={item.PriceDetailsMedicine}
                        // horizontal={true}
                        renderItem={(item, index) => this.PriceDetailsMedicineRenderItem(item, index)}
                        keyExtractor={index => index}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                    :
                    null}

                <View style={[styles.itemSeparatorItems, { marginVertical: 10, marginTop: 10 }]}></View>
            </View>
        )
    }

    PriceDetailsMedicineRenderItem = ({ item, index }) => {
        return (
            <View style={styles.addressViewLine}>
                <View style={{ marginVertical: 7, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.brandNameStyle} >{item.brandName}</Text>
                    <Text style={styles.numberStyle} >{item.number}</Text>
                    <Text style={styles.brandNamePriceStyle} >{item.brandNamePrice}</Text>
                </View>
            </View>
        )
    }

    PromotionItemDatarenderItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.PromotionLine} />
                {/* {this.state.SelectModal ? */}
                <View style={{ marginVertical: 7, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.typeNameStyle} >{item.typeName}</Text>
                    <Text style={styles.numberTextStyle} >{item.number}</Text>
                    <Text style={styles.brandNamePriceTextStyle}>{item.brandNamePrice}</Text>
                </View>
                {/* : null} */}
                {/* <View style={styles.PromotionLine} /> */}
            </View>
        )
    };

    // itemSeparatorComponent = () => {
    //     return (
    //         <View style={styles.separatorStyle}></View>
    //     )
    // }

}

export default CheckOut;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView: { flex: 1 },
    contentContainerStyle: {
        // flexGrow: 1,
    },
    styles1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.transparent,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    containerstyle: {
        alignItems: 'center',
        width: constants.screenWidth,
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // paddingHorizontal: 20,
        // paddingVertical: 20,
        height: '45%'
    },
    modalViews: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        // marginVertical: 20
    },
    modalHeaderView: {
        height: 40,
        marginTop: 3,
        paddingLeft: 20,
        borderBottomColor: colors.modalSeparatorItem,
        borderBottomWidth: 1,
    },
    modalHeaderText: {
        fontFamily: fonts.MuliBold,
        fontSize: 20,
        color: colors.Orange,
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    addressAddContainerView: {
        backgroundColor: colors.white,
        // marginVertical: 20,
        // marginBottom: 10,
        shadowColor: colors.shadow,
        // shadowOpacity: 1,
        // elevation: 3,
        // shadowRadius: 6,
        // shadowOffset: {
        //     height: 0,
        //     width: 3,
        // },
    },


    addressContainerView: {
        backgroundColor: colors.white,
        marginVertical: 20,
        marginBottom: 10,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 0,
            width: 3,
        },
    },

    addressHeading: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.HelveBold,
        marginHorizontal: 15,
        marginTop: 15
    },
    PromotionItems: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.HelveBold,
        // marginTop: 15
    },
    PaymentHeading: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.HelveBold,
        marginTop: 15
    },
    ModesHeading: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.HelveBold,
        marginTop: 15
    },
    TopAdressView: {
        backgroundColor: colors.white
    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
        marginHorizontal: 15,
        marginVertical: 15
    },
    itemSeparatorItems: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
        width: constants.screenWidth - 30,
        alignSelf: 'center',
        marginTop: 13

    },
    addressView: {
        // flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.shadow,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 0.3,
        shadowRadius: 30,
        shadowOffset: {
            height: 3,
            width: 0,
        },

        backgroundColor: colors.white,
        // paddingHorizontal: 15,
        marginHorizontal: 15,
        paddingVertical: 10,
    },
    modalViewLine: {
        // flexDirection: 'row',
        // marginTop: 20,
        borderBottomWidth: 1,
        borderColor: colors.shadow,
        width: '100%'
    },
    brandNameTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.Orange
    },
    institutionTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 15,
        color: colors.black,
        marginTop: 5,
    },
    adressStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.number,
        marginTop: 5
    },
    addressViewLine: {
        borderWidth: 1,
        borderColor: colors.shadow,
        backgroundColor: colors.shadowColor,
    },
    lineViewStyle: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lgogNameStyle: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.Orange,
        textAlign: 'center',
        marginStart: 7,
    },
    PromotionLine: {
        // marginTop: 10,
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
    },
    typeNameStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 16,
        color: colors.smallFont
    },
    numberStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.smallFont
    },
    totalPriceStyle: {
        fontSize: 14,
        fontFamily: fonts.HelveBold,
        color: colors.black,
        textAlign: 'center',
        marginEnd: 10
    },
    brandNameStyle: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.smallFont,
    },
    numberTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.smallFont
    },
    brandNamePriceTextStyle: {
        fontFamily: fonts.Helvetica,
        color: colors.Orange,
        fontSize: 16
    },
    brandNamePriceStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
    },
    paymentTypeStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        marginHorizontal: 12,
    },
    discDescriptionStyle: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        marginTop: 10
    },
    addressText: {
        fontSize: 14,
        fontFamily: fonts.Muli,
        color: colors.textColor,
        paddingTop: 10,
        // paddingHorizontal: 20,
        paddingBottom: 20,
        width: '70%',
        marginHorizontal: 15,
    },

    separatorStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.shadow,
        shadowColor: colors.shadowColor,
        backgroundColor: 'white',

    },
    itemName: {
        fontSize: 16,
        fontFamily: fonts.MuliBold,
        color: colors.textColor,
        // width: '60%'
    },
    quantity: {
        //flex: 0.5,
        fontSize: 12,
        fontFamily: fonts.Muli,
        color: colors.textColor
    },
    price: {
        color: colors.Orange,
        fontSize: 14,
        fontFamily: fonts.MuliBold,
        justifyContent: 'flex-start'
    },
    itemListContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
        // shadowColor: colors.shadow,
        // shadowOpacity: 1,
        // elevation: 3,
        // shadowRadius: 6,
        // shadowOffset: {
        //     height: 0,
        //     width: 3,
        // },
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        // height: 65,
        height: isIphoneX() ? 90 : 65,
        backgroundColor: colors.Orange,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: colors.shadow,
        shadowRadius: 15,
        shadowOffset: {
            height: -1,
            width: 0,
        },
        marginTop: 20,
        // paddingHorizontal: 20,
        justifyContent: 'center'

    },
    shippingTextStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 30,
    },
    shippingOffer: {
        fontSize: 14,
        fontFamily: fonts.Muli,
        color: colors.placeholderColor,
        marginHorizontal: 2,
        // paddingBottom: 10
    },
    shippingType: {
        fontSize: 14,
        fontFamily: fonts.MuliSemiBold,
        color: colors.textColor,
        marginLeft: 10
    },
    itemDetailsView: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailsText: {
        fontSize: 16,
        fontFamily: fonts.Helvetica,
        color: colors.smallFont,
        marginHorizontal: 10,
        padding: 5
    },
    lastbottomView: {
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
        justifyContent: 'space-between',
    },
    detailsInfoText: {
        fontFamily: fonts.Helvetica,
        color: colors.black,
        fontSize: 16,
        marginHorizontal: 10,
        justifyContent: 'flex-start'

    },
    viewWrap: {
        flexDirection: 'row',
        borderBottomColor: colors.shadow,
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    paymenterrorStyle: {
        fontSize: 12,
        color: colors.placeholderColor,
        fontFamily: fonts.Helvetica
    },
    payNow: {
        color: colors.white,
        fontSize: 24,
        fontFamily: fonts.MuliBold
    },
    shippingContainerView: {
        // flexDirection: 'row',
        paddingVertical: 15,
        marginHorizontal: 15,
        backgroundColor: colors.white,
        // backgroundColor:'red',
        // alignItems: 'center',
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
    addRemarkStyle: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.Helvetica
    },
    myTerritoryStyle: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginStart: 10,
        // marginVertical:15, 
        // marginStart: 23,
        // paddingBottom: 15
    },
    modalmyTerritoryStyle: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginStart: 22,
        marginVertical: 17
    },
    billSummaryStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        color: colors.black,
        marginStart: 15,
        marginVertical: 20
    }
});
