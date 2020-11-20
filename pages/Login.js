import React from 'react';
import { Keyboard,Dimensions,ActivityIndicator,TouchableWithoutFeedback,FlatList,ScrollView,StyleSheet,TouchableOpacity, Text,Image, View, Button,TextInput,PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const WidthScreen = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';



export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={TempuserID:'',passworD:'',mobileNo:'',ActivityIndicator_Loading: false }
    
      }
      
       componentDidMount() {
      this.props.navigation.addListener('willFocus', payload => {
        
     });
    }
     
      
    
    
    
     
      _showErrorMessage(msg){
        Toast.show(msg);
     
      }
    
      _showSuccessMessage(msg){
        Toast.show(msg);
        }
      render() {
        
        return (
         
          <View style={styles.container}>
            
            <Text  style={styles.welcome}>Welcome To Info World ---Sign In</Text>
            
            <View style={styles.loginContainer}>
           <View style={styles.input}>  
           <TextInput style={styles.input2}  placeholder="Enter Mobile Number Or Email"
           onChangeText={(mobileNo)=>this.setState({mobileNo})}
           value={this.state.mobileNo} />
           
              </View>
              <View style={styles.input}>  
           <TextInput secureTextEntry={true}  style={styles.input2}  placeholder="Enter Password"
           onChangeText={(passworD)=>this.setState({passworD})}
           value={this.state.passworD} />
           
              </View>
              
          <TouchableOpacity style={styles.continueBtnContainer} onPress={() => {this._login()}}>
         
          
          <Text style={styles.continueBtn} >SignIn</Text>  
        
         
          </TouchableOpacity>
    <Text style={styles.skip} onPress={() => {this.props.navigation.navigate('Signup')}}>SignUp Here?</Text>  
          </View>
          
          
    
          {
            
            this.state.ActivityIndicator_Loading ? <ActivityIndicator  size="large" color="#000000"  style={styles.ActivityIndicatorStyle} /> : null
            
            }
          </View>
          
        );
      }
    
     
      _login = async()=>{
    if(this.state.mobileNo==''){
      this._showErrorMessage('Please Enter Mobile Number or Email Id');
      return false;
     }
     

    
    
     if(this.state.passworD==''){
      this._showErrorMessage('Please Enter Password');
      return false;
     }
     Keyboard.dismiss();
     this.setState({ ActivityIndicator_Loading : true }, () =>
            {
                fetch('https://radonhotels.com/Apps/Api/Api_Test?req=login&token=QTB2B2019API',
                {
                    method: 'POST',
                    headers: 
                    {
                      'Accept-Encoding':'gzip;q=1.0, compress;q=0.5',  
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': 0
                    },
                    body: JSON.stringify(
                    {
                     
                      mobileno : this.state.mobileNo,
                      password : this.state.passworD,
                     
     
                    })
     
                }).then((response) => response.json()).then(async(responseJsonFromServer) =>
                {
                  //alert(JSON.stringify(responseJsonFromServer));
                  //return false; 
                  if(responseJsonFromServer.status == 1){
                    this.setState({ ActivityIndicator_Loading : false,TempuserID:responseJsonFromServer.userID });
                    this._showSuccessMessage('You are Logged In Successfully!');
                   
                     
                       await AsyncStorage.setItem('userID', this.state.TempuserID.toString());
                    this.props.navigation.navigate('Home') 
                  } else  if(responseJsonFromServer.status == 2){
                    this.setState({ ActivityIndicator_Loading : false,});
                    this._showErrorMessage('Invalid Login!');
                   } else {
                    this.setState({ ActivityIndicator_Loading : false, });
                    this._showErrorMessage('Something Went Wrong. Try Again Later!');
                   }
                    
                   
                }).catch((error) =>
                {
                   // console.error(error);
                   this._showErrorMessage('Something went wrong. Try again later!');
                    this.setState({ ActivityIndicator_Loading : false});
                });
            });
    
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
    loginContainer:{
      justifyContent:'center',
      alignItems:'center',
      width:"100%"
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
       fontSize:0.04*WidthScreen,
    color: '#ffffff',
    margin: 3,
    
      },
      input: {
        width: '90%',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        marginTop: 10,
        fontSize: 0.04*WidthScreen,
        lineHeight:22,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      
     
     
      input2: {
        width: '85%',
        backgroundColor: '#ffffff',
        fontSize: 0.04*WidthScreen,
        
      },
      continueBtnContainer: {
        backgroundColor: "#ff5722",
        width: "90%",
        padding: 12,
       marginTop: 5,
        justifyContent:'center',
        alignItems:'center',
    borderRadius: 15,
        
      },
      continueBtn: {
        backgroundColor: "#ff5722",
        color: "#ffffff",
        //fontSize: 20,
        fontSize: 0.05*WidthScreen,
        lineHeight:20,
        
        
       
      },
      skip: {
        color: '#f9c134',
       // fontSize: 20,
        fontSize: 0.04*WidthScreen,
        paddingTop: 15,
      }
    })