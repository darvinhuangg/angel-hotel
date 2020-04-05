import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import dashboard from '@screens/dashboard';
import Checkout from '@screens/Checkout';
import Login from '@screens/Login';
import Email from '@screens/Email';
import Reply from '@screens/Reply';
import Payment from '@screens/Payment';
import AdminDashboard from '@screens/AdminDashboard';
import ChangeBookingDate from '@screens/ChangeBookingDate';
import Booked from '@screens/Booked';

export const AppNavigator = createStackNavigator(
	{
		Login: { screen: Login },
		AdminDashboard: { screen: AdminDashboard },
		dashboard: { screen: dashboard },
		Checkout: { screen: Checkout },
		Payment: { screen: Payment },
		Email: { screen: Email },
		Reply: { screen: Reply },
		ChangeBookingDate: { screen: ChangeBookingDate },
		Booked: { screen: Booked }
	},
);