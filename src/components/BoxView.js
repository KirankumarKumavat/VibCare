import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

import { colors, constants } from '../config';
import * as common from '../config/functions'
import Images from '../assets/images';
import { moderateScale, verticalScale, scale } from '../utilities';
import fonts from '../assets';
import { CustomButton } from '../components';

const BoxView = ({
    mainStyle,
    data,
    dataView,
    relatedProductDataView,
    renderItems,
    onPress,
    ListHeaderComponent,
    cartButtton,
    onPressAddToCart,
    addRemoveProductFromCart
}) => {

    const renderItem = ({ item, index }) => {
        return (
            <>
                {
                <View
                    style={[styles.container, {}]}>
                    <>
                        <TouchableOpacity
                            activeOpacity={constants.activeOpacity}
                            onPress={() => onPress ? onPress({ item, index }) : ''}
                        >
                            <Image
                                defaultSource={Images.placeholderDefault}
                            resizeMode={item.image && common.checkUrl(item.image) ? "cover" : 'contain'}
                            source={item.image && common.checkUrl(item.image) ? { uri: item.image } : Images.placeholderImageSmall}
                            style={item.image && common.checkUrl(item.image) ? [styles.imageStyle] : [styles.placeholderImageStyle]}
                            />
                            {dataView && 
                            <View style={{ marginBottom: 10 }}>
                                <View style={[styles.nameStyleView, { justifyContent: item.old_price != '' ? 'space-between' : 'flex-start', }]}>
                                    <Text style={styles.nameStyleText}
                                        numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    {(item.old_price != '' || item.old_price != null) && 
                                    <Image style={styles.saleIconStyle} source={Images.saleIcon} />
                                    } 
                                </View>
                                <Text
                                    style={styles.typeStyle}
                                    numberOfLines={1}>
                                    {/* {'4545'} */}
                                    {item.type}
                                </Text>
                                <View style={styles.priceViewWrap}>
                                    {item.old_price != '' &&
                                    <Text style={styles.oldPriceStyle}
                                        numberOfLines={1}>
                                        {/* {'fhfh'} */}
                                        {item.old_price}
                                    </Text>
                                     } 
                                    <Text style={styles.newPriceStyle}
                                        numberOfLines={1}>
                                        {/* {'5455'} */}
                                        {item.price}
                                    </Text>
                                </View>
                            </View>
                            }
                            {relatedProductDataView &&
                            <View style={{ marginBottom: 5, }}>
                                <View style={[styles.nameStyleView, { justifyContent: item.old_price != '' ? 'space-between' : 'flex-start', }]}>
                                    <Text style={styles.nameStyleText}
                                        numberOfLines={1}>
                                        {/* {'jjjjj'} */}
                                        {item.name}
                                    </Text>
                                    {(item.old_price != null) && 
                                    <Image style={styles.saleIconStyle} source={Images.saleIcon} />
                                 }

                                </View>
                                <Text
                                    style={styles.typeStyle}
                                    numberOfLines={1}>
                                    {item.type}
                                </Text>
                                <View style={styles.priceViewWrap}>
                                    {/* {item.old_price != '' && */}
                                    <Text style={styles.oldPriceStyle}
                                        numberOfLines={1}>
                                        {/* {item.old_price} */}
                                        {'989'}
                                    </Text>
                                    {/* } */}
                                    <Text style={styles.newPriceStyle}
                                        numberOfLines={1}>
                                        {'8989'}
                                        {/* {item.price} */}
                                    </Text>
                                </View>

                            </View>
                            }
                        </TouchableOpacity>
                    </>
                    {cartButtton &&
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
                                <TouchableOpacity
                                    onPress={() => addRemoveProductFromCart(item, index, 'minus')}
                                    disabled={item.max_qty == 1 ? true : false}
                                    activeOpacity={0.8}>
                                    <Image style={{}}
                                        resizeMode={'cover'}
                                        source={Images.minusOld} />
                                </TouchableOpacity>
                                <Text
                                    style={styles.productCount}>
                                    {item.min_qty}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => addRemoveProductFromCart(item, index, 'add')}
                                    activeOpacity={0.8}>
                                    <Image style={{}}
                                        resizeMode='cover'
                                        source={Images.plusOld} />
                                </TouchableOpacity>

                            </View>
                            <CustomButton
                                onPress={() => onPressAddToCart(item)}
                                disabled={item.in_stock ? false : true}
                                titleStyle={{ fontSize: 12 }}
                                mainStyle={[styles.buttonStyle, { backgroundColor: item.in_stock ? colors.Orange : colors.outOfStock }]}
                                title={item.in_stock ? 'Add to Cart' : 'Out of Stock'}
                            />
                        </View>
                    }
                </View>
                } 
            </>
        );
    };
    return (
        <View style={[mainStyle]} >
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={data}
                renderItem={(item, index) => renderItems ? renderItems(item) : renderItem(item, index)}
                // keyExtractor={(index) => index}
                keyExtractor={(item, index) => (index.toString())}
                horizontal
                bounces={false}
                extraData={data}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={ListHeaderComponent}
            />
        </View>
    );
};

export default BoxView;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        // backgroundColor: colors.white,
        width: constants.screenWidth / 2 - 30,
        marginHorizontal: 10,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 5.15,
        shadowOffset: {
            height: 4.2,
            width: -0.79,
        },
    },
    contentContainerStyle: {
        marginHorizontal: 10,
        paddingVertical: scale(20),
    },
    imageStyle: {
        borderRadius: 10,
        height: verticalScale(100),
        width: '100%',
        alignSelf: 'stretch',
    },
    placeholderImageStyle: {
        height: verticalScale(90),
        marginTop: 10,
        width: '100%',
    },
    nameStyleView: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    nameStyleText: {
        width: '60%',
        marginLeft: 10,
        color: colors.textColor,
        fontFamily: fonts.Helvetica,
        fontSize: 16,
    },
    saleIconStyle: { marginTop: 5, marginRight: 10 },
    typeStyle: {
        marginTop: 5, width: '80%', marginLeft: 10,
        color: colors.placeholderColor, fontFamily: fonts.Helvetica, fontSize: 12,
    },
    priceViewWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginHorizontal: 10,
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    oldPriceStyle: {
        marginTop: 5,
        textDecorationLine: 'line-through',
        marginRight: 10,
        color: colors.placeholderColor,
        fontFamily: fonts.MuliSemiBold,
        fontSize: 11,
    },
    newPriceStyle: {
        marginTop: 5,
        color: colors.priceColor,
        fontFamily: fonts.MuliSemiBold,
        fontSize: 14,
    },
    firstView: {
        flex: 0.3,
        paddingLeft: 20
    },
    middleView: {
        alignItems: 'center',
        flex: 3
    },
    lastView: {
        flex: 0.3,
        alignItems: 'flex-end',
        paddingRight: 15
    },
    type1View: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(10)
    },
    buttonStyle: {
        marginTop: 0,
        width: constants.screenWidth / 3 - 15,
        height: 28,
        marginBottom: 10
    },

})