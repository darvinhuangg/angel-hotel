import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';

const styles = StyleSheet.create({
	name: {
		fontSize: 14,
		width:140,
		fontWeight:'600',
	},
	type: {
		fontSize: 12,
		width: 150,
		color:'#777'
	},
	price: {
		fontSize: 14,
		fontWeight:'bold',
		textAlign:'right',
	},
	product_icon: {
		height: 40,
		width: 40
	},
	btn_cart:{
		marginLeft:'auto',
		justifyContent:'center',
		flex:1,
		borderTopRightRadius:10,
		borderBottomRightRadius:10,
	},
	cartStyle: {
    	backgroundColor:R.colors.primary,
	},
	cartedStyle: {
	  	backgroundColor: R.colors.gray,
	}
});

class CustomEmailRow extends React.Component {

	constructor(props){
	    super(props);
	}

	// updateItemprop = () => {
	// 	this.props.selectItem(this.props.item);
	// }

	showItemprop = () => {
		this.props.showItem(this.props.item);
	}

	render(){
		let {item} = this.props;
		
		!item.isSelectstyle ? item.isSelectstyle = styles.cartStyle : item.isSelectstyle

		return(
			<Block spacing={false} row marginVertical={2} style={{borderWidth:1, borderColor:R.colors.lightGray, borderRadius:10, height:75}}>
				<TouchableOpacity style={[item.isSelectstyle],{flex:1, flexDirection:'row'}} onPress={this.showItemprop.bind(this)} underlayColor={R.colors.primary}>
					<Block flex={1} paddingHorizontal={15}>
						<Text semibold numberOfLines={1} ellipsizeMode="tail" style={{marginBottom:3}}>{item.subject}</Text>
						<Text caption grat numberOfLines={1} ellipsizeMode="tail">{item.context}</Text>
						<Text caption numberOfLines={1} ellipsizeMode="tail">By {item.name}</Text>
					</Block>
					<Block middle center flex={false} paddingHorizontal={15}>
						<Text gray right numberOfLines={1} ellipsizeMode="tail">{item.date}</Text>
					</Block>
				</TouchableOpacity>
			</Block>
		)
	}
}

export default CustomEmailRow;