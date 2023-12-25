import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import { colors, constants, staticText } from '../config';
import fonts from '../assets/index';
import { Input, CustomButton, Header, List } from '../components';
import Images from '../assets/images';
import { StorageService } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';

// let listData = [{ name: "Category", id: 1 }, { name: "Sub Category", id: 1 }, { name: "Salt Name", id: 1 }, { name: "Types", id: 1 }, { name: "Offer", id: 1 }]

let listData = [{ name: "Therapeutic Segment", id: 1 }, { name: "Salt Composition", id: 1 }, { name: "Division", id: 1 }, { name: "Packing", id: 1 }, { name: "Packing Type", id: 1 }, { name: "Packing Form", id: 1 }, { name: "Offer", id: 1 }]
// Analeptics Antacids Antimycotics Antiobesity Drug Blood Modifier Agents BPH Agents Cardiovascular Cerebral Stimulants Emulsion Essential Minerals Glucocorticoids
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            homeDetailsArray: [{ label: 'Analeptics', name: 'Analeptics', id: 0 }, { label: 'Antacids', name: 'Antacids', id: 1 }, { label: 'Antimycotics', name: 'Antimycotics', id: 2 }, { label: 'Drug', name: 'Drug', id: 3 }],
            selectedFilter: 0,
            subCategoryArray: [{ label: 'Analeptics', name: 'Analeptics', id: 0 }, { label: 'Analeptics', name: 'Analeptics', id: 0 }],
            saltNameArray: [],
            offerArray: [],
            arrayholder: [],
            typesArray: [{ label: 'Tablets', name: 'Tablets', id: 0 }, { label: 'Injection', name: 'Injection', id: 1 }, { label: 'Cream', name: 'Cream', id: 2 }, { label: 'Capsules', name: 'Capsules', id: 3 }],
            showImage: 'undefined',
            showCheckMarkForSubCategory: 'undefined',
            showCheckMarkForSaltName: 'undefined',
            showCheckMarkForOffer: 'undefined',
            showCheckMarkForTypeName: 'undefined',
            isSearched: false,
            categoryId: '',
            subCategoryId: '',
            saltNameId: '',
            offerNameId: '',
            typeNameId: '',
            selectedCategory: 0
        };
    }

    componentDidMount = () => {
        let params = this.props.route.params
        // this.setState({ saltNameArray: params.filterArray[0] && params.filterArray[0].options, offerArray: params.filterArray[1] && params.filterArray[1].options }, () => {
        // })
        this.getHomeScreenData();
    }

    render() {
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <View style={styles.container}>
                    <Header
                        backButton
                        // onBackButtonPress={() => this.props.navigation.navigate('SearchResult', { backPressed: true })}
                        middleText={staticText.filter}
                        middleTextStyle={styles.middleTextStyle}
                        rightText={'Apply'}
                        onPressRightText={this.onPressApplyButton}
                    />
                    <KeyboardAwareScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainerStyle}
                    >
                        <View style={styles.filterOptions}>
                            <View style={styles.filterListView}>
                                <FlatList
                                    data={listData}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    style={{ fontSize: 14, fontFamily: fonts.Helvetica, color: colors.textColor }}
                                    renderItem={this.renderListItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <View style={{}}>
                                {/* {this.state.loading == false &&  */}
                                <View style={{}}>
                                    <Input
                                        value={this.state.search}
                                        onChangeText={text => this.searchFilterFunction(text.trim())}
                                        mainStyle={styles.searchInputStyle}
                                        style={styles.inputStyle}
                                        rightIconStyle={styles.searchIconStyle}
                                        placeholder='Search'
                                        rightIcon={Images.searchIcon}
                                        returnKeyType='search'
                                    />
                                </View>
                                {/* } */}
                                <FlatList
                                    data={this.getData()}
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={this.renderList}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListEmptyComponent={this.ListEmptyComponent}
                                    contentContainerStyle={{ flexGrow: 1, }}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView >
                    {/* {this.state.loading ? <Loader /> : null} */}
                </View >
            </SafeAreaView>
        );
    }

    getHomeScreenData = async () => {
        this.setState({ loading: true });
        let response = await Request.get(`${constants.apiVersion}/home`);
        // this.setState({ loading: false, homeDetailsArray: response.data.data.categories, arrayholder: [...response.data.data.categories] }, () => {
        // });
    }

    onPressApplyButton = async () => {
        this.props.navigation.navigate('Cart')


        // this.setState({ loading: true });
        // let productArray, response;
        // // https://arthcrm.com:2087/Items/GetItemsOnFilterSearch?form=Tablets&division=PRIMA&therapeutic=NSAID'S&packing=Alu Alu&packingType=10x10&pageNumber=0&sortDesc=0


        // var requestOptions = {
        //     method: 'POST',
        //     redirect: 'follow'
        // };

        // await fetch(`https://arthcrm.com:2087/Items/GetItemsOnFilterSearch?form=${this.state.typeNameId}&division=PRIMA&therapeutic=NSAID'S&packing=Alu Alu&packingType=10x10&pageNumber=0&sortDesc=0`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => {
        //         let dummyArray = JSON.parse(result)
        //         productArray = dummyArray.list
        //         console.log("check result --", productArray)
        //     })
        //     .catch(error => console.log('error', error));

        // productArray = response.data.products;
        // productArray = response.data.products;
        // if (this.state.categoryId) {
        //     if (this.state.offerNameId && this.state.saltNameId == '') {
        //         if (this.props.route.params.sortingDone) {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&sort=${this.props.route.params.sortingDone}&filter[offer]=${this.state.offerNameId}`);
        //         } else {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&filter[offer]=${this.state.offerNameId}`);
        //         }
        //         productArray = response.data.products;
        //     }
        //     else if (this.state.offerNameId == '' && this.state.saltNameId) {
        //         if (this.props.route.params.sortingDone) {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&sort=${this.props.route.params.sortingDone}&filter[salt_name]=${this.state.saltNameId}`);
        //         }
        //         else {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&filter[salt_name]=${this.state.saltNameId}`);

        //         }
        //         productArray = response.data.products;
        //     }
        //     else if (this.state.offerNameId && this.state.saltNameId) {
        //         if (this.props.route.params.sortingDone) {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&sort=${this.props.route.params.sortingDone}&filter[salt_name]=${this.state.saltNameId}&filter[offer]=${this.state.offerNameId}`);
        //         } else {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&filter[salt_name]=${this.state.saltNameId}&filter[offer]=${this.state.offerNameId}`);
        //         }
        //         productArray = response.data.products;
        //     }
        //     else {
        //         if (this.props.route.params.sortingDone) {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}&sort=${this.props.route.params.sortingDone}`);
        //         } else {
        //             response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.state.subCategoryId ? this.state.subCategoryId : this.state.categoryId}`);
        //         }
        //         productArray = response.data.products;
        //     }
        // }

        // console.log("productArrayproductArrayproductArray ---", productArray);
        // this.setState({ loading: false }, () => {
        //     this.props.navigation.navigate('SearchResult', { productsArray: productArray })
        // });
    }

    getData = () => {
        if (this.state.selectedFilter == 0) {
            if (this.state.isSearched) {
                return (this.state.arrayholder)
            }
            else {
                return (this.state.homeDetailsArray)
            }
        }
        else if (this.state.selectedFilter == 1) {
            if (this.state.isSearched) {
                return (this.state.arrayholder)
            }
            else {
                return (this.state.subCategoryArray)
            }
        }
        else if (this.state.selectedFilter == 2) {
            if (this.state.isSearched) {
                return (this.state.arrayholder)
            }
            else {
                return (this.state.saltNameArray)
            }
        }
        else if (this.state.selectedFilter == 3) {
            if (this.state.isSearched) {
                return (this.state.arrayholder)
            }
            else {
                return (this.state.typesArray)
            }
        }
        else if (this.state.selectedFilter == 4) {
            if (this.state.isSearched) {
                return (this.state.arrayholder)
            }
            else {
                return (this.state.offerArray)
            }
        }
    }

    renderList = ({ item, index }) => {

        console.log("item of selected item -----", item.name);
        const { text, name, location_name } = item;

        return (
            <View>
                <TouchableOpacity
                    key={index}
                    style={[styles.itemMainView]}
                    activeOpacity={constants.activeOpacity}
                    onPress={() => {
                        if (this.state.selectedFilter == 0) {
                            this.onPressItem(item, index)
                        }
                        else if (this.state.selectedFilter == 1) {
                            this.onPressItemSubCategoryList(item, index)
                        }
                        else if (this.state.selectedFilter == 2) {
                            this.onPressItemSaltNameList(item, index)
                        }
                        else if (this.state.selectedFilter == 3) {
                            this.onPressItemTypeList(item, index)
                        }
                        else if (this.state.selectedFilter == 4) {
                            this.onPressItemOfferList(item, index)
                        }
                    }}>


                    <Text style={[styles.itemText]}>
                        {name || item.label}
                    </Text>
                    {this.state.selectedFilter == 0 && this.state.showImage == item.id ? <Image source={Images.checkMarkIcon} /> : null}
                    {this.state.selectedFilter == 1 && this.state.showCheckMarkForSubCategory == item.id ? <Image source={Images.checkMarkIcon} /> : null}
                    {this.state.selectedFilter == 2 && this.state.showCheckMarkForSaltName == item.id ? <Image source={Images.checkMarkIcon} /> : null}
                    {this.state.selectedFilter == 3 && this.state.showCheckMarkForTypeName == item.id ? <Image source={Images.checkMarkIcon} /> : null}
                    {this.state.selectedFilter == 4 && this.state.showCheckMarkForOffer == item.id ? <Image source={Images.checkMarkIcon} /> : null}
                </TouchableOpacity>
            </View>
        )
    }

    renderListItem = ({ item, index }) => {
        return (
            <TouchableOpacity disabled={this.state.selectedCategory == undefined ? true : false} onPress={() => {
                this.setState({
                    selectedFilter: index,
                    isSearched: false

                }, () => {
                })
            }} style={styles.filterFlatlistView}>
                <Text numberOfLines={2} style={[{ color: this.state.selectedFilter === index ? colors.headerColor : colors.textColor }, styles.filterFlatListText]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    ListEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <Text style={styles.itemText}>{this.state.loading ? '' : staticText.noData}</Text>
        </View>
    )

    onPressItem = (item, index) => {
        this.setState({
            showImage: this.state.selectedFilter == 0 ? item.id : 'undefined',
            selectedCategory: index,
            categoryId: item.id,
            subCategoryArray: ''

        }, () => {
            if (item.children) {
                this.setState({ subCategoryArray: item.children }, () => {
                })
            }
        })
    }

    onPressItemSubCategoryList = (item, index) => {
        this.setState({
            showCheckMarkForSubCategory: item.id,
            subCategoryId: item.id
        })
    }

    onPressItemSaltNameList = (item, index) => {
        this.setState({
            showCheckMarkForSaltName: item.id, saltNameId: item.id
        })
    }

    onPressItemTypeList = (item, index) => {
        this.setState({
            showCheckMarkForTypeName: item.id, typeNameId: item.name
        })
    }

    onPressItemOfferList = (item, index) => {
        this.setState({
            showCheckMarkForOffer: item.id, offerNameId: item.id
        })
    }

    searchFilterFunction(text) {
        if (text == '') {
            this.setState({ isSearched: false, searchText: text, homeDetailsArray: [...this.state.homeDetailsArray] });
            return
        }
        var searchCategory = []
        this.setState({ isSearched: true, searchText: text });

        if (this.state.selectedFilter == 0) {
            this.state.homeDetailsArray.map((item, index) => {
                if (item.name.toLowerCase().includes(text.toLowerCase())) {
                    searchCategory.push(item);
                }
            });
        }
        else if (this.state.selectedFilter == 1) {
            this.state.subCategoryArray.map((item, index) => {
                if (item.name.toLowerCase().includes(text.toLowerCase())) {
                    searchCategory.push(item);
                }
            });
        }
        else if (this.state.selectedFilter == 2) {
            this.state.saltNameArray.map((item, index) => {
                if (item.label.includes(text.toLowerCase())) {
                    searchCategory.push(item);
                }
            });
        }
        else if (this.state.selectedFilter == 3) {
            this.state.typesArray.map((item, index) => {
                if (item.label.toLowerCase().includes(text.toLowerCase())) {
                    searchCategory.push(item);
                }
            });
        }
        else if (this.state.selectedFilter == 4) {
            this.state.offerArray.map((item, index) => {
                if (item.label.toLowerCase().includes(text.toLowerCase())) {
                    searchCategory.push(item);
                }
            });
        }
        this.setState({ arrayholder: searchCategory }, () => {
        })
    }
}

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView:
        { flex: 1 },
    contentContainerStyle: {
        flexGrow: 1,
    },
    filterOptions: {
        flex: 1,
        flexDirection: 'row',
    },
    filterListView: {
        width: '40%',
        backgroundColor: colors.white,
        borderRightWidth: 1,
        borderColor: colors.borderDark,
    },
    searchInputStyle: {
        marginTop: 15,
        marginHorizontal: 10,
        height: 38,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.borderDark,

    },
    filterFlatlistView: {
        height: 45,
        borderBottomWidth: 0.9,
        borderBottomColor: colors.shadow,
        justifyContent: 'center',
    },
    filterFlatListText: {
        marginHorizontal: 15,
        fontSize: 16,
        fontFamily: fonts.Helvetica
    },

    title: {
        fontSize: 18,
        color: colors.placeholderColor,
        paddingRight: 10,
        fontFamily: fonts.Muli,
        flex: 1
    },
    wrapView: {
        paddingHorizontal: 15,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 15
    },
    itemMainView: {
        // flex: 1,
        width: constants.screenWidth / 1.8,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,

        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 5,
        shadowRadius: 6,
        shadowOffset: {
            height: 3,
            width: 0,
        },
        marginTop: 3,

    },
    itemText: {
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.Helvetica,
        flex: 0.9
    },
    containerView: {
        marginTop: 20
    },
    inputStyle:
    {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        marginLeft: -10
    },
    searchIconStyle: {
        marginRight: 5,
        height: 16,
        width: 16
    },
    middleTextStyle: {
        color: colors.white,
        fontFamily: fonts.HelveBold,
        fontSize: 22,
    },

});
