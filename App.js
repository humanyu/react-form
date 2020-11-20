/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Router from './pages/Router';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {

  componentDidMount(){
    
    SplashScreen.hide();	
 
    }
    render() {
  return (
    <>
      <StatusBar  barStyle = "dark-content" 
        hidden = {false}
        backgroundColor = "#ffffff52"
        translucent = {false}
        networkActivityIndicatorVisible = {true} />
     
        
        <Router  />
    
    </>
  );
    }
};

const styles = StyleSheet.create({
  
 
});


