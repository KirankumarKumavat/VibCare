import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, StatusBar, SectionList, ScrollView, TouchableOpacity, ImageBackground, Animated, Dimensions, Platform, } from 'react-native';
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

class Home extends Component {
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
            tredingData: [
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
            topCategoriesData: [],
            productTypesData: [
                {
                    id: 1,
                    categoriesImage: Images.urologyicon,
                    type: 'Tablets'
                },
                {
                    id: 2,
                    categoriesImage: Images.urologyicon,
                    type: 'Injection'
                },
                {
                    id: 3,
                    categoriesImage: Images.urologyicon,
                    type: 'Injection'
                },
                {
                    id: 4,
                    categoriesImage: Images.urologyicon,
                    type: 'Capsules'
                },
                {
                    id: 5,
                    categoriesImage: Images.urologyicon,
                    type: 'Capsules'
                }
            ],
            ourDivisionData: [
                {
                    id: 1,
                    medicalImage: Images.MedicalImage,
                    name: 'PRIMA',
                    value: '200'
                },
                {
                    id: 1,
                    medicalImage: Images.MedicalImage,
                    name: 'PRIMA',
                    value: '200'
                },
                {
                    id: 1,
                    medicalImage: Images.MedicalImage,
                    name: 'PRIMA',
                    value: '200'
                },
                {
                    id: 1,
                    medicalImage: Images.MedicalImage,
                    name: 'PRIMA',
                    value: '200'
                }
            ],
            offerData: [
                // {
                //     id: 1,
                //     medicalImage: Images.MedicineImage,
                //     medicineName: 'PRIMA',
                //     typeName: 'Acrimol',
                //     medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                //     packingData: '10x10',
                //     mrpData: '₹.800',
                //     rateData: '₹.16',
                //     offer: '10% OFF'
                // },
                // {
                //     id: 2,
                //     medicalImage: Images.MedicineImage,
                //     medicineName: 'PRIMA',
                //     typeName: 'Acrimol',
                //     medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                //     packingData: '10x10',
                //     mrpData: '₹.800',
                //     rateData: '₹.16',
                //     offer: '10% OFF'
                // },
            ],
            newLaunchesData: [
                // {
                //     id: 1,
                //     medicalImage: Images.MedicineImage,
                //     medicineName: 'PRIMA',
                //     typeName: 'Acrimol',
                //     medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                //     packingData: '10x10',
                //     mrpData: '₹.800',
                //     rateData: '₹.16'
                // },
                // {
                //     id: 2,
                //     medicalImage: Images.MedicineImage,
                //     medicineName: 'PRIMA',
                //     typeName: 'Acrimol',
                //     medicineDesc: 'Aceclofenac\n100mg, Paracetamo…',
                //     packingData: '10x10',
                //     mrpData: '₹.800',
                //     rateData: '₹.16'
                // },
            ],
            pastOrdersData: [
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
            ]
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
        this.getTopCategoriesData();
        this.getproductTypesData();
        this.getOurDivisionData();
        this.getOfferData();
        this.getNewLaunchesData();
        this.setState({ itemCount: await StorageService.getItem('ItemCount') })
    }

    componentWillUnmount = () => {
        this.setState({ visible: false })
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

    getTopCategoriesData = async () => {
        this.setState({ loading: true })
        let response = await Request.post('Items/GetAllTherapeutic');
        // console.log('responeGetAllTherapeuticttttt--->', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        // console.log('responseJson+++>', responseJson);

        this.setState({ topCategoriesData: responseJson })

        // let dataStore = (this.state.topCategoriesData)

        // console.log('dataStore--->', dataStore);

        // this.state.topCategoriesData
    }

    getproductTypesData = async () => {
        // console.log('getproductTypesDatagetproductTypesDatagetproductTypesData');
        this.setState({ loading: true })
        let response = await Request.post('Items/GetAllForms');
        // console.log('responeppp--->', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        // console.log('responseJsonpppp+++>', responseJson);

        this.setState({ productTypesData: responseJson })
    }


    getOurDivisionData = async () => {
        // console.log('getOurDivisionDatagetOurDivisionDatagetOurDivisionData');
        this.setState({ loading: true })
        let response = await Request.post('Items/GetAllDivision');
        // console.log('responedddd--->', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        // console.log('responseJsondddd+++>', responseJson);

        this.setState({ ourDivisionData: responseJson })
    }

    getOfferData = async () => {
        let params = {
            pageNumber: '1'
        }
        this.setState({ loading: true })
        let response = await Request.post('Items/Offers', params);
        // console.log('responeofferDataooooooooo',response);
        this.setState({ loading: false })
        let responseJson = await response.json();

        console.log('responseJsonofferData+++>', responseJson.list);
        this.setState({ offerData: responseJson.list })
    }


    getNewLaunchesData = async () => {
        let params = {
            pageNumber: 1
        }
        this.setState({ loading: true })
        let response = await Request.post('Items/NewLaunchItems', params);
        console.log('responeItems/NewLaunchItems--->', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        console.log('responseJsongetNewLaunchesData+++>', responseJson.list);

        this.setState({ newLaunchesData: responseJson.list })
        // console.log('responseJson.listresponseJson.list', responseJson.list);
    }

    // getHomeScreenData = async () => {
    //     var requestOptions = {
    //         method: 'POST',
    //         redirect: 'follow'
    //     };
    //     var responseData;
    //     await fetch("https://arthcrm.com:2087/Items/NewLaunchItems?pageNumber=1", requestOptions)
    //         .then(response => response.text())
    //         .then(result => {
    //             responseData = JSON.parse(result)
    //             console.log("response of new lunches ----", JSON.parse(result));
    //         })
    //         .catch(error => console.log('error', error));
    //     console.log("response gsgcjkszbgv-", responseData);

    //     let sectionData = [];
    //     sectionData.push(
    //         {
    //             title: 'New Launches', data: responseData.list,
    //         },
    //     );
    //     console.log("response data--->", responseData.list);
    //     this.setState({ sectionData }, async () => {

    //     });

    //     return
    //     this.setState({ loading: true });
    //     // let response = await Request.get(`${constants.apiVersion}/home`);
    //     // this.setState({ loading: false, homeDetailsArray: response.data.data }, () => {
    //     // });

    //     // let sectionData = [];
    //     sectionData.push(
    //         // {
    //         //     title: 'Trending', data: this.state.homeDetailsArray.trending_products,
    //         // },
    //         // {
    //         //     title: 'Top Categories', data: this.state.homeDetailsArray.categories,
    //         // },

    //         // {
    //         //     title: 'Offers', data: this.state.homeDetailsArray.offers,
    //         // },
    //         {
    //             title: 'New Launches', data: this.state.homeDetailsArray.new_launches,
    //         },
    //         // {
    //         //     title: 'Past Orders', data: this.state.homeDetailsArray.orders_products,
    //         // }
    //     );
    //     this.setState({ sectionData }, async () => {
    //     });
    // };

    trendingRenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailScreen')}>
                <View style={[styles.trendingBoxStyle, { marginStart: 15, marginEnd: index == this.state.tredingData.length - 1 ? 15 : 0 }]}>
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
            </TouchableOpacity>
        )
    }
    topCategorieRenderItem = ({ item, index }) => {
        return (
            <View style={[styles.categorieBoxStyle, { marginStart: 15, marginEnd: index == this.state.topCategoriesData.length - 1 ? 15 : 0 }]}>
                <View style={{}} >
                    <Image resizeMode='contain' style={{ marginTop: 12, height: 36, width: 36, }} source={{ uri: item.image }}></Image>
                </View>
                <Text numberOfLines={2} style={styles.typeStyle}>{item.name}</Text>
            </View>
        )
    }

    productTypesRenderItem = ({ item, index }) => {
        return (
            <View style={[styles.categorieBoxStyle, { marginStart: 15, marginEnd: index == this.state.productTypesData.length - 1 ? 15 : 0 }]}>
                <View style={{}} >
                    <Image resizeMode='contain' style={{ marginTop: 12, height: 36, width: 36, }} source={{ uri: item.image }}></Image>
                </View>
                <Text numberOfLines={2} style={styles.typeStyle}>{item.name}</Text>
            </View>
        )
    }

    ourDivisionRenderItem = ({ item, index }) => {
        return (
            <View style={[styles.ourDivisionsBoxStyle, { marginStart: 15, marginEnd: index == this.state.ourDivisionData.length - 1 ? 15 : 0 }]}>
                <Image resizeMode='contain' style={{ marginTop: 3, alignSelf: 'center', marginStart: 2, width: 95, height: 80, borderRadius: 8 }} source={{ uri: item.imzUrl }}></Image>
                <Text style={[styles.nameStyle, { marginStart: 7, marginTop: 7 }]}>{item.division}</Text>
                <View style={{ flexDirection: 'row', marginStart: 7, marginTop: 4, alignItems: 'center', paddingBottom: 7 }}>
                    <Text style={styles.packingStyle}>{'Products :'}</Text>
                    <Text style={[styles.packingDataStyle, { marginStart: 7 }]}>{item.itemsInDivison}</Text>
                </View>
            </View>
        )
    }

    offerRenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('Offers')} 
            >
                <View style={[styles.offerBoxStyle, { marginStart: 15, marginEnd: index == this.state.offerData.length - 1 ? 15 : 0 }]}>
                    <Image resizeMode='cover' style={{ alignSelf: 'center', width: '100%', height: 103, borderRadius: 10 }} source={{ uri: item.imageUrl }} ></Image>
                    <View style={{ position: 'absolute', bottom: 0, top: 10, right: 10, justifyContent: 'center', alignItems: 'center', width: 62, height: 20, backgroundColor: colors.offerColor, borderRadius: 4 }}>
                        <Text numberOfLines={1} style={{ fontSize: 12, fontFamily: fonts.HelveBold, color: colors.white }}>{item.offer}</Text>
                    </View>
                    <View style={{ marginStart: 8, marginBottom: 7 }}>
                        <Text numberOfLines={1} style={styles.medicineName}>{item.name}</Text>
                        <Text style={styles.typeName}>{item.form}</Text>
                        <Text numberOfLines={1.5} style={styles.medicineDesc}>{item.composition}</Text>
                        <View style={{ opacity: 0.1, backgroundColor: colors.lineColor, height: StyleSheet.hairlineWidth, width: (constants.screenWidth - 95) / 2, borderWidth: 0.6, color: colors.placeholderColor, marginVertical: 5 }}></View>

                        <View style={{ marginTop: 10, marginStart: 1, marginEnd: 22, marginTop: 3, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.packingStyle}>{'Packing'}</Text>
                                <Text style={styles.packingDataStyle}>{item.packingType}</Text>
                            </View>
                            <View>
                                <Text style={styles.packingStyle}>{'MRP'}</Text>
                                <Text style={styles.packingDataStyle}>{'₹'} {item.mrp}</Text>
                            </View>
                            <View>
                                <Text style={styles.rateStyle}>{'Rate'}</Text>
                                <Text style={styles.rateDataStyle}>{item.rateData}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    newLaunchesRenderItem = ({ item, index }) => {
        console.log('data coming');
        return (
            <View style={[styles.offerBoxStyle, { marginStart: 15, marginEnd: index == this.state.newLaunchesData.length - 1 ? 15 : 0 }]}>
                <Image resizeMode='cover' style={{ alignSelf: 'center', width: '100%', height: 103, borderRadius: 10 }} source={{ uri: item.imageUrl }} ></Image>
                <View style={{ marginStart: 8, marginBottom: 7 }}>
                    <Text numberOfLines={1} style={styles.medicineName}>{item.name}</Text>
                    <Text style={styles.typeName}>{item.form}</Text>
                    <Text numberOfLines={1.5} style={styles.medicineDesc}>{item.composition}</Text>
                    <View style={{ opacity: 0.1, backgroundColor: colors.lineColor, height: StyleSheet.hairlineWidth, width: (constants.screenWidth - 95) / 2, borderWidth: 0.6, color: colors.placeholderColor, marginVertical: 5 }}></View>

                    <View style={{ marginStart: 1, marginEnd: 22, marginTop: 3, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.packingStyle}>{'Packing'}</Text>
                            <Text style={styles.packingDataStyle}>{item.packingType}</Text>
                        </View>
                        <View>
                            <Text style={styles.packingStyle}>{'MRP'}</Text>
                            <Text style={styles.packingDataStyle}>{item.mrp}</Text>
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

    pastOrdersRenderItem = ({ item, index }) => {
        return (
            <View style={[styles.offerBoxStyle, { marginStart: 15, marginEnd: index == this.state.pastOrdersData.length - 1 ? 15 : 0 }]}>
                <Image style={{ width: '100%', borderRadius: 10 }} source={item.medicalImage} ></Image>
                <View style={{ marginStart: 8 }}>
                    <Text style={styles.medicineName}>{item.medicineName}</Text>
                    <Text style={styles.typeName}>{item.typeName}</Text>
                    <Text style={styles.medicineDesc}>{item.medicineDesc}</Text>
                    <View style={{ opacity: 0.1, backgroundColor: colors.lineColor, height: StyleSheet.hairlineWidth, width: (constants.screenWidth - 95) / 2, borderWidth: 0.6, color: colors.placeholderColor, marginVertical: 5 }}></View>

                    <View style={{ marginStart: 1, marginEnd: 22, marginTop: 3, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
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

    /**Section list of data */
    renderSectionItem = ({ item, index, section }) => {

        return (
            <View>
                {/* <NavigationEvents onWillFocus={() => this.getHomeScreenData()} /> */}
                {(section.title == 'Trending' || section.title == 'New Launches' || section.title == 'Past Orders') && index == 0 &&
                    <BoxView dataView data={section.data.slice(0, 2)} onPress={() => this.onPressProduct(item)} />
                }
                {section.title == 'Top Categories' && index == 0 &&
                    <View style={{ flex: 1, marginRight: 20, }}>
                        <FlatList
                            contentContainerStyle={styles.topCategoriesStyle}
                            data={section.data}
                            renderItem={(item, index) => this.renderTopCategoriesItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    // <BoxView data={section.data} renderItems={()=>this.renderTopCategoriesItem(item)}/>
                }

                {section.title == 'Product Types' && index == 0 &&
                    <View style={{ flex: 1, marginRight: 20, }}>
                        <FlatList
                            contentContainerStyle={styles.topCategoriesStyle}
                            data={section.data}
                            renderItem={(item, index) => this.renderTopProductItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    // <BoxView data={section.data} renderItems={()=>this.renderTopCategoriesItem(item)}/>
                }

                {this.state.homeDetailsArray.offers > 0 && section.title == 'Offers' && index == 0 &&
                    <BoxView onPress={this.onPressOffer} data={section.data} />
                }

                {/* {section.title == 'Offers' && index == 0 &&
                    <BoxView data={section.data} />
                } */}
            </View>)
    }

    renderTopCategoriesItem = ({ item, index }) => {
        return (
            // <>
            // {(index == 0 || index == 1 || index == 2 || index == 3 || index == 4) &&
            <TouchableOpacity
                // key={item.id}
                onPress={() => this.getProductsFromCategory({ item, index })}
                style={styles.topCategoriesStyleItem}>
                <Text style={styles.topCategoriesStyleItemText}
                // key={item.id}
                >
                    {/* {item.name} */}
                    {'ggggg'}
                </Text>
            </TouchableOpacity>
            // }
            // </>
        )
    }

    renderTopProductItem = ({ item, index }) => {
        return (<>{(index == 0 || index == 1 || index == 2 || index == 3 || index == 4) &&
            <TouchableOpacity
                // key={item.id}
                onPress={() => this.getProductsItem({ item, index })}
                style={styles.topCategoriesStyleItem}>
                <Text style={styles.topCategoriesStyleItemText}
                // key={item.id}
                >{item.name}</Text>
            </TouchableOpacity>}</>)
    }

    getProductsItem = async ({ item, index }) => {
        // this.setState({ loading: true })
        // let response = await Request.get(`${constants.apiVersion}/products?category_id=${item.id}`);
        // this.setState({ loading: false })
        // if (response.data.success == 1) {
        this.props.navigation.navigate('ViewAllProducts', { /* products: response.data.products, */ categories: true, categoryId: item.id, title: item.name })
        // this.setState({ visible: false })
        // }
    }


    getProductsFromCategory = async ({ item, index }) => {
        // this.setState({ loading: true })
        // let response = await Request.get(`${constants.apiVersion}/products?category_id=${item.id}`);
        // this.setState({ loading: false })
        // if (response.data.success == 1) {
        this.props.navigation.navigate('ViewAllProducts', { /* products: response.data.products, */ categories: true, categoryId: item.id, title: item.name })
        // this.setState({ visible: false })
        // }
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

    /**For dotted coding */
    // renderNav = (banners) => {
    //     if (this.state.homeDetailsArray && this.state.homeDetailsArray.banners && this.state.homeDetailsArray.banners.length != 0) {
    //         let position = Animated.divide(this.scrollX, constants.screenHeight / 2);
    //         return (
    //             <View style={{}}>
    //                 <View style={styles.renderDotView}>
    //                     {banners && banners.map((_, i) => {
    //                         let opacity = position.interpolate({
    //                             extrapolate: 'clamp',
    //                             outputRange: [1, 1, 1],
    //                             inputRange: [i - 1, i, i + 1],
    //                         });
    //                         var color = position.interpolate({
    //                             inputRange: [i - 1, i, i + 1],
    //                             outputRange: [colors.white, colors.Orange, colors.white]
    //                         });
    //                         return (
    //                             <Animated.View key={i} style={[styles.animationStyle, { opacity, backgroundColor: color }]} />
    //                         );
    //                     })}
    //                 </View>
    //             </View>
    //         );
    //     }
    //     //const { constants: { deviceX } } = this.props;
    //     // const { activeIndex } = this.state;
    // }


    render() {
        // console.log('hederheight', StatusBar.currentHeight)
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
                        backgroundColor={colors.Orange}
                    />
                    <NavigationEvents onWillFocus={async () => {
                        this.getHomeScreenData()
                        this.setState({ visible: true, itemCount: await StorageService.getItem('ItemCount') }, () => {
                        })
                    }} />

                    <View style={{ backgroundColor: colors.Orange, width: '100%', height: 50 + statusBarheight, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: statusBarheight, width: constants.screenWidth - 30 }} >
                            <TouchableOpacity style={{}} onPress={() => {
                                this.setState({ visible: false })
                                this.props.navigation.dispatch(DrawerActions.openDrawer())
                            }}>
                                <Image source={Images.list} width={28} height={20} />
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
                                        placeholder='Search by product, brand and more'
                                        rightIcon={Images.searchIcon}
                                        editable={false}
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

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('Notification', { fromHomeScreen: true })
                                this.setState({ visible: false })
                            }}
                                style={{}}
                            >
                                <Image source={Images.notifications} width={25} height={25} />
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

                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={{}}
                        contentContainerStyle={{ flexGrow: 1 }}
                    // style={{ backgroundColor: 'green' }}
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

                        <View style={styles.viewAllStyleWrap}>
                            <Text style={styles.maintitleStyle}>{'Trending'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <View style={{}}>
                            <FlatList
                                data={this.state.tredingData}
                                renderItem={(item, index) => this.trendingRenderItem(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                bounces={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                            />
                        </View>

                        <View style={styles.viewAllStyleWrap}>
                            <Text style={styles.maintitleStyle}>{'Top Categories'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <FlatList
                            data={this.state.topCategoriesData}
                            renderItem={(item, index) => this.topCategorieRenderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            style={{ marginTop: 15, }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        />

                        <View style={[styles.viewAllStyleWrap, { marginTop: 30 }]}>
                            <Text style={styles.maintitleStyle}>{'Product Types'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <FlatList
                            data={this.state.productTypesData}
                            renderItem={(item, index) => this.productTypesRenderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            style={{ marginTop: 15 }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        />
                        <View style={{ width: '100%', backgroundColor: colors.white, marginTop: 30, paddingBottom: 30 }}>
                            <View style={[styles.viewAllStyleWrap, { marginTop: 25 }]}>
                                <Text style={styles.maintitleStyle}>{'Our Division'}</Text>
                                <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                            </View>
                            <FlatList
                                data={this.state.ourDivisionData}
                                renderItem={(item, index) => this.ourDivisionRenderItem(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                bounces={false}
                                style={{ marginTop: 15 }}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                            />
                            <View style={[styles.viewAllStyleWrap, { marginTop: 25 }]}>
                                <Text style={styles.maintitleStyle}>{'Offers'}</Text>
                                <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                            </View>

                            <FlatList
                                data={this.state.offerData}
                                renderItem={(item, index) => this.offerRenderItem(item, index)}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                                bounces={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                            />
                        </View>

                        <View style={[styles.viewAllStyleWrap, { marginTop: 27 }]}>
                            <Text style={styles.maintitleStyle}>{'New Launches'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <FlatList
                            data={this.state.newLaunchesData}
                            renderItem={(item, index) => this.newLaunchesRenderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        />

                        <View style={[styles.viewAllStyleWrap, { marginTop: 27 }]}>
                            <Text style={styles.maintitleStyle}>{'Past Orders'}</Text>
                            <Text onPress={{}} style={styles.viewAllButtonStyle}>{'View All'}</Text>
                        </View>

                        <FlatList
                            data={this.state.pastOrdersData}
                            renderItem={(item, index) => this.pastOrdersRenderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            bounces={false}
                            style={{ marginBottom: 30 }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        />

                        {/* {this.state.loading == false && this.state.homeDetailsArray.kyc_status == false && <Toast
                            position={constants.isIOS ? -80 : -65}
                            shadow={false}
                            animation={true}
                            visible={this.state.visible}
                            hideOnPress={true}
                            backgroundColor={colors.textColor}
                            textStyle={styles.toastTextStyle}
                            containerStyle={styles.toastContainerStyle}
                            onPress={() => this.onPressToast()}
                        >
                            {constants.KYCPending}
                            <Text
                                // onPress={() => this.onPressToast()}
                                style={styles.clickHereTExtInToastStyle}>
                                {'Click Here'}
                            </Text>
                        </Toast>} */}

                        {/* {this.state.loading == false && this.state.homeDetailsArray.kyc_rejected == 1 && <Toast
                            position={constants.isIOS ? -80 : -65}
                            shadow={false}
                            animation={true}
                            visible={this.state.visible}
                            hideOnPress={true}
                            backgroundColor={colors.textColor}
                            textStyle={styles.toastTextStyle}
                            containerStyle={styles.toastContainerStyle}
                            onPress={() => this.onPressToast()}
                        >
                            {constants.KYCRejected}
                            <Text
                                // onPress={() => this.onPressToast()}
                                style={styles.clickHereTExtInToastStyle}>
                                {'Click Here'}
                            </Text>
                        </Toast>} */}



                        {/* <DropDownPicker imageSource={Images.downArrow} /> */}
                        {/* <View style={styles.firstView}>
                        <Text style={styles.titleStyle}>
                            {staticText.projectTitle}
                        </Text>
                    </View> */}

                    </KeyboardAwareScrollView>
                </View>
                {/* {this.state.loading ? <Loader /> : null} */}


            </View>
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

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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
        width: (constants.screenWidth - 46) / 2,
        borderRadius: moderateScale(10),
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderColor: colors.white,
        shadowColor: colors.Lightgray,
        elevation: 5,
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.39,
        shadowRadius: 10,
    },
    ourDivisionsBoxStyle: {
        marginTop: 10,
        marginBottom: 10,
        // flex: 1,
        width: (constants.screenWidth - 68) / 3,
        borderRadius: moderateScale(8),
        // color: colors.white,
        // borderWidth: 0.1,
        backgroundColor: colors.white,
        // borderColor: colors.shadow,
        shadowColor: colors.black,
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.40,
        shadowRadius: 3,
    },
    categorieBoxStyle: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: (constants.screenWidth - 40) / 4,
        borderRadius: moderateScale(10),
        backgroundColor: colors.white,
        // borderWidth: 1,
        borderColor: colors.white,
        shadowColor: colors.shadow,
        elevation: 3,
        shadowOffset: {
            width: 3,
            height: 2
        },
        shadowOpacity: 0.39,
        shadowRadius: 10,
        marginTop: 5,
        marginBottom: 5
        // backgroundColor:'red'
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
        // alignSelf:'center',
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,
        marginTop: 5,
        width: (constants.screenWidth / 2) - 50
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
        // textAlign:'center',

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
    renderDotView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor:'purple'
    },
    typeStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,
        marginTop: 15,
        padding: 4,
        marginBottom: 7,
        width: '100%',
        textAlign: 'center',
    },
    nameStyle: {
        color: colors.Orange,
        fontFamily: fonts.Helvetica,
        fontSize: 14
    },
    animationStyle: {
        width: 10,
        margin: 3,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.Orange,
        bottom: 40
    },
    renderSingleDot: {
        margin: 10,
        backgroundColor: colors.white,
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
    topCategoriesStyle: {
        // justifyContent: 'space-evenly',
        // alignSelf: 'center',
        // paddingVertical: 20,
        marginHorizontal: 15,
        paddingRight: 10,
        // width:'100%',
        // flex: 1
        // backgroundColor: 'pink',
    },
    topCategoriesStyleItem: {

        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 3,
            width: 0,
        },
        borderRadius: 6,
        backgroundColor: colors.white,
        marginHorizontal: 8,
        /* height: 28, */
        padding: 10,

    },
    topCategoriesStyleItemText: {
        color: colors.placeholderColor,
        fontSize: 14,
        fontFamily: fonts.Muli,
    },
    maintitleStyle: {
        color: colors.fontBlack,
        fontSize: 18,
        fontFamily: fonts.HelveBold,
        marginLeft: 15,
        // marginBottom: 20,
    },
    SectionListStyle: { marginTop: 15, },
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
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    toastTextStyle: {
        fontSize: 16,
        fontFamily: fonts.MuliSemiBold,
    },
    toastContainerStyle: { paddingHorizontal: 30, zIndex: 9999 },
    clickHereTExtInToastStyle: {
        fontSize: 16, fontFamily: fonts.MuliSemiBold,
        textDecorationLine: 'underline',
    },

});
