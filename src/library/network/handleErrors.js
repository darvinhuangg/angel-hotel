// import i18n from '@res/lang/i18n';
// import { Alert } from 'react-native';

// handleError.js - Common Error Handler Function
export function handleError (error: any) {
	console.log(error);
	if(error.data){
		const { status } = error;

		switch (status){
			case 401:
				return error;
			case 404:
				return error;
			case 422:
				return error;
			case 500:
				return error;
		}
		// return error;
	} else {
		return error;
	}


	//Check for error code

	//return message?
    // if('data' in error) {
  	 //  return error.data
    // }

    // return error;
  // const { status, message } = error;

  // return message; // I like to get my error message back
}