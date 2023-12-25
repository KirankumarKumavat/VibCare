import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
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
import { verticalScale, moderateScale, scale, showTostMessage } from '../utilities';

class TitleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            address: '',
            gstNumber: '',
            phone: '',
            company: '',
            initializing: false,
            loading: false,
            flag: 1,
            titleData: [
                {
                    id: 1,
                    status: 'All',

                },
                {
                    id: 2,
                    status: 'Franchise'

                },
                {
                    id: 3,
                    status: 'Non Franchise'

                },
                {
                    id: 4,
                    status: 'Non Franchise'
                }
            ],
            allTitleData: [
                {
                    id: 1,
                    madicalImage: Images.medicineBox,
                    primaText: 'PRIMA',
                    generalVlaue: '300 Product',
                    monopolly: 'yes',
                    minOrderAmount: '₹.25000',
                    Suitable: 'Ethical Marketing'
                },
                {
                    id: 2,
                    madicalImage: Images.medicineBox,
                    primaText: 'PRIMA',
                    generalVlaue: '300 Product',
                    monopolly: 'yes',
                    minOrderAmount: '₹.25000',
                    Suitable: 'Ethical Marketing'
                },
                {
                    id: 3,
                    madicalImage: Images.medicineBox,
                    primaText: 'PRIMA',
                    generalVlaue: '300 Product',
                    monopolly: 'yes',
                    minOrderAmount: '₹.25000',
                    Suitable: 'Ethical Marketing'
                },
                {
                    id: 4,
                    madicalImage: Images.medicineBox,
                    primaText: 'PRIMA',
                    generalVlaue: '300 Product',
                    monopolly: 'yes',
                    minOrderAmount: '₹.25000',
                    Suitable: 'Ethical Marketing'
                },
                {
                    id: 5,
                    madicalImage: Images.medicineBox,
                    primaText: 'PRIMA',
                    generalVlaue: '300 Product',
                    monopolly: 'yes',
                    minOrderAmount: '₹.25000',
                    Suitable: 'Ethical Marketing'
                },
                {
                    id: 6,
                    madicalImage: Images.medicineBox,
                    primaText: 'PRIMA',
                    generalVlaue: '300 Product',
                    monopolly: 'yes',
                    minOrderAmount: '₹.25000',
                    Suitable: 'Ethical Marketing'
                }
            ]
        };
    }

    onPressLike = (item) => {
        this.setState({ flag: item.id })
    }

    titleDataRenderItem = ({ item, index }) => {
        return (
            <View style={{ paddingStart: 25 / 2, paddingEnd: 25 / 2, borderBottomWidth: item.id == this.state.flag ? 3 : 0, borderBottomColor: item.id == this.state.flag ? 'white' : 'white' }}>
                <TouchableHighlight
                    onPress={() => this.onPressLike(item)}
                    underlayColor={false}>
                    <Text
                        style={[styles.statusStyle, { color: item.id == this.state.flag ? 'white' : 'white' }]}
                    >{item.status}</Text>
                </TouchableHighlight>
            </View>
        )
    };

    ListEmptyComponent = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <Text style={styles.itemText}>{'Your cart is empty'}</Text>
        </View>
    )

    allTitleDataRenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TherapeuticSegment')}>
                <View style={styles.mainBoxView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginStart: 10, marginVertical: 20 }}>
                                <Image source={item.madicalImage}></Image>
                            </View>

                            <View style={{ marginStart: 12, justifyContent: 'space-around', marginTop: 10 }}>
                                <Text style={styles.primaStyle} >{item.primaText}</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.generalStyle}>{'General'}</Text>
                                    <View style={{ marginHorizontal: 7, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor }} />
                                    <Text style={styles.generalValueStyle} >{item.generalVlaue}</Text>
                                </View>

                                <Text style={styles.nsaidStyle} >{'NSAIDs'}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.nsaidStyle}>{'Monopoly :'}</Text>
                                    <Text style={styles.monopollyStyle} >{item.monopolly}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.nsaidStyle}>{'Min. Order :'}</Text>
                                    <Text style={styles.monopollyStyle} >{item.minOrderAmount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.nsaidStyle}>{'Suitable for :'}</Text>
                                    <Text style={styles.monopollyStyle} >{item.Suitable}</Text>
                                </View>

                            </View>

                        </View>
                        <View style={{ marginEnd: 10 }}>
                            <Image style={{}} source={Images.tickMark}></Image>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    componentDidMount = () => {
        this.getKYCData();
    };

    // onPressLike = ({item, index}) => {

    // }

    // titleDataRenderItem = ({ item, index }) => {
    //     return (
    //         <View style={{ marginStart: 25, marginEnd: 10 }}>
    //             <TouchableOpacity onPress={() => onPressLike()}>
    //                 <Text style={[styles.statusStyle, {}]}>{item.status}</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    getKYCData = async () => {
        this.setState({ loading: true })
        let response = await Request.get(`${constants.apiVersion}/contactus`);
        this.setState({ loading: false })
        this.setState({ email: response.data.contact_us[0].email, address: response.data.contact_us[0].address, gstNumber: response.data.contact_us[0].gst_number, company: response.data.contact_us[0].company, phone: response.data.contact_us[0].phone_number })
    }

    //todo Add phone number and name from api;
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView
                    edges={constants.isIOS ? ['left'] : ['top']}
                    style={{ backgroundColor: colors.Orange }}
                />
                <View style={{ backgroundColor: colors.Orange}}>
                    <Header
                        backButton
                        backIconStyle={styles.backIconStyle}
                        backIcon={Images.backIcon}
                        middleText={staticText.title}
                        middleTextStyle={styles.middleTextStyle}
                        mainStyle={styles.mainStyle}
                    />
                    <FlatList
                        data={this.state.titleData}
                        renderItem={(item, index) => this.titleDataRenderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        style={{}}
                        bounces={false}
                        scrollEnabled
                        contentContainerStyle={{ alignSelf: 'center' }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View style={{ marginTop: 30 }}>
                        <FlatList
                            // style={{ flex: 1 }}
                            // contentContainerStyle={{ flexGrow: 1, }}
                            data={this.state.allTitleData}
                            renderItem={(item, index) => this.allTitleDataRenderItem(item, index)}
                            keyExtractor={item => item.id}
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                            ListEmptyComponent={this.ListEmptyComponent}
                            initialNumToRender={10}
                        />
                    </View>

                    {/* {this.state.loading ? <Loader /> : null} */}

                </KeyboardAwareScrollView>
            </View>

        );
    }
}

export default TitleScreen;

const styles = StyleSheet.create({

    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    mainStyle: {
        paddingRight: 10,
        backgroundColor: colors.Orange,
        // height: constants.isIOS ? scale(110) : scale(70),
    },
    backIconStyle: {
        height: moderateScale(19),
        width: moderateScale(11),
        color: colors.textColor
    },
    statusStyle: {
        fontSize: 14,
        fontFamily: fonts.HelveBold,
        color: colors.white,
        paddingVertical: 7,
        // backgroundColor:'red'
        // marginTop:7
    },
    mainBoxView: {
        height: 150,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: colors.lightskycolor,
        marginHorizontal: 20,
        borderColor: colors.skycolor,
        borderWidth: 1,
    },
    primaStyle: {
        fontSize: 14,
        color: colors.Orange,
        fontFamily: fonts.HelveBold
    },
    generalStyle: {
        fontSize: 16,
        fontFamily: fonts.HelveBold,
        color: colors.black
    },
    generalValueStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black
    },
    nsaidStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.number
    },
    monopollyStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 12,
        color: colors.black
    }
});
