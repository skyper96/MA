import React, { Component }from 'react';

import { AsyncStorage, Alert, StyleSheet, Text, View, Image, KeyboardAvoidingView, StatusBar, TextInput, TouchableOpacity, Linking, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MailCore from 'react-native-mailcore';
import PieChart from 'react-native-pie-chart';

let MainDataSource = [
    // {
    //   name: "Auchan",
    //   address: "Alexandru Vaida Voevod nr. 53",
    //   email: "auchan@auchan.ro",
    //   netIncome: "154m"
    // },
    // {
    //   name: "Profi",
    //   address: "Decebal nr.21",
    //   email: "cluj@profi.ro",
    //   netIncome: "70m"
    // },
]

var st = '';

const SaveOffline = () => {
//   MainDataSource = [
//     {
//       name: "Auchan",
//       address: "Alexandru Vaida Voevod nr. 53",
//       email: "auchan@auchan.ro",
//       netIncome: "154m"
//     },
//     {
//       name: "Profi",
//       address: "Decebal nr.21",
//       email: "cluj@profi.ro",
//       netIncome: "70m"
//     },
//     {
//       name: "Profi 2",
//       address: "Decebal nr.21",
//       email: "cluj@profi.ro",
//       netIncome: "70m"
//     }
// ]
  st = '';
  for(let i = 0; i < MainDataSource.length; i++)
  {
    if (MainDataSource[i] == undefined || MainDataSource[i].name == undefined || MainDataSource[i].address == undefined ||
      MainDataSource[i].email == undefined || MainDataSource[i].netIncome == undefined ||
      MainDataSource[i].name == '' || MainDataSource[i].address == '' ||
      MainDataSource[i].email == '' || MainDataSource[i].netIncome == ''){}
      else{
        st+=MainDataSource[i].name;
        st+="|";
        st+=MainDataSource[i].address;
        st+="|";
        st+=MainDataSource[i].email;
        st+="|";
        st+=MainDataSource[i].netIncome;
        st+="\n";
      }
  }
}

let chart_wh = 250
let series = []
let sliceColor = ['#F44336','#2196F3']

AsyncStorage.getItem('MainData').then((value) => {
  MainDataSource = []
  data = value;
  var dataList = data.split("\n");
  for(let i = 0; i < dataList.length - 1; i++){
    let currentData = dataList[i].split("|");
    if (currentData.length > 0 && currentData.name != '' && currentData.address != '' && currentData.email != '' && currentData.netIncome != ''){
      MainDataSource.push({name: currentData[0], address: currentData[1],
        email: currentData[2], netIncome: currentData[3]
      })
    }
  }
  currentShop = MainDataSource[0]
});

//let currentShop = MainDataSource[0]
console.disableYellowBox = true;

// var st = '';
// for(let i = 0; i < MainDataSource.length; i++)
// {
//   st.concat(MainDataSource[i].name);
//   st.concat('|');
//   st.concat(MainDataSource[i].address);
//   st.concat('|');
//   st.concat(MainDataSource[i].email);
//   st.concat('|');
//   st.concat(MainDataSource[i].netIncome);
//   st.concat('\n');
// }
// AsyncStorage.setItem('MainData', st);



export default class App extends Component {
  constructor(props) {
    super(props)
  }
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
    let data = ''
    AsyncStorage.getItem('MainData').then((value) => {
      MainDataSource = []
      data = value;
      var dataList = data.split("\n");
      for(let i = 0; i < dataList.length; i++){
        let currentData = dataList[i].split("|");
    if (currentData.length > 0 && currentData.name != '' && currentData.address != '' && currentData.email != '' && currentData.netIncome != ''){
      MainDataSource.push({name: currentData[0], address: currentData[1],
        email: currentData[2], netIncome: currentData[3]
      })
        }
      }
      currentShop = MainDataSource[0]
   });
    this.state = {
      dataSource: ds.cloneWithRows(MainDataSource),
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
          <TouchableOpacity 
          onPress={() => {
            currentShop=rowData;
            this.props.navigation.navigate('Manage')
            }
          }
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Manage Shop</Text>
          </TouchableOpacity>
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
    onPress={() => 
      {
        var found = false;        
        for(let i = 0; i < MainDataSource.length; i++)
        {
          if (MainDataSource[i].name == this.state.name){
            found = true;
          }
        }

        if(found) {
          Alert.alert(Alert.alert(
            'Error',
            'Your Shop is already in the list',
            [
              {text: 'Ok'},
            ],
            { cancelable: false }
          )
          )
        }
        else {
          if (this.state.name != '' && this.state.address != '' && this.state.email != '' && this.state.netIncome != '')
         { MainDataSource.push({name: this.state.name, address: this.state.address, 
            email: this.state.email, netIncome: this.state.netIncome});
          SaveOffline();
          AsyncStorage.setItem('MainData',st)
        }
          this.props.navigation.navigate('Home');
        }
      }
    }
    style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
    </View>
    );
  }
}

class ManageShop extends Component {
  constructor() {
    super();
    this.state = {name: currentShop.name, address: currentShop.address, email: currentShop.email, netIncome: currentShop.netIncome};
    var sum = currentShop.netIncome.replace(/\D/g,'');;

    chart_wh = 250;
    series = [Number(sum), Number(sum) + 20]
    sliceColor = ['#FFF','#44FFAA']
  }

  render() {
    return (
      <View>
        <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
          />
      <TextInput 
      editable={false}
      placeholder="Shop Name"
      placeholderTextColor="rgba(0,0,0,0.7)"
      autoCapitalize="none"
      autoCorrect={false}
      style={styles.homeInput} 
      defaultValue={currentShop.name}
      ref={(input) => this.shopName = input}
      />
    <TextInput 
      defaultValue="Shop Address"
      placeholderTextColor="rgba(0,0,0,0.7)"
      returnKeyType="next"
      onSubmitEditing={() => this.shopEmail.focus()}
      autoCapitalize="none"
      onChangeText={(shopAddress) => this.setState({address: shopAddress})}
      autoCorrect={false}
      style={styles.homeInput} 
      defaultValue={currentShop.address}
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
      defaultValue={currentShop.email}
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
      defaultValue={currentShop.netIncome}
      ref={(input) => this.shopNetIncome = input}
      />
    <TouchableOpacity 
    onPress={() => 
      {
        for(let i = 0; i < MainDataSource.length; i++)
        {
          if (MainDataSource[i].name == this.state.name){
            MainDataSource[i] = {name: this.state.name, address: this.state.address,
              email: this.state.email, netIncome: this.state.netIncome}
          }
        }
        SaveOffline();
        AsyncStorage.setItem('MainData',st);
        this.props.navigation.navigate('Home')
      }
    }
    style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={() => 
      {
        Alert.alert(
          'Alert',
          'Do you really want to delete the shop?',
          [
            {text: 'NO'},
            {text: 'YES', onPress: () => {
              for(let i = 0; i < MainDataSource.length; i++)
              {
                if (MainDataSource[i].name == currentShop.name){
                  MainDataSource.splice(i,1);
                }
              }
              SaveOffline();
              AsyncStorage.setItem('MainData',st);
              this.props.navigation.navigate('Home')
            }},
          ],
          { cancelable: true }
        )
      }
    }
    style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
    </View>
    );
  }
}

const Home = ({ navigation }) =>  
  (
  <View style={styles.homeContainer}>
  <ListDetails navigation={navigation}/>
  <TouchableOpacity 
  onPress={() => 
    navigation.navigate('Add')
  }
  style={styles.buttonContainer}>
  <Text style={styles.buttonText}>Add Shop</Text>
  </TouchableOpacity>
  
  </View>
);

const Manage = ({ navigation }) => (
  <View style={styles.homeContainer}>
  <ManageShop navigation={navigation}/>
  
  </View>
);

const Add = ({ navigation }) => (
  <View style={styles.homeContainer}>
  <AddShop navigation={navigation}/>

  
  </View>
);

const ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});

const HomeStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      backTitle: 'Log Out'
    },
  },
  Manage: {
    screen: Manage,
    navigationOptions: {
      title: 'Manage'
    }
  },
  Add: {
    screen: Add,
    navigationOptions: {
      title: 'Add'
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#34495e',
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'center'
  },
	logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
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