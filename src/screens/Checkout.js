import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Button, Dimensions, Alert, TextInput, Platform, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import Moment from 'moment';
import { get, post } from '@library/network/API';
import { createTransaction } from '@library/network/apiCallback';


export default class Checkout extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      productList: this.props.navigation.state.params.productList,
      startdatetime: this.props.navigation.state.params.startdatetime,
      enddatetime: this.props.navigation.state.params.enddatetime,
      total_price: 0,
      overall_price:0,
      product_count: 0,
      notes:null,
      loading:false,
      isDateTimePickerVisible:false,
      datetime:new Date(),
      orderLoading: false,
      days:1,
    }    
  }

  componentDidMount()
  {
    this.calculateTotal();
  }

  cancelItem = (item) => {
    for (let product of this.state.productList){
      if(product.id == item.id){
        product.isSelect = !product.isSelect
        this.setState({product_count: this.state.product_count - 1}, () => {
          this.calculateTotal();
          this.setState({productList:this.state.productList});
        });
      }
    }
  }

  calculateTotal(){
    var count = 0;
    var total = 0;
    var overall_price = 0;
    const {focusedLocation} = this.state;
    var night = Moment(this.state.enddatetime).diff(this.state.startdatetime,'days');

    for (let product of this.state.productList){
      if(product.isSelect){
        total = total + product.price;
        count = count + 1;
      }
    }

    overall_price = total * night;

    this.setState({total_price:total, overall_price:overall_price, product_count:count}, () => {
      this.countSelectedProduct();
    });
  }

  countSelectedProduct(){
    if(this.state.product_count < 1)
    {
      this.navigateBackRefresh();
    }
  }

  navigateBackRefresh(){
    this.props.navigation.state.params.onNavigateBack(this.state.productList);
    this.props.navigation.goBack();
  }

  _displayFee(){
    return <Text bold title right style={{flex:1}}>${this.state.total_price}/night</Text>;
  }

  _displayStartDate(){
    return <Text title right style={{flex:1}}>{Moment(this.state.startdatetime).format('MMMM Do YYYY')}</Text>;
  }

  _displayEndDate(){
    return <Text title right style={{flex:1}}>{Moment(this.state.enddatetime).format('MMMM Do YYYY')}</Text>;
  }

  _displayTotalFee(){
    return <Text bold title right style={{flex:1}}>${this.state.overall_price} for {Moment(this.state.enddatetime).diff(this.state.startdatetime,'days')} night(s)</Text>;
  }

  _renderButtonOrder(){
    <TouchableOpacity style={styles.checkOut} onPress={this.orderBooking}>
      <Text style={{textAlign:'center', color:'#fff', fontSize:18, fontWeight:'bold'}}>
        <MaterialCommunityIcons name="cart" size={20} color="#fff" /> BOOK NOW
      </Text>
    </TouchableOpacity>
  }

  orderBooking = () => {
    // ToastAndroid.show("Sending Request ...", ToastAndroid.LONG);
    // ToastAndroid.show("Thank you for purchase", ToastAndroid.LONG);
    let selected_product = [];

    this.state.productList.map((product) => {
      if(product.isSelect){
        selected_product.push(product);
      }
    })

    this.props.navigation.navigate('Payment', {
      user_id:3,
      total_charge:this.state.overall_price,
      start_date:this.state.startdatetime,
      end_date:this.state.enddatetime,
      note:this.state.notes,
      room_list:selected_product
    });

    // post(createTransaction, {
    // 	user_id:1,
    // 	total_charge:this.state.overall_price,
    // 	start_date:this.state.startdatetime,
    // 	end_date:this.state.enddatetime,
    // 	note:this.state.notes,
    //   room_list:selected_product
    // })
    // .then(data => {
    // 	ToastAndroid.show("Thank you for purchase", ToastAndroid.LONG);
    // 	const resetAction = StackActions.reset({
	   //    index: 0,
	   //    actions: [NavigationActions.navigate({ routeName: 'dashboard' })],
	   //  });
	   //  this.props.navigation.dispatch(resetAction);
    // })
    // .catch(errorMessage => {
    // 	console.log(errorMessage);
    // 	ToastAndroid.show("Oops, Something went wrong. Please try again later", ToastAndroid.LONG);
    // })
    // this.setState({ productList:[] });
    
  }

  showDateTimePicker = () => {
    // console.log('asd');
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  calculateDays = (text) => {
     this.setState({days:text})
     var days = parseInt(text);
     var total = parseInt(this.state.total_price);

     total = total * days;

     this.setState({overall_price:total});
  }
 
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

  static navigationOptions = ({navigation}) => ({
    title:"CHECKOUT",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
  });

  render() {

    const { width, height } = Dimensions.get('window');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 20;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block white>
          <KeyboardAvoidingView
          behavior='padding' 
          keyboardVerticalOffset={keyboardVerticalOffset}>

          <Block paddingVertical={10}>
            <Text>Notes to us</Text>
            <TextInput 
              placeholder="Ex: I prefer medium rare ..."
              placeholderTextColor="#ccc"
              style={styles.input}
              onChangeText={text => this.setState({notes:text}) }
            />
          </Block>

          <Block row style={{borderBottomWidth:1, borderColor:R.colors.lightGray}}>
            <Text title bold style={{flex:1}}>ROOM(s)</Text>
            <TouchableOpacity onPress={this.navigateBackRefresh.bind(this)}>
              <Text greenGrass bold>ADD MORE+</Text>
            </TouchableOpacity>
          </Block>

            <Block style={{borderBottomWidth:1, borderColor:R.colors.lightGray}}>
              {this.state.productList.map((item,key) => { 
                if(item.isSelect){ return (
                  <Block row key={key}>
                    <Text style={{flex:1}} numberOfLines={1} ellipsizeMode="tail">ROOM {item.name}</Text>
                    <Text style={{flex:1}} right semibold numberOfLines={1} ellipsizeMode="tail">${item.price}/night</Text>
                    <Block right spacing={false} flex={false} style={{marginLeft:5}}>
                      <TouchableOpacity onPress={()=>this.cancelItem(item)} style={{width:30, height:30}}>
                        <MaterialCommunityIcons name="minus-circle" size={16} color={R.colors.firebrick} />
                      </TouchableOpacity>
                    </Block>
                  </Block>)
                }
              })}
            </Block>

            <Block spacing={false} paddingHorizontal={10}>
            	<Block spacing={false} row style={{borderBottomWidth:1, borderBottomColor:R.colors.lightGray, paddingVertical:15}}>
	                <Text title semibold style={{flex:1}}>Start Date</Text>
	                {this._displayStartDate()}
	            </Block>
	            <Block spacing={false} row style={{borderBottomWidth:1, borderBottomColor:R.colors.lightGray, paddingVertical:15}}>
	                <Text title semibold style={{flex:1}}>End Date</Text>
	                {this._displayEndDate()}
	            </Block>
	            <Block spacing={false} row style={{borderBottomWidth:1, borderBottomColor:R.colors.lightGray, paddingVertical:15}}>
	                <Text title semibold style={{flex:1}}>Charge</Text>
	                {this._displayFee()}
	            </Block>
              	<Block spacing={false} row style={{borderBottomWidth:1, borderBottomColor:R.colors.lightGray, paddingVertical:15}}>
                	<Text title semibold style={{flex:1}}>Total Charge</Text>
                	{this._displayTotalFee()}
              	</Block>

              <Text style={{fontSize:12, color:'#777'}}>*Check in is available at 11.30 am</Text>
              <Block>
                <TouchableOpacity style={styles.checkOut} onPress={this.orderBooking}>
                  <Text style={{textAlign:'center', color:'#fff', fontSize:18, fontWeight:'bold'}}>
                    <MaterialCommunityIcons name="cart" size={20} color="#fff" /> BOOK NOW
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor:'#fff',
  },
  header:{
    backgroundColor:'#1A232A',
  },
  headerTxt:{
    justifyContent:'center',
    fontSize:20,
    color:'#fff'
  },
  checkOut: {
    paddingVertical: 10,
    backgroundColor: R.colors.greenGrass,
    borderRadius:5,
    marginTop:10,
    flex:1
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
});