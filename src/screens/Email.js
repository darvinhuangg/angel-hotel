import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import SlidingUpPanel from 'rn-sliding-up-panel';
import CustomEmailRow from '@components/CustomEmailRow';

export default class Email extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      productList:[
        {id:1, name:"John 101", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"27 March 2020", email:"john101@smail.com"},
        {id:2, name:"John 102", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"28 March 2020", email:"john102@smail.com"},
        {id:3, name:"John 103", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"28 March 2020", email:"john103@smail.com"},
        {id:4, name:"John 104", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"29 March 2020", email:"john104@smail.com"},
        {id:5, name:"John 105", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"29 March 2020", email:"john105@smail.com"},
        {id:6, name:"John 106", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"30 March 2020", email:"john106@smail.com"},
        {id:7, name:"John 107", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"30 March 2020", email:"john107@smail.com"},
        {id:8, name:"John 108", subject:"Lorem ipsum dolor", context:"Lorem ipsum dolor ismet lorem ipsum dolor ismet", date:"30 March 2020", email:"john108@smail.com"},
      ],
      selectedItems:[],
      onHoldSelectedItem:[],
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

                <FlatList
                  data={this.state.productList}
                  renderItem={(item) => <CustomEmailRow item={item.item} showItem={this.showItemDetails.bind(this)} /> }
                  ListEmptyComponent={this._listEmptyProductList}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
            </ScrollView>
          </Block>
          <SlidingUpPanel 
            ref={c => this._panel = c}
            height={500}
            draggableRange={{top:500, bottom:0}}
            // allowDragging={false}
            friction={.4}
          >
            <Block paddingHorizontal={20} paddingVertical={20} style={styles.panel}>
              
              <Text h3 semibold style={{borderBottomWidth:1, borderColor:R.colors.lightGray, paddingBottom:5}}>{onHoldSelectedItem.name ? onHoldSelectedItem.name : null}</Text>

              <Block row spacing={false} flex={false}>
                 <Text h3 semibold style={{marginTop:10, flex:1}}>{onHoldSelectedItem.subject ? onHoldSelectedItem.subject : null}</Text> 
                  <Text gray style={{marginTop:10}}>{onHoldSelectedItem.date ? onHoldSelectedItem.date : null}</Text> 
              </Block>

              <View style={{marginTop:40}}>
                <Text medium light style={{marginTop:5}}>{onHoldSelectedItem.context ? onHoldSelectedItem.context : null}</Text>
              </View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Reply', {sender: onHoldSelectedItem.email, subject: onHoldSelectedItem.subject})} style={[styles.goToCheckOut,{marginHorizontal:10, flex:0, paddingVertical:15, marginTop:35, backgroundColor: onHoldSelectedItem.isSelect ? R.colors.gray : R.colors.greenGrass}]}>
                <Text title white bold center middle>
                  <MaterialCommunityIcons name="reply" size={20} color="#fff" /> REPLY
                </Text>
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