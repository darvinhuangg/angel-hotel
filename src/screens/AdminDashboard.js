import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import CustomPaymentRow from '@components/CustomPaymentRow';
import { get, post } from '@library/network/API';
import { retrieveUnpaidTransaction, confirmPayment } from '@library/network/apiCallback';
import Moment from 'moment';

export default class AdminDashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      id: null,
      region: null,
      latitude: null,
      longitude: null,
      name: null,
      addr: null,
      distance: null,
      reviewScore: null,
      region: null,
      loading: true,
      productList:[
        {id:1, name:"John 101", type:"Deluxe", night: 7, price: 488, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "10 February 2020"},
        {id:2, name:"John 102", type:"Deluxe", night: 2, price: 388, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"},
        {id:3, name:"John 103", type:"Deluxe", night: 4, price: 588, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"},
        {id:4, name:"John 104", type:"Deluxe", night: 5, price: 688, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"},
        {id:5, name:"John 105", type:"Executive", night: 2, price: 388, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"},
        {id:6, name:"John 106", type:"Executive", night: 3, price: 588, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"},
        {id:7, name:"John 107", type:"Executive", night: 1, price: 288, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"},
        {id:8, name:"John 108", type:"Executive", night: 1, price: 188, isSelect: false, note: "I prefer medium rare and/or medium", isSelectstyle:styles.cartStyle, bookingDate: "31 March 2020"}
      ],
      enableScrollViewScroll: true,
      selectedItems:[],
      total_price:0,
      workshop_loading:true,
      onHoldSelectedItem:[],
    }

    // this.viewWorkshopDetails = this.viewWorkshopDetails.bind(this);
    this.renderHeader = this.renderHeader.bind(this);    
  }

  componentDidMount()
  {
    this.props.navigation.setParams({goToMail:this.navigateToMail});
    this.getUnpaidTransaction();
  }

  getUnpaidTransaction()
  {
    get(retrieveUnpaidTransaction)
    .then(data => {
      // console.log(data.data.data);
      this.setState({productList:data.data.data});
      this.state.productList.map((item,index) => {
        item.isSelect = false;
        item.isSelectstyle = styles.cartStyle;
      })
    })
    .catch(errorMessage => {
      console.log(errorMessage);
    })
  }

  navigateToMail = () => {
    this.props.navigation.navigate("Email");
  }

  confirm = (transaction) =>
  {
    // console.log(transaction);
    post(confirmPayment, { id: transaction.id} )
    .then(data => {
      this._panel.hide();
      ToastAndroid.show("Confirmed Payment Success", ToastAndroid.SHORT);
      this.getUnpaidTransaction();
    })
    .catch(errorMessage => {
      console.log(errorMessage);
      ToastAndroid.show("Oops, Something went wrong. Please try again later", ToastAndroid.LONG);
    })
  }

  showItemDetails = (item) => {
    this.setState({onHoldSelectedItem:item}, () => {
      this._panel.show();
    });
  }

  handleNavigationBack = () => {    
    this.setState({}, () => {
      this._panel.hide();
    });
    this.getUnpaidTransaction();
  }

  _listEmptyProductList = () => {
    return (
      <View>
        <Block center middle white style={{borderWidth:1, borderRadius:10, borderColor:R.colors.lightGray}} paddingVertical={20}><Text title semibold>No Payment Available</Text></Block>
      </View>
    )
  }

  renderHeader(){
    return (
      <Block spacing={false}>
        <View style={{paddingVertical:30, paddingHorizontal:15, borderRadius:25, borderWidth:1, borderColor:R.colors.lightBlue, marginBottom:10, backgroundColor:R.colors.primary}}>
            <View>
              <Text size={20} bold white>Hii Admin</Text>
              <Text white>Hotel Angel, Batam Island, Indonesia</Text>
            </View>
        </View>
        <Text style={{marginVertical:20, paddingHorizontal:15}} size={18} bold>Payment List</Text>
      </Block>
    )
  }

  navigateBookingDateScreen = (transaction) =>
  {
    // console.log(transaction);
    this.props.navigation.navigate('ChangeBookingDate', {
      transaction: transaction,
      onNavigateBack: () => this.handleNavigationBack()
    });
  }

  static navigationOptions=({navigation}) => ({
    title:"Hotel Angel",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
    headerRight: 
      (<TouchableOpacity onPress={navigation.getParam('goToMail')} style={{paddingHorizontal:15}}>
        <Text title>Mail</Text>
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
                  style={{marginBottom:15}}
                  ListHeaderComponent={this.renderHeader}
                  renderItem={(item) => <CustomPaymentRow item={item.item} showItem={this.showItemDetails.bind(this)} /> }
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
          </Block>
          <SlidingUpPanel 
            ref={c => this._panel = c}
            height={350}
            draggableRange={{top:350, bottom:0}}
            // allowDragging={false}
            friction={.4}
          >
            <Block paddingHorizontal={20} paddingVertical={20} style={styles.panel}>
              
              <Block spacing={false} row flex={false}>
                <Text h3 semibold style={{flex:1, borderBottomWidth:1, borderColor:R.colors.lightGray, paddingBottom:5}}>{onHoldSelectedItem.user ? onHoldSelectedItem.user.name : null}</Text>
                <TouchableOpacity onPress={() => this.navigateBookingDateScreen(onHoldSelectedItem)}>
                  <MaterialCommunityIcons name="table-edit" size={24} color={R.colors.greenGrass} style={{paddingHorizontal:7}}/>
                </TouchableOpacity>
              </Block>

              <View style={{marginTop:20}}>
                <Block row spacing={false} flex={false}>
                  <Text title semibold style={{flex:1}}>Total Price</Text>
                  <Text title>${onHoldSelectedItem.total_charge ? onHoldSelectedItem.total_charge : null}</Text>
                </Block>
                <Block row spacing={false} flex={false} paddingVertical={10}>
                  <Text title semibold style={{flex:1}}>Booked at</Text>
                  <Text title>{onHoldSelectedItem.startdate ? Moment(onHoldSelectedItem.startdate).format("MMMM Do YYYY") : null} for {onHoldSelectedItem.startdate ? Moment(onHoldSelectedItem.enddate).diff(onHoldSelectedItem.startdate,'days') : null} night(s)</Text>
                </Block>                
                { onHoldSelectedItem.rooms ? (
                  onHoldSelectedItem.rooms.map((item, index) => {
                    return <Text key={index} medium light style={{marginTop:5}}>Room {item.room.name} - Type {item.room.type} - ${item.room.price}/night </Text>
                  })
                ) : (null) }

                <Block spacing={false} paddingVertical={10}>
                  <Text caption>*Notes: {onHoldSelectedItem.note ? onHoldSelectedItem.note : '-'}</Text>
                </Block>
              </View>

              <TouchableOpacity onPress={() => this.confirm(onHoldSelectedItem)} style={[styles.goToCheckOut,{marginHorizontal:10, flex:0, paddingVertical:15, marginTop:35, backgroundColor: onHoldSelectedItem.isSelect ? R.colors.gray : R.colors.greenGrass}]}>
                <Text title white bold center middle>CONFIRM PAYMENT</Text>
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