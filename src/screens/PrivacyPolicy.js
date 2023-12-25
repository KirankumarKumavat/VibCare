import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
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
import AutoHeightWebView from 'react-native-autoheight-webview'


class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privacyData: '',
            loading: false,
        };
    }
    componentDidMount = () => {
        this.getPrivacyPolicy();
    };

    getPrivacyPolicy = async () => {
        this.setState({ loading: true })
        let response = await Request.get(`${constants.apiVersion}/privacypolicy`);
        this.setState({ loading: false })
        this.setState({ privacyData: response.data.data })
    }
    //todo Add phone number and name from api;
    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <Header
                    onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                    middleText={staticText.PrivacyPolicy} />

                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                >

                    {this.state.loading == false && <AutoHeightWebView
                        originWhitelist={['*']}
                        scalesPageToFit={constants.isAndroid ? false : true}
                        bounces={false}
                        customStyle={`
                        p {
                           padding-left: 16px;
                           padding-right: 16px;
                           padding-top:15px;
                           padding-bottom:${constants.isAndroid ? '10px' : '0px'}
                             
                             }
                         `}
                        style={{ marginTop: 20, marginBottom: 20, backgroundColor: colors.white, width: constants.screenWidth - 30, marginLeft: 15, }}
                        source={{
                            html: `<head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body {font-size:${constants.isIOS ? 18 : 16} ;font-family:${fonts.Muli}; line-height: 1.4; color: ${colors.textColor};}
                            ul {
                                list-style: none;
                              }
                              
                              ul li::before {
                                content: "• ";
                                color: ${colors.Orange};
                                font-weight: bold;
                                display: inline-block; 
                                width: 1em;
                              }
                            </style></head><body>${this.state.privacyData}</body>`,
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                    />
                    }

                    {/* {this.state.loading ? <Loader /> : null} */}

                </ScrollView>
            </SafeAreaView>
        );
    }


}

export default PrivacyPolicy;

const styles = StyleSheet.create({

    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: colors.backgroundColor,
    },

    headingStyle: {
        color: colors.Orange,
        fontSize: 22,
        fontFamily: fonts.MuliSemiBold,

    },
    safeAreaView: {
        flex: 1,
    },
});
