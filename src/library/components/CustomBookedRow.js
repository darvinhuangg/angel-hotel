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

class CustomBookedRow extends React.Component {

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
		
		let borderColor = item.confirm_payment ? R.colors.greenGrass : R.colors.orange;
		return(
			<Block spacing={false} marginVertical={2} style={{borderWidth:2, borderColor:borderColor, borderRadius:10, height:150}}>
				<TouchableOpacity style={{flex:1}} onPress={this.showItemprop.bind(this)}>
					<Block paddingHorizontal={10} row flex={false}>
						<Block spacing={false}>
							{ item.rooms ? (
			                  item.rooms.map((book, index) => {
			                    return <Text key={index} title style={{marginTop:5}}>Room {book.room.name} - Type {book.room.type} - ${book.room.price}/night </Text>
			                  })
			                ) : (null) }
						</Block>
		                <Block spacing={false} flex={false} middle center>
		                	<Text semibold numberOfLines={1} ellipsizeMode="tail" h1 greenGrass right>${item.total_charge}</Text>
		                </Block>
					</Block>
					<Block flex={false} paddingHorizontal={10}>
						<Text numberOfLines={2} ellipsizeMode="tail" right title>{Moment(item.startdate).format("MMMM Do YYYY")} until {Moment(item.enddate).format("MMMM Do YYYY")}</Text>
						{ item.confirm_payment ? (null) : (
							<Text light numberOfLines={2} ellipsizeMode="tail" right>*Please wait while your payment is waiting for confirmation</Text>
						)}
					</Block>
				</TouchableOpacity>
			</Block>
		)
	}
}

export default CustomBookedRow;