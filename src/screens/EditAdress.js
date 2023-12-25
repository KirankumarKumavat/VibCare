import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Platform, InputAccessoryView, Button, Keyboard } from 'react-native';
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
import DropDownPicker from '../components/DropDownPicker';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class EditAdress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Address:'',
            message: "",
            loading: false,
            statesArray: [],
            selectedItem: '',
            selectedCityItem: '',
            pincode: '',
            changedItem: false,
        };
    }

    componentDidMount = () => {
        this.getStatesCityData()

    }
    getStatesCityData = async () => {
        let resp = await Request.get(`${constants.apiVersion}/states`);
        this.setState({ statesArray: resp.data }, () => {
        })
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
                            backButton /* rightIcon */
                            middleText={'Edit Address'} />
                        <Text style={{ marginTop: 50, marginHorizontal: 28, fontSize: 22, fontFamily: fonts.Muli }}>{'Delivery Address'}</Text>
                        <View style={{ marginTop: 15 }}>
                            <Text style={[{ paddingBottom: 10, marginHorizontal: 28, fontSize: 18, color: colors.black, fontFamily: fonts.MuliLight, }]} numberOfLines={1}>{'Address'}</Text>
                            <Input
                                placeholder={'Address'}
                                returnKeyType="next"
                                mainStyle={{ paddingTop: 10, height: 110, alignSelf: 'flex-start', alignItems: 'flex-start', }}
                                value={this.state.Address}
                                onChangeText={(Address) => this.setState({ Address })}
                                onSubmitEditing={() => { this.Address.focus(); }}
                                blurOnSubmit={false}
                                multiline
                            />
                            <Text style={[{ paddingBottom: 10, marginHorizontal: 28, fontSize: 18, color: colors.black, fontFamily: fonts.MuliLight, }]} numberOfLines={1}>{'State'}</Text>

                            <View>
                                <DropDownPicker onPressItem={(item, index) => {
                                    this.setState({ selectedItem: item, index: -1, changedItem: !this.state.changedItem, selectedCityItem: '' })

                                }}
                                    listData={this.state.statesArray}
                                    titleStyle={{ color: this.state.selectedItem && this.state.selectedItem.name ? colors.black : colors.placeholderColor }}
                                    value={this.state.selectedItem ? this.state.selectedItem.name : 'State'} imageSource={Images.downArrow} />
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={[{ paddingBottom: 10, marginHorizontal: 28, fontSize: 18, color: colors.black, fontFamily: fonts.MuliLight, }]} numberOfLines={1}>{'City'}</Text>
                                    <DropDownPicker disabled={this.state.selectedItem ? false : true}
                                        onPressItem={(item, index) => {
                                            this.setState({ selectedCityItem: item, index })
                                        }}
                                        changedColor={{ color: colors.OTPColor }}
                                        listData={this.state.selectedItem && this.state.selectedItem.name != '' ? this.state.selectedItem.cities : ''}
                                        titleStyle={{ color: this.state.selectedCityItem && this.state.selectedCityItem.name ? colors.black : colors.placeholderColor }}
                                        value={this.state.selectedCityItem ? (/* this.state.changedItem ? */ this.state.selectedCityItem.name /* : 'City' */) : 'City'}
                                        imageSource={Images.downArrow} />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={[{ paddingBottom: 10, marginHorizontal: 28, fontSize: 18, color: colors.black, fontFamily: fonts.MuliLight, }]} numberOfLines={1}>{'Pincode'}</Text>
                                    <Input
                                        inputRef={(input) => { this.pincode = input; }}
                                        placeholder={staticText.Pincode}
                                        keyboardType='numeric'
                                        maxLength={6}
                                       
                                        returnKeyType="done"
                                        value={this.state.pincode}
                                        onChangeText={(pincode) => this.setState({ pincode })}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        blurOnSubmit={false}
                                    />
                                </View>
                            </View>
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

                    </KeyboardAwareScrollView>
                    {/* {this.state.loading ? <Loader /> : null} */}
                </View>
            </SafeAreaView>
        );
    }

    onPressSubmit = async () => {
        this.props.navigation.navigate('Home')

        // let reqData = {
        //     Address: this.state.Address.trim(),
        //     message: this.state.message.trim(),
        // }
        // //const { email, password } = this.state;
        // if (this.checkValidation()) {
        //     // alert("Success")
        //     this.setState({ loading: true })

        //     let response = await Request.post(`${constants.apiVersion}/message`, reqData);
        //     this.setState({ loading: false, Address: '', message: '' }, () => {
        //         Alert.alert(staticText.projectTitle, response.data.message);
        //         this.props.navigation.navigate('Home')
        //         return false;
        //     })
        // }
    }

    checkValidation = () => {
        const { Address, selectedItem,selectedCityItem,pincode } = this.state;

        if (Address.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterTitle);
            return false;
        }
        else if (selectedItem == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterMessage);
            return false;
        }
        else if(selectedCityItem == ''){
            Alert.alert(
                staticText.projectTitle,
                staticText.enterCity
            )
        }
        else if(pincode == ''){
            Alert.alert(
                staticText.projectTitle,
                staticText.enterPincode
            )
        }
        else {

            return true;

        }
    }

}

export default EditAdress;

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
});
