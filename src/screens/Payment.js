import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import { get, post } from '@library/network/API';
import { createTransaction } from '@library/network/apiCallback';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default class Payment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      valid:false,
      user_id:this.props.navigation.state.params.user_id,
      total_charge:this.props.navigation.state.params.total_charge,
      start_date:this.props.navigation.state.params.start_date,
      end_date:this.props.navigation.state.params.end_date,
      note:this.props.navigation.state.params.note,
      room_list:this.props.navigation.state.params.room_list
    }
  }

  _onChange = (form) => {
    if(form.valid)
    {
      this.setState({valid:true});
    }
  }

  confirmPayment = () =>
  {
    // console.log('PAID');
    ToastAndroid.show("Sending Request ...", ToastAndroid.LONG);
    post(createTransaction, {
      user_id:1,
      total_charge:this.state.total_charge,
      start_date:this.state.start_date,
      end_date:this.state.end_date,
      note:this.state.note,
      room_list:this.state.room_list
    })
    .then(data => {
      ToastAndroid.show("Thank you for purchase", ToastAndroid.LONG);
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'dashboard' })],
      });
      this.props.navigation.dispatch(resetAction);
    })
    .catch(errorMessage => {
      console.log(errorMessage);
      ToastAndroid.show("Oops, Something went wrong. Please try again later", ToastAndroid.LONG);
    })
  }

  static navigationOptions=({navigation}) => ({
    title:"Payment Method",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
  });

  render() {  

    return (
      <Block white>
        <Block flex={false}>
          <CreditCardInput onChange={this._onChange} />
        </Block>
        <TouchableOpacity onPress={this.confirmPayment} disabled={!this.state.valid} style={[styles.checkOut,{marginHorizontal:10, paddingVertical:15, marginTop:35, backgroundColor: this.state.valid ? R.colors.greenGrass : R.colors.gray}]}>
          <Text title white bold center middle>CONFIRM PAYMENT</Text>
        </TouchableOpacity>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  checkOut: {
    paddingVertical: 10,
    borderRadius:5,
    marginTop:10,    
  }
});