import React from 'react';
import { Text, View, StatusBar, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';

import { colors, constants } from '../config';
import Images from '../assets/images';
import { getStatusBarHeight, NavigationService, moderateScale, verticalScale } from '../utilities';
import fonts from '../assets';
import Input from '../components/Input';

const Header = ({
    backButton,
    onBackButtonPress,
    rightIcon,
    rightIconWithCartCount,
    cartCount,
    rightImage,
    cartItemCount,
    middleText,
    rightText,
    backIcon,
    mainStyle,
    middleTextStyle,
    backIconStyle,
    statusBarbackgroundColor,
    barStyle,
    value,
    onChangeText,
    onSubmitEditing,
    onPressRightText,
    onPress,
    onPressSearch
}) => {

    return (
        <View style={[styles.container, mainStyle]} /* style={{ flexDirection: 'row', height: 90, backgroundColor: 'red' }} */>
            <StatusBar
                barStyle={barStyle ? barStyle : 'light-content'}
                backgroundColor={colors.Orange || statusBarbackgroundColor}
            />
            <View style={styles.firstView}>
                {
                    backButton ?
                        <View
                            style={[styles.backButton]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (onBackButtonPress) onBackButtonPress();
                                    else NavigationService.goBack();
                                }}
                                activeOpacity={constants.activeOpacity}
                            >
                                <Image
                                    source={backIcon ? backIcon : Images.backIcon}
                                    resizeMode='contain'
                                    style={[styles.backIconStyle, backIconStyle]}
                                />
                            </TouchableOpacity>
                        </View>
                        : null
                }
            </View>
            <View style={styles.middleView}>
                {middleText ?
                    <Text numberOfLines={1} style={[styles.middleTextStyle, middleTextStyle]}> {middleText}</Text>
                    :
                    <Input
                        value={value}
                        onChangeText={onChangeText}
                        mainStyle={{ paddingLeft: 10, paddingRight: 0, marginHorizontal: 10, height: 42, marginBottom: 0 }}
                        style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.placeholderColor }}
                        // rightIconStyle={{}}
                        placeholder='Search by Brand, Type, Salt Name'
                        rightIcon={Images.searchIcon}
                        returnKeyType='search'
                        onSubmitEditing={onSubmitEditing}
                        onPressSearch={onPressSearch}
                    />
                }
            </View>
            {rightIcon ?
                <View style={[styles.lastView, { flex: rightText ? 0.7 : 0.3, }]}>
                    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                        <Image source={rightImage ? rightImage : Images.backIcon} resizeMode='contain'
                        />
                    </TouchableOpacity>

                    {cartItemCount > 0 && <View style={{ alignItems: 'center', justifyContent: 'center', height: 18, width: 18, position: 'absolute', bottom: 12, right: 10, borderRadius: 9, backgroundColor: colors.white, }} >
                        <Text
                            style={{ color: colors.black, textAlign: 'center', fontSize: 10, alignItems: 'center' }}>
                            {cartItemCount}</Text>
                    </View>}
                </View> : <View style={[styles.lastView, { flex: rightText ? 1 : 0.3, }]}>
                    {rightText ? <Text onPress={() => {
                        if (onPressRightText) onPressRightText();
                    }} style={styles.rightTextStyle}>{rightText}</Text> : null}
                </View>}

            {rightIconWithCartCount ?
                <View style={{ alignItems: 'center', flexDirection: 'row', marginRight: 15, justifyContent: 'center' }}>
                    <Image source={Images.whiteCart} resizeMode='contain'
                    />
                    {cartCount ? <View style={{ height: 2, width: 8, backgroundColor: colors.white, marginLeft: 5 }} /> : null}
                    <Text style={{ fontFamily: fonts.MuliBold, fontSize: 16, color: colors.white, }}>{cartCount}</Text>
                </View>
                :
                null
            }

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android'
            ? verticalScale(20) :
            (getStatusBarHeight(true) + verticalScale(10)),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: colors.Orange,
        // height: 110,
        paddingBottom: verticalScale(10),
    },
    firstView: {
        paddingLeft: 20,
    },
    middleView: {
        alignItems: 'center',
        flex: 3.5,
    },
    middleTextStyle: {
        fontFamily: fonts.MuliBold,
        fontSize: moderateScale(22),
        color: colors.white,
        marginEnd: 10
    },
    lastView: {
        alignItems: 'flex-end',
        paddingRight: 20
    },
    type1View: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(10)
    },
    type2View: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    backButton: {
    },
    backIconStyle: {
        height: moderateScale(20),
        width: moderateScale(28),
        // paddingLeft: 30
        marginStart: 10,
    },
    leftStyle: {
        fontSize: moderateScale(36),
        color: colors.grayShade6
    },
    rightStyle: {
        fontSize: moderateScale(36),
        color: colors.grayShade6,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    rightTextStyle: {
        fontSize: moderateScale(18),
        color: colors.white,
        fontFamily: fonts.Helvetica
    }
})