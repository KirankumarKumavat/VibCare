import React, { Component } from 'react';
import { View,TouchableOpacity, Text, StyleSheet, TextInput, Alert, Platform, InputAccessoryView, Button, Keyboard } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

class ContactUS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            title: '',
            message: ""
        };
    }

    componentDidMount = () => {
        // this.getHomeScreenData();

    }

    // getHomeScreenData = async () => {
    //     this.setState({ loading: true });
    //     let response = await Request.get('home', {});
    //     this.setState({ loading: false });
    //     console.log('response', response);
    // }
    render() {
        const inputAccessoryViewID = "doneBtn";
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <Header
                            // backButton /* rightIcon */
                            onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                            middleText={'Send Message'} />
                        <View style={{ marginTop: 50, }}>
                            <Input
                                placeholder={'Title'}
                                returnKeyType="next"
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                onSubmitEditing={() => { this.title.focus(); }}
                                blurOnSubmit={false}

                            />

                            <Input
                                placeholder={'Your Message'}
                                // returnKeyType="done"
                                multiline
                                inputRef={(input) => { this.title = input; }}
                                // style={{ height: 220, alignSelf: 'flex-start', alignItems: 'flex-start' }}
                                mainStyle={{ paddingTop: 10, height: 220, alignSelf: 'flex-start', alignItems: 'flex-start', }}
                                value={this.state.message}
                                onChangeText={(message) => this.setState({ message })}
                                // onSubmitEditing={() => { this.mobileNo.focus(); }}
                                blurOnSubmit={false}
                                inputAccessoryViewID={inputAccessoryViewID}

                            />
                            {
                                Platform.OS === "ios" &&
                                <InputAccessoryView nativeID={inputAccessoryViewID}>
                                    <View style={styles.inputAccessory}>
                                        <Button onPress={Keyboard.dismiss} title={"Done"} />
                                    </View>
                                </InputAccessoryView>
                            }
                        </View>
                        <CustomButton
                            onPress={this.onPressSubmit}
                            title='Submit'
                            mainStyle={{ marginTop: 40, }} />

                        <TouchableOpacity style={{width: '20%', alignSelf: 'center' }}>
                            <Text style={styles.deleteTextStle}>{'Cancel'}</Text>
                        </TouchableOpacity>

                    </KeyboardAwareScrollView>
                    {/* {this.state.loading ? <Loader /> : null} */}
                </View>
            </SafeAreaView>
        );
    }

    onPressSubmit = async () => {
        let reqData = {
            title: this.state.title.trim(),
            message: this.state.message.trim(),
        }
        //const { email, password } = this.state;
        if (this.checkValidation()) {
            // alert("Success")
            this.setState({ loading: true })

            let response = await Request.post(`${constants.apiVersion}/message`, reqData);
            this.setState({ loading: false, title: '', message: '' }, () => {
                Alert.alert(staticText.projectTitle, response.data.message);
                this.props.navigation.navigate('Home')
                return false;
            })

        }
    }



    checkValidation = () => {
        const { title, message } = this.state;

        if (title.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterTitle);
            return false;
        }
        else if (message.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterMessage);
            return false;
        }
        else {

            return true;

        }
    }

}

export default ContactUS;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        // backgroundColor: 'green',
        width: constants.screenWidth - 46,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    countryCodeInputStyle: {
        width: '32%',
        paddingHorizontal: 0,
    },
    numberInputView: {
        width: '62%',
    },
    customSignUpButtonOneStyle: {
        marginTop: 50,
    },
    ORTextStyleView: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    ORTextStyleTextStyle: {
        color: colors.placeholderColor,
        fontSize: 20,
        fontFamily: fonts.Muli,
        paddingHorizontal: 30,
    },
    breakLineStyle: {
        borderBottomWidth: 0.5,
        borderColor: colors.textColor,
        width: constants.screenWidth / 3 - 20,
    },
    signinFBButtonStyle: {
        backgroundColor: colors.Blue,
    },
    firstView: {
        // height: 250,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        height: constants.screenHeight / 3 - 60,
        alignItems: 'center',
    },
    secondView: {
        // flex: 1,
        // backgroundColor: 'red',
        paddingTop: 50,
        position: 'relative',
        height: constants.screenHeight / 2 + 100,
    },
    lastView: {
        //height: constants.screenHeight / 3,
        // backgroundColor: 'pink',
        bottom: 30,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    alreadyHaveAccountTextStyle: {
        fontFamily: fonts.Muli,
        fontSize: 20,
        color: colors.placeholderColor,
    },
    signInTextButtonStyle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Muli,
    },
    inputAccessory: {
        backgroundColor: colors.inputAccessoryBg,
        alignItems: "flex-end",
        paddingHorizontal: 5,
        height: 35,
    },
    deleteTextStle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Muli,
        alignSelf: 'center',
    }
});
