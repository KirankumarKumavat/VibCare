// import { Text, Button, StyleSheet, InputAccessoryView, Keyboard, View, TouchableOpacity, Platform, Image } from 'react-native'
// import React, { Component } from 'react'
// import { Input, CustomButton, Header } from '../components';
// import Images from '../assets/images'
// import { colors, staticText, constants } from '../config';
// import fonts from '../assets'
// import { DrawerActions } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import ImagePickerView from "../components/ImagePickerView";
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// export default class RequestNewMolecule extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             productName: '',
//             productDesc: '',
//             statesArray: [],
//             ImageUri: '',
//             SaltName: '',
//             isImagePickerVisible: false,
//         }
//     }

//     componentDidMount = () => {
//         this.getStatesCityData()

//     }

//     onGetURI = (image) => {
//         this.setState({ isImagePickerVisible: false, ImageUri: image })
//     };

//     getStatesCityData = async () => {
//         let resp = await Request.get(`${constants.apiVersion}/states`);
//         this.setState({ statesArray: resp.data }, () => {
//         })
//     }


//     onPressUploadImage = () => {
//         console.log("onPressUpload image");
//     }

//     render() {
//         const inputAccessoryViewID = "doneBtn";

//         return (
//             <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
//                 style={{ flex: 1 }}
//             >
//                 <View style={styles.container}>

//                     <Header
//                         // onBackButtonPress={() => this.props.navigation.goBack()}
//                         // backButton /* rightIcon */
//                         onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
//                         middleText={staticText.requestNewMolecule}
//                         middleTextStyle={styles.middleTextStyle}
//                     />
//                     <KeyboardAwareScrollView
//                         bounces={false}
//                         showsVerticalScrollIndicator={false}
//                         contentContainerStyle={styles.contentContainerStyle}
//                     >
//                         <View style={styles.subView}>
//                             <TouchableOpacity onPress={() => this.setState({ isImagePickerVisible: true })}>
//                                 <View style={styles.imageView}>
//                                     {this.state.ImageUri ?
//                                         <Image
//                                             source={{
//                                                 uri: Platform.OS == 'ios' ? "file://" + this.state.ImageUri.path
//                                                     : this.state.ImageUri.path
//                                             }} style={{ width: 330, height: 200, borderRadius: 10, }}
//                                         >
//                                         </Image>
//                                         :
//                                         <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
//                                             <Image source={Images.gallary}></Image>
//                                             <Text style={styles.uploadText}>{'Upload Image'}</Text>
//                                         </View>
//                                     }
//                                 </View>
//                             </TouchableOpacity>
//                             {/* <TouchableOpacity style={styles.imageView} onPress={() => onPressUploadImage()}>
//                                 <Image source={Images.gallary}></Image>
//                                 <Text style={styles.uploadText}>Upload Image*</Text>
//                             </TouchableOpacity> */}

//                             <Input
//                                 placeholder={'Product Name'}
//                                 returnKeyType="next"
//                                 value={this.state.productName}
//                                 style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
//                                 onChangeText={(productName) => this.setState({ productName })}
//                                 onSubmitEditing={() => { this.productDesc.focus(); }}
//                                 blurOnSubmit={false}
//                                 mainStyle={{ marginHorizontal: 0 }}
//                             />

//                             <Input
//                                 placeholder={'Salt Name'}
//                                 returnKeyType="next"
//                                 value={this.state.SaltName}
//                                 style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
//                                 onChangeText={(SaltName) => this.setState({ SaltName })}
//                                 onSubmitEditing={() => { this.productDesc.focus(); }}
//                                 blurOnSubmit={false}
//                                 mainStyle={{ marginHorizontal: 0 }}
//                             />

//                             <View style={{ alignSelf: 'center' }} >
//                                 <View style={styles.mainContainer}>
//                                     <Text style={styles.QuantityStyle} >{'Quantity'}</Text>
//                                     <View style={{}}>
//                                         <View style={{ justifyContent: 'space-around', alignItems: 'center', width: 100, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
//                                             <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//                                                 <TouchableOpacity>
//                                                     <Image source={Images.Rectangle} />
//                                                 </TouchableOpacity>
//                                                 <Text style={{ fontFamily: fonts.HelveBold, fontSize: 18, color: colors.white }}>{'1'}</Text>
//                                                 <TouchableOpacity>
//                                                     <Image source={Images.WhiteUnion} />
//                                                 </TouchableOpacity>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>

//                             <Input
//                                 placeholder={'Remark'}
//                                 // returnKeyType="done"
//                                 multiline
//                                 inputRef={(input) => { this.desc = input; }}
//                                 style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
//                                 mainStyle={{ paddingTop: 10, height: 120, alignSelf: 'flex-start', alignItems: 'flex-start', marginHorizontal: 0 }}
//                                 value={this.state.productDesc}
//                                 onChangeText={(productDesc) => this.setState({ productDesc })}
//                                 // onSubmitEditing={() => { this.mobileNo.focus(); }}
//                                 blurOnSubmit={false}
//                             // inputAccessoryViewID={inputAccessoryViewID}
//                             />
//                             <CustomButton
//                                 onPress={this.onPressSubmit}
//                                 title='Submit'
//                                 mainStyle={{ marginTop: 40, }}
//                                 titleStyle={{ fontFamily: fonts.HelveBold, fontSize: 22, color: colors.white }}

//                             />

//                             <TouchableOpacity style={{ width: constants.screenWidth / 3, alignSelf: 'center' }}>
//                                 <Text style={styles.deleteTextStle}>{'Cancel'}</Text>
//                             </TouchableOpacity>

//                         </View>
//                         {
//                             Platform.OS === "ios" &&
//                             <InputAccessoryView nativeID={inputAccessoryViewID}>
//                                 <View style={styles.inputAccessory}>
//                                     <Button onPress={Keyboard.dismiss} title={"Done"} />
//                                 </View>
//                             </InputAccessoryView>
//                         }
//                         <ImagePickerView
//                             visible={this.state.isImagePickerVisible}
//                             transparent={true}
//                             CloseModal={() => this.setState({ isImagePickerVisible: false })}
//                             onGetURI={this.onGetURI}
//                         />
//                     </KeyboardAwareScrollView>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.backgroundColor
//     },
//     middleTextStyle: {
//         color: colors.white,
//         fontFamily: fonts.HelveBold,
//         fontSize: 22,
//     },
//     subView: {
//         flex: 1,
//         marginHorizontal: 30,
//         marginVertical: 20
//     },
//     requestBulkText: {
//         fontSize: 18,
//         fontFamily: fonts.MuliSemiBold,
//         color: colors.black
//     },
//     mainContainer: {
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: 'row',
//         height: 48,
//         width: constants.screenWidth - 60,
//         paddingHorizontal: 10,
//         paddingLeft: 17,
//         marginBottom: 16,
//         borderRadius: 8,
//         backgroundColor: colors.white,
//         borderWidth: 1,
//         borderColor: colors.white,
//         marginHorizontal: 28,
//         shadowColor: colors.shadowColor,
//         shadowOpacity: 1,
//         elevation: 3,
//         shadowRadius: 8,
//         shadowOffset: {
//             height: 2,
//             width: -0.79,
//         },
//     },
//     QuantityStyle: {
//         color: colors.placeholderColor,
//         fontFamily: fonts.Helvetica,
//         fontSize: 16
//     },
//     imageView: {
//         height: 200,
//         borderWidth: 1,
//         backgroundColor: colors.white,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderColor: colors.borderDark,
//         borderRadius: 10,
//         marginVertical: 20
//     },
//     uploadText: {
//         fontSize: 14,
//         fontFamily: fonts.Helvetica,
//         color: colors.placeholderColor,
//         marginTop: 10
//     },
//     deleteTextStle: {
//         color: colors.Orange,
//         fontSize: 20,
//         fontFamily: fonts.Helvetica,
//         alignSelf: 'center',
//     },
//     inputAccessory: {
//         backgroundColor: colors.inputAccessoryBg,
//         alignItems: "flex-end",
//         paddingHorizontal: 5,
//         height: 35,
//     },
// })


import { Text, Button, StyleSheet, InputAccessoryView, Keyboard, View, TouchableOpacity, Platform, Image } from 'react-native'
import React, { Component } from 'react'
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images'
import { colors, staticText, constants } from '../config';
import fonts from '../assets'
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePickerView from "../components/ImagePickerView";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class RequestNewMolecule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productDesc: '',
            statesArray: [],
            ImageUri: '',
            SaltName: '',
            isImagePickerVisible: false,
        }
    }

    componentDidMount = () => {
        this.getStatesCityData()

    }

    onGetURI = (image) => {
        this.setState({ isImagePickerVisible: false, ImageUri: image })
    };

    getStatesCityData = async () => {
        let resp = await Request.get(`${constants.apiVersion}/states`);
        this.setState({ statesArray: resp.data }, () => {
        })
    }


    onPressUploadImage = () => {
        console.log("onPressUpload image");
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
                        middleText={staticText.requestNewMolecule}
                        middleTextStyle={styles.middleTextStyle}
                    />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <View style={styles.subView}>
                            <TouchableOpacity onPress={() => this.setState({ isImagePickerVisible: true })}>
                                <View style={styles.imageView}>
                                    {this.state.ImageUri ?
                                        <Image
                                            source={{
                                                uri: Platform.OS == 'ios' ? "file://" + this.state.ImageUri.path
                                                    : this.state.ImageUri.path
                                            }} style={{ width: 330, height: 200, borderRadius: 10, }}
                                        >
                                        </Image>
                                        :
                                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={Images.gallary}></Image>
                                            <Text style={styles.uploadText}>{'Upload Image'}</Text>
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.imageView} onPress={() => onPressUploadImage()}>
                                <Image source={Images.gallary}></Image>
                                <Text style={styles.uploadText}>Upload Image*</Text>
                            </TouchableOpacity> */}

                            <Input
                                placeholder={'Product Name'}
                                returnKeyType="next"
                                value={this.state.productName}
                                style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
                                onChangeText={(productName) => this.setState({ productName })}
                                onSubmitEditing={() => { this.productDesc.focus(); }}
                                blurOnSubmit={false}
                                mainStyle={{ marginHorizontal: 0 }}
                            />

                            <Input
                                placeholder={'Salt Name'}
                                returnKeyType="next"
                                value={this.state.SaltName}
                                style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
                                onChangeText={(SaltName) => this.setState({ SaltName })}
                                onSubmitEditing={() => { this.productDesc.focus(); }}
                                blurOnSubmit={false}
                                mainStyle={{ marginHorizontal: 0 }}
                            />

                            <View style={{ alignSelf: 'center' }} >
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
                            </View>

                            <Input
                                placeholder={'Remark'}
                                // returnKeyType="done"
                                multiline
                                inputRef={(input) => { this.desc = input; }}
                                style={{ fontSize: 16, color: colors.placeholderColor, fontFamily: fonts.Helvetica }}
                                mainStyle={{ paddingTop: 10, height: 120, alignSelf: 'flex-start', alignItems: 'flex-start', marginHorizontal: 0 }}
                                value={this.state.productDesc}
                                onChangeText={(productDesc) => this.setState({ productDesc })}
                                // onSubmitEditing={() => { this.mobileNo.focus(); }}
                                blurOnSubmit={false}
                            // inputAccessoryViewID={inputAccessoryViewID}
                            />
                            <CustomButton
                                onPress={this.onPressSubmit}
                                title='Submit'
                                mainStyle={{ marginTop: 40, }}
                                titleStyle={{ fontFamily: fonts.HelveBold, fontSize: 22, color: colors.white }}

                            />

                            <TouchableOpacity style={{ width: constants.screenWidth / 3, alignSelf: 'center' }}>
                                <Text style={styles.deleteTextStle}>{'Cancel'}</Text>
                            </TouchableOpacity>

                        </View>
                        {
                            Platform.OS === "ios" &&
                            <InputAccessoryView nativeID={inputAccessoryViewID}>
                                <View style={styles.inputAccessory}>
                                    <Button onPress={Keyboard.dismiss} title={"Done"} />
                                </View>
                            </InputAccessoryView>
                        }
                        <ImagePickerView
                            visible={this.state.isImagePickerVisible}
                            transparent={true}
                            CloseModal={() => this.setState({ isImagePickerVisible: false })}
                            onGetURI={this.onGetURI}
                        />
                    </KeyboardAwareScrollView>
                </View>
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
    subView: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 20
    },
    requestBulkText: {
        fontSize: 18,
        fontFamily: fonts.MuliSemiBold,
        color: colors.black
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
    imageView: {
        height: 200,
        borderWidth: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.borderDark,
        borderRadius: 10,
        marginVertical: 20
    },
    uploadText: {
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,
        marginTop: 10
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