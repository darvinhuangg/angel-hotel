import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';

export default class Login extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      
    }
  }

  static navigationOptions=({navigation}) => ({
    headerStyle:{elevation:0, shadowOpacity:0},
  });

  render() {

    let {onHoldSelectedItem} = this.state;

    return (
      
        <View style={{flex:1}}>
          <Block white>
            <Block center>
              <Text h1 semibold>Hotel Angel</Text>
            </Block>
            <Block center>
              <Text title semibold>Login as</Text>
              <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('AdminDashboard')}>
                <Text title>Administrator</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('dashboard')}>
                <Text title>User</Text>
              </TouchableOpacity>
            </Block>
          </Block>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop:20,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:5,
    borderWidth:1,
    borderColor:R.colors.gray,
  }
});