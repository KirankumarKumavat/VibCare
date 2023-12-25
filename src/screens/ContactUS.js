import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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


class ContactUS extends Component {
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
        };
    }
    componentDidMount = () => {
        this.getKYCData();
    };

    getKYCData = async () => {
        this.setState({ loading: true })
        let response = await Request.get(`${constants.apiVersion}/contactus`);
        this.setState({ loading: false })
        this.setState({ email: response.data.contact_us[0].email, address: response.data.contact_us[0].address, gstNumber: response.data.contact_us[0].gst_number, company: response.data.contact_us[0].company, phone: response.data.contact_us[0].phone_number })
    }
    //todo Add phone number and name from api;
    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >
                    <Header
                        onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                        middleText={'Contact Us'} />

                    <View style={styles.firstView}>
                        <View style={styles.infoView}>
                            <Text style={styles.headingStyle}>{this.state.company}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {this.state.phone.trim() !== "" ? <Image style={{ marginRight: 10 }} source={Images.mobile} /> : null}
                                <Text style={styles.phoneNumber}>{this.state.phone}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ overflow: 'hidden', paddingBottom: 10 }}>
                        <View style={styles.fullinfoView}>
                            <View style={[styles.innerContentStyle, { borderTopColor: colors.shadow, borderTopWidth: 1 }]}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>Email :</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.email}</Text>
                            </View>
                            <View style={styles.innerContentStyle}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>GST Number :</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.gstNumber}</Text>
                            </View>
                            <View style={[styles.innerContentStyle, { borderBottomWidth: 0 }]}>
                                <Text style={styles.innerContentPlaceholderTextStyle}>Address :</Text>
                                <Text style={styles.innerContentTextStyle}>{this.state.address}</Text>
                            </View>
                        </View>
                    </View>
                    {/* {this.state.loading ? <Loader /> : null} */}

                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }


}

export default ContactUS;

const styles = StyleSheet.create({

    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
    },
    firstView: {
        backgroundColor: colors.Orange,
        height: constants.screenHeight / 4 - 20,
        alignItems: 'center',
        paddingHorizontal: 15,

    },
    infoView: {
        width: constants.screenWidth - 30,
        height: constants.screenHeight / 4 - 20,
        marginHorizontal: 15,
        marginTop: 20,
        backgroundColor: colors.white,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',

    },
    fullinfoView: {
        width: constants.screenWidth - 30,
        marginHorizontal: 15,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
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
        color: colors.Orange,
        fontSize: 22,
        fontFamily: fonts.MuliSemiBold,

    },
    phoneNumber: {
        color: colors.textColor,
        fontSize: 16,
        fontFamily: fonts.Muli
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
        fontSize: 14,
        fontFamily: fonts.Muli
    },
    innerContentTextStyle: {
        color: colors.textColor,
        fontSize: 16,
        fontFamily: fonts.Muli,
        paddingTop: 3
    },
    safeAreaView: {
        flex: 1,
    },
});
