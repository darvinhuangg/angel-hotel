import React from 'react';
import { Text, StyleSheet } from 'react-native';
import R from '@res/R';

export default class Typography extends React.Component {

	render(){

		const { 
			h1,
			h2,
			h3,
			title,
			medium,
			body,
			caption,
			small,
			size,
			bold,
			semibold,
			light,
			italic,
			center,
			right,
			style, 
			children, 
			color,
			primary,
			secondary,
			tertiary,
			white,
			black,
			greenGrass,
			firebrick,
			lightBlue,
			gray,
			...props 
		} = this.props

		const textStyles = [
			styles.text,
			h1 && styles.h1,
			h2 && styles.h2,
			h3 && styles.h3,
			title && styles.title,
			medium && styles.medium,
			body && styles.body,
			caption && styles.caption,
			small && styles.small,
			size &&  { fontSize: size },
			bold && styles.bold,
			semibold && styles.semibold,
			light && styles.light,
			italic && styles.italic,
			center && styles.center,
			right && styles.right,
			color && styles[color],
			color && !styles[color] && { color },
			primary && styles.primary,
		  	secondary && styles.secondary,
		  	tertiary && styles.tertiary,
		  	white && styles.white,
		  	black && styles.black,
		  	greenGrass && styles.greenGrass,
		  	firebrick && styles.firebrick,
		  	gray && styles.gray,
		  	lightBlue && styles.lightBlue,
			style
		];

		return (
			<Text style={textStyles} {...props}>{children}</Text>
		)
	}
}

const styles = StyleSheet.create({
	text: {		
		color: R.colors.black,
		fontFamily: "SourceSansPro-Regular"
	},
	// variations
	bold: { fontFamily: 'SourceSansPro-Bold' },
	semibold: { fontFamily: 'SourceSansPro-SemiBold' },
	light: {  fontFamily: 'SourceSansPro-Light' },
	italic: { fontFamily: 'SourceSansPro-Italic' },
	//position
	center: { textAlign: 'center' },
	right: { textAlign: 'right' },
	//color
	primary: { color: R.colors.primary },
  	secondary: { color: R.colors.secondary },
  	tertiary: { color: R.colors.tertiary },
  	white: { color: R.colors.white },
  	black: { color: R.colors.black },
  	greenGrass: { color: R.colors.greenGrass },
  	firebrick: { color: R.colors.firebrick },
  	gray: { color: R.colors.gray },
  	lightBlue: { color: R.colors.lightBlue },
  	//fonts
	h1 : { fontSize: R.sizes.h1 },
	h2 : { fontSize: R.sizes.h2 },
	h3 : { fontSize: R.sizes.h3 },
	title : { fontSize: R.sizes.title },
	medium: { fontSize: R.sizes.medium },
	body : { fontSize: R.sizes.body },
	caption : { fontSize: R.sizes.caption },
	small : { fontSize: R.sizes.small },
});