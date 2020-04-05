import React from 'react';
import { View, StyleSheet } from 'react-native';
import R from '@res/R';

export default class Block extends React.Component {	

	render(){
		
		const { 
			row,
			column,
			flex,
			spacing,
			paddingVertical,
			paddingHorizontal,
			marginVertical,
			marginHorizontal,
			center,
			middle,
			color,
			shadow,
			style, 
			children,
			space,
			left,
			right,
			primary,
			secondary,
			tertiary,
			white,
			black,
			greenGrass,
			lightBlue,
			... props
		} = this.props;
		
		const blockStyles = [
			styles.block,
			flex && { flex },
			flex === false && { flex:0 }, //reset or disable flex
			spacing === false && { padding:0, margin:0}, //reset or disable padding or margin
			paddingVertical && { paddingVertical },
			paddingHorizontal && { paddingHorizontal },
			marginVertical && { marginVertical },
			marginHorizontal && { marginHorizontal },
			row && styles.row,
			left && styles.left,
			right && styles.right,
			column && styles.column,
			shadow && styles.shadow,
			space && { justifyContent: `space-${space}` },
			center && styles.center,
			middle && styles.middle,
			middle && styles.middle, 
			primary && styles.primary,
			secondary && styles.secondary,
			tertiary && styles.tertiary,
			white && styles.white,
			black && styles.black,
			greenGrass && styles.greenGrass,
			lightBlue && styles.lightBlue,
			color && styles[color], //predefined styles colors for background
			color && !styles[color] && { backgroundColor: color}, // custom backgroundColor
			style, //rewrite predefined styles

		];

		return (
			<View style={blockStyles} {...props}>
				{children}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	block: { flex: 1, padding: 10 },
	row: { flexDirection: 'row' },
	column: { flexDirection: 'column' },
	card: {borderRadius: R.sizes.border},
	center: { alignItems: 'center' },
	left: { justifyContent: 'flex-start' },
	right: { justifyContent: 'flex-end' },
	shadow: { 
		shadowOffset: { width: 10, height: 10 },
	    shadowColor: R.colors.black,
	    shadowOpacity: 1,
	    elevation: 5,
	    shadowRadius:5,
	},
	middle: { justifyContent: 'center' },
	primary: { backgroundColor: R.colors.primary },
  	secondary: { backgroundColor: R.colors.secondary },
  	tertiary: { backgroundColor: R.colors.tertiary },
  	white: { backgroundColor: R.colors.white },
  	black: { backgroundColor: R.colors.black },
  	greenGrass: { backgroundColor: R.colors.greenGrass },
  	lightBlue: { backgroundColor: R.colors.lightBlue }
});