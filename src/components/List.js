import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Keyboard } from 'react-native';
import { colors, constants } from '../config';
import { moderateScale, scale, verticalScale } from '../utilities';
import fonts from '../assets/index';
import Images from '../assets/images';


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            activeIndex: this.props.activeIndex || -1
        };
    }

    render() {
        const { value, imageSource, titleStyle, listData, imageStyle, disabled, containerStyle, filterStyle, contentContainerStyle } = this.props;
        const { isVisible } = this.state;
        return (
            <View style={[styles.container, containerStyle]}>
                <View style={filterStyle ? filterStyle : styles.containerView}>
                    <FlatList
                        data={listData}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.renderListItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                        ListEmptyComponent={this.ListEmptyComponent}
                        contentContainerStyle={contentContainerStyle}
                    />
                </View>
            </View>
        );
    }

    ItemSeparatorComponent = () => (<View style={styles.divider} />)

    ListEmptyComponent = () => (
        <>
            {!this.props.loader &&
                <View style={{ height: constants.screenHeight - 30, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.itemText}>{'No' + ' '} {this.props.title} {'Found'} </Text>
                </View>
            }
        </>
    )

    renderListItem = ({ item, index }) => {
        const { text, name, location_name } = item;
        const { renderItemStyle } = this.props
        return (
            <TouchableOpacity
                key={index}
                style={[styles.itemMainView, renderItemStyle]}
                activeOpacity={constants.activeOpacity}
                onPress={() => this.onPressItem(item, index)}
            >
                <Text style={[styles.itemText]}>
                    {name || ''}
                </Text>
                {this.props.isSubCategorySelect && this.state.activeIndex == index && <Image source={Images.checkMarkIcon} />}
                {this.props.shownextArrow && <Image source={Images.nextArrow} />}
            </TouchableOpacity>
        )
    }

    onPressItem = (item, index) => {
        this.setState({ activeIndex: index })
        this.props.onPressItem(item, index)
        this.onPress();
    }

    onPress = () => {
        Keyboard.dismiss()
        this.setState({ isVisible: !this.state.isVisible }, () => {
        })
    }
}

export default List;

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: moderateScale(18),
        color: colors.placeholderColor,
        paddingRight: scale(10),
        fontFamily: fonts.Muli,
        flex: 1
    },
    wrapView: {
        paddingHorizontal: moderateScale(15),
        paddingLeft: moderateScale(10),
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: verticalScale(15)
    },
    itemMainView: {
        flex: 1,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginHorizontal: 10,
        paddingHorizontal: moderateScale(15),
        paddingVertical: verticalScale(15),

        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 3,
            width: 0,
        },
    },
    itemText: {
        fontSize: moderateScale(16),
        color: colors.black,
        fontFamily: fonts.Muli
    },
    divider: {

    },
    containerView: {
        marginTop: 20
    }
})
