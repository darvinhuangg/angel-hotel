import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomProductRow from '@components/CustomProductRow';
import { get, post } from '@library/network/API';
import { changeDate } from '@library/network/apiCallback';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

export default class ChangeBookingDate extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      transaction: this.props.navigation.state.params.transaction,
      startdatetime:Moment(new Date()).format("YYYY-MM-DD"),
      enddatetime:Moment(this.startdatetime).add(1,'days').format("YYYY-MM-DD"),
    }
 
  }

  changeDate = () =>
  {
    let { startdatetime, enddatetime, transaction } = this.state;

    post(changeDate, {
      id: transaction.id,
      start_date: startdatetime,
      end_date: enddatetime,
    })
    .then(data => {
      ToastAndroid.show("Changed Date Success", ToastAndroid.SHORT);
      this.props.navigation.state.params.onNavigateBack();
      this.props.navigation.goBack();
    })
    .catch(errorMessage => {
      console.log(errorMessage);
      ToastAndroid.show("Oops, Something went wrong. Please try again later", ToastAndroid.LONG);
    })
  }

  static navigationOptions=({navigation}) => ({
    title:"Change Booking Date",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
  });

  render() {  

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
            <Block>
              <Block spacing={false} flex={false}>
                <Text style={{paddingVertical:10,marginTop:20}} title>Start Date</Text>
                <DatePicker
                  style={{width:'100%'}}
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
                  onDateChange={(date) => {this.setState({startdatetime: Moment(date).format("YYYY-MM-DD"), enddatetime: Moment(date, "YYYY-MM-DD").add(1, 'days') })}}
                />
              </Block>
              <Block spacing={false} flex={false}>
                <Text style={{paddingVertical:10,marginTop:20}} title>End Date</Text>
                <DatePicker
                  style={{width:'100%'}}
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
              <TouchableOpacity onPress={this.changeDate} style={[styles.goToCheckOut,{marginHorizontal:10, flex:0, paddingVertical:15, marginTop:35}]}>
                <Text title white bold center middle>CHANGE DATE</Text>
              </TouchableOpacity>
            </Block>
              
          </ScrollView>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goToCheckOut: {
    backgroundColor: R.colors.greenGrass,
    justifyContent:'center',
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 28,
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