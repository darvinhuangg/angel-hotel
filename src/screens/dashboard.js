import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomProductRow from '@components/CustomProductRow';
import { get, post } from '@library/network/API';
import { retrieveRoomList } from '@library/network/apiCallback';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

export default class dashboard extends React.Component {

  constructor(props){
    super(props);

    var currentDate = new Date();

    this.state = {
      id: null,
      isFetching: false,
      startdatetime:Moment(new Date()).format("YYYY-MM-DD"),
      enddatetime:Moment(this.startdatetime).add(1,'days').format("YYYY-MM-DD"),
      productList:[
        {id:1, name:"Room 101", type:"Deluxe", price: 88, isSelect: false, isSelectstyle:styles.cartStyle},
        {id:2, name:"Room 102", type:"Deluxe", price: 88, isSelect: false, isSelectstyle:styles.cartStyle},
        {id:3, name:"Room 103", type:"Deluxe", price: 88, isSelect: false, isSelectstyle:styles.cartStyle},
        {id:4, name:"Room 104", type:"Deluxe", price: 88, isSelect: false, isSelectstyle:styles.cartStyle},
      ],
      selectedItems:[],
      total_price:0,
      onHoldSelectedItem:[],
    }
    this.renderHeader = this.renderHeader.bind(this);    
  }

  componentDidMount()
  {
    this.props.navigation.setParams({gotoBooked:this.navigateToBooked});
    this.getAvailableRoomList();
  }

  navigateToBooked = () =>
  {
    console.log('asda');
    this.props.navigation.navigate('Booked');
  }

  onRefresh() {
    ToastAndroid.show("Refresh List ...", ToastAndroid.SHORT);
    this.setState({ isFetching: true }, function() { this.getAvailableRoomList() });
    this.setState({ isFetching: false })
  }

  getAvailableRoomList()
  {
    post(retrieveRoomList, {start_date: this.state.startdatetime})
    .then(data => {
      this.setState({productList:data.data.data});      
      this.state.productList.map((item,index) => {
        if(item.availability == 0)
        {
          // item.isSelect = true;
          item.isSelectstyle = styles.cartedStyle;
        } else {
          item.isSelect = false;
          item.isSelectstyle = styles.cartStyle;
        }
      })
      this.setState({});
    })
    .catch(errorMessage => {
      console.log(errorMessage);
    })
  }

  cart = (item) =>
  {
    var temp_arr = [];

    if(item.isSelect){
      for (let selectedItem of this.state.selectedItems){
        if(selectedItem.id !== item.id){
          temp_arr.push(selectedItem)
        }
      }
      this.setState({selectedItems:temp_arr});
      this.setState({total_price: this.state.total_price - item.price});
    } else {
      this.state.selectedItems.push(item);
      this.setState({total_price: this.state.total_price + item.price});
    }

    item.isSelect = !item.isSelect;
    item.isSelectstyle = item.isSelect ? styles.cartedStyle : styles.cartStyle
    this.setState({
      productList:this.state.productList
    });    
    this._panel.hide();
  }

  showItemDetails = (item) => {
    this.setState({onHoldSelectedItem:item}, () => {
      this._panel.show();
    });
  }

  goToCheckOut = () =>
  {
    this.props.navigation.navigate('Checkout',{
      productList:this.state.productList,
      startdatetime:this.state.startdatetime,
      enddatetime:this.state.enddatetime,
      onNavigateBack: this.handleNavigationBack});

    // console.log(this.state.region);
  }

  handleNavigationBack = (productLists) => {
    var temp_arr = [];
    var selected_item = [];
    var total_price = 0;

    this.setState({productList:productLists});
    
    for (let product of this.state.productList){
      if(product.isSelect){
        selected_item.push(product);
        total_price += product.price;
      }
      product.isSelectstyle = product.isSelect ? styles.cartedStyle : styles.cartStyle;
      temp_arr.push(product);
    }
    this.setState({productList:temp_arr, selectedItems: selected_item, total_price:total_price});
    // console.log(this.state.productList);
  }

  _listEmptyProductList = () => {
    return (
      <View>
        <Block center middle white style={{borderWidth:1, borderRadius:10, borderColor:R.colors.lightGray}} paddingVertical={20}><Text title semibold>No Room Available</Text></Block>
      </View>
    )
  }

  renderHeader(){
    return (
      <Block spacing={false}>
        <View style={{paddingVertical:30, paddingHorizontal:15, borderRadius:25, borderWidth:1, borderColor:R.colors.lightBlue, marginBottom:10, backgroundColor:R.colors.primary}}>
            <View>
              <Text size={20} bold white>Hii Nadia ...</Text>
              <Block spacing={false} flex={false} row paddingVertical={10}>
                <MaterialCommunityIcons name="map-marker" size={20} color={R.colors.firebrick} />
                <Text white title> Batam Island, Indonesia</Text>
              </Block>
            </View>
        </View>
        <Block row>
        	<Block spacing={false}>
        		<Text style={{paddingVertical:10,marginTop:20}} bold>Start Date</Text>
		        <DatePicker
			        style={{flex:1}}
			        date={this.state.startdatetime}
			        mode="date"
			        showIcon={false}
			        placeholder="Select Start Date"
			        format="YYYY-MM-DD"
			        minDate="2016-05-01"
			        maxDate="2020-04-30"
			        confirmBtnText="Confirm"
			        cancelBtnText="Cancel"
			        customStyles={{
			          dateIcon: {
			            position: 'absolute',
			            left: 0,
			            top: 4,
			            marginLeft: 0
			          },
			          dateInput: {
			            flex:1,
			            ...styles.input
			          }
			          // ... You can check the source to find the other keys.
			        }}
			        onDateChange={(date) => { this.setState({startdatetime: Moment(date).format("YYYY-MM-DD"), enddatetime: Moment(date).add(1, 'days').format("YYYY-MM-DD") }), this.getAvailableRoomList()}}
			      />
        	</Block>
        	<Block spacing={false}>
        		<Text style={{paddingVertical:10,marginTop:20}} bold>End Date</Text>
		        <DatePicker
			        style={{flex:1}}
			        date={this.state.enddatetime}
			        mode="date"
			        showIcon={false}
			        placeholder="Select End Date"
			        format="YYYY-MM-DD"
			        minDate={this.state.startdatetime}
			        maxDate={Moment(this.state.startdatetime).add(30, 'days').format("YYYY-MM-DD")}
			        confirmBtnText="Confirm"
			        cancelBtnText="Cancel"
			        customStyles={{
			          dateIcon: {
			            position: 'absolute',
			            left: 0,
			            top: 4,
			            marginLeft: 0
			          },
			          dateInput: {
			            flex:1,
			            ...styles.input
			          }
			          // ... You can check the source to find the other keys.
			        }}
			        onDateChange={(date) => {this.setState({enddatetime: Moment(date).format("YYYY-MM-DD")})}}
			      />
        	</Block>
        </Block>
        <Text style={{marginVertical:20, paddingHorizontal:15}} size={18} bold>Hotel List</Text>

      </Block>
    )
  }

  showDateTimePicker = () => {
    // console.log('asd');
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    let date_c = Moment(date).format();
    let now = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    if(Moment(date_c).isSameOrBefore(now)){
      this.hideDateTimePicker();
      Alert.alert('Error', "Invalid Date");
    } else {
      this.hideDateTimePicker();
      this.setState({datetime:Moment(date)});
    }
  };


  static navigationOptions=({navigation}) => ({
    title:"Angel Hotel",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
    headerRight: 
      (<TouchableOpacity onPress={navigation.getParam('gotoBooked')} style={{paddingHorizontal:15}}>
        <MaterialCommunityIcons name="book-open-page-variant" size={20} />
      </TouchableOpacity>),
  });

  render() {

    let {onHoldSelectedItem} = this.state;

    return (
      
        <View style={{flex:1}}>
          <Block white>
            <ScrollView
              contentContainerStyle={{
                backgroundColor:R.colors.white,
                justifyContent:'space-between',
                flex:1
              }}
              // scrollEnabled={this.state.enableScrollViewScroll}
              showsHorizontalScrollIndicator={false}>

                <FlatList
                  data={this.state.productList}
                  onRefresh={() => this.onRefresh()}
                  refreshing={this.state.isFetching}
                  style={{marginBottom:15}}
                  ListHeaderComponent={this.renderHeader}
                  renderItem={(item) => <CustomProductRow item={item.item} selectItem={this.cart.bind(this)} showItem={this.showItemDetails.bind(this)} /> }
                  ListEmptyComponent={this._listEmptyProductList}
                  keyExtractor={(item, index) => index.toString()}
                  // onTouchStart={() => {
                  //   this.onEnableScroll( false );
                  // }}
                  // onMomentumScrollEnd={() => {
                  //   this.onEnableScroll( true );
                  // }}
                  showsVerticalScrollIndicator={false}
                />
            </ScrollView>
            
            {this.state.selectedItems.length > 0 ? (
            <View style={{flex:0.1}}>
              <TouchableOpacity style={styles.goToCheckOut} onPress={this.goToCheckOut}>
                <Block row spacing={false} paddingVertical={15}>
                  <Block middle flex={2}><Text title white bold>{this.state.selectedItems.length} room(s) for {Moment(this.state.enddatetime).diff(this.state.startdatetime,'days')} night(s)</Text></Block>
                  <Block middle><Text white right semibold title>CHECKOUT</Text></Block>
                </Block>
              </TouchableOpacity>
            </View>
            ) : (null)}
          </Block>
          <SlidingUpPanel 
            ref={c => this._panel = c}
            height={350}
            draggableRange={{top:350, bottom:0}}
            // allowDragging={false}
            friction={.4}
          >
            <Block paddingHorizontal={20} paddingVertical={20} style={styles.panel}>
              
              <Text h3 semibold style={{borderBottomWidth:1, borderColor:R.colors.lightGray, paddingBottom:5}}>ROOM {onHoldSelectedItem.name ? onHoldSelectedItem.name : null}</Text>

              <Text style={{marginTop:10}}>{onHoldSelectedItem.type ? onHoldSelectedItem.type : null}</Text> 

              <View style={{marginTop:20}}>
                <Text h3 bold middle>${onHoldSelectedItem.price ? onHoldSelectedItem.price : null}/night</Text>
                <Text caption italic middle style={{marginTop:3}}>*including breakfast</Text>
              </View>

              <TouchableOpacity onPress={() => this.cart(onHoldSelectedItem)} disabled={!onHoldSelectedItem.availability} style={[styles.goToCheckOut,{marginHorizontal:10, flex:0, paddingVertical:15, marginTop:35, backgroundColor: onHoldSelectedItem.isSelect ? R.colors.gray : R.colors.greenGrass}]}>
                <Text title white bold center middle>ADD TO CART</Text>
              </TouchableOpacity>
            </Block>
          </SlidingUpPanel>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  goToCheckOut: {
    alignSelf:'flex-end',
    position:'absolute',
    bottom:25, left:0, right:0, height:55,
    backgroundColor: R.colors.greenGrass,
    justifyContent:'center',
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 28,
    elevation: 16,
    flex:1,
  },
  input: {
    flex:1,
    color:'#000',
    padding:10,
    backgroundColor:R.colors.lightGray,
    borderRadius:5,
    borderColor:R.colors.lightGray,
    fontFamily: "SourceSansPro-Regular",
    marginTop:8,
    borderWidth:1,
    paddingVertical:10
  },
  cartStyle: {
    backgroundColor: R.colors.greenGrass,
  },
  cartedStyle: {
    backgroundColor: R.colors.gray,
  },
  panel: {
    borderBottomLeftRadius:0, 
    borderBottomRightRadius:0, 
    borderTopLeftRadius:20, 
    borderTopRightRadius:20,
    backgroundColor:'#fff',
  },
});