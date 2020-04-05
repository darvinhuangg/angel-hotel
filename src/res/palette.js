import colors from './colors'

const palette = {
  heading: {
    color: colors.title,
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    color: colors.text,
    fontSize: 17,
    textAlign: 'center'
  },
  right:{
    textAlign:'right', 
  },
  bold: {
    fontWeight:'bold',
  },
  touchableRow:{
    borderRadius:15,
    marginVertical:5,
    padding:15,
    borderWidth:1,
    borderColor:colors.lightGray,
  },
  picker:{
    borderRadius:15,
    paddingVertical:5,
    flex:1,
    borderColor:colors.lightGray,
    borderWidth:1,
    marginHorizontal:5,
  }
}

export default palette