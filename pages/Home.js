import React from 'react';
import { Dimensions,ActivityIndicator,TouchableWithoutFeedback,FlatList,ScrollView,StyleSheet,TouchableOpacity, Text,Image, View, Button,TextInput,PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const WidthScreen = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';



export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={userID:'',countrycode:'',mobile:'',email:'',username:'',ActivityIndicator_Loading: true,}
    
      }

      _showErrorMessage(msg){
        Toast.show(msg);
     
      }

      async componentDidMount(): Promise<void> {
  
        const userID =  await AsyncStorage.getItem('userID');
        this.setState({userID: userID})
        return fetch('https://radonhotels.com/Apps/Api/Api_Test?req=profile&userID='+userID+'&token=QTB2B2019API',{headers: {
         
          'Accept-Encoding':'gzip;q=1.0, compress;q=0.5',  
        'Accept': 'application/json',
        'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0
        },
        method: 'GET',
      })
        
          .then((response) => response.json())
          .then((responseJson) => {
            //alert(JSON.stringify(responseJson));
            this.setState({
              isLoading: false,
              mobile: responseJson.data.mobile,
              email: responseJson.data.email,
              username: responseJson.data.username,
              countrycode: responseJson.data.countrycode,
            }, function(){
    
            });
    
          })
          .catch((error) =>{
           // console.error(error);
           this._showErrorMessage('Something went wrong. Try again later!');
          });
    
     
      }
      
    
    
    
      render() {
        
        return (
         
          <View style={styles.container}>
            <Text  style={styles.welcome}>----Welcome To Home----</Text>
           
    {  this.state.username!='' &&   
   <View>       
<Text  style={styles.welcome}>Username: {this.state.username}</Text>

        <Text  style={styles.welcome}>Mobile: {this.state.countrycode} {this.state.mobile}</Text>
<Text  style={styles.welcome}>Email Id: {this.state.email}</Text>
<Text  style={styles.welcome} onPress={() => {this._logout()}}  >Logout</Text>
</View>         
    }
        
    
          {
            
            this.state.ActivityIndicator_Loading ? <ActivityIndicator  size='large' style={styles.ActivityIndicatorStyle} /> : null
            
            }
          </View>
          
        );
      }
    
      
      _logout = async()=>{

        await AsyncStorage.removeItem('userID');
        Toast.show('You are successfully logout!');
        this.props.navigation.navigate('Login') 
      }
    
      
    
         
    }
    
    
      
    
    const styles= StyleSheet.create({
      ActivityIndicatorStyle:{
          
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      
    },
    
      container: {
        flex:1,
        color: '#ffffff',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0b9d78',
        alignSelf: 'stretch',
      },
      welcome: {
        //fontSize: RFValue(20, 680),
       //fontSize: RFPercentage(2.5),
       fontSize:0.05*WidthScreen,
    color: '#ffffff',
    margin: 3,
    
      },
      
    })