import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, InputAccessoryView, Button, Keyboard } from 'react-native';
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
import { DrawerActions } from '@react-navigation/native';


class ProductQualityIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            Address: '',
            message: "",
            loading: false,
            issueArray: [{ name: 'Brakage' }, { name: 'damage' }],
            reasonArray: [{ name: 'Reason1' }, { name: 'Reason2' }, { name: 'Reason3' }, { name: 'Reason4' }],
            selectedItem: '',
            selectedIssueItem: '',
            selectedItem1: '',
            selectedReasonItem: '',
            pincode: '',
            title: '',
            productDesc: '',
            changedItem: false,
        };
    }

    componentDidMount = () => {
        this.getStatesCityData()

    }
    getStatesCityData = async () => {
        // let resp = await Request.get(`${constants.apiVersion}/states`);
        // this.setState({ statesArray: resp.data }, () => {
        // })
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
                            onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                            // backButton /* rightIcon */
                            middleText={'Product Quality Issue'} />
                        {/* <Text style={{ marginTop: 50, marginHorizontal: 28, fontSize: 22, fontFamily: fonts.Muli }}>{'Delivery Address'}</Text> */}
                        <View style={{ marginTop: 40 }}>
                            <View>
                                <DropDownPicker onPressItem={(item, index) => {
                                    this.setState({ selectedItem: item, index: -1, changedItem: !this.state.changedItem, selectedIssueItem: '' })

                                }}
                                    listData={this.state.issueArray}
                                    titleStyle={{ color: this.state.selectedItem && this.state.selectedItem.name ? colors.black : colors.placeholderColor }}
                                    value={this.state.selectedItem ? this.state.selectedItem.name : 'Breakage'} imageSource={Images.downArrow} />

                                <DropDownPicker onPressItem={(item, index) => {
                                    this.setState({ selectedItem1: item, index: -1, changedItem: !this.state.changedItem, selectedReasonItem: '' })

                                }}
                                    listData={this.state.reasonArray}
                                    titleStyle={{ color: this.state.selectedItem1 && this.state.selectedItem1.name ? colors.black : colors.placeholderColor }}
                                    value={this.state.selectedItem1 ? this.state.selectedItem1.name : 'Reason'} imageSource={Images.downArrow} />

                                <Input
                                    placeholder={'Title'}
                                    returnKeyType="next"
                                    value={this.state.title}
                                    onChangeText={(title) => this.setState({ title })}
                                    onSubmitEditing={() => { this.title.focus(); }}
                                    blurOnSubmit={false}
                                />

                                <Input
                                    placeholder={'Description'}
                                    // returnKeyType="done"
                                    multiline
                                    inputRef={(input) => { this.desc = input; }}
                                    // style={{ height: 220, alignSelf: 'flex-start', alignItems: 'flex-start' }}
                                    mainStyle={{ paddingTop: 10, height: 220, alignSelf: 'flex-start', alignItems: 'flex-start', marginHorizontal: 30, }}
                                    value={this.state.productDesc}
                                    onChangeText={(productDesc) => this.setState({ productDesc })}
                                    // onSubmitEditing={() => { this.mobileNo.focus(); }}
                                    blurOnSubmit={false}
                                // inputAccessoryViewID={inputAccessoryViewID}
                                />

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

                        <TouchableOpacity style={{ width: '20%', alignSelf: 'center' }}>
                            <Text style={styles.deleteTextStle}>{'Cancel'}</Text>
                        </TouchableOpacity>

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
        const { Address, selectedItem, selectedCityItem, pincode } = this.state;

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
        else if (selectedCityItem == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterCity
            )
        }
        else if (pincode == '') {
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

export default ProductQualityIssue;

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
        paddingBottom: 20
    }
});
