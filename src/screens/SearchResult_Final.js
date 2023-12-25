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
         products: [],
         filters: [],
         modal: false,
         selectedSortOption: -1,
         onScrollLoading: false,
         has_more: 0,
         page: 1,
         sortingDone: '',
         sortClicked: false,
         imageError: false,
         insideLoadMore: false
      };
   }


   componentDidMount = () => {
      this.setState({ search: this.props.route.params.searchKeyword })
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
   getSearchResult = async (search) => {
      this.setState({ itemCount: await StorageService.getItem('ItemCount') })
      //TODO---->handle more data based on search and category
      if (this.props.route.params) {
         if (search) {
            // /search?query=${this.props.route.params.searchKeyword}
            this.setState({ loading: true, search: this.state.search }, async () => {
               let response = await Request.get(`${constants.apiVersion}/products/search?query=${this.state.search}`);
               this.setState({
                  loading: false,
                  has_more: response.data.has_more,
                  sorting: response.data.sorting,
                  products: response.data.products,
                  sorting: response.data.sorting,
                  page: response.data.current_page,
                  cartCount: response.data.cart_item_count
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
               if (response.data.has_more > 0 && this.state.onScrollLoading && !this.state.sorting) {
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
         else {
            this.setState({ loading: this.state.onScrollLoading ? false : true, search: this.props.route.params.searchKeyword }, async () => {
               let response;
               if (this.props.route.params.id) {
                  response = await Request.get(`${constants.apiVersion}/products?category_id=${this.props.route.params.id}`);
               } else {
                  response = await Request.get(`${constants.apiVersion}/products/search?query=${this.props.route.params.searchKeyword}`);
               }
               this.setState({
                  loading: false,
                  has_more: response.data.has_more,
                  sorting: response.data.sorting,
                  products: response.data.products,
                  total_count: response.data.total_count,
                  filters: response.data.filters,
                  cartCount: response.data.cart_item_count
               }, () => {
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
                  let resp = await Request.get(`${constants.apiVersion}/products?category_id=3&page=${this.state.page}`);
                  console.log("Resp--->", resp);
                  let businesses = [...this.state.products, ...resp.data.products]
                  let product = businesses;
                  product.map((p) => {
                     p.qty = 1;
                  })

                  this.setState({
                     products: product,
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
                  onPress={() => this.props.navigation.navigate('Cart', { fromResultScreen: true })}
                  onBackButtonPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                  value={this.state.search}
                  rightIcon
                  onPressSearch={() => this.getSearchResultData(this.state.search, this.props.route.params.id)}
                  rightImage={Images.whiteCart}
                  onChangeText={(search) => this.setState({ search })}
                  onSubmitEditing={() => this.getSearchResultData(this.state.search, this.props.route.params.id)}
               />
               {this.state.products.length > 0 ? <View style={styles.sortFilterViewWrap}>
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

               </View> : <View style={[styles.sortFilterViewWrap, { paddingVertical: 0 }]} />}


               <FlatList
                  style={{ marginTop: 20, flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                  data={this.props.route.params.productsArray && !this.props.route.params.backPressed && !this.state.sortClicked ? this.props.route.params.productsArray : this.state.products}
                  // data={this.state.products}
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
            {/* {this.state.loading ? <Loader /> : null} */}
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
               this.getSearchResult()
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
      }, async () => {

         let response;
         if (this.props.route.params.id) {
            response = await Request.get(`${constants.apiVersion}/products/?category_id=${this.props.route.params.id}&sort=${item.code}`);
         }
         else {

            response = await Request.get(`${constants.apiVersion}/products/search?query=${this.state.search}&sort=${item.code}`);
         }
         this.setState({ modal: false, loading: false, products: response.data.products, page: response.data.current_page }, () => {
            let product = response.data.products;
            product.map((p) => {
               p.qty = 1;
            })
            this.setState({ products: product }, () => {
            })
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
      this.setState({ products: [...this.state.products, ...response.data.products] })
   }

   onPressSortButton = () => {
      this.setState({ modal: true })
   };
   onError = ({ item, index }) => {
   }

   renderItem = ({ item, index }) => {
      return (
         <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Productdetails', { item })} style={styles.mainBoxView}>
            <View style={styles.firsthalfBox}>
               <ImageBackground onError={() => this.onError({ item, index })} defaultSource={Images.placeholderDefault} resizeMode='cover' style={styles.productImageStyle} width={100}
                  source={item.image && common.checkUrl(item.image) ? { uri: item.image } : Images.placeholderImageSmall}
               >
                  {item.old_price ?
                     <View style={item.image ? styles.offerApplyView : [styles.offerApplyView,]}>
                        <Text style={styles.offerApplyTextStyle}>Offer Applicable</Text>
                     </View> : null}
               </ImageBackground>

               <View style={{ marginVertical: 10, width: '60%' }} >
                  <Text style={styles.productNameStyle} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.commonTextStyle, { color: colors.placeholderColor }]} numberOfLines={1}>{item.type}</Text>
                  <Text style={styles.commonTextStyle} numberOfLines={1}>{item.brand}</Text>
                  <Text style={styles.commonTextStyle} numberOfLines={2}>{item.info}</Text>

               </View>

            </View>
            <View style={styles.secondHalfBox} />
            <View style={[styles.priceViewWrap, {
               justifyContent: item.in_stock ? 'space-around' : 'space-between',

            }]}>
               <View style={{ marginBottom: 10 }}>
                  <Text style={styles.priceStyle}>
                     {item.price}
                  </Text>
                  {item.old_price ?
                     <View>
                        <Text style={styles.oldPriceStyle}>
                           {item.old_price}
                        </Text>
                     </View> : null
                  }
               </View>
               {item.in_stock ? <TouchableOpacity
                  onPress={() => this.addRemoveProductFromCart(item, index, 'minus')}
                  disabled={item.qty == item.min_qty ? true : false}
                  activeOpacity={0.8}>
                  <Image style={{ marginRight: -10 }}
                     resizeMode={'cover'}
                     source={Images.minusOld} />
               </TouchableOpacity> : null
               }
               {item.in_stock ? <Text
                  style={styles.productCount}>
                  {item.qty}
               </Text> : null
               }
               {item.in_stock ? <TouchableOpacity
                  onPress={() => this.addRemoveProductFromCart(item, index, 'add')}
                  activeOpacity={0.8}>
                  <Image style={{ marginLeft: -10, }}
                     resizeMode='cover'
                     source={Images.plusOld} />
               </TouchableOpacity> : null
               }
               <CustomButton
                  onPress={() => this.onPressAddToCart(item)}
                  disabled={item.in_stock ? false : true}
                  titleStyle={{ fontSize: 12 }}
                  mainStyle={[styles.buttonStyle, { backgroundColor: item.in_stock ? colors.Orange : colors.outOfStock }]}
                  title={item.in_stock ? 'Add to Cart' : 'Out of Stock'}
               />

            </View>

         </TouchableOpacity>
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
      this.setState({ products: product, selectedIndex: index }, () => {
      })

   };

   ListEmptyComponent = () => (
      <>{this.state.loading == false && <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
         <Text style={styles.itemText}>{staticText.noData}</Text>
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
      // backgroundColor:'red',
      shadowColor: colors.shadowColor,
      shadowOpacity: 1,
      elevation: 13,
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
   itemText: {
      fontSize: moderateScale(20),
      color: colors.black,
      fontFamily: fonts.MuliSemiBold
   },
   mainBoxView: {
      //  height: 130,
      borderRadius: 12,
      marginBottom: 20,
      backgroundColor: colors.white,
      marginHorizontal: 20,

      shadowColor: colors.shadow,
      shadowOpacity: 1,
      elevation: 3,
      shadowRadius: 6,
      shadowOffset: {
         height: 2,
         width: -0.79,
      },

   },
   firsthalfBox: {
      // backgroundColor: 'pink',
      flexDirection: 'row',
      width: constants.screenWidth - 40,
      paddingBottom: 20,
   },
   secondHalfBox: {
      alignItems: 'center',
      alignSelf: 'center',
      height: 0.5,
      width: constants.screenWidth - 64,
      backgroundColor: colors.placeholderColor
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
