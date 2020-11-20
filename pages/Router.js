import React, { Component } from 'react'; //Project started at 31 dec 2019 
import { StyleSheet,Button, View, PermissionsAndroid,BackHandler,Platform,StatusBar,Text,TextInput } from 'react-native';
import {createAppContainer,NavigationActions,StackActions,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';


const RootStack = createStackNavigator(
  {
    
    Login: {screen: Login, navigationOptions: {headerShown: false,tabBarVisible: true ,}},
    Signup: {screen: Signup, navigationOptions: {headerShown: false,tabBarVisible: true ,}},
    Home: {screen: Home, navigationOptions: {headerShown: false,tabBarVisible: true }},
   
    
  
  }, 
  {
    
    //initialRouteName: 'Login',
	//headerMode: 'none',
  }
  
);
const AuthStack = createStackNavigator({Home: {screen: Home, navigationOptions: {headerShown: false,tabBarVisible: true ,}}});
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData().done();
  }


  render(){
    return(
      <View>
       <StatusBar 
        barStyle = "dark-content" 
        hidden = {false}
        backgroundColor = "#ffffff52"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
        />
      </View>
    )
  }
  _loadData = async() => {
   
    const IsSkip = await AsyncStorage.getItem('userID');
    
  //alert(IsSkip != null ? 'Auth' : 'App'); 
  //return false; 
this.props.navigation.navigate(IsSkip != null ? 'Auth' : 'App');
  }
}

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);