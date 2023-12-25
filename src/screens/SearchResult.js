import React, { Component } from 'react';
import { View, BackHandler, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Image, ImageBackground, Alert } from 'react-native';
import { colors, constants, staticText, common } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../assets/index';
import { Input, CustomButton, Header, List, ModalComponent } from '../components';
import Images from '../assets/images';
import { StorageService, verticalScale, moderateScale, scale, NavigationService, } from '../utilities';
import Request from '../api/request';
import { Loader } from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';
import { NavigationEvents } from '@react-navigation/compat';
import _ from 'lodash';


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            email: '',
            password: '',
            initializing: false,
            loading: false,
            homeDetailsArray: [],
            productCount: 1,
            qty: 1,
            selected: 1,
            isAdded: false,
            productsData: [
                {
                    id: 1,
                    imageLogo: Images.LogoMedicine,
                    MedicineImageac: Images.MedicineImageac,
                    medcineName: 'PRIMA',
                    brandname: 'Apofec',
                    medicineDescription: 'Aceclofenac 100mg + Paracetamol\n325mg serratiopeptidase…',
                    nsaidsName: 'NSAIDs',
                    tabletIcon: Images.tableticon,
                    tabletType: 'Tablet',
                    tabletSize: '10x10',
                    type: 'Alu Alu',
                    mrpValue: '₹.320',
                    ptsValue: '₹.200',
                    ptrValue: '₹.250',
                    MinimumOrderquantityValue: '10',
                    finalValue: '₹.120',
                    discValue: '₹.108',
                    addnumber: '2'
                },
                {
                    id: 2,
                    imageLogo: Images.LogoMedicine,
                    MedicineImageac: Images.MedicineImageac,
                    medcineName: 'PRIMA',
                    brandname: 'Apofec',
                    medicineDescription: 'Aceclofenac 100mg + Paracetamol\n325mg serratiopeptidase…',
                    nsaidsName: 'NSAIDs',
                    tabletIcon: Images.tableticon,
                    tabletType: 'Tablet',
                    tabletSize: '10x10',
                    type: 'Alu Alu',
                    mrpValue: '₹.320',
                    ptsValue: '₹.200',
                    ptrValue: '₹.250',
                    MinimumOrderquantityValue: '10',
                    finalValue: '₹.120',
                    discValue: '₹.108'
                },
                {
                    id: 1,
                    imageLogo: Images.LogoMedicine,
                    MedicineImageac: Images.MedicineImageac,
                    medcineName: 'PRIMA',
                    brandname: 'Apofec',
                    medicineDescription: 'Aceclofenac 100mg + Paracetamol\n325mg serratiopeptidase…',
                    nsaidsName: 'NSAIDs',
                    tabletIcon: Images.tableticon,
                    tabletType: 'Tablet',
                    tabletSize: '10x10',
                    type: 'Alu Alu',
                    mrpValue: '₹.320',
                    ptsValue: '₹.200',
                    ptrValue: '₹.250',
                    MinimumOrderquantityValue: '10',
                    finalValue: '₹.120',
                    discValue: '₹.108'
                }
            ],
            filters: [],
            modal: false,
            selectedSortOption: -1,
            onScrollLoading: false,
            has_more: 0,
            page: 1,
            sortingDone: '',
            sortClicked: false,
            imageError: false,
            insideLoadMore: false,
            search: "",
            sorting: [{ label: 'Price - Low to High', code: 0 }, { label: 'Price - High to Low', code: 1 }, { label: 'MRP - Low to High', code: 2 }, { label: 'MRP - High to Low', code: 3 }]
        };
    }


    componentDidMount = () => {
        // this.setState({ search: this.props.route.params.searchKeyword })
        this.getSearchResult();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        // this.props.navigation.goBack();
    }

    getSearchResultData = async () => {
        if (this.state.search) {
            this.setState({ loading: true, search: this.state.search }, async () => {
                let response;
                if (!this.state.search && this.props.route.params.id) {
                    response = await Request.get(`${constants.apiVersion}/products?category_id=${this.props.route.params.id}&page=${this.state.page}`);
                }
                else {
                    response = await Request.get(`${constants.apiVersion}/products/search?query=${this.state.search}`);
                }
                this.setState({
                    loading: false,
                    has_more: response.data.has_more,
                    sorting: response.data.sorting,
                    products: response.data.products,
                    sorting: response.data.sorting,
                    page: response.data.current_page
                });
                let product = this.state.products;
                product.map((p) => {
                    p.qty = p.min_qty;
                })
                this.setState({ products: product }, () => {
                })
                if (response.data.success == 0 && this.state.loading == false) {
                    this.setState({ noData: response.data.message })
                }
                if (response.data.has_more > 0 && this.state.onScrollLoading) {
                    let resp = await Request.get(`${constants.apiVersion}/products?category_id=${this.props.route.params.id}&page=${this.state.page}`);

                    let businesses = [...this.state.products, ...resp.data.products]
                    this.setState({
                        products: businesses,
                        onScrollLoading: false,
                        //  atEndReach: response.data.products.length == this.state.limit ? false : true,
                    })

                }
                else {
                    this.setState({
                        ...(this.state.page === 1 ? this.state.products : []),
                        loading: false,
                        atEndReach: true
                    })
                }
            });
        }
    }
    getSearchResult = async (search, isFromPagination) => {

        console.log("search --->", this.props.route.params.searchKeyword);
        this.setState({ itemCount: await StorageService.getItem('ItemCount') })
        //TODO---->handle more data based on search and category
        let response;
        if (isFromPagination) { }
        else { this.setState({ loading: true, }) }

        if (this.props.route.params) {
            if (search) {
                // response = await Request.get(`${constants.apiVersion}/products/search?query=${this.state.search}`);

                var requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };

                await fetch(`https://arthcrm.com:2087/Items/GetItemsOnSearch?val=${this.state.search}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        // console.log("resssss ----", result);
                        response = JSON.parse(result)
                        console.log("response1 new request---->", JSON.parse(result))
                    })
                    .catch(error => console.log('error', error));


            }
            else {
                if (this.props.route.params.id) {
                    // response = await Request.get(`${constants.apiVersion}/products?category_id=${this.props.route.params.id}&page=${this.state.page}`);
                    response = await Request.get(`${constants.apiVersion}/products?category_id=${this.props.route.params.id}&page=${this.state.page}`);
                } else {
                    // response = await Request.get(`${constants.apiVersion}/products/search?query=${this.props.route.params.searchKeyword}`);
                    // https://arthcrm.com:2087/Items/GetItemsOnSearch?val=acri


                    var requestOptions = {
                        method: 'POST',
                        redirect: 'follow'
                    };

                    await fetch(`https://arthcrm.com:2087/Items/GetItemsOnSearch?val=${this.props.route.params.searchKeyword}`, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            // console.log("resssss ----", result);
                            response = JSON.parse(result)
                            console.log("response1 new request---->", JSON.parse(result))
                        })
                        .catch(error => console.log('error', error));

                    // console.log("responseresponseresponseresponse ---", response);

                    // response = await Request.get(`${constants.apiVersion}/products/search?query=${this.props.route.params.searchKeyword}`);
                }
            }

            // let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id");
            let finalArray = [...this.state.products, ...response]

            console.log("finalArray ----- ", finalArray);

            finalArray.map((obj) => {
                obj.qty = obj.min_qty;
            })
            // this.setState({
            //     loading: false,
            //     onScrollLoading: false,
            //     has_more: response.data.has_more,
            //     sorting: response.data.sorting,
            //     total_count: response.data.total_count,
            //     filters: response.data.filters,
            //     cartCount: response.data.cart_item_count,
            //     products: finalArray,
            // })
            this.setState({
                loading: false,
                onScrollLoading: false,
                // has_more: response.data.has_more,
                // sorting: response.data.sorting,
                // total_count: response.data.total_count,
                // filters: response.data.filters,
                // cartCount: response.data.cart_item_count,
                products: finalArray,
            })
            // if (response.data.success == 0 && this.state.loading == false) {
            //     this.setState({ noData: response.data.message })
            // }
            // if (result1.status == 400 && this.state.loading == false) {
            //     this.setState({ noData: "No Data Found" })
            // }
        }
    };

    render() {
        console.log("State-->Prodcuts0000-->", this.state.products);
        return (
            <SafeAreaView edges={constants.isIOS ? ['left'] : ['top']}
                style={styles.safeAreaView}
            >
                <NavigationEvents onWillFocus={() => {
                    this.state.sortClicked ? this.onPressSortOption(this.state.sortOnLoad) : this.getSearchResult()
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
                    this.setState({ badge: this.props.route.params && this.props.route.params.itemCount, itemCount: this.props.route.params && this.props.route.params.itemCount == 0 ? 0 : this.state.itemCount })
                }} onDidFocus={() =>
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
                } />
                <View style={styles.container}>
                    <Header
                        // cartItemCount={this.state.badge ? this.state.badge : this.state.itemCount}
                        cartItemCount={this.state.cartCount > 0 ? this.state.cartCount : ''}
                        backIcon={Images.list}
                        backButton
                        mainStyle={{}}
                        onPress={() => this.props.navigation.navigate('Cart', { fromResultScreen: true })}
                        onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        value={this.state.search}
                        rightIcon
                        onPressSearch={() => this.getSearchResultData(this.state.search, this.props.route.params.id)}
                        rightImage={Images.whiteCart}
                        onChangeText={(search) => this.setState({ search })}
                        onSubmitEditing={() => this.getSearchResultData(this.state.search, this.props.route.params.id)}
                    />

                    {/* {this.state.products.length > 0 ?  */}

                    <View style={styles.sortFilterViewWrap}>
                        <TouchableOpacity onPress={() => this.onPressSortButton()} style={styles.sortButtonView} activeOpacity={0.8}>
                            <Image source={Images.sortIcon} />
                            <Text style={styles.sortTextStyle}>{'Sort'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({ sortClicked: false }, () => {
                                this.props.navigation.navigate('Filter', { filterArray: this.state.filters, sortingDone: this.state.sortingDone })
                            })
                        }
                        } style={styles.sortButtonView}>
                            <Image source={Images.flterIcon} />
                            <Text style={styles.sortTextStyle}>{'Filter'}</Text>
                        </TouchableOpacity>

                    </View>
                    {/* :  */}
                    <View style={[styles.sortFilterViewWrap, { paddingVertical: 0 }]} />
                    {/* } */}


                    <FlatList
                        style={{ marginTop: 20, flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        // data={this.props.route.params.productsArray && !this.props.route.params.backPressed && !this.state.sortClicked ? this.props.route.params.productsArray : this.state.products}
                        data={this.state.productsData}
                        renderItem={(item, index) => this.renderItem(item, index)}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item, index) => index.toString()}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                        ListEmptyComponent={this.ListEmptyComponent}
                        onEndReached={this.loadMoreData}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={this.renderFooter}
                        initialNumToRender={10}

                    />
                    {this.state.modal &&
                        <ModalComponent
                            data={this.state.sorting}
                            onRequestClose={() => this.setState({ modal: false })}
                            closeModal={() => this.setState({ modal: false })}
                            renderItem={(item, index) => this.renderModalItem(item, index)} modalVisible={true} />
                    }
                </View>
                {
                /* {this.state.loading ? <Loader /> : null} */}
            </SafeAreaView>
        );
    };

    loadMoreData = ({ distanceFromEnd }) => {
        this.setState({ insideLoadMore: true })
        if (distanceFromEnd < 0) return;

        if (!this.state.onScrollLoading && this.state.has_more > 0
            && this.state.products.length != this.state.total_count) {
            this.setState({ page: this.state.page + 1, onScrollLoading: true, loading: false }, () => {
                if (!this.state.sortClicked) {
                    this.getSearchResult(null, true)
                }
                else {
                    this.sortingWithMoreData()
                }
            })
        }
        else {
        }
    };

    renderFooter = () => {
        if (this.state.has_more > 0 && this.state.products.length != this.state.total_count) {
            return (
                <View style={[styles.footerView,]} >
                    {this.state.loading == false && <ActivityIndicator
                        style={{ marginBottom: 20 }}
                        animating={this.state.onScrollLoading}
                        size={"large"}
                        color={colors.Orange}
                    />}
                </View>
            )
        }
        else {
            return (<View />)
        }
    }

    renderModalItem = ({ item, index }) => {
        return (<TouchableOpacity activeOpacity={0.8} onPress={() => this.onPressSortOption(item, index)} style={{ paddingLeft: 20, paddingVertical: 20 }}>
            <Text style={{ color: this.state.selectedSortOption == index ? colors.Orange : colors.black, fontFamily: fonts.Muli, fontSize: 16 }}>
                {item.label}
            </Text>
        </TouchableOpacity>)
    }
    onPressSortOption = (item, index) => {
        this.setState({
            selectedSortOption: index,
            loading: true,
            sortingDone: item.code,
            sortClicked: true,
            sortOnLoad: item,
            modal: false,
            products: [],
            page: 1
        }, async () => {

            let response;
            // if (this.props.route.params.id) {
            //     response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.props.route.params.id}&sort=${item.code}`);
            // }
            // else {

            //     response = await Request.get(`${constants.apiVersion}/products/search?query=${this.state.search}&sort=${item.code}`);
            // }


            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };

            await fetch(`https://arthcrm.com:2087/Items/GetItemsOnFilterSearch?form=Tablets&division=PRIMA&therapeutic=NSAID'S&packing=Alu Alu&packingType=10x10&pageNumber=0&sortDesc=${item.code}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log("JSON.parse(result)JSON.parse(result) --", JSON.parse(result));
                    let dummy = JSON.parse(result)
                    response = dummy
                    // console.log(result)
                })
                .catch(error => console.log('error', error));


            // this.setState({ modal: false, loading: false,
            //      products: response.data.products,
            //       page: response.data.current_page ,

            //     }, () => {
            //     let product = response.data.products;
            //     product.map((p) => {
            //         p.qty = 1;
            //     })
            //     this.setState({ products: product }, () => {
            //     })
            // })



            // let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id");
            let finalArray = _.uniqBy([...this.state.products, ...response.list], "id");
            finalArray.map((obj) => {
                obj.qty = obj.min_qty;
            })
            // this.setState({
            //     loading: false, modal: false,
            //     onScrollLoading: false,
            //     has_more: response.data.has_more,
            //     sorting: response.data.sorting,
            //     total_count: response.data.total_count,
            //     filters: response.data.filters,
            //     cartCount: response.data.cart_item_count,
            //     products: finalArray,
            // })
            this.setState({
                loading: false, modal: false,
                onScrollLoading: false,
                // has_more: response.data.has_more,
                // sorting: response.data.sorting,
                total_count: response.itemsCount,
                // filters: response.data.filters,
                // cartCount: response.data.cart_item_count,
                products: finalArray,
            })
        })
    }

    sortingWithMoreData = async () => {
        let response;
        if (this.props.route.params.id) {
            response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.props.route.params.id}&sort=${this.state.sortingDone}&page=${this.state.page}`);
        }
        else {
            response = await Request.get(`${constants.apiVersion}/products/search?query=${this.state.search}&sort=${this.state.sortingDone}&page=${this.state.page}`);
        }
        let finalArray = _.uniqBy([...this.state.products, ...response.data.products], "id");
        finalArray.map((obj) => {
            obj.qty = obj.min_qty;
        })
        this.setState({
            loading: false,
            onScrollLoading: false,
            has_more: response.data.has_more,
            sorting: response.data.sorting,
            total_count: response.data.total_count,
            filters: response.data.filters,
            cartCount: response.data.cart_item_count,
            products: finalArray,
        })
    }

    onPressSortButton = () => {
        this.setState({ modal: true })
    };
    onError = ({ item, index }) => {
    }

    renderItem = ({ item, index }) => {
        console.log("item -----", item);
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('DetailScreen', { item })} style={styles.mainBoxView}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <View style={{ flexDirection: 'row',}}> */}

                    <View style={{ marginStart: 18, marginTop: 7, }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 18, width: 18 }} source={item.imageLogo} />
                            <Text style={styles.medicineNameStyle}>{item.medcineName}</Text>
                        </View>

                        <Text style={styles.nameStyle}>{item.brandname}</Text>

                        <View style={{ width: (constants.screenWidth) / 2, marginTop: 6 }}>
                            <Text numberOfLines={2} style={styles.descTextStyle}>{item.medicineDescription}</Text>
                        </View>

                        <Text style={styles.nsaidStyle}>{item.nsaidsName}</Text>

                        <View style={{ marginTop: 9, flexDirection: 'row', justifyContent: 'space-between', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                            <Image source={item.tabletIcon} />
                            <View style={{ flexDirection: 'row', width: (constants.screenWidth) / 2, alignItems: 'center' }}>
                                <Text style={styles.tableticonStyle} >{item.tabletType}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number }} />
                                    <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.number, marginStart: 10 }} >{item.tabletSize}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.number, }} />
                                    <Text style={{ fontSize: 12, fontFamily: fonts.Helvetica, color: colors.number, marginStart: 10 }}>{item.type}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: (constants.screenWidth - 80) / 2 }}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <Text style={styles.mrpStyle} >{'MRP'}</Text>
                                        <View style={{ marginStart: 15, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor, }} />
                                    </View>
                                    <Text style={styles.CurrancyStyle}>{item.mrpValue}</Text>
                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                        <Text style={[styles.mrpStyle,]}>{'PTS'}</Text>
                                        <View style={{ marginStart: 15, width: 4, height: 4, borderRadius: 2, backgroundColor: colors.placeholderColor }} />
                                    </View>
                                    <Text style={styles.CurrancyStyle}>{item.ptsValue}</Text>
                                </View>

                                <View>
                                    <Text style={[styles.mrpStyle,]}>{'PTR'}</Text>
                                    <Text style={styles.CurrancyStyle}>{item.ptrValue}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    {/* </View> */}
                    <View style={{ marginTop: 10, marginStart: 20, }}>
                        <Image style={{ height: 100, width: (constants.screenWidth - 80) / 3, borderRadius: 12 }} source={item.MedicineImageac} />

                        <TouchableOpacity style={{ position: 'absolute', top: 85, left: 10, }} onPress={() => this.addToMore(item)} >

                            <View style={{ justifyContent: 'space-around', alignItems: 'center', width: constants.screenWidth / 5, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image source={Images.Rectangle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontFamily: fonts.HelveBold, fontSize: 18, color: colors.white }}>{item.addnumber}</Text>
                                    <TouchableOpacity>
                                        <Image source={Images.WhiteUnion} />
                                    </TouchableOpacity>
                                </View>

                            </View>


                            {/* <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 32, borderWidth: 1, borderColor: colors.Orange, backgroundColor: colors.lightOrange, borderRadius: 5 }}>
                                <Text style={{ fontSize: 16, fontFamily: fonts.HelveBold, color: colors.Orange, }} >{'Add'}</Text>
                            </View>
                            <View style={{ position: 'absolute', right: 12, top: 5 }}>
                                <Image style={{ width: 9, height: 9, }} source={Images.Union}></Image>
                            </View> */}
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginTop: 35, alignSelf: 'flex-end' }}>
                            <Text style={styles.cancelPrice} >{item.finalValue}</Text>
                            <Text style={styles.discStyle} >{item.discValue}</Text>
                        </View>
                    </View>


                </View>
                <View style={{ marginStart: 18, width: constants.screenWidth - 70, alignItems: 'center', flexDirection: 'row', marginTop: 7, height: 26, backgroundColor: colors.lightBlue, borderRadius: 4 }}>
                    <Text style={styles.minitextStyle} >{'Minimum Order quantity :'}</Text>
                    <Text style={styles.number}>{item.MinimumOrderquantityValue}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    addToMore = (item) => {
        console.log('fhdjfhjfh', item.addnumber);
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 32, borderWidth: 1, borderColor: colors.white, backgroundColor: colors.Orange, borderRadius: 5 }}>
                <TouchableOpacity>
                    <Image source={Images.Rectangle} />
                </TouchableOpacity>
                <Text>{item.addnumber}</Text>
                <TouchableOpacity>
                    <Image source={Images.WhiteUnion} />
                </TouchableOpacity>
            </View>
        )

    }
    onPressAddToCart = async (item) => {
        let reqData = {
            product_id: item.id,
            qty: item.qty
        }
        this.setState({ loading: true })
        let response = await Request.post(`${constants.apiVersion}/cart/add`, reqData);
        this.setState({ loading: false })
        Alert.alert(staticText.projectTitle,
            response.data.message)
        if (response.data.success == 1) {
            // let product = this.state.products;
            // product.map((p) => {
            //     if (p.id == item.id) {
            //         item.qty = 1;
            //     }
            // })
            this.setState({ cartCount: response.data.cart_item_count }, async () => {
                await StorageService.saveItem('ItemCount', this.state.itemCount)
            })
            // this.setState({ products: product, }, () => {
            // })
        }
    }

    addRemoveProductFromCart = (item, index, type) => {
        let product = this.state.products;

        product.map((p) => {
            if (p.id == item.id) {
                if (type == 'add' && item.max_qty != item.qty) {
                    item.qty = item.qty + 1;
                } else if (type == 'minus') {
                    item.qty = item.qty - 1;

                }
            }
        })
        console.log("product ----", product, "index --", index);
        this.setState({ products: product, selectedIndex: index }, () => {
        })

    };

    ListEmptyComponent = () => (
        <>{<View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <Text style={styles.itemText}>{this.state.loading == false ? "No products found." : "List of products will be displayed here."}</Text>
        </View>}</>
    )
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    safeAreaView: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sortFilterViewWrap: {
        flexDirection: 'row',
        width: constants.screenWidth,
        paddingVertical: 6,
        alignItems: 'center',

        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        elevation: 1,
        shadowRadius: 30,
        shadowOffset: {
            height: 3,
            width: 0,
        },
        backgroundColor: colors.white,
    },
    sortButtonView: {
        borderRightColor: colors.placeholderColor,
        padding: 8,
        borderRightWidth: 1,
        flexDirection: 'row',
        width: constants.screenWidth / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sortTextStyle: {
        paddingLeft: 10,
        color: colors.textColor,
        fontFamily: fonts.Muli,
        fontSize: 16
    },
    contentContainerStyle: {
        flexGrow: 1,
    },
    cancelPrice: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontFamily: fonts.Helvetica,
        color: colors.placeholderColor,

    },
    discStyle: {
        fontFamily: fonts.HelveBold,
        fontSize: 16,
        marginStart: 12,
        color: colors.Orange,
    },
    medicineNameStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.Orange,
    },
    nsaidStyle: {
        color: colors.number,
        marginTop: 8,
        fontFamily: fonts.Helvetica,
        fontSize: 12,
    },
    mrpStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        // marginRight:30
    },
    CurrancyStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
        // marginLeft:9
        // paddingRight:20
        // paddingEnd: 15,
    },
    minitextStyle: {
        marginStart: 8,
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number
    },
    number: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black,
        marginStart: 5
    },
    priceStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 14,
        color: colors.black
    },
    tableticonStyle: {
        fontSize: 12,
        fontFamily: fonts.Helvetica,
        color: colors.number,
        marginStart: 5
    },
    nameStyle: {
        fontSize: 18,
        fontFamily: fonts.Helvetica,
        color: colors.black,
        marginTop: 4
    },
    descTextStyle: {
        fontFamily: fonts.Helvetica,
        fontSize: 12,
        color: colors.number
    },
    itemText: {
        fontSize: moderateScale(16),
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
        textAlign: "center"
    },
    mainBoxView: {
        //  height: 130,
        width: constants.screenWidth - 40,
        // width:350,
        paddingBottom: 10,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: colors.white,
        // marginHorizontal: 20,

        shadowColor: colors.shadow,
        shadowOpacity: 1,
        elevation: 3,
        shadowRadius: 6,
        shadowOffset: {
            height: 2,
            width: -0.79,
        },

    },
    priceViewWrap: {
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    priceStyle: {
        fontSize: 16,
        fontFamily: fonts.MuliSemiBold,
        color: colors.Orange
    },
    oldPriceStyle: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontFamily: fonts.MuliSemiBold,
        color: colors.placeholderColor
    },
    productImageStyle: {
        height: 100,
        borderRadius: 6,
        marginLeft: 3,
        position: 'relative',
        marginTop: 3,
        width: 120,
        overflow: "hidden"
    },
    offerApplyView: {
        backgroundColor: colors.green,
        position: 'absolute',
        bottom: 10,
        right: 0,
        paddingBottom: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    offerApplyTextStyle: {
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.MuliSemiBold,
        paddingHorizontal: 4,
    },
    productNameStyle: {
        fontFamily: fonts.Muli,
        fontSize: 16,
        color: colors.textColor,
        paddingHorizontal: 10,
        width: constants.screenWidth / 2,
        // backgroundColor: 'pink'
    },
    commonTextStyle: {
        fontFamily: fonts.Muli,
        fontSize: 12,
        color: colors.textColor,
        paddingHorizontal: 10,
        paddingHorizontal: 10,

    },
    productCount: {
        marginBottom: 7,
        color: colors.Orange,
        fontFamily: fonts.MuliSemiBold,
        fontSize: 18
    },
    titleStyle: {
        fontSize: 46,
        color: colors.black,
        fontFamily: fonts.MuliSemiBold,
    },
    buttonStyle: {
        marginTop: 12,
        width: constants.screenWidth / 3 - 15,
        height: 28,
    },
    countryCodeStyleView: {
        flexDirection: 'row',
        // backgroundColor: 'green',
        width: constants.screenWidth - 46,
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    countryCodeInputStyle: {
        width: '32%',
        paddingHorizontal: 0,
    },
    numberInputView: {
        width: '62%',
    },
    customSignUpButtonOneStyle: {
        marginTop: 50,
    },
    ORTextStyleView: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    ORTextStyleTextStyle: {
        color: colors.placeholderColor,
        fontSize: 20,
        fontFamily: fonts.Muli,
        paddingHorizontal: 30,
    },
    breakLineStyle: {
        borderBottomWidth: 0.5,
        borderColor: colors.textColor,
        width: constants.screenWidth / 3 - 20,
    },
    signinFBButtonStyle: {
        backgroundColor: colors.Blue,
    },
    firstView: {
        // height: 250,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        height: constants.screenHeight / 3 - 60,
        alignItems: 'center',
    },
    secondView: {
        // flex: 1,
        // backgroundColor: 'red',
        paddingTop: 50,
        position: 'relative',
        height: constants.screenHeight / 2 + 100,
    },
    lastView: {
        //height: constants.screenHeight / 3,
        // backgroundColor: 'pink',
        bottom: 30,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    alreadyHaveAccountTextStyle: {
        fontFamily: fonts.Muli,
        fontSize: 20,
        color: colors.placeholderColor,
    },
    signInTextButtonStyle: {
        color: colors.Orange,
        fontSize: 20,
        fontFamily: fonts.Muli,
    },
    footerView: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
    }
});
