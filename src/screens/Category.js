import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton, Header, List } from '../components';
import Images from '../assets/images';
import { isIphoneX, StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DrawerActions } from '@react-navigation/native';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            homeDetailsArray: [
            ]
        };
    }

    componentDidMount = () => {
        this.getHomeScreenData();
    }

    getHomeScreenData = async () => {
        this.setState({ loading: true });
        let response = await Request.get(`${constants.apiVersion}/home`);
        if (response) {
            this.setState({ loading: false, homeDetailsArray: response.data.data.categories }, () => {
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} backIcon={Images.list} backButton /* rightIcon */
                    middleText={staticText.Categories} />
                {/* <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                > */}
                <List onPressItem={(item, index) => {
                    this.setState({ selectedCategory: item })
                    if (item.children) {
                        this.props.navigation.navigate('SubCategory', { name: item.name, child: item.children });
                    } else {
                        this.props.navigation.navigate('SearchResult', { name: item.name, id: item.id });
                    }
                }}
                    // shownextArrow
                    listData={this.state.homeDetailsArray}
                    title="Categories"
                    loader={this.state.loading}
                    filterStyle={{ marginTop: 0 }}
                    contentContainerStyle={{ paddingBottom: isIphoneX() ? 100 : 80, paddingTop: 20, }}
                />
                {/* {this.state.loading ? <Loader /> : null} */}

                {/* </KeyboardAwareScrollView> */}
            </View>
        );
    }
    renderItem = ({ item, index }) => {
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        )
    }
}

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },

});
