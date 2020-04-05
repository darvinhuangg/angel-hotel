import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import CustomBookedRow from '@components/CustomBookedRow';
import { get, post } from '@library/network/API';
import { retrieveBookedList } from '@library/network/apiCallback';
import QRCode from 'react-native-qrcode-svg';

export default class Booked extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      productList:[],
      onHoldSelectedItem:[],
    }    
  }

  componentDidMount()
  {
    this.retrieveBookedList()
  }

  retrieveBookedList()
  {
    get(retrieveBookedList + '3')
    .then(data => {
      this.setState({productList:data.data.data});
    })
    .catch(error => {
      console.log(error);
      ToastAndroid.show('Oops, Something went wrong. Please try again later');
    })
  }

  showItemDetails = (item) => {
    this.setState({onHoldSelectedItem:item}, () => {
      this._panel.show();
    });
  }

  _listEmptyProductList = () => {
    return (
      <View>
        <Block center middle white style={{borderWidth:1, borderRadius:10, borderColor:R.colors.lightGray}} paddingVertical={20}><Text title semibold>No Booked Available</Text></Block>
      </View>
    )
  }

  static navigationOptions=({navigation}) => ({
    title:"Booked List",
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

                <FlatList
                  data={this.state.productList}
                  renderItem={(item) => <CustomBookedRow item={item.item} showItem={this.showItemDetails.bind(this)} /> }
                  ListEmptyComponent={this._listEmptyProductList}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
            </ScrollView>
          </Block>
          <SlidingUpPanel 
            ref={c => this._panel = c}
            height={400}
            draggableRange={{top:400, bottom:0}}
            // allowDragging={false}
            friction={.4}
          >
            <Block paddingHorizontal={20} paddingVertical={20} style={styles.panel}>
              <Block spacing={false} middle center flex={false} paddingVertical={30}>
                <QRCode
                  value={`http://hotel.stickyturbo.com/api/v1/guest-booked/${onHoldSelectedItem.id}/${onHoldSelectedItem.user_id}`}
                  size={150}
                />
              </Block>
              <Text title center>Please show the barcode above to receptionist for proceed.</Text>
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