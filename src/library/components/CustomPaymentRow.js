import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import R from '@res/R';
import Block from '@components/Block';
import Text from '@components/Text';
import Moment from 'moment';

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

class CustomPaymentRow extends React.Component {

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
						<Text semibold numberOfLines={1} ellipsizeMode="tail" style={{marginBottom:3}}>{item.user ? item.user.name : null}</Text>
						<Text light caption numberOfLines={2} ellipsizeMode="tail">{Moment(item.startdate).format("MMMM Do YYYY")} until {Moment(item.enddate).format("MMMM Do YYYY")}</Text>
					</Block>
					<Block middle center flex={false} paddingHorizontal={15}>
						<Text semibold right numberOfLines={1} ellipsizeMode="tail" h3>${item.total_charge}</Text>
					</Block>
				</TouchableOpacity>
			</Block>
		)
	}
}

export default CustomPaymentRow;