import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors, constants, staticText, common } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { moderateScale, verticalScale, scale } from '../utilities';

import Request from '../api/request';
import { Loader } from '../components/Loader';
import { DrawerActions } from '@react-navigation/native';

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            offers: [],
            offersData: [
                {
                    id: 1,
                    imageLogo: Images.LogoMedicine,
                    MedicineImageac: Images.MedicineImageac,
                    medcineName: 'PRIMA',
                    brandname: 'Apofec',
                    medicineDescription: 'Aceclofenac 100mg + Paracetamol\n325mg serratiopeptidase…',
                    nsaidsName: 'NSAIDs',
                    tabletIcon: Images.tableticon,
                    tabletType: 'Tablet',
                    tabletSize: '10x10',
                    type: 'Alu Alu',
                    mrpValue: '₹.320',
                    ptsValue: '₹.200',
                    ptrValue: '₹.250',
                    MinimumOrderquantityValue: '10',
                    finalValue: '₹.120',
                    discValue: '₹.108',
                    offer: '10% OFF'

                },
                {
                    id: 2,
                    imageLogo: Images.LogoMedicine,
                    MedicineImageac: Images.MedicineImageac,
                    medcineName: 'PRIMA',
                    brandname: 'Apofec',
                    medicineDescription: 'Aceclofenac 100mg + Paracetamol\n325mg serratiopeptidase…',
                    nsaidsName: 'NSAIDs',
                    tabletIcon: Images.tableticon,
                    tabletType: 'Tablet',
                    tabletSize: '10x10',
                    type: 'Alu Alu',
                    mrpValue: '₹.320',
                    ptsValue: '₹.200',
                    ptrValue: '₹.250',
                    MinimumOrderquantityValue: '10',
                    finalValue: '₹.120',
                    discValue: '₹.108',
                    offer: '10% OFF'
                },
                {
                    id: 3,
                    imageLogo: Images.LogoMedicine,
                    MedicineImageac: Images.MedicineImageac,
                    medcineName: 'PRIMA',
                    brandname: 'Apofec',
                    medicineDescription: 'Aceclofenac 100mg + Paracetamol\n325mg serratiopeptidase…',
                    nsaidsName: 'NSAIDs',
                    tabletIcon: Images.tableticon,
                    tabletType: 'Tablet',
                    tabletSize: '10x10',
                    type: 'Alu Alu',
                    mrpValue: '₹.320',
                    ptsValue: '₹.200',
                    ptrValue: '₹.250',
                    MinimumOrderquantityValue: '10',
                    finalValue: '₹.120',
                    discValue: '₹.108',
                    offer: '10% OFF'
                }
            ],
        };
    }

    componentDidMount = () => {
        this.getOffers();
    }

    getOffers = async () => {
        this.setState({ loading: true });
        let response = await Request.get(`${constants.apiVersion}/offer`);
        this.setState({ loading: false, offers: response.data.offers.offers }, () => {
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}  backIcon={Images.list} backButton /* rightIcon */
                    middleTextStyle={styles.middleTextStyle}
                    middleText={staticText.Offers} />
                <View style={{ paddingTop: 15 }} >
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center', paddingBottom: 70 }}
                        // data={this.props.route.params.productsArray && !this.props.route.params.backPressed && !this.state.sortClicked ? this.props.route.params.productsArray : this.state.products}
                        data={this.state.offersData}
                        renderItem={(item, index) => this.renderItem(item, index)}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => index.toString()}
                        bounces={false}
                        styles={{}}
                        showsVerticalScrollIndicator={false}
                        // extraData={this.state}
                        ListEmptyComponent={() => !this.state.loading ? this.ListEmptyComponent() : null}
                        onEndReached={this.loadMoreData}
                        // onEndReachedThreshold={0.3}
                        ListFooterComponent={this.renderFooter}
                    // initialNumToRender={10}
                    />
                </View>

                {/* <FlatList
                    contentContainerStyle={styles.contentFlatlistContainerStyle}
                    data={this.state.offers}
                    renderItem={(item, index) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={false}
                    bounces={false}
                    extraData={this.state.offers}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={() => !this.state.loading ? this.ListEmptyComponent() : null}
                /> */}
                {/* {this.state.loading ? <Loader /> : null} */}
            </View>
        );
    }

    renderItem = ({ item, index }) => {
        console.log("item -----", item);
        return (
            <View style={[styles.mainBoxView, {}]}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <View style={{ flexDirection: 'row',}}> */}

                    <View style={{ marginStart: 18, marginTop: 7, }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 18, width: 18 }} source={item.imageLogo} />
                            <Text style={styles.medicineNameStyle}>{item.medcineName}</Text>
                        </View>

                        <Text style={styles.nameStyle}>{item.brandname}</Text>

                        <View style={{ width: (constants.screenWidth) / 2, marginTop: 6 }}>
                            <Text numberOfLines={2} style={styles.descTextStyle}>{item.medicineDescription}</Text>
                        </View>

                        <Text style={styles.nsaidStyle}>{item.nsaidsName}</Text>

                        <View style={{ marginTop: 9, flexDirection: 'row', justifyContent: 'space-between', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                            <Image source={item.tabletIcon} />
                            <View style={{ flexDirection: 'row', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                                <Text style={styles.tableticonStyle} >{item.tabletType}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                    <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.number, marginStart: 10 }} >{item.tabletSize}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number, }} />
                                    <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.number, marginStart: 10 }}>{item.type}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: (constants.screenWidth - 80) / 2 }}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <Text style={styles.mrpStyle} >{'MRP'}</Text>
                                        <View style={{ marginStart: 15, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor, }} />
                                    </View>
                                    <Text style={styles.CurrancyStyle}>{item.mrpValue}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <Text style={[styles.mrpStyle,]}>{'PTS'}</Text>
                                        <View style={{ marginStart: 15, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor }} />
                                    </View>
                                    <Text style={styles.CurrancyStyle}>{item.ptsValue}</Text>
                                </View>

                                <View>
                                    <Text style={[styles.mrpStyle,]}>{'PTR'}</Text>
                                    <Text style={styles.CurrancyStyle}>{item.ptrValue}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, marginStart: 20, }}>
                        <Image style={{ height: 110, width: (constants.screenWidth - 80) / 3, borderRadius: 12 }} source={item.MedicineImageac} />
                        <View style={{ position: 'absolute', bottom: 0, top: 5, right: 5, justifyContent: 'center', alignItems: 'center', width: 62, height: 20, backgroundColor: colors.offerColor, borderRadius: 4 }}>
                            <Text style={{ fontSize: 12, fontFamily: fonts.HelveBold, color: colors.white }}>{item.offer}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 35, alignSelf: 'flex-end' }}>
                            <Text style={styles.cancelPrice} >{item.finalValue}</Text>
                            <Text style={styles.discStyle} >{item.discValue}</Text>
                        </View>
                    </View>

                </View>
                <View style={{ marginStart: 18, width: constants.screenWidth - 70, alignItems: 'center', flexDirection: 'row', marginTop: 7, height: 26, backgroundColor: colors.lightBlue, borderRadius: 4 }}>
                    <Text style={styles.minitextStyle} >{'Minimum Order quantity :'}</Text>
                    <Text style={styles.number}>{item.MinimumOrderquantityValue}</Text>
                </View>
            </View>
        )
    }

    ListEmptyComponent = () => (
        <View style={{ alignItems: "center", flex: 1, justifyContent: 'center' }}>
            <Text style={styles.itemText}>{'List of offers will be displayed here.'}</Text>
        </View>
    )

    loadMoreData = ({ distanceFromEnd }) => {
        this.setState({ insideLoadMore: true })
        if (distanceFromEnd < 0) return;

        if (!this.state.onScrollLoading && this.state.has_more > 0
            && this.state.products.length != this.state.total_count) {
            this.setState({ page: this.state.page + 1, onScrollLoading: true, loading: false }, () => {
                if (!this.state.sortClicked) {
                    this.getSearchResult(null, true)
                }
                else {
                    this.sortingWithMoreData()
                }
            })
        }
        else {
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

    // renderItem = ({ item, index }) => {
    //     return (

    //         <TouchableOpacity
    //             key={item.link_id}
    //             style={styles.containerNew}
    //             activeOpacity={constants.activeOpacity}
    //         // onPress={onPress}
    //         >
    //             <Image
    //                 resizeMode={item.image && common.checkUrl(item.image) ? "stretch" : 'contain'}
    //                 source={item.image && common.checkUrl(item.image) ? { uri: item.image } : Images.placeholderImageSmall}
    //                 style={styles.imageStyle}
    //             />
    //         </TouchableOpacity>
    //     );
    // }
}

export default Offers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    mainBoxView: {
        //  height: 130,
        width: constants.screenWidth - 40,
        // width:350,
        paddingBottom: 10,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: colors.white,
        // marginHorizontal: 20,

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
    nsaidStyle: {
        color: colors.number,
        marginTop: 8,
        fontFamily: fonts.Helvetica,
        fontSize: 12,
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
    mrpStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
    },
    CurrancyStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
    },
    cancelPrice: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,

    },
    discStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        marginStart: 12,
        color: colors.Orange,
    },
    minitextStyle: {
        marginStart: 8,
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number
    },
    number: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
        marginStart: 5
    },
    itemText: {
        fontSize: moderateScale(15),
        color: colors.black,
        fontFamily: fonts.Helvetica
    },
    offerBoxStyle: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        width: (constants.screenWidth - 45) / 2,
        borderRadius: moderateScale(10),
        backgroundColor: colors.white,
        borderWidth: 1,
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

});
