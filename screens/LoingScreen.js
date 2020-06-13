import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

export var ACC_TOKEN = []

export default class LoginScreen extends React.Component {
	
  constructor(props) {
    super();
    global.SampleVar = 'This is Global Variable.';
    global.MyVar = 'https://aboutreact.com';
    global.acc_key = ['access_token']; //this can be changed
    global.acc_key[0] = '';
    super(props);
    this.state={
      email:"",
      password:"",
      access_token:"",

      loading:false,
      message:""
    }
  }
  

  componentDidMount(){
    this.login()
    
    console.log(this.state.message)
}

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>WELCOME</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}
            value={this.state.email}
            />
            
        </View>
        <View style={styles.inputView} > 
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}
            value={this.state.password}
            />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>this.authenticate( this.state.email, this.state.password)} >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

  
      </View>
    );
  }

  
  login=async ()=>{
    const email = await AsyncStorage.getItem("email")
    const password = await AsyncStorage.getItem("password")
    if(email && password){
        this.setState({email,password})
        this.authenticate(email, password)

    }
}
  //window.axios.post(`/api/auth/login`,{"username":"admin@admin.com","password":"admin123"})
  authenticate=(email, password)=>{
    //const access_token =""
    
    this.setState({loading:true,message:"", access_token:""})
    axios.post(`http://127.0.0.1:8000/api/auth/login`,{"username":"admin@admin.com","password":"admin123"})
    .then(async res=>{
        global.acc_key[0] = res.data.access_token
       
        this.setState({loading:false})
        if(res.data.access_token){
            await AsyncStorage.setItem("email",email)
            await AsyncStorage.setItem("password",password)
            await AsyncStorage.setItem("access_token",res.data.access_token)
            this.props.navigation.navigate("Home")
            this.setState({message:"Success",access_token:res.data.access_token})

        }else {
            this.setState({message:"This account is not active",loading:false})

        }
    })
    .catch(err=>{
        this.setState({message:"Error connecting to the server, Please try again later.",loading:false})

    })
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});