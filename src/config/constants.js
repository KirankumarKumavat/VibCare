import { Platform, Dimensions } from 'react-native';
import { colors } from '.';


const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const { width, height } = Dimensions.get('window');
const isLandscape = width > height;
const isPortrait = width < height;
const activeOpacity = 0.5;
const AppVersion = 1.0;
// const APIBaseUrl = 'https://evermed.in';
// ValidateMobile
const APIBaseUrl = 'https://arthcrm.com:2087';
const apiCustomerVersion = 'rest/V1/vibcare/customer';
const apiVersion = 'rest/V1/vibcare';
const apiMobVersion = 'mobapi/account';
const apiCartVersion = 'rest/V1/vibcare/cart';
const apiSocialLoginVersion = 'rest/V1/vibcare/social';
const auth_token = 'Bearer ox3wsFkQlD98761mx2ic1jjs85q0w4';
const KYCPending = 'KYC is pending, it’s required to Place the order!';
const KYCRejected = 'Your KYC is rejected, to submit again , '
const appName = "VibCare"
const constants = {

    isIOS,
    isAndroid,
    screenWidth: width,
    screenHeight: height,
    isLandscape,
    isPortrait,
    activeOpacity,
    AppVersion,
    APIBaseUrl,
    auth_token,
    KYCPending,
    KYCRejected,
    apiCustomerVersion,
    apiVersion,
    apiMobVersion,
    apiCartVersion,
    apiSocialLoginVersion,
    appName,
};

export const customStyles = {
    stepIndicatorSize: 10,
    currentStepIndicatorSize: 12,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 6,
    stepStrokeCurrentColor: '#23A33A',
    stepStrokeWidth: 5,
    stepStrokeFinishedColor: '#23A33A',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#23A33A',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colors.textColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: colors.textColor,
    stepIndicatorLabelUnFinishedColor: colors.textColor,
    labelColor: colors.textColor,
    labelSize: 16,
    currentStepLabelColor: colors.textColor,
    labelAlign: "flex-start"
}



export default constants;
