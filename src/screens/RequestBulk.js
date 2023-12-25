import { Text, Button, StyleSheet, InputAccessoryView, Keyboard, View, TouchableOpacity, Platform, Image, TouchableWithoutFeedback } from 'react-native'
import React, { Component } from 'react'
import { Input, CustomButton, Header } from '../components';
import { colors, constants, staticText } from '../config';
import fonts from '../assets'
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePickerView from "../components/ImagePickerView";
import DropDownPicker from '../components/DropDownPicker';
import Images from '../assets/images'

export default class RequestBulk extends Component {

    constructor(props) {
        super(props);
        this.state = {
            issueArray: [{ name: 'Brakage' }, { name: 'damage' }],
            changedItem: false,
            selectedIssueItem: '',
            productName: '',
            productDesc: '',
            ImageUri: '',
            statesArray: [],
            isImagePickerVisible: false,
        }
    }

    componentDidMount = () => {

    }

    render() {
        const inputAccessoryViewID = "doneBtn";

        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>

                    <Header
                        // onBackButtonPress={() => this.props.navigation.goBack()}
                        // backButton /* rightIcon */
                        onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                        middleText={staticText.requestBulkRate}
                        middleTextStyle={styles.middleTextStyle}

                    />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <View style={styles.subView}>
                            <Text style={styles.requestBulkText}>{'Request bulk rate for an product'}</Text>
                            <View style={{ marginTop: 24, width: constants.screenWidth - 56, alignSelf: 'center' }}>
                                <DropDownPicker onPressItem={(item, index) => {
                                    this.setState({ selectedItem: item, index: -1, changedItem: !this.state.changedItem, selectedIssueItem: '' })

                                }}
                                    listData={this.state.issueArray}
                                    titleStyle={{ color: this.state.selectedItem && this.state.selectedItem.name ? colors.black : colors.placeholderColor }}
                                    value={this.state.selectedItem ? this.state.selectedItem.name : 'Select product'} imageSource={Images.downArrow} />
                            </View>
                            <View style={styles.mainContainer}>
                                <Text style={styles.QuantityStyle} >{'Quantity'}</Text>
                                <View style={{}}>
                                    <View style={{ justifyContent: 'space-around', alignItems: 'center', width: 100, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <Image source={Images.Rectangle} />
                                            </TouchableOpacity>
                                            <Text style={{ fontFamily: fonts.HelveBold, fontSize: 18, color: colors.white }}>{'1'}</Text>
                                            <TouchableOpacity>
                                                <Image source={Images.WhiteUnion} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Input
                                placeholder={'Remark'}
                                // returnKeyType="done"
                                multiline
                                inputRef={(input) => { this.desc = input; }}
                                style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
                                mainStyle={{ width: '100%', paddingTop: 10, height: 120, alignSelf: 'flex-start', alignItems: 'flex-start', }}
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

                    </KeyboardAwareScrollView>
                </View>
                <CustomButton
                    onPress={() => this.props.navigation.navigate('TitleScreen')}
                    title='Submit'
                    titleStyle={{ fontFamily: fonts.HelveBold, fontSize: 22, color: colors.white }}
                    mainStyle={{}} />

                <TouchableOpacity style={{ width: constants.screenWidth / 3, alignSelf: 'center', paddingBottom: 40 }}>
                    <Text style={styles.deleteTextStle}>{'Cancel'}</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },
    mainContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 48,
        width: constants.screenWidth - 60,
        paddingHorizontal: 10,
        paddingLeft: 17,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.white,
        marginHorizontal: 28,

        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 8,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },
    },
    QuantityStyle: {
        color: colors.placeholderColor,
        fontFamily: fonts.Helvetica,
        fontSize: 16
    },
    subView: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 20,
        alignSelf: 'center'
    },
    requestBulkText: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.smallFont,
        paddingLeft: 30
    },
    deleteTextStle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Helvetica,
        alignSelf: 'center',
    },
    inputAccessory: {
        backgroundColor: colors.inputAccessoryBg,
        alignItems: "flex-end",
        paddingHorizontal: 5,
        height: 35,
    },
})