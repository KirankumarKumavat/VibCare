import { Text, Button, StyleSheet, InputAccessoryView, Keyboard, View, TouchableOpacity, Platform, Image } from 'react-native'
import React, { Component } from 'react'
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images'
import { colors, staticText, constants } from '../config';
import fonts from '../assets'
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class CustomerSupportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {

    }

    render() {

        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>

                    <Header
                        // onBackButtonPress={() => this.props.navigation.goBack()}
                        // backButton /* rightIcon */
                        onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                        middleText={'Customer Support'}
                        middleTextStyle={styles.middleTextStyle}
                    />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        style={{}}
                        contentContainerStyle={{ paddingBottom: 30 }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 41 }}>
                            <Text style={styles.VibCareTextStyle} >{'Vibcare Pharma'}</Text>
                            <Text style={styles.SupportStyle} >{'is here to Support you!'}</Text>
                            <View style={styles.ImageStyle} >
                                <Image style={{ alignSelf: 'center', borderRadius: 156 / 2, height: 78, width: 78, }} source={Images.ProfileImage}></Image>
                            </View>
                            <Text style={styles.nameStyle} >{'Emily Smith'}</Text>
                        </View>
                        <View style={{ marginTop: 33, }} >
                            <View style={styles.secondHalfBox} />
                            <View style={{ paddingLeft: 40 }} >
                                <Text style={styles.phoneNumberStyle}>{'Phone No.'}</Text>
                                <Text style={styles.NumberStyle}>{'+91 - 12304 56789'}</Text>
                            </View>
                            <View style={styles.secondHalfBox} />
                            <View style={{ paddingLeft: 40 }}>
                                <Text style={styles.phoneNumberStyle}>{'Email'}</Text>
                                <Text style={styles.NumberStyle}>{'family_healthcare@gmail.com'}</Text>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                    <View style={{}} >
                        <View style={{ height: 255, width: '100%', backgroundColor: colors.ShareBackColor, borderTopLeftRadius: 24, borderTopRightRadius: 24 }} >
                            <Text style={styles.StilltextStyle} >{'Still Need Help?'}</Text>
                            <View style={{ marginTop: 32 }}>
                                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' }} >
                                    <TouchableOpacity>
                                        <Image source={Images.Callicon} ></Image>
                                        <Text style={styles.SocialTextStyle} >{'Call Us'}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image source={Images.emailicon}></Image>
                                        <Text style={styles.SocialTextStyle}>{'Email Us'}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image source={Images.whatsappicon}></Image>
                                        <Text style={styles.SocialTextStyle}>{'Whats App'}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image source={Images.ComplainIcon}></Image>
                                        <Text style={styles.SocialTextStyle}>{'Complaint'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

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
    ImageStyle: {
        marginTop: 45,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: colors.CircleImageColor,
        borderWidth: 12,
        borderRadius: 220 / 2,
        width: 110,
        height: 110,
    },
    VibCareTextStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 18,
        color: colors.black,
    },
    SupportStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 18,
        color: colors.black,
        marginTop: 5
    },
    nameStyle: {
        marginTop: 26,
        color: colors.Orange,
        fontSize: 18,
        fontFamily: fonts.HelveBold
    },
    secondHalfBox: {
        alignSelf: 'center',
        width: constants.screenWidth - 40,
        opacity: 0.3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: colors.placeholderColor,
        marginVertical: 3,
        marginVertical: 17
    },
    phoneNumberStyle: {
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,
        fontSize: 14,
    },
    NumberStyle: {
        fontFamily: fonts.Helvetica,
        color: colors.smallFont,
        fontSize: 16,
        marginTop: 7
    },
    StilltextStyle: {
        marginTop: 24,
        fontFamily: fonts.Helvetica,
        fontSize: 18,
        color: colors.black,
        alignSelf: 'center'
    },
    SocialTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.black,
        marginStart: 7
    }

})