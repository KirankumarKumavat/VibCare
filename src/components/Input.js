import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';
import { colors, constants } from '../config';
import { verticalScale, moderateScale, scale } from '../utilities';
import fonts from '../assets/index';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * comman text input component
*/
const Input = (props) => {
    /**
     * component rendring method
    */
    //   KeyboardType = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';
    return (
        <View style={[styles.mainContainer, props.mainStyle]}>
            {props.leftIcon ?
                <Image source={props.leftIcon} resizeMode="contain" style={[props.leftIconStyle ? props.leftIconStyle : styles.iconStyle]} /> : null
            }
            <TextInput
                underlineColorAndroid='transparent'
                ref={props.inputRef}
                style={[styles.container, props.style]}
                value={props.value}
                inlineImageLeft={props.inlineImageLeft}
                inlineImagePadding={props.inlineImagePadding}
                label={props.label}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor || colors.placeholderColor}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
                autoCapitalize={props.autoCapitalize}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                editable={props.editable}
                returnKeyType={props.returnKeyType}
                secureTextEntry={props.secureTextEntry}
                inputAccessoryViewID={props.inputAccessoryViewID}
                onSubmitEditing={props.onSubmitEditing}
                maxLength={props.maxLength}
                selectionColor={props.selectionColor}
                textContentType={props.textContentType}
                blurOnSubmit={props.blurOnSubmit}
                spellCheck={false}
                autoCorrect={false}
                showSoftInputOnFocus={props.showSoftInputOnFocus}
                contextMenuHidden={props.contextMenuHidden}
                textAlignVertical={'top'}
            />
            {props.rightIcon ?
                <TouchableOpacity activeOpacity={0.5} onPress={props.onPressSearch}>
                    <Image source={props.rightIcon} resizeMode="contain" style={[props.rightIconStyle ? props.rightIconStyle : styles.iconStyle]} />
                </TouchableOpacity>
                : null
            }
            {/* <Image
                source={props.imageSource}
                resizeMode={'cover'}
                style={props.imageStyle}
            /> */}
        </View>
    )
}

/**
 * component styling
 */
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height: 48,
        // width: constants.screenWidth - 40,
        paddingHorizontal: moderateScale(10),
        paddingLeft: moderateScale(17),
        marginBottom: verticalScale(16),
        borderRadius: moderateScale(8),
        alignItems: 'center',
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

    // container: {
    //     flex: 1,
    //     paddingHorizontal: 0,
    //     fontSize: moderateScale(18),
    //     color: colors.textColor,
    //     paddingRight: scale(10),
    //     fontFamily: fonts.Muli,
    // },

    container: {
        flex: 1,
        marginHorizontal: 5,
        fontSize: moderateScale(18),
        // borderBottomColor: Color.gray,
        paddingRight: scale(10),
        width: '100%',
        color: colors.black,
        fontFamily: fonts.Muli,
        zIndex: 99999,
    },
    iconStyle: {
        alignSelf: 'center',
        marginRight: scale(5),
    },
});

/**
 * cpmponent propes types
 * Handle comman style and all other propes of text input 
*/
Input.propTypes = {
    style: PropTypes.any,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
    editable: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    inputRef: PropTypes.func,
    multiline: PropTypes.bool,
    inputAccessoryViewID: PropTypes.string,
    maxLength: PropTypes.number,
    textContentType: PropTypes.string,
    imageSource: PropTypes.any,
    imageStyle: PropTypes.any,
    blurOnSubmit: PropTypes.bool,
    onPressSearch: PropTypes.func
}

export default Input;
