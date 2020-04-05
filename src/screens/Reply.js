import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import CustomEmailRow from '@components/CustomEmailRow';

export default class Reply extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      user: this.props.navigation.state.params.sender,
      subject: this.props.navigation.state.params.subject,
    }    
  }

  componentDidMount()
  {
    // this.getWorkshopDetail();
    // this.getWorkshopAllProduct();
    // this.getMaintenanceReviews();
    // // console.log(this.props.navigation.state.params.region);
    // this.setState({},()=>{
    //   //ref can be found if has been rendered, which by using setState to re-render and get panel ref
    //   this._panel.hide();
    // })
  }

  showItemDetails = (item) => {
    this.setState({onHoldSelectedItem:item}, () => {
      this._panel.show();
    });
  }

  _listEmptyProductList = () => {
    return (
      <View>
        <Block center middle white style={{borderWidth:1, borderRadius:10, borderColor:R.colors.lightGray}} paddingVertical={20}><Text title semibold>No Email Available</Text></Block>
      </View>
    )
  }

  sendEmail = () => {
    ToastAndroid.show("Sending Messages ...", ToastAndroid.LONG);
    this.props.navigation.goBack();
  }

  static navigationOptions=({navigation}) => ({
    title:"Mail",
    headerStyle:{elevation:0, shadowOpacity:0},
    headerTitleStyle: { flex: 1, textAlign: 'center'},
    headerTitleContainerStyle: {left: 0 },
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
              showsHorizontalScrollIndicator={false}>

              <Text style={{marginTop:20}}>To: </Text>
              <TextInput 
                value={this.state.user}
                placeholder="Email Address Here"
                placeholderTextColor="#ccc"
                style={[styles.input,{marginTop:10}]}
              />

              <Text style={{marginTop:20}}>Subject: </Text>
              <TextInput 
                value={"RE: " + this.state.subject}
                placeholder="Subject Here"
                placeholderTextColor="#ccc"
                style={[styles.input,{marginTop:10}]}
              />

              <Text style={{marginTop:20}}>Description: </Text>
              <TextInput 
                multiline={true}
                numberOfLines={5}
                placeholder="Description Here"
                placeholderTextColor="#ccc"
                style={[styles.input,{marginTop:10}]}
              />

              <Block>
                <TouchableOpacity style={styles.checkOut} onPress={this.sendEmail}>
                  <Text style={{textAlign:'center', color:'#fff', fontSize:18, fontWeight:'bold'}}>
                    <MaterialCommunityIcons name="send" size={20} color="#fff" /> SEND
                  </Text>
                </TouchableOpacity>
              </Block>

            </ScrollView>
          </Block>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
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
  checkOut: {
    paddingVertical: 10,
    backgroundColor: R.colors.greenGrass,
    borderRadius:5,
    marginTop:10,
  },
});