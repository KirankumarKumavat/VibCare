import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, UIManager, StatusBar, LayoutAnimation, SectionList, ScrollView, TouchableOpacity, ImageBackground, Animated, Dimensions, } from 'react-native';
import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { StorageService, showTostMessage } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import BoxView from '../components/BoxView';
import { DrawerActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-root-toast';
// import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NavigationEvents } from '@react-navigation/compat';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, moderateScale, scale } from '../utilities';
import { color } from 'react-native-reanimated';

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: '',
            // password: '',
            isValueChange: false,
            initializing: false,
            loading: false,
            homeDetailsArray: {},
            sectionData: [],
            visible: false,
            search: '',
            selectedIndex: 0,
            expandedIndex: -1,
            storedata: [],
            DataArray: [
                {
                    id: 1,
                    lady: Images.GropImage
                },
                {
                    id: 2,
                    lady: Images.GropImage
                },
                {
                    id: 3,
                    lady: Images.GropImage
                },
                {
                    id: 4,
                    lady: Images.GropImage
                }
            ],
            frequentlyBoughtTogetherData: [
                {
                    id: 1,
                    medicalImage: Images.MedicineImage,
                    medicineName: 'PRIMA',
                    typeName: 'Acrimol',
                    medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                    packingData: '10x10',
                    mrpData: '₹.800',
                    rateData: '₹.16'
                },
                {
                    id: 2,
                    medicalImage: Images.MedicineImage,
                    medicineName: 'PRIMA',
                    typeName: 'Acrimol',
                    medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                    packingData: '10x10',
                    mrpData: '₹.800',
                    rateData: '₹.16'
                },
            ],
            SimilarProducts: [
                {
                    id: 1,
                    medicalImage: Images.MedicineImage,
                    medicineName: 'PRIMA',
                    typeName: 'Acrimol',
                    medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                    packingData: '10x10',
                    mrpData: '₹.800',
                    rateData: '₹.16'
                },
                {
                    id: 2,
                    medicalImage: Images.MedicineImage,
                    medicineName: 'PRIMA',
                    typeName: 'Acrimol',
                    medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                    packingData: '10x10',
                    mrpData: '₹.800',
                    rateData: '₹.16'
                },
            ],
            DescriptionData: [
                {
                    id: 1,
                    nameDescription: 'Description',
                    arrowImage: Images.downArrow,
                    upImage: Images.uparrow,
                    data: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.']
                },
                {
                    id: 2,
                    nameDescription: 'Indication',
                    arrowImage: Images.downArrow,
                    upImage: Images.uparrow,
                    data: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.']
                },
                {
                    id: 3,
                    nameDescription: 'Side Effects',
                    arrowImage: Images.downArrow,
                    upImage: Images.uparrow,
                    data: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.']
                },
                {
                    id: 4,
                    nameDescription: 'return Policy Details',
                    arrowImage: Images.downArrow,
                    upImage: Images.uparrow,
                    data: ['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.']
                },
            ],
            isReadMoreCom: false,
            isReadMore: false
        };
        // this.scrollX = new Animated.Value(0);
        // this.flatlistref = 'flatlistref'
    }

    onAuthStateChanged(user) {
        // this.setState({ user });
        // if (this.state.initializing) this.setState({ initializing: false });
    }
    componentDidMount = async () => {
        // setTimeout(() => this.setState({
        this.setState({ visible: true })
        // }), 1000); // show toast after 2s
        this.ItemDetailsById()
        this.getHomeScreenData();
        this.setState({ itemCount: await StorageService.getItem('ItemCount') })
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentWillUnmount = () => {
        this.setState({ visible: false })
    }

    ItemDetailsById = async () => {
        let params = {
            id: '1'
        }
        this.setState({ loading: true })
        let response = await Request.post('Items/ItemDetailsById', params);
        console.log('responeofferDataooooooooo', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        // console.log('responseJsonofferData+++>', responseJson);
        console.log('responseJsonofferData+++000000>', responseJson[0].getDetailsById);
        this.setState({ storedata: responseJson[0].getDetailsById })
        // console.log('storedata',this.state.storedata);
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                <Image
                    resizeMode="cover"
                    // source={Images.blackOverlay}
                    source={item.lady}
                    // style={{ width: 375, height: 200 }}
                    // style={{ zIndex: 0 }}
                    width={constants.screenWidth}
                    height={300}
                />
                {/* <ImageBackground
                    // resizeMode="cover"
                    // source={{ uri: item.image }}
                    source={item.lady}
                    style={{ width: '100%', height: '87%' }}
                    width={constants.screenWidth}
                    height={300} 
                    > */}
                {/* </ImageBackground> */}
                {/* <FastImage
                    style={{ width: constants.screenWidth, height: 300, }}
                    source={{
                        uri: item.image,
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                /> */}
            </View>
        )
    };

    getHomeScreenData = async () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        var responseData;
        await fetch("https://arthcrm.com:2087/Items/NewLaunchItems?pageNumber=1", requestOptions)
            .then(response => response.text())
            .then(result => {
                responseData = JSON.parse(result)
                console.log("response of new lunches ----", JSON.parse(result));
            })
            .catch(error => console.log('error', error));
        console.log("response gsgcjkszbgv-", responseData);

        let sectionData = [];
        sectionData.push(
            {
                title: 'New Launches', data: responseData.list,
            },
        );
        console.log("response data--->", responseData.list);
        this.setState({ sectionData }, async () => {

        });

        return
        this.setState({ loading: true });
        // let response = await Request.get(`${constants.apiVersion}/home`);
        // this.setState({ loading: false, homeDetailsArray: response.data.data }, () => {
        // });

        // let sectionData = [];
        sectionData.push(
            // {
            //     title: 'Trending', data: this.state.homeDetailsArray.trending_products,
            // },
            // {
            //     title: 'Top Categories', data: this.state.homeDetailsArray.categories,
            // },

            // {
            //     title: 'Offers', data: this.state.homeDetailsArray.offers,
            // },
            {
                title: 'New Launches', data: this.state.homeDetailsArray.new_launches,
            },
            // {
            //     title: 'Past Orders', data: this.state.homeDetailsArray.orders_products,
            // }
        );
        this.setState({ sectionData }, async () => {
        });
    };
    onItemPress = (item, index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        this.setState({
            expandedIndex: this.state.expandedIndex == index ? -1 : index
        })
    }
    DescriptionDataRenderItem = ({ item, index }) => {
        console.log('item.data', item.data);
        return (
            <View style={{ marginHorizontal: 15, }}>
                <TouchableOpacity activeOpacity={1} style={{}}
                    onPress={() => this.onItemPress(item, index)}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <Text style={{}}>{item.nameDescription}</Text>

                        <Image source={index == this.state.expandedIndex ? item.upImage : item.arrowImage} style={styles.dropdownIconStyle}></Image>
                    </View>
                    {<View style={styles.linestyle}></View>}

                </TouchableOpacity>


                {index == this.state.expandedIndex ?
                    <View style={{ height: item.data ? undefined : 0 }}>
                        {item.data && item.data.map((obj) => {
                            return (
                                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontFamily: fonts.Helvetica, color: colors.black, }}>{obj}</Text>
                                </View>)
                        })}
                    </View> : null}
            </View>
        )
    }

    frequentlyBoughtTogetherRenderItem = ({ item, index }) => {
        // console.log('item', item.medicalImage);
        return (
            <View style={[styles.trendingBoxStyle, { marginStart: 15, marginEnd: index == this.state.frequentlyBoughtTogetherData.length - 1 ? 15 : 0 }]}>
                <Image style={{ width: '100%', borderRadius: 10 }} source={item.medicalImage} ></Image>
                <View style={{ marginStart: 8 }}>
                    <Text style={styles.medicineName}>{item.medicineName}</Text>
                    <Text style={styles.typeName}>{item.typeName}</Text>
                    <Text style={styles.medicineDesc}>{item.medicineDesc}</Text>
                    <View style={{ opacity: 0.1, backgroundColor: colors.lineColor, height: StyleSheet.hairlineWidth, width: (constants.screenWidth - 95) / 2, borderWidth: 0.6, color: colors.placeholderColor, marginVertical: 5 }}></View>

                    <View style={{ paddingBottom: 5, marginStart: 1, marginEnd: 22, marginTop: 3, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.packingStyle}>{'Packing'}</Text>
                            <Text style={styles.packingDataStyle}>{item.packingData}</Text>
                        </View>
                        <View>
                            <Text style={styles.packingStyle}>{'MRP'}</Text>
                            <Text style={styles.packingDataStyle}>{item.mrpData}</Text>
                        </View>
                        <View>
                            <Text style={styles.rateStyle}>{'Rate'}</Text>
                            <Text style={styles.rateDataStyle}>{item.rateData}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    SimilarProductsRenderItem = ({ item, index }) => {
        return (
            <View style={[styles.offerBoxStyle, { marginStart: 15, marginEnd: index == this.state.SimilarProductsRenderItem - 1 ? 15 : 0 }]}>
                <Image style={{ width: '100%', borderRadius: 10 }} source={item.medicalImage} ></Image>
                <View style={{ marginStart: 8 }}>
                    <Text style={styles.medicineName}>{item.medicineName}</Text>
                    <Text style={styles.typeName}>{item.typeName}</Text>
                    <Text style={styles.medicineDesc}>{item.medicineDesc}</Text>
                    <View style={{ opacity: 0.1, backgroundColor: colors.lineColor, height: StyleSheet.hairlineWidth, width: (constants.screenWidth - 95) / 2, borderWidth: 0.6, color: colors.placeholderColor, marginVertical: 5 }}></View>

                    <View style={{ paddingBottom: 5, marginStart: 1, marginEnd: 22, marginTop: 3, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.packingStyle}>{'Packing'}</Text>
                            <Text style={styles.packingDataStyle}>{item.packingData}</Text>
                        </View>
                        <View>
                            <Text style={styles.packingStyle}>{'MRP'}</Text>
                            <Text style={styles.packingDataStyle}>{item.mrpData}</Text>
                        </View>
                        <View>
                            <Text style={styles.rateStyle}>{'Rate'}</Text>
                            <Text style={styles.rateDataStyle}>{item.rateData}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    addRemoveProductFromCart = (item, index, type) => {
        // let product = this.state.items;
        // product.map((p) => {
        //     if (p.id == item.id) {
        //         if (type == 'add' && item.qty < item.max_qty) {
        //             item.qty = item.qty + 1;
        //         } else if (type == 'minus') {
        //             item.qty = item.qty - 1;
        //         }
        //     }
        // })
        // this.setState({ items: product, selectedIndex: index }, async () => {
        //     let reqData = {
        //         "items": [
        //             {
        //                 "item_id": item.id
        //                 , "qty": item.qty
        //             }
        //         ]

        //     }
        //     this.setState({ loading: true })
        //     let response = await Request.post(`${constants.apiCartVersion}/update`, reqData);
        //     response.data.items.map((items) => {
        //         if (item.id == items.id) {
        //             item.row_total = items.row_total
        //         }

        //     })
        //     this.setState({
        //         loading: false,
        //         sub_total: response.data.sub_total,
        //         grand_total: response.data.grand_total
        //     })
    }


    onPressViewAll = (title) => {
        if (title == 'Offers') {
            this.props.navigation.navigate('Offers')
            this.setState({ visible: false })
        }
        else if (title == 'Trending') {
            this.props.navigation.navigate('ViewAllProducts', { products: this.state.homeDetailsArray.trending_products, title: title, isFromTrending: true })
            this.setState({ visible: false })
        }
        else if (title == 'New Launches') {
            this.props.navigation.navigate('ViewAllProducts', { products: this.state.homeDetailsArray.new_launches, title: title, isFromNewLaunch: true })
            this.setState({ visible: false })
        }
        else if (title == 'Past Orders') {
            this.props.navigation.navigate('ViewAllProducts', { products: this.state.homeDetailsArray.orders_products, title: title, isFromPastOrders: true })
            this.setState({ visible: false })
        }
    };

    render() {
        let statusBarheight = StatusBar.currentHeight ? StatusBar.currentHeight : 0

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView
                    // edges={constants.isIOS ? ['left'] : ['top']} 
                    style={{ backgroundColor: colors.Orange }} />

                <View style={styles.container}>
                    <StatusBar
                        translucent
                        barStyle={'light-content'}
                        backgroundColor={'transparent'}
                    />
                    <NavigationEvents onWillFocus={async () => {
                        this.getHomeScreenData()
                        this.setState({ visible: true, itemCount: await StorageService.getItem('ItemCount') }, () => {
                        })
                    }}
                    />

                    <View style={{ backgroundColor: colors.Orange, width: '100%', height: 50 + statusBarheight, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: statusBarheight, width: constants.screenWidth - 30 }} >
                            <TouchableOpacity style={{}} onPress={() => {
                                this.setState({ visible: false })
                                this.props.navigation.goBack()
                                // this.props.navigation.dispatch(DrawerActions.openDrawer())
                            }}>
                                <Image source={Images.backIcon} width={14} height={24} />
                            </TouchableOpacity>
                            <View style={{ height: 35, alignSelf: 'center', width: (constants.screenWidth) / 1.7, }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchResult')}>
                                    <Input
                                        value={this.state.search}
                                        onChangeText={(search) => {
                                            this.setState({ search: search.replace(/\s\s+/g, ' ') })
                                        }}
                                        mainStyle={{ backgroundColor: colors.white, borderRadius: 6, width: (constants.screenWidth) / 1.7, height: 35, marginHorizontal: 0 }}
                                        style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.placeholderColor, height: 40, width: (constants.screenWidth) / 2.41, flex: 0, textAlign: 'auto', textAlignVertical: 'auto' }}
                                        rightIconStyle={{}}
                                        editable={false}
                                        placeholder='Search by product, brand and more'
                                        rightIcon={Images.searchIcon}
                                        // editable={false}
                                        returnKeyType='search'
                                        onSubmitEditing={() => {
                                            if (this.state.search != '') {
                                                this.props.navigation.push('SearchResult', { searchKeyword: this.state.search ? this.state.search.trim() : this.state.search })
                                                this.setState({ visible: false })
                                            }
                                        }}
                                        onPressSearch={() => {
                                            if (this.state.search != '') {
                                                this.props.navigation.push('SearchResult', { searchKeyword: this.state.search ? this.state.search.trim() : this.state.search })
                                                this.setState({ visible: false })
                                            }
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Cart', { fromHomeScreen: true })
                                this.setState({ visible: false })
                            }} style={{}}>
                                <Image source={Images.whiteCart} width={25} height={25} />
                                <View
                                    style={{ alignItems: 'center', justifyContent: 'center', height: 18, width: 18, position: 'absolute', bottom: 14, right: -10, borderRadius: 9, backgroundColor: colors.white, zIndex: 99 }}
                                >
                                    <Text
                                        style={{ color: colors.black, textAlign: 'center', fontSize: 10, alignItems: 'center' }}>
                                        {this.state.homeDetailsArray.cart_item_count > 0 ? this.state.homeDetailsArray.cart_item_count : ''}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <View style={{ flexDirection: 'row', backgroundColor: colors.Orange, width: '100%', height: '10%' }}>

                        <TouchableOpacity style={{ zIndex: 1, position: 'absolute', top: 15, left: 20, }} onPress={() => {
                            this.setState({ visible: false })
                            this.props.navigation.goBack()
                        }}>
                            <Image source={Images.backIcon} width={20} height={20} />
                        </TouchableOpacity>
                        <Input
                            value={this.state.search}
                            onChangeText={(search) => {
                                this.setState({ search: search.replace(/\s\s+/g, ' ') })
                            }}
                            mainStyle={{ borderRadius: 6, width: constants.screenWidth / 1 - 125, height: 35, zIndex: 1, position: 'absolute', top: 10, left: 30, }}
                            style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.placeholderColor }}
                            rightIconStyle={{ marginRight: 5, }}
                            placeholder='Search by product, brand and more'
                            rightIcon={Images.searchIcon}
                            returnKeyType='search'
                            onSubmitEditing={() => {
                                if (this.state.search != '') {
                                    this.props.navigation.push('SearchResult', { searchKeyword: this.state.search ? this.state.search.trim() : this.state.search })
                                    this.setState({ visible: false })
                                }
                            }}
                            onPressSearch={() => {
                                if (this.state.search != '') {
                                    this.props.navigation.push('SearchResult', { searchKeyword: this.state.search ? this.state.search.trim() : this.state.search })
                                    this.setState({ visible: false })
                                }
                            }}
                        />

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Cart', { fromHomeScreen: true })
                            this.setState({ visible: false })
                        }} style={{ position: 'absolute', zIndex: 99, top: 15, right: 25, }}>
                            <Image source={Images.whiteCart} width={25} height={25} />
                            <View
                                style={{ alignItems: 'center', justifyContent: 'center', height: 18, width: 18, position: 'absolute', bottom: 14, right: -10, borderRadius: 9, backgroundColor: colors.white, zIndex: 99 }}
                            >
                                <Text
                                    style={{ color: colors.black, textAlign: 'center', fontSize: 10, alignItems: 'center' }}>
                                    {this.state.homeDetailsArray.cart_item_count > 0 ? this.state.homeDetailsArray.cart_item_count : ''}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}

                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <FlatList
                            style={{ height: 200, width: '100%', }}
                            // data={this.state.homeDetailsArray.banners}
                            data={this.state.DataArray}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => (index.toString())}
                            horizontal
                            pagingEnabled={true}
                            bounces={false}
                            onEndReachedThreshold={0.9}
                            onScroll={(event) => {
                                // setselectedIndex(Math.round(event.nativeEvent.contentOffset.x / deviceWidth));
                                this.setState({
                                    selectedIndex: Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
                                })
                            }}
                            showsHorizontalScrollIndicator={false}
                        />

                        <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', top: 180, bottom: 0 }}>
                            {this.state.DataArray && this.state.DataArray.map((itemObj, index) => {
                                return (<View style={{
                                    marginLeft: 10,
                                    height: 10,
                                    width: 10,
                                    borderRadius: 10 / 2,
                                    // marginBottom:30,
                                    opacity: this.state.selectedIndex == index ? 1 : 0.5,
                                    backgroundColor: this.state.selectedIndex == index ? colors.dotColor : colors.white
                                }} />)
                            })}
                        </View>

                        {this.state.storedata ?
                            <View style={{ backgroundColor: colors.white, paddingBottom: 10 }}>
                                <View style={{ marginTop: 17, marginHorizontal: 15, }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Image style={{ height: 18, width: 18 }} source={Images.LogoMedicine}></Image>
                                                <Text style={styles.medicineNameStyle}>{'PRIMA'}</Text>
                                            </View>
                                            <Text style={styles.nameStyle} >{'Acrimol'}</Text>
                                        </View>

                                        <View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.cancelPrice} >{'₹.120'}</Text>
                                                <Text style={styles.priceStyle} >{'₹.108'}</Text>
                                            </View>
                                            <Text style={styles.stockStyles} >{'Stock Available'}</Text>
                                        </View>
                                    </View>
                                    {
                                        this.state.storedata ?
                                            < View style={{ width: (constants.screenWidth) / 1.5, marginTop: 6 }}>
                                                <Text numberOfLines={2} style={styles.descTextStyle}>{this.state.storedata.composition}</Text>
                                            </View>
                                            : null
                                    }


                                    <View style={{ marginTop: 9, flexDirection: 'row', justifyContent: 'space-between', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                                        <Image source={Images.tableticon} />

                                        <View style={{ flexDirection: 'row', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                                            <Text style={styles.tableticonStyle} >{this.state.storedata.form}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                                <Text style={styles.tabletSize} >{this.state.storedata.packingType}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                                                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number, }} />
                                                <Text style={styles.medcinenameStyle}>{this.state.storedata.name}</Text>
                                            </View>
                                        </View>


                                    </View>
                                    <View style={[styles.miniborderline, { marginTop: 10, width: '100%' }]}></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: (constants.screenWidth) / 1.4, justifyContent: 'space-between', marginVertical: 15 }}>
                                        <Text style={styles.mrpStyle} >{'MRP'}</Text>
                                        <Text style={styles.CurrancyStyle}>₹.{this.state.storedata.mrp}</Text>
                                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor, }} />
                                        <Text style={[styles.mrpStyle, { marginStart: 10 }]}>{'PTS'}</Text>
                                        <Text style={styles.CurrancyStyle}>₹.{this.state.storedata.pts}</Text>
                                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor }} />
                                        <Text style={[styles.mrpStyle, { marginStart: 10 }]}>{'PTR'}</Text>
                                        <Text style={styles.CurrancyStyle}>₹.{this.state.storedata.ptr}</Text>
                                    </View>
                                    <View style={styles.miniborderline}></View>

                                    <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                        <Text style={styles.minitextStyle} >{'Minimum Order quantity :'}</Text>
                                        <Text style={styles.number}>{'10'}</Text>
                                    </View>
                                </View>
                            </View>
                            : null
                        }

                        <View style={styles.compositiontextStyle}>

                            {this.state.isReadMore ?
                                <View style={{}}>
                                    <Text style={styles.TextTabletStyle}>{'Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.'}
                                        <TouchableOpacity onPress={() => this.setState({ isReadMore: !this.state.isReadMore })}>
                                            <View style={{ height: 16 }}>
                                                <Text style={{ fontSize: 12, color: colors.Orange, fontFamily: fonts.Helvetica, }}>{' Read Less...'}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                                :
                                <View style={{}}>
                                    <Text style={[styles.TextTabletStyle]} numberOfLines={3} >{'Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.'} </Text>
                                    <TouchableOpacity onPress={() => this.setState({ isReadMore: !this.state.isReadMore })}>
                                        <View style={{ backgroundColor: colors.backgroundColor, position: 'absolute', right: 0, bottom: 0, }}>
                                            <Text style={{ fontSize: 12, color: colors.Orange, fontFamily: fonts.Helvetica, }}>{' Read More...'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            {/* <Text style={styles.TextTabletStyle} numberOfLines={3}>{'Ibuprofen tablets contain the active ingredient Ibuprofen, which is (±) -2 - ( p - isobutylphenyl) propionic acid. Ibuprofen is a white powder with a melting Read More… is very slightly soluble in water(<1 mg/mL) and readily soluble in organic solvents such as ethanol and acetone.'}</Text> */}

                            <Text style={styles.compositionStyle} >{'Composition'}</Text>
                            {this.state.isReadMoreCom && this.state.storedata ?
                                <View style={{}}>
                                        <Text style={styles.TextTabletStyle}>
                                            
                                     
                                            <TouchableOpacity onPress={() => this.setState({ isReadMoreCom: !this.state.isReadMoreCom })}>
                                                <View style={{ height: 12 }}>
                                                    <Text style={{ fontSize: 12, color: colors.Orange, fontFamily: fonts.Helvetica, }}>{' Read Less...'}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Text>
                                </View>
                                :
                                <View style={{}}>
                                    <Text style={styles.TextTabletStyle} numberOfLines={3}>{this.state.storedata.composition}</Text>
                                    <TouchableOpacity onPress={() => this.setState({ isReadMoreCom: !this.state.isReadMoreCom })}>
                                        <View style={{ backgroundColor: colors.backgroundColor, position: 'absolute', right: 0, bottom: 0 }}>
                                            <Text style={{ fontSize: 12, color: colors.Orange, fontFamily: fonts.Helvetica, }}>{' Read More...'}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>


                        <View style={{ width: '100%', backgroundColor: colors.white, height: 115, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginStart: 17 }}>
                                <Image style={{ marginStart: 30 }} source={Images.healthsuppliments}></Image>
                                <Image style={{ marginLeft: 2 }} source={Images.securepaymenticon}></Image>
                                <Image style={{ marginEnd: 5 }} source={Images.CustomerSupporticon}></Image>
                            </View>

                            <View style={{ marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                                <Text style={styles.genuine}>{'100% genuine\nproducts'}</Text>
                                <Text style={styles.genuine} >{'Safe & Secure\npayments'}</Text>
                                <Text style={styles.genuine}>{'Customer\nSupport'}</Text>
                            </View>
                        </View>

                        <FlatList
                            data={this.state.DescriptionData}
                            renderItem={(item, index) => this.DescriptionDataRenderItem(item, index)}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={styles.viewAllStyleWrap}>
                            <Text style={styles.maintitleStyle}>{'Frequently Bought Together'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <View style={{}}>
                            <FlatList
                                data={this.state.frequentlyBoughtTogetherData}
                                renderItem={(item, index) => this.frequentlyBoughtTogetherRenderItem(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                bounces={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                            />
                        </View>

                        <View style={styles.viewAllStyleWrap}>
                            <Text style={styles.maintitleStyle}>{'Similar Products'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <FlatList
                            data={this.state.SimilarProducts}
                            renderItem={(item, index) => this.SimilarProductsRenderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                        />

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.maintitleStyle}>{'Other information'}</Text>
                            <Text style={{ marginHorizontal: 15, marginTop: 12, fontFamily: fonts.Helvetica, fontSize: 14, color: colors.smallFont }}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since'}</Text>
                        </View>

                        <View style={{ marginTop: 17 }}>
                            <Text style={styles.maintitleStyle}>{'Storage Conllection'}</Text>
                            <Text style={{ paddingBottom: 20, marginHorizontal: 15, marginTop: 12, fontFamily: fonts.Helvetica, fontSize: 14, color: colors.smallFont }}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since'}</Text>
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: 74, backgroundColor: colors.Orange, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ marginStart: 20, flexDirection: 'row', }}>
                                    <Image source={Images.shareicon}></Image>
                                    <View style={{ flexDirection: 'row', marginStart: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => this.addRemoveProductFromCart(item, index, 'minus')}
                                            // disabled={item.qty == item.min_qty ? true : false}
                                            activeOpacity={0.8}>
                                            <Image style={{ marginRight: -1 }}
                                                resizeMode={'cover'}
                                                source={Images.minusIcon} />
                                        </TouchableOpacity>
                                        <Text
                                            style={styles.productCount}>
                                            {'1'}
                                            {/* {item.qty} */}
                                        </Text>
                                        <TouchableOpacity
                                            // disabled={item.max_qty == item.qty ? true : false}
                                            onPress={() => this.addRemoveProductFromCart(item, index, 'add')}
                                            activeOpacity={0.8}>
                                            <Image style={{ marginLeft: -1 }}
                                                resizeMode='cover'
                                                source={Images.plusIcon} />
                                        </TouchableOpacity>
                                        {/* <Image source={Images.minusIcon}></Image>
                                        <Text style={styles.numberStyle}>{'1'}</Text>
                                        <Image source={Images.plusIcon}></Image> */}
                                    </View>
                                </View>

                                <View style={{ marginEnd: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: 124, height: 34, borderRadius: 6, backgroundColor: colors.white }}>
                                    <Image style={{ marginRight: 5 }} source={Images.carticon}></Image>
                                    <Text style={styles.addtoTextStyle}>{'Add to Cart'}</Text>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View >
                {/* {this.state.loading ? <Loader /> : null} */}
                {/* </SafeAreaView > */}
            </View >
        );
    }

    onPressToast = () => {
        this.props.navigation.navigate('KYCRegister');
        this.setState({ visible: false })
    }

    onPressProduct = (item) => {
        this.props.navigation.navigate("Productdetails", { item })
        this.setState({ visible: false })
    }

}

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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
    cancelPrice: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor
    },

    stockStyles: {
        color: colors.lightgreen,
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        marginTop: 5
    },
    descTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.number
    },
    nsaidStyle: {
        color: colors.number,
        marginTop: 8,
        fontFamily: fonts.Helvetica,
        fontSize: 12,
    },
    tableticonStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        marginStart: 5
    },
    tabletSize: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        marginStart: 10
    },
    medcinenameStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        marginStart: 10
    },
    mrpStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        // marginRight:30
    },
    miniborderline: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
    },
    CurrancyStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
        // marginLeft:9
        // paddingRight:20
        paddingEnd: 15,
    },
    priceStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 14,
        color: colors.Orange,
        marginStart: 5
    },
    minitextStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor
    },
    number: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
        marginStart: 6
    },
    compositionStyle: {
        fontSize: 18,
        fontFamily: fonts.HelveBold,
        color: colors.black,
        marginVertical: 14
    },
    compositiontextStyle: {
        alignSelf: 'center',
        width: constants.screenWidth - 30,
        // borderWidth: 0.3,
        // borderColor: colors.placeholderColor,
        marginTop: 15,
        paddingBottom: 13,
        // borderWidth: 1,
        backgroundColor: 'F4F4F3',
        // borderColor: colors.placeholderColor,
        // shadowColor: colors.shadow,
        // elevation: 2,
        // shadowOffset: {
        //     width: 3,
        //     height: 2
        // },
        // shadowOpacity: 0.39,
    },
    genuine: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // width:constants.screenWidth- 50
    },
    Upperlinestyle: {
        width: constants.screenWidth - 40,
        borderWidth: 1,
        opacity: 0.2,
        color: colors.black,
        marginTop: 39
    },
    dropdownIconStyle: {
        marginTop: 7
    },
    Upperlinestyle: {
        width: constants.screenWidth - 40,
        borderWidth: 1,
        opacity: 0.2,
        color: colors.black,
        marginTop: 39
    },
    linestyle: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
        marginTop: 15
    },
    trendingBoxStyle: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        width: (constants.screenWidth - 45) / 2,
        borderRadius: moderateScale(10),
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderColor: colors.white,
        shadowColor: colors.shadow,
        elevation: 5,
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.39,
        shadowRadius: 10,
    },
    offerBoxStyle: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        width: (constants.screenWidth - 45) / 2,
        borderRadius: moderateScale(10),
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderColor: colors.white,
        shadowColor: colors.shadow,
        elevation: 5,
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.39,
        shadowRadius: 10,
    },
    medicineName: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.Orange,
        marginTop: 6
    },
    typeName: {
        fontSize: 16,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginTop: 4
    },
    medicineDesc: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,
        marginTop: 5
    },
    packingDataStyle: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.black
    },
    rateDataStyle: {
        fontSize: 14,
        fontFamily: fonts.HelveBold,
        color: colors.Orange,
        // marginEnd:15
    },
    packingStyle: {
        fontSize: 11,
        color: colors.placeholderColor,
        fontFamily: fonts.Helvetica
    },
    rateStyle: {
        fontSize: 11,
        color: colors.placeholderColor,
        fontFamily: fonts.Helvetica,
        // marginEnd:25
    },
    linearGradient: {
        flex: 1,
        width: null,
        height: null,
        zIndex: 0
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    maintitleStyle: {
        color: colors.fontBlack,
        fontSize: 18,
        fontFamily: fonts.HelveBold,
        marginLeft: 15,
        // marginBottom: 20,
    },
    addtoTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        alignItems: 'center',
        color: colors.black,
        marginLeft: 5
    },
    productCount: {
        marginVertical: 7,
        marginHorizontal: 5,
        // marginBottom: 70,
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 20
    },
    // numberStyle: {
    //     fontSize: 20,
    //     fontFamily: fonts.HelveBold,
    //     color: colors.white,
    //     marginHorizontal: 5,
    //     marginBottom: 20,

    // },
    viewAllButtonStyle: {
        marginRight: 15,
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.Orange,
        marginTop: 3,
    },
    viewAllStyleWrap: {
        marginTop: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: constants.screenWidth,
        // alignItems: 'flex-start',
        // alignSelf: 'flex-start',
    },
    TextTabletStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        marginTop: 12,
        color: colors.black,
    }
});
