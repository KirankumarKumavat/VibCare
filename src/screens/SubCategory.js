import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, constants, staticText } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header, List } from '../components';
import Images from '../assets/images';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { isIphoneX } from '../utilities';

class SubCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            homeDetailsArray: []
        };
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <Header backButton /* rightIcon */
                    middleText={this.props.route.params.name} />
                {/* <KeyboardAwareScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}
                > */}
                <List
                    onPressItem={(item, index) => {
                        this.setState({ selectedCategory: item })
                        this.props.navigation.navigate('SearchResult', { id: item.id });

                    }}
                    isSubCategorySelect
                    listData={this.props.route.params.child}
                    contentContainerStyle={{ paddingBottom: isIphoneX() ? 100 : 80, paddingTop: 20, }}
                    filterStyle={{ marginTop: 0 }}
                    title="Sub Categories" />
                {/* {this.state.loading ? <Loader /> : null} */}

                {/* </KeyboardAwareScrollView> */}
            </View>
        );
    }

}

export default SubCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    contentContainerStyle: {
        flexGrow: 1,
    },

});
