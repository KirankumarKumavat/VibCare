import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Image,
    Keyboard,
    Dimensions
} from 'react-native';
import DocumentPicker, { isInProgress, } from 'react-native-document-picker';
import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton } from '../components';
import Images from '../assets/images';
import { StorageService, moderateScale, showTostMessage } from '../utilities';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import moment from 'moment';
import Request from '../api/request';


class KYCRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            licenseNo: '',
            pinCode: '',
            adhaarNo: '',
            panNo: '',
            dateofBirth: '',
            dateofAnniversary: '',
            gstNo: '',
            formSelected: false,
            selectedIndex: 0,
            form20B: '',
            form21B: '',
            form21C: '',
            selectedDrug: 0,
            selectedDrugInput: 0,
            selectedGST: 0,
            selectedGSTInput: 0,
            selectedPageIndex: 0,
            result: undefined,
            isDatePickerVisible: false,
            choosenDate: '',
            choosenDateOfAnnvi: '',
            upLoadFile: '',
            flag: -1,
            drugResult: '',
            loading: false,

        };
    }

    handleError = (err) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled')
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered')
        } else {
            throw err
        }
    }

    showDatePicker = (flag) => {
        console.log('flag==>', flag);
        if (this.state.choosenDate) {
            this.setState({
                choosenDate: '',
            })
        }
        else {
            console.log('flag', flag);
            this.setState({
                isDatePickerVisible: true,
                flag: flag
            });
        }

    };

    showDatePickerAnnvi = (flag) => {
        console.log('flag==>', flag);
        if (this.state.choosenDateOfAnnvi) {
            this.setState({
                choosenDateOfAnnvi: '',
            })
        }
        else {
            console.log('flag', flag);
            this.setState({
                isDatePickerVisible: true,
                flag: flag
            });
        }
    };

    hideDatePicker = (date) => {
        console.log('datedate', date);
        if (this.state.flag == 0) {
            this.setState({
                isDatePickerVisible: false,
                choosenDate: moment(date).format('DD/MM/YYYY'),
            });
        }
        else if (this.state.flag == 1) {
            this.setState({
                isDatePickerVisible: false,
                choosenDateOfAnnvi: moment(date).format('DD/MM/YYYY')
            });
        }
        else {
            this.setState({
                isDatePickerVisible: false

            })
        }
    };

    handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        this.hideDatePicker(date);
    };

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={{ flex: 1, }}
            >
                <View style={styles.container}>
                    <StatusBar
                        translucent
                        barStyle={'dark-content'}
                        backgroundColor={'transparent'}
                    />
                    <View style={styles.firstView}>
                        <Text style={styles.titleStyle}>
                            {staticText.SetupAccount}{'\n'}{staticText.KYC}
                        </Text>
                    </View>
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.contentContainerStyle}
                    >

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <View style={{ height: 10, width: 10, borderRadius: 10 / 2, backgroundColor: colors.Orange }} />
                            <View style={{ width: 85, borderColor: colors.placeholderColor, opacity: 0.2, borderWidth: 1 }} />
                            <View style={{ height: 10, width: 10, borderRadius: 10 / 2, backgroundColor: colors.placeholderColor }} />
                            <View style={{ width: 85, borderColor: colors.placeholderColor, opacity: 0.2, borderWidth: 1 }} />
                            <View style={{ height: 10, width: 10, borderRadius: 10 / 2, backgroundColor: colors.placeholderColor }} />
                        </View>

                        {this.state.selectedPageIndex === 1 ?
                            <View style={{ marginTop: 30 }}>
                                <Text numberOfLines={4} style={{ fontSize: 25, marginHorizontal: 30 }}>{'Please complete KYC to access all the features of our app. It is necessary to complete KYC process if you want to place an order or avail other benefits.'}</Text>
                            </View>
                            : null}

                        <View style={styles.secondView}>
                            {this.state.selectedPageIndex === 0 ?
                                <View style={{ marginTop: 40 }}>

                                    <Input
                                        inputRef={ref => (this.companyName = ref)}
                                        autoCapitalize='words'
                                        placeholder={staticText.CompanyName}
                                        returnKeyType="next"
                                        value={this.state.companyName}
                                        onChangeText={(companyName) => this.setState({ companyName: companyName.replace(/^\s+/g, '') })}
                                        onSubmitEditing={() => this.companyName.focus()}
                                        blurOnSubmit={false}
                                        style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                        rightIcon={Images.company}
                                    />

                                    <Input
                                        // autoCapitalize='characters'
                                        keyboardType={'number-pad'}
                                        inputRef={(input) => { this.pinCode = input; }}
                                        placeholder={staticText.divisons}
                                        returnKeyType="done"
                                        value={this.state.pinCode}
                                        contextMenuHidden={true}
                                        // onSubmitEditing={() => this.checkValidation()}
                                        onSubmitEditing={() => Keyboard.dismiss()}
                                        maxLength={6}
                                        onChangeText={(pinCode) => this.setState({ pinCode: pinCode.replace(/ +/g, '') })}
                                        blurOnSubmit={false}
                                        style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                        rightIcon={Images.Pointer}
                                    />
                                    <View style={{ marginHorizontal: 30, marginTop: 27 }}>
                                        <Text style={{ fontFamily: fonts.HelveBold, fontSize: 16, color: colors.black }} >{'Do you have a drug license?*'}</Text>
                                    </View>

                                    <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: '50%', }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <View>
                                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ selectedDrug: 0 })}>
                                                        <View style={{ borderWidth: this.state.selectedDrug == 0 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedDrug == 0 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                            {this.state.selectedDrug == 0 ?
                                                                <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                                : null}
                                                        </View>

                                                        <Text style={{ marginLeft: 5 }}>{'Yes'}</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View>
                                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ selectedDrug: 1 })}>
                                                        <View style={{ borderWidth: this.state.selectedDrug == 1 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedDrug == 1 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                            {this.state.selectedDrug == 1 ?
                                                                <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                                : null}
                                                        </View>

                                                        <Text style={{ marginLeft: 5 }}>{'No'}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>


                                    <View style={{ marginTop: 15 }}>
                                        {this.state.selectedDrugInput || this.state.selectedDrug === 0 ?
                                            <View>
                                                <Input
                                                    autoCapitalize='characters'
                                                    inputRef={(input) => { this.gst = input; }}
                                                    placeholder={staticText.LicenseNo}
                                                    returnKeyType="done"
                                                    value={this.state.licenseNo}
                                                    // onSubmitEditing={() => this.checkValidation()}
                                                    onSubmitEditing={() => Keyboard.dismiss()}
                                                    // maxLength={15}
                                                    onChangeText={(licenseNo) => this.setState({ licenseNo: licenseNo })}
                                                    blurOnSubmit={false}
                                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                    rightIcon={Images.pharmacyicon}
                                                />

                                                <TouchableOpacity onPress={async () => {
                                                    console.log('resultbbbb', this.state.drugResult);
                                                    if (this.state.drugResult && this.state.drugResult.name) {
                                                        this.drugResult.clear()
                                                        this.setState({
                                                            drugResult: ''
                                                        })
                                                    }
                                                    else {
                                                        try {
                                                            const pickerResult = await DocumentPicker.pickSingle({
                                                                presentationStyle: 'fullScreen',
                                                                copyTo: 'cachesDirectory',
                                                            })
                                                            this.setState({
                                                                drugResult: pickerResult
                                                            })
                                                        } catch (e) {
                                                            handleError(e)
                                                        }
                                                    }

                                                }}>

                                                    <Input
                                                        autoCapitalize='characters'
                                                        inputRef={(input) => { this.drugResult = input; }}
                                                        placeholder={staticText.UploadFile}
                                                        returnKeyType="done"
                                                        value={this.state.drugResult ? this.state.drugResult.name : ''}
                                                        editable={false}
                                                        // onSubmitEditing={() => this.checkValidation()}
                                                        onSubmitEditing={() => Keyboard.dismiss()}
                                                        // maxLength={15}
                                                        // onChangeText={(gstNo) => this.setState({ gstNo: gstNo.replace(/ +/g, '') })}
                                                        blurOnSubmit={false}
                                                        style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                        rightIcon={this.state.drugResult ? this.state.drugResult.name ? Images.Closeicon : Images.uploadIcon : Images.uploadIcon}
                                                    // rightIcon={Images.uploadIcon}

                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            : null}

                                        <View style={{ marginHorizontal: 30, marginTop: 27 }}>
                                            <Text style={{ fontFamily: fonts.HelveBold, fontSize: 16, color: colors.black }} >{'Do you have a GST number?*'}</Text>
                                        </View>

                                        <View style={{ marginTop: 25, flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: '50%', }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                                    <View>
                                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ selectedGST: 0 })}>
                                                            <View style={{ borderWidth: this.state.selectedGST == 0 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 0 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                                {this.state.selectedGST == 0 ?
                                                                    <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                                    : null}
                                                            </View>
                                                            <Text style={{ marginLeft: 5 }}>{'Yes'}</Text>

                                                        </TouchableOpacity>
                                                    </View>

                                                    <View>
                                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ selectedGST: 1 })}>
                                                            <View style={{ borderWidth: this.state.selectedGST == 1 ? 0 : 0.5, borderRadius: 20 / 2, height: 20, width: 20, backgroundColor: this.state.selectedGST == 1 ? colors.Orange : colors.white, justifyContent: 'center', alignItems: 'center' }}>
                                                                {this.state.selectedGST == 1 ?
                                                                    <View style={{ borderRadius: 10 / 2, height: 10, width: 10, backgroundColor: colors.white }}></View>
                                                                    : null}
                                                            </View>
                                                            <Text style={{ marginLeft: 5 }}>{'No'}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        {this.state.selectedGSTInput || this.state.selectedGST === 0 ?
                                            <View style={{ marginTop: 20 }}>
                                                <Input
                                                    autoCapitalize='characters'
                                                    inputRef={(input) => { this.gstNo = input; }}
                                                    placeholder={staticText.GSTNo}
                                                    returnKeyType="next"
                                                    value={this.state.gstNo}
                                                    onSubmitEditing={() => this.gstNo.focus()}

                                                    // onSubmitEditing={() => this.checkValidation()}
                                                    // onSubmitEditing={() => Keyboard.dismiss()}
                                                    maxLength={15}
                                                    // style={{marginTop:10}}
                                                    onChangeText={(gstNo) => this.setState({ gstNo: gstNo.replace(/ +/g, '') })}
                                                    blurOnSubmit={false}
                                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                    rightIcon={Images.GstIcon}
                                                />

                                                <TouchableOpacity onPress={async () => {
                                                    if (this.state.result && this.state.result.name) {
                                                        this.result.clear()
                                                        this.setState({
                                                            result: ''
                                                        })
                                                    }
                                                    else {
                                                        try {
                                                            const pickerResult = await DocumentPicker.pickSingle({
                                                                presentationStyle: 'fullScreen',
                                                                copyTo: 'cachesDirectory',
                                                            })
                                                            this.setState({
                                                                result: pickerResult
                                                            })
                                                        } catch (e) {
                                                            handleError(e)
                                                        }
                                                    }

                                                }}>
                                                    <Input
                                                        autoCapitalize='characters'
                                                        editable={false}
                                                        inputRef={(input) => { this.result = input; }}
                                                        placeholder={staticText.UploadFile}
                                                        returnKeyType="done"
                                                        value={this.state.result ? this.state.result.name : ''}
                                                        onSubmitEditing={() => this.checkValidation()}
                                                        // onSubmitEditing={() => Keyboard.dismiss()}
                                                        // maxLength={15}
                                                        // style={{marginTop:10}}
                                                        // onChangeText={(gstNo) => this.setState({ gstNo: gstNo.replace(/ +/g, '') })}
                                                        blurOnSubmit={false}
                                                        style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                        rightIcon={this.state.result ? this.state.result.name ? Images.Closeicon : Images.uploadIcon : Images.uploadIcon}
                                                    // rightIcon={Images.uploadIcon}
                                                    />
                                                </TouchableOpacity>

                                                <Input
                                                    keyboardType={'number-pad'}
                                                    inputRef={(input) => { this.adhaarNo = input; }}
                                                    placeholder={staticText.AadhaarNo}
                                                    returnKeyType="next"
                                                    value={this.state.adhaarNo}
                                                    // onSubmitEditing={() => this.checkValidation()}
                                                    onSubmitEditing={() => this.adhaarNo.focus()}
                                                    // onSubmitEditing={() => Keyboard.dismiss()}
                                                    maxLength={12}
                                                    // style={{marginTop:10}}
                                                    onChangeText={(adhaarNo) => this.setState({ adhaarNo: adhaarNo.replace(/ +/g, '') })}
                                                    blurOnSubmit={false}
                                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                    rightIcon={Images.addresscard}
                                                />

                                                <Input
                                                    autoCapitalize='characters'
                                                    inputRef={(input) => { this.gst = input; }}
                                                    placeholder={staticText.PanNo}
                                                    returnKeyType="done"
                                                    value={this.state.panNo}
                                                    // onSubmitEditing={() => this.checkValidation()}
                                                    onSubmitEditing={() => Keyboard.dismiss()}
                                                    maxLength={10}
                                                    // style={{marginTop:10}}
                                                    onChangeText={(panNo) => this.setState({ panNo: panNo.replace(/ +/g, '') })}
                                                    blurOnSubmit={false}
                                                    style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                    rightIcon={Images.addresscard}
                                                />
                                                <TouchableOpacity onPress={() => this.showDatePicker(0)}>
                                                    <Input
                                                        autoCapitalize='characters'
                                                        inputRef={(input) => { this.gst = input; }}
                                                        placeholder={staticText.DateofBirth}
                                                        returnKeyType="done"
                                                        editable={false}
                                                        value={this.state.choosenDate}
                                                        // onSubmitEditing={() => this.checkValidation()}
                                                        onSubmitEditing={() => Keyboard.dismiss()}
                                                        // maxLength={15}
                                                        // style={{marginTop:10}}
                                                        onChangeText={(dateofBirth) => this.setState({ dateofBirth: dateofBirth.replace(/ +/g, '') })}
                                                        blurOnSubmit={false}
                                                        style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                        rightIcon={this.state.choosenDate ? Images.Closeicon : Images.uploadIcon}

                                                    // rightIcon={Images.birthdayicon}
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => this.showDatePickerAnnvi(1)} >
                                                    <Input
                                                        autoCapitalize='characters'
                                                        inputRef={(input) => { this.gst = input; }}
                                                        placeholder={staticText.DateofAnniversary}
                                                        returnKeyType="done"
                                                        editable={false}
                                                        value={this.state.choosenDateOfAnnvi}
                                                        // onSubmitEditing={() => this.checkValidation()}
                                                        onSubmitEditing={() => Keyboard.dismiss()}
                                                        // maxLength={15}
                                                        // style={{marginTop:10}}
                                                        onChangeText={(dateofAnniversary) => this.setState({ dateofAnniversary: dateofAnniversary.replace(/ +/g, '') })}
                                                        blurOnSubmit={false}
                                                        style={{ color: colors.number, fontFamily: fonts.Helvetica, fontSize: 14 }}
                                                        rightIcon={this.state.choosenDateOfAnnvi ? Images.Closeicon : Images.calendarsvgrepocom}
                                                    />
                                                </TouchableOpacity>

                                            </View>
                                            : null}
                                    </View>
                                </View>
                                : null}
                        </View>

                        <DateTimePickerModal
                            // customCancelButtonIOS={'Exit'}
                            // customConfirmButtonIOS={'Ok'}
                            isVisible={this.state.isDatePickerVisible}
                            mode={'date'}
                            onConfirm={(date) => this.handleConfirm(date)}
                            onCancel={(date) => this.hideDatePicker(date)}
                            dateTimePickerModal
                        />

                    </KeyboardAwareScrollView>
                    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
                        <CustomButton
                            mainStyle={styles.customSignUpButtonOneStyle}
                            title={staticText.Next}
                            onPress={() => this.onPressNext()}
                        />
                    </View>

                </View>

            </SafeAreaView>
        );        
    }

    checkValidation = () => {0
        const { companyName, pinCode, licenseNo, result, gstNo, selectedGST, drugResult, adhaarNo, selectedDrug, panNo, choosenDate } = this.state;

        let reggst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        let aadharReg = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
        let panReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        let pinReg = /^\d{5}(?:[-\s]\d{4})?$/;


        console.log('result', pinCode, selectedGST);


        if (companyName.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterCompanyNameText);
            return false;
        }
        else if (pinCode.trim() == '') {
            Alert.alert(
                staticText.projectTitle,
                staticText.enterPincode);
            return false;
        }
        else if (pinCode.length < 6) {
            Alert.alert(staticText.projectTitle,
                staticText.enterPincodeText);
            return false;
        }
        else if (licenseNo.trim() == '' && selectedDrug == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.licenseNoText);
            return false;
        }
        else if (drugResult == undefined && selectedDrug == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.upLoadFileText);
            return false;
        }
        else if (gstNo.trim() == '' && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.gstRequireText);
            return false;
        }
        else if (gstNo.length != 15 && !reggst.test(gstNo) && selectedGST == 0) {
            Alert.alert(staticText.projectTitle,
                staticText.gstValid);
            return false;
        }
        else if (result == undefined && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.upLoadFileText);
            return false;
        }
        else if (adhaarNo.trim() == '' && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.adhaarNo);
            return false;
        }
        else if (adhaarNo.length != 12 && !aadharReg.test(adhaarNo) && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.adhaarNoText);
            return false;
        }
        else if (panNo.trim() == '' && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.panNo);
            return false;
        }
        else if ((panNo.length != 10 && !panReg.test(panNo)) && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.panNoText);
            return false;
        }

        else if (choosenDate == '' && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.choosenDateText);
            return false;
        }
        else if (choosenDate == '' && selectedGST == 0) {
            Alert.alert(
                staticText.projectTitle,
                staticText.upLoadFileText);
            return false;
        }
        else {
            return true;
        }
    }

    onPressNext = async () => {
        console.log('data is coming');
        this.setState({ loading: true })
        let param ={
            UploadDrug21B:'', 
            UploadDrug20B:'', 
            UploadAadhar:'', 
            UploadPan:'',
            UploadGst:'',
            GstNo:this.state.gstNo, 
            AadharNo:this.state.adhaarNo, 
            PanNo:this.state.panNo, 
            // isAadhar(yes/ no), 
            // isPan(yes / no), 
            Pincode:this.state.pinCode, 
            CompanyName: this.state.companyName, 
            // isGst(yes / no), 
            Drug20BNo:'', 
            Drug21BNo:'', 
            // isDrugLicense(yes / no), 
            DateAnniversary:this.state.choosenDateOfAnnvi, 
            DateOfBirth:this.state.dateofBirth
        }
        let response = await Request.post('Users/KYC',param);
        console.log('responeonPressNext--->', response);
        this.setState({ loading: false })
        let responseJson = await response.json();
        console.log('responseJson+++>', responseJson);

        // if (this.checkValidation()) {
        //     // this.props.navigation.navigate('Category', { data: this.state })
        //     this.props.navigation.navigate('TitleScreen', { data: this.state })
        // }

    }
}

export default KYCRegister;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: 90
    },
    titleStyle: {
        fontSize: 32,
        color: colors.black,
        fontFamily: fonts.HelveBold,
        marginLeft: 30
    },
    customSignUpButtonOneStyle: {
        marginTop: 30,
    },
    firstView: {
        justifyContent: 'flex-end',
        height: constants.screenHeight / 4 - 30,
    },
    secondView: {
        paddingTop: 30,
        position: 'relative',
    },
});
