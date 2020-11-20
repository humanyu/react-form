import React from 'react';
import { Keyboard,Dimensions,ActivityIndicator,TouchableWithoutFeedback,FlatList,ScrollView,StyleSheet,TouchableOpacity, Text,Image, View, Button,TextInput,PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const WidthScreen = Dimensions.get('window').width;
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-picker/picker';


export default class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state={countrycode: '+91',cpassworD:'',username:'',email:'',passworD:'',mobileNo:'',ActivityIndicator_Loading: false }
    
      }
      componentDidMount() {
        this.props.navigation.addListener('willFocus', payload => {
          
       });
      }
      
      _SetSession = async(usID) => {
    
             await AsyncStorage.setItem('SkipToken', '1');
           
             await AsyncStorage.setItem('userID', usID.toString());
           }
      submitSkip = async () => {
        try {
          //alert();
          await AsyncStorage.setItem('SkipToken', '1');
          //alert();
          this.props.navigation.navigate('Home')
        } catch (error) {
          // Error saving data
        }
        
      };
    
    
    
     
      _showErrorMessage(msg){
        Toast.show(msg);
     
      }
    
      _showSuccessMessage(msg){
        Toast.show(msg);
        }
      render() {
        
        return (
         
          <View style={styles.container}>
             
            <Text  style={styles.welcome}>Welcome To Info World ---Sign Up</Text>
            
            <View style={styles.loginContainer}>
           <View style={styles.input}>  
           <TextInput  style={styles.input2}  placeholder="Enter User Name"
           onChangeText={(username)=>this.setState({username})}
           value={this.state.username} />
           
              </View>
             
              <View style={styles.input}>  
              <Picker
  selectedValue={this.state.countrycode}
  style={{ width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({countrycode: itemValue})
  }>
  <Picker.Item label="+91" value="+91" />
  <Picker.Item label="+1" value="+1" />
</Picker>
           <TextInput keyboardType={'numeric'} style={styles.input0}  placeholder="Enter Mobile Number"
           onChangeText={(mobileNo)=>this.setState({mobileNo})}
           value={this.state.mobileNo} />
           
              </View>
              <View style={styles.input}>  
           <TextInput  style={styles.input2}  placeholder="Enter Email Id"
           onChangeText={(email)=>this.setState({email})}
           value={this.state.email} />
           
              </View>
              <View style={styles.input}>  
           <TextInput secureTextEntry={true}  style={styles.input2}  placeholder="Enter Password"
           onChangeText={(passworD)=>this.setState({passworD})}
           value={this.state.passworD} />
           
              </View>

              <View style={styles.input}>  
           <TextInput secureTextEntry={true}  style={styles.input2}  placeholder="Enter Confirm Password"
           onChangeText={(cpassworD)=>this.setState({cpassworD})}
           value={this.state.cpassworD} />
           
              </View>
          <TouchableOpacity style={styles.continueBtnContainer} onPress={() => {this._login()}}>
         
          
          <Text style={styles.continueBtn} >SignUp</Text>  
        
         
          </TouchableOpacity>
    <Text style={styles.skip} onPress={() => {this.props.navigation.navigate('Login')}}>SignIn Here?</Text>  
          </View>
          
          
    
          {
            
            this.state.ActivityIndicator_Loading ? <ActivityIndicator  size="large" color="#000000"  style={styles.ActivityIndicatorStyle} /> : null
            
            }
          </View>
          
        );
      }
    
      
      _login = async()=>{
        if(this.state.username==''){
          this._showErrorMessage('Please Enter Username');
          return false;
         }
    if(this.state.mobileNo==''){
      this._showErrorMessage('Please Enter Mobile Number');
      return false;
     }
     if(this.state.mobileNo.length!=10){
      this._showErrorMessage('Please Enter valid Mobile Number');
      return false;
     }
     if(this.state.email==''){
      this._showErrorMessage('Please Enter Email ID');
      return false;
     }
     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
     if(reg.test(this.state.email) === false){
      this._showErrorMessage('Please Enter valid Email ID');
      return false;
     }
     if(this.state.passworD==''){
      this._showErrorMessage('Please Enter Password');
      return false;
     }

     if (!this.state.passworD.match(/[a-z]/g) || !this.state.passworD.match( 
      /[A-Z]/g) || !this.state.passworD.match( 
      /[0-9]/g) || !this.state.passworD.match( 
      /[^a-zA-Z\d]/g) || !this.state.passworD.length >= 6) {
      this._showErrorMessage('Please Enter password with atleast 1 uppercase, 1 lowercase,1 digit, 1 special chrs, and minimum 6');
      return false;
  }

     if(this.state.cpassworD==''){
      this._showErrorMessage('Please Enter Confirm Password');
      return false;
     }

     if(this.state.passworD!=this.state.cpassworD){
      this._showErrorMessage('Confirm password is mismatch');
      return false;
     }
     Keyboard.dismiss();
     this.setState({ ActivityIndicator_Loading : true }, () =>
            {
                fetch('https://radonhotels.com/Apps/Api/Api_Test?req=signup&token=QTB2B2019API',
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
                      email : this.state.email,
                      password : this.state.passworD,
                      username : this.state.username,
                  countrycode: this.state.countrycode,
                     
     
                    })
     
                }).then((response) => response.json()).then(async(responseJsonFromServer) =>
                {
                  //alert(JSON.stringify(responseJsonFromServer));
                 // return false; 
     if(responseJsonFromServer.status == 1){
      this.setState({ ActivityIndicator_Loading : false, TempuserID:responseJsonFromServer.userID});
      this._showErrorMessage('Registration successfull!');
      await AsyncStorage.setItem('userID', this.state.TempuserID.toString());
      this.props.navigation.navigate('Home') 
     } else if(responseJsonFromServer.status == 2){
      this.setState({ ActivityIndicator_Loading : false, });
      this._showErrorMessage('Username is already exist');
     
     } else  if(responseJsonFromServer.status == 3){
      this.setState({ ActivityIndicator_Loading : false, });
      this._showErrorMessage('Mobile no is already exist');
      
     } else  if(responseJsonFromServer.status == 4){
      this.setState({ ActivityIndicator_Loading : false, });
      this._showErrorMessage('Email Id is already exist');
 
     } else  {
      this.setState({ ActivityIndicator_Loading : false, });
      this._showErrorMessage('Something Went Wrong. Try Again Later!');
     }
                    
                   
                }).catch((error) =>
                {
                  
                   this._showErrorMessage('Something went wrong. Try again later!');
                    this.setState({ ActivityIndicator_Loading : false});
                });
            });
    
      }
    
      
    
         
    }
    
    
      
    
    const styles= StyleSheet.create({
      input0: {
        width: '70%', 
        padding: 0,
        fontSize: 0.04*WidthScreen,
        lineHeight:25,
        borderRadius: 15,
        flexDirection: 'row',
       
      },
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