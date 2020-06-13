import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component, useState } from 'react';
import { FlatList,ActivityIndicator, Image,Button, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { ScrollView, State } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { isLoading } from 'expo-font';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>



          
          <InvoiceByNumber />


          

        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View>
    </View>
  );
}







export  class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('https://reactnative.dev/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.movies,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <view>
        <text>{this.props.mytext}</text>
        </view>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}


export  class InvoiceByNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  state={
    isVisible:true
  }
  componentDidMount() {
    const myText ="some text"
    return fetch('https://reactnative.dev/movies.json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: true,
            canSearch: false,
            dataSource: responseJson.movies,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }



  renderResults=() =>{ 
    this.setState({
      isVisible:!this.state.isVisible//toggles the visibilty of the text
    })
  } 



  onChangeText = (key, val) => {
    this.setState({ [key]: val})
  }

    
  render() { 

    let Block;
    let Search;

    Search = <div>

          <TextInput
            placeholder='Invoice Number'
            onChangeText={val => this.onChangeText('inv_no', val)}
            style={styles.input}
          />
          <Button onPress={ this.renderResults} 
                title="Search!" 
                color="#841584" /> 
           {this.state.isVisible?<Text> 
             <FetchExample 
             mytext={this.state.inv_no}
             /> 
          </Text>:null}

    </div>;
  

    return (
      <view>

        {Block}
        {Search}

    </view>
      
      

      
    );

   /*  return (
      <View style={styles.container}>
         
         <Button onPress={ this.renderResults} 
            title="Search!" 
            color="#841584" /> 
          <Text>Service</Text>
          <TextInput
            placeholder='Invoice Number '
            onChangeText={val => this.onChangeText('inv_no', val)}
            style={styles.input}
          />

          <Button
            onPress={()=>alert( this.state.inv_no)}
            title="Search"
          >
            
          </Button>
          <view >
          {this.state.isVisible?<Text> get printed </Text>:null}
          </view>
         
      
        </View>
    ); */
  }
}

/* export  class InvoiceByNumber extends React.Component {
    signIn = () => {
      var username = this.refs.username.value;
      var password = this.refs.password.value;
  
      Alert.alert(username); //doesn't work
      Alert.alert(password); //doesn't work
    }
    render() {
      return (
        <View style={{marginTop: 60}}>
          <TextInput ref='username' placeholder='Username' autoCapitalize='none' />
          <TextInput ref='password' placeholder='Password' autoCapitalize='none' secureTextEntry={true} />
          <Button title='Submit' onPress={this.signIn.bind(this)} />
        </View>
      );
    }
  } */



export function PizzaTranslator() {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}  
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
  );
}



HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
