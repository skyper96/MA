import React, { Component }from 'react';

import { StyleSheet, Text, View, Image, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity, Linking, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MailCore from 'react-native-mailcore';

export default class App extends Component {
  render() {
    return <HomeStack />;
  }
}

const Login = ({ navigation }) => (
	<KeyboardAvoidingView behavior="padding" style={styles.container}>
		<View style={styles.logoContainer}>
			<Image style={styles.logo} source={require('./Clops-w.png')} />
		</View>
		<View style={styles.loginFormContainer}>
				<StatusBar
					barStyle="light-content"
					/>
				<TextInput 
					placeholder="email" 
					placeholderTextColor="rgba(255,255,255,0.7)"
					returnKeyType="next"
					onSubmitEditing={() => this.passwordInput.focus()}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input} 
					/>
				<TextInput 
					placeholder="password" 
					placeholderTextColor="rgba(255,255,255,0.7)"
					secureTextEntry
					style={styles.input} 
					ref={(input) => this.passwordInput = input}
					/>
				<TouchableOpacity 
					onPress={() => navigation.navigate('Home')}
					style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
		</View>
	</KeyboardAvoidingView>
);

class ListDetails extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          name: "Auchan",
          address: "Alexandru Vaida Voevod nr. 53",
          email: "auchan@auchan.ro",
          netIncome: "154m"
        },
        {
          name: "Profi",
          address: "Decebal nr.21",
          email: "cluj@profi.ro",
          netIncome: "70m"
        },
      ]),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <View style={{ borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginTop: 5, borderColor: 'white' }}>
          <Text style={{ color: 'white' }}>{rowData.name}</Text> 
          <Text style={{ color: 'white' }}>{rowData.address}</Text> 
          <Text style={{ color: 'white' }}>{rowData.email}</Text> 
          <Text style={{ color: 'white' }}>{rowData.netIncome}</Text> 
          </View>
        }
      />
    );
  }
}

class AddShop extends Component {
  constructor() {
    super();
    this.state = {name: '', address: '', email: '', netIncome: ''};
  }

  render() {
    return (
      <View>
      <TextInput 
      placeholder="Shop Name" 
      placeholderTextColor="rgba(0,0,0,0.7)"
      returnKeyType="next"
      onSubmitEditing={() => this.shopAddress.focus()}
      autoCapitalize="none"
      onChangeText={(shopName) => this.setState({name: shopName})}
      autoCorrect={false}
      style={styles.homeInput} 
      ref={(input) => this.shopName = input}
      />
    <TextInput 
      placeholder="Shop Address" 
      placeholderTextColor="rgba(0,0,0,0.7)"
      returnKeyType="next"
      onSubmitEditing={() => this.shopEmail.focus()}
      autoCapitalize="none"
      onChangeText={(shopAddress) => this.setState({address: shopAddress})}
      autoCorrect={false}
      style={styles.homeInput} 
      ref={(input) => this.shopAddress = input}
      />
    <TextInput 
      placeholder="Shop Email" 
      placeholderTextColor="rgba(0,0,0,0.7)"
      returnKeyType="next"
      onSubmitEditing={() => this.shopNetIncome.focus()}
      autoCapitalize="none"
      onChangeText={(shopEmail) => this.setState({email: shopEmail})}
      autoCorrect={false}
      style={styles.homeInput} 
      ref={(input) => this.shopEmail = input}
      />
    <TextInput 
      placeholder="Shop Net Income" 
      placeholderTextColor="rgba(0,0,0,0.7)"
      returnKeyType="next"
      autoCapitalize="none"
      onChangeText={(shopNetIncome) => this.setState({netIncome: shopNetIncome})}
      autoCorrect={false}
      style={styles.homeInput} 
      ref={(input) => this.shopNetIncome = input}
      />
    <TouchableOpacity 
    onPress={() => Linking.openURL('mailto:filipmobile2017@gmail.com?subject=Request to add a new shop'
    + '&body=Hi, I would like to add the shop: "' + this.state.name
    + '" with the location at: "' + this.state.address + '", the email: "'
    + this.state.email + '" and the net income: "' + this.state.netIncome 
    + '"\n\nBest Regards')}
    style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Shop Add Request</Text>
    </TouchableOpacity>
    </View>
    );
  }
}



const Home = ({ navigation }) => (
  <View style={styles.homeContainer}>
  <ListDetails />
  <AddShop />
  
  </View>
);

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});

const HomeStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Home: {
  screen: Home,
    navigationOptions: {
      title: 'Home',
      backTitle: 'Log Out'
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center'
  },
	logoContainer: {
    flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 100,
		height: 100
  },
	loginFormContainer: {
    padding: 20
  },
  input: {
    alignItems: 'stretch',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  homeInput: {
    alignItems: 'stretch',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2c3e50',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});