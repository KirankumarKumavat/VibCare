import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import PropTypes from 'prop-types';
import { colors, constants } from '../config';
import { verticalScale, moderateScale } from '../utilities';
import fonts from '../assets';
import Images from '../assets/images';

const CustomButton = ({
    titleStyle,
    title,
    onPress,
    disabled,
    activeOpacity,
    mainStyle,
    imageIcon,
    image,
    imageStyle
}) => {
    /**
     * Custom button Comman rendring
    */
    return (

        <TouchableOpacity
            onPress={onPress}
            activeOpacity={activeOpacity || constants.activeOpacity}
            disabled={disabled}
            style={[styles.container, mainStyle]}
        >
            {imageIcon ? <Image source={image ? image : Images.FBIcon} style={imageStyle} width={40} height={40}
                /* style={{ marginHorizontal: 10 }} */ /> : null}
            <Text style={[styles.title, titleStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

//todo Add Fonts....
const styles = StyleSheet.create({
    container: {
        height: verticalScale(48),
        flexDirection: 'row',
        width: constants.screenWidth - 60,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30,
        borderRadius: moderateScale(6),
        backgroundColor: colors.Orange,
        // IOS
        // shadowColor: 'rgba(253, 218, 195,1)',
        // shadowOffset: { width: 6, height: 6 },
        // shadowOpacity: 6,
        // shadowRadius: 6,
        // Android
        // elevation: 6,
    },
    title: {
        fontSize: 18,
        color: colors.white,
        fontFamily: fonts.HelveBold,
        textAlign: 'center',
    }
});

/**
 * Custom button component propes type for changeing style
 * and button click envet and initial value
 */
CustomButton.propTypes = {
    style: PropTypes.any,
    title: PropTypes.string,
    onPress: PropTypes.func,
    titleStyle: PropTypes.any,
    isWhite: PropTypes.bool,
    disabled: PropTypes.bool
}

export default CustomButton;
