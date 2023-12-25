import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, FlatList, Modal, Image, TouchableOpacity } from 'react-native';
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

class MyAccount extends Component {
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
            childModalVisible: false,
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
        // this.getKYCData();
    };

    getKYCData = async () => {
        //     this.setState({ loading: true })
        //     let response = await Request.get(`${constants.apiVersion}/contactus`);
        //     this.setState({ loading: false })
        //     this.setState({ email: response.data.contact_us[0].email, address: response.data.contact_us[0].address, gstNumber: response.data.contact_us[0].gst_number, company: response.data.contact_us[0].company, phone: response.data.contact_us[0].phone_number })
    }
    //todo Add phone number and name from api;



    requestAddDivision = () => {
        this.props.navigation.navigate('AddDivision')
    }

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >

                <Header
                    onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                    middleText={'My Account'}
                    middleTextStyle={styles.middleTextStyle}
                />
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <View style={styles.firstView}>
                        {/* <View style={styles.infoView}> */}
                        <Text style={styles.headingStyle}>
                            {'Clair Wikinson'}
                            {/* {this.state.company} */}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Image style={{ marginRight: 10, marginTop: 10 }} source={Images.cake} />
                            <Text style={styles.phoneNumber}>
                                {'29 Sep, 2022'}
                                {/* {this.state.phone} */}
                            </Text>
                        </View>
                        {/* </View> */}

                    </View>
                    <View style={{ height: 49, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkOrange }}>
                        <Text style={styles.creditStyle}>{'Ledger Balance :'}</Text>
                        <Text style={styles.scoreStyle} >{'₹.5000'}</Text>
                    </View>

                    <View style={{ overflow: 'hidden', }}>
                        <View style={styles.fullinfoView}>
                            <View style={[styles.innerContentStyle, { borderTopColor: colors.shadow, }]}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'Mobile No.'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.email}</Text>
                            </View>
                            <View style={[styles.innerContentStyle,]}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'Email'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.email}</Text>
                            </View>
                            <View style={[styles.innerContentStyle, {}]}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'Date of Anniversary'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.email}</Text>
                            </View>
                            <View style={styles.innerContentStyle}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'Drug license'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.gstNumber}</Text>
                            </View>
                            <View style={styles.innerContentStyle}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'GST'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.gstNumber}</Text>
                            </View>
                            <View style={styles.innerContentStyle}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'Date of Joining'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.gstNumber}</Text>
                            </View>
                            <View style={[styles.innerContentStyle, {}]}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>{'Address :'}</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.address}</Text>
                            </View>
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
                                                data={this.state.myTerritoryData}
                                                renderItem={(item, index) => this.modalRenderItem(item, index)}
                                                keyExtractor={item => item.id}
                                                bounces={false}
                                                // horizontal
                                                // scrollEnabled
                                                showsVerticalScrollIndicator={false}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    {/* {this.state.loading ? <Loader /> : null} */}
                    <View style={{}}>
                        <View style={styles.shippingContainerView}>
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
                    <CustomButton
                        onPress={this.requestAddDivision}
                        title='Request to add division'
                        titleStyle={{ color: colors.white, fontSize: 22, fontFamily: fonts.HelveBold }}
                        mainStyle={{}} />
                    <TouchableOpacity style={{ alignSelf: 'center' }}>
                        <Text style={styles.deleteTextStle}>{'Request to Change Details'}</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
    onPressSortButton = () => {
        this.setState({ childModalVisible: true })
    };
    modalRenderItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.modalViewLine} />
                <View style={{ marginStart: 27, marginVertical: 15, }}>
                    <Text style={styles.brandNameTextStyle} >{item.brandName}</Text>
                    <Text style={styles.institutionTextStyle}>{item.institution}</Text>
                    <Text style={styles.adressStyle}>{item.adress}</Text>
                </View>
                <View style={styles.modalViewLine} />
            </View>
        )
    };
}


export default MyAccount;

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
    },
    firstView: {
        backgroundColor: colors.Orange,
        height: 120,
        alignItems: 'center',
        paddingHorizontal: 15,
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
    shippingContainerView: {
        // flexDirection: 'row',
        // paddingVertical: 15,
        marginHorizontal: 18,
        // backgroundColor:'red',
        // alignItems: 'center',
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
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        // borderRadius: 20,
        // paddingHorizontal: 20,
        // paddingVertical: 20,
        height: '45%'
    },
    modalViews: {
        // flexDirection: 'row',
        width: '100%',
        // justifyContent:'flex-end',
        // alignItems:'center'
        // marginVertical: 20
    },
    myTerritoryStyle: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.Orange,
        marginStart: 12,
    },
    modalmyTerritoryStyle: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginStart: 22,
        marginVertical: 17
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
    // infoView: {
    //     // width: constants.screenWidth - 30,
    //     // height: constants.screenHeight / 4 - 20,
    //     // marginHorizontal: 15,
    //     marginTop: 20,
    //     backgroundColor: colors.white,
    //     borderTopLeftRadius: 12,
    //     borderTopRightRadius: 12,
    //     justifyContent: 'center',
    //     alignItems: 'center',

    // },
    fullinfoView: {
        // marginTop:20,
        marginTop: 15,
        marginBottom: 15,
        width: constants.screenWidth - 32,
        marginHorizontal: 18,
        backgroundColor: colors.white,
        borderRadius: 12,
        // borderBottomLeftRadius: 12,
        // borderBottomRightRadius: 12,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 5.15,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
    },
    headingStyle: {
        color: colors.white,
        fontSize: 26,
        fontFamily: fonts.HelveBold,
        marginTop: 36
    },
    phoneNumber: {
        color: colors.white,
        fontSize: 16,
        marginTop: 10,
        fontFamily: fonts.Helvetica
    },
    innerContentStyle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.shadow,
        paddingHorizontal: 25,
        paddingVertical: 20,

        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    innerContentPlaceholderTextStyle: {
        color: colors.placeholderColor,
        fontSize: 12,
        fontFamily: fonts.Helvetica
    },
    innerContentTextStyle: {
        color: colors.textColor,
        fontSize: 16,
        fontFamily: fonts.Helvetica,
        paddingTop: 3
    },
    styles1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.transparent,
    },
    safeAreaView: {
        flex: 1,
    },
    deleteTextStle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Helvetica,
        alignSelf: 'center',
        // width:'100%',
        paddingBottom: 20
    },
    creditStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 16,
        color: colors.white
    },
    scoreStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 22,
        color: colors.white
    },
});
