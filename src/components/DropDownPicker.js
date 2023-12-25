import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Keyboard } from 'react-native';
import { colors, constants } from '../config';
import { moderateScale, scale, verticalScale } from '../utilities';
import fonts from '../assets/index';


class DropDownPicker extends Component {

   constructor(props) {
      super(props);
      this.state = {
         isVisible: false,
         activeIndex: this.props.activeIndex || -1
      };
   }

   render() {
      const { value, imageSource, titleStyle, changedColor, listData, imageStyle, disabled, containerStyle } = this.props;
      const { isVisible } = this.state;

      console.log(" props ------", this.props);

      return (
         <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
               onPress={this.onPress}
               style={styles.wrapView}
               disabled={disabled}
               activeOpacity={constants.activeOpacity}
            >
               <Text style={[styles.title, titleStyle]} numberOfLines={1}>{value}</Text>
               <Image source={imageSource} style={imageStyle} />
            </TouchableOpacity>
            {
               isVisible &&
               <View style={{ flex: 1, height: 90 }}>
                  <FlatList
                     data={listData}
                     bounces={false}
                     showsVerticalScrollIndicator={false}
                     contentContainerStyle={{ flexGrow: 1 }}
                     renderItem={this.renderListItem}
                     nestedScrollEnabled
                     keyExtractor={(item, index) => index.toString()}
                     ItemSeparatorComponent={this.ItemSeparatorComponent}
                     ListEmptyComponent={this.ListEmptyComponent}
                  />
               </View>
            }
         </View>
      );
   }

   ItemSeparatorComponent = () => (<View style={styles.divider} />)

   ListEmptyComponent = () => (
      <View style={{ alignItems: "center", paddingVertical: verticalScale(10) }}>
         <Text style={styles.itemText}>{'No Data Found'}</Text>
      </View>
   )

   renderListItem = ({ item, index }) => {
      console.log("item name ----", item);
      const { text, name, location_name } = item;
      const { changedColor } = this.props;
      return (
         <TouchableOpacity
            key={index}
            style={[styles.itemMainView,]}
            activeOpacity={constants.activeOpacity}
            onPress={() => this.onPressItem(item, index)}
         >
            <Text style={[styles.itemText, {
               fontSize: this.state.activeIndex == index ? moderateScale(18) : moderateScale(15),
               color: this.state.activeIndex != index ? colors.textColor : colors.Orange
            }, changedColor]}>
               {name || ''}
            </Text>
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

export default DropDownPicker;

const styles = StyleSheet.create({
   container: {
      alignSelf:'center',
      // paddingHorizontal: moderateScale(15),
      paddingLeft: moderateScale(10),
      backgroundColor: colors.white,
      marginBottom: 20,
      marginHorizontal: 28,
      // height:'40%',
      borderWidth: 1,
      borderRadius: moderateScale(8),
      borderColor: colors.dropdowonBorderColor,
      width: '100%' ,
      shadowColor: colors.shadowColor,
      shadowOpacity: 1,
      elevation: 3,
      shadowRadius: 8,
      shadowOffset: {
         height: 2,
         width: -0.79,
      },
   },
   title: {
      fontSize: moderateScale(16),
      color: colors.placeholderColor,
      paddingRight: scale(10),
      fontFamily: fonts.Helvetica,
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
      paddingHorizontal: moderateScale(15),
      paddingVertical: verticalScale(10)
   },
   itemText: {
      fontSize: moderateScale(15),
      color: colors.black,
      // fontFamily: fonts.latoMedium
   },
   divider: {
      // height: 1,
      // backgroundColor: colors.placeholderColor,
      // marginHorizontal: moderateScale(13),

   }
})
