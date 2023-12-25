import React, { useState, Component } from 'react';
import { View, FlatList, Pressable, Text, Image, StyleSheet, TextInput, Alert, Platform, InputAccessoryView, Keyboard, TouchableOpacity } from 'react-native';
import { Input, CustomButton, Header } from '../components';
import Images from '../assets/images'
import { colors, staticText, constants } from '../config'
import fonts from '../assets'
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Request from '../api/request';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SwipeableFlatList from 'react-native-swipeable-list'

const extractItemKey = item => {
    return item.id.toString();
};

const Item = ({ item, index }) => {
    return (
        <View style={{ width: constants.screenWidth, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: constants.screenWidth - 80, marginTop: 20, marginBottom: 20, }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }} >
                    <Image source={item.ImageData}></Image>
                    <View style={{ marginEnd: 20, marginStart: 20 }} >
                        <Text style={{ fontSize: 14, fontFamily: fonts.HelveBold, color: colors.black, }}>{item.text}</Text>
                        <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.placeholderColor, marginTop: 10 }}>{item.dateAndTime}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NotificationData: [
                {
                    id: 1,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 2,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 3,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 4,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 5,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 6,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.notificationsOrange
                },
                {
                    id: 7,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.notificationsOrange
                },
                {
                    id: 8,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 9,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.notificationsOrange

                },
                {
                    id: 10,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.sale
                },
                {
                    id: 11,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.notificationsOrange
                },
                {
                    id: 12,
                    text: 'Warner, Enjoy Extra 5% off on Ibuprofen Only for today! Shop Now',
                    dateAndTime: '10 Sep, 2022 | 10:30am',
                    ImageData: Images.notificationsOrange
                },
            ]
        }
    }


    componentDidMount = () => {

    }

    deleteItem = itemId => {
        console.log('id', itemId);
        // ! Please don't do something like this in production. Use proper state management.
        const newState = [...this.state.NotificationData];
        const filteredState = newState.filter(item => item.id !== itemId);
        return this.setState({ NotificationData: filteredState });
        //         this.setState({ notificationData: [this.state.notificationData, filteredState] });

    };

    // deleteItem = () => {
    //     alert('Are you sure you wants to delete', [
    //         {
    //             text: 'Cancel',
    //             onPress: () => console.log('Cancel Pressed'),
    //         },
    //         {
    //             text: 'OK',
    //             onPress: () => this.deleteItemWithAlert()
    //         }
    //     ]);
    // };

    QuickActions = (index, qaItem) => {
        return (
            <View style={styles.qaContainer}>
                <View style={{ backgroundColor: colors.number, width: 100, alignSelf: 'flex-end', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity style={[styles.button,]} onPress={() => this.deleteItem(qaItem.id)}>
                        <Image source={Images.DeleteTrash} ></Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    renderItemSeparator = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

    render() {
        const inputAccessoryViewID = "doneBtn";

        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>

                    <Header
                        onBackButtonPress={() => this.props.navigation.goBack()}
                        backButton /* rightIcon */
                        // onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                        middleText={staticText.notification}
                        middleTextStyle={styles.middleTextStyle}
                    />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >

                        <View style={{}}>

                            <SwipeableFlatList
                                keyExtractor={extractItemKey}
                                data={this.state.NotificationData}
                                // renderItem={this.renderListItem}

                                renderItem={({ item, index }) => (
                                    <Item item={item} index={index} deleteItem={() => this.deleteItem} />
                                )}
                                maxSwipeDistance={100}
                                style={{ paddingBottom: 100 }}
                                renderQuickActions={({ index, item }) => this.QuickActions(index, item)}
                                contentContainerStyle={styles.contentContainerStyle}
                                shouldBounceOnMount={false}
                                ItemSeparatorComponent={this.renderItemSeparator}
                            />
                            {
                                Platform.OS === "ios" &&
                                <InputAccessoryView nativeID={inputAccessoryViewID}>
                                    <View style={styles.inputAccessory}>
                                        <TouchableOpacity onPress={Keyboard.dismiss} title={"Done"} />
                                    </View>
                                </InputAccessoryView>
                            }
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,

    },
    itemSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.lineColor,
        opacity: 0.1,
        borderWidth: 0.6,
    },
    qaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainerStyle: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
});
