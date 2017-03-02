import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Modal from 'react-native-simple-modal';
import NavigationBar from 'react-native-navbar';
import ModalDropdown from 'react-native-modal-dropdown';
import NavBar from '../components/navbar';
const {
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ListViewm,
  Dimensions
} = ReactNative;
var style = require('../styles/add_service');
var gstyle = require('../styles/gstyle'); 
var width = Dimensions.get('window').width;
var back_white = require('../images/back_white.png');

let index = 0
const data = ['10 mins', '20 mins', '30 mins', '40 mins', '50 mins', '60 mins', '70 mins', '80 mins', '90 mins', '100 mins', '110 mins', '120 mins']
const category = ['Hair Cut', 'Hair Spa', 'Facial', 'MakeUp', 'Beard', 'Nails'];
class Add_Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceName: '',
            time: '',
            category: props.category,
            userType: 'all'
        }
    }

    render() {
        const leftButtonConfig = {
            title: '<    Add Service',
            style: {
            marginTop: 15,
            },
            tintColor: 'white',
            handler: function () {
                Actions.pop();
            },
        };
        return(
            <View style={{flex: 1, position: 'relative', backgroundColor: '#F5F5F5'}}>
                <NavBar height={72} title='Add Service' source={back_white} bgColor='#394355'/>
                <View style={style.editView}>
                    <View style={style.editForm}>
                        <View style={{flex: 0.15, justifyContent: 'center'}}>
                            <View style={style.borderBottomView}>
                                <TextInput
                                    style = {style.textInput}
                                    placeholder = "Service Name"
                                    placeholderTextColor = "gray"
                                    underlineColorAndroid='transparent'
                                    onChangeText = {(Text) => this.setState({serviceName: Text})}
                                    value = {this.state.serviceName}
                                />
                            </View>
                        </View>
                        <View style={{flex: 0.15, flexDirection: 'row'}}>
                            <View style={{flex: 0.06, flexDirection: 'row', alignItems: 'flex-end'}}>
                                <View>
                                    <Text style={style.dinar}>{'\u20B9'}</Text>
                                </View>
                                <View style={style.borderBottomView}>
                                    <TextInput
                                        style = {style.textInput}
                                        placeholder = "Price"
                                        placeholderTextColor = "gray"
                                        underlineColorAndroid='transparent'
                                        onChangeText = {(Text) => this.setState({price: this.onChanged(Text)})}
                                        keyboardType = 'numeric'
                                        maxLength = {10}
                                        value = {this.state.price}
                                    />
                                </View>
                            </View>
                            <View style={{flex: 0.09, flexDirection: 'row', alignItems: 'flex-end', paddingLeft: 10}}>
                                <View>
                                    <Text style={style.dinar}>{'\u20B9'}</Text>
                                </View>
                                <View style={style.borderBottomView}>
                                    <TextInput
                                        style = {style.textInput}
                                        placeholder = "Discounted Price"
                                        placeholderTextColor = "gray"
                                        underlineColorAndroid='transparent'
                                        onChangeText = {(Text) => this.setState({disprice: Text})}
                                        keyboardType = 'numeric'
                                        maxLength = {10}
                                        value = {this.state.disprice}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 0.15, position: 'relative'}}>
                            <View style={style.borderBottomView}>
                                <ModalDropdown 
                                    options={data}
                                    dropdownStyle={{width:width - 80, borderColor:'#339433'}}
                                    textStyle={{fontSize: 20}}
                                    renderRow={(option) => {
                                      return(
                                          <Text style={style.dropText}>{option}</Text>
                                      )
                                    }}
                                    onSelect={(option) => {this.setState({time: data[option]})}}
                                >
                                    <TextInput
                                        style = {style.textInput}
                                        placeholder = "Approx. time taken"
                                        placeholderTextColor = "gray"
                                        underlineColorAndroid='transparent'
                                        value = {this.state.time}
                                        editable={false}
                                    />
                                    <Text style={{position:'absolute', right: 10, bottom: 10, color: 'gray'}}>▼</Text>
                                </ModalDropdown>
                            </View>
                        </View>
                        <View style={{flex: 0.15}}>
                            <View style={style.borderBottomView}>
                                <TextInput
                                    style = {style.textInput}
                                    placeholder = "Describe the item"
                                    placeholderTextColor = "gray"
                                    underlineColorAndroid='transparent'
                                    onChangeText = {(Text) => this.setState({describe: Text})}
                                    value = {this.state.describe}
                                />
                            </View>
                        </View>
                        <View style={{flex: 0.15}}>
                            <Text style={{paddingTop: 10, fontSize: 12, color: 'lightgray'}}>Category</Text>
                            <View style={style.borderBottomView}>
                                <ModalDropdown 
                                    options={category}
                                    defaultValue='Facial'
                                    dropdownStyle={{width:width - 80, borderColor:'#339433'}}
                                    textStyle={{fontSize: 20}}
                                    renderRow={(option) => {
                                      return(
                                          <Text style={style.dropText}>{option}</Text>
                                      )
                                    }}
                                    onSelect={(option) => {this.setState({category: category[option]})}}
                                >
                                    <TextInput
                                        style = {style.textInput}
                                        placeholder = "Approx. time taken"
                                        placeholderTextColor = "gray"
                                        underlineColorAndroid='transparent'
                                        value = {this.state.category}
                                        editable={false}
                                    />
                                    <Text style={{position:'absolute', right: 10, bottom: 10, color: 'gray'}}>▼</Text>
                                </ModalDropdown>
                            </View>
                        </View>
                        <View style={{flex: 0.25}}>
                            <Text style={{paddingTop: 10, fontSize: 12, color: 'lightgray'}}>This service is for</Text>
                            <View style={{flex: 1, flexDirection: 'row', borderLeftWidth: 0.5, borderColor: '#ababab', marginTop: 20}}>
                                <View style={{flex: 0.33}}>
                                        {
                                          this.state.userType == 'all'?
                                          <TouchableOpacity style={style.selectedType} onPress={() => {this.setState({userType: 'all'})}}>
                                              <Text style={{textAlign: 'center', color: '#b900f0'}}>All</Text>
                                          </TouchableOpacity>
                                          :
                                          <TouchableOpacity style={style.defaultType} onPress={() => {this.setState({userType: 'all'})}}>
                                              <Text style={{textAlign: 'center', color: '#d3dce8'}}>All</Text>
                                          </TouchableOpacity>
                                        }                                        
                                </View>
                                <View style={{flex: 0.33}}>
                                        {
                                          this.state.userType == 'men'?
                                          <TouchableOpacity style={style.selectedType} onPress={() => {this.setState({userType: 'men'})}}>
                                              <Text style={{textAlign: 'center', color: '#b900f0'}}>Men</Text>
                                          </TouchableOpacity>
                                          :
                                          <TouchableOpacity style={style.defaultType} onPress={() => {this.setState({userType: 'men'})}}>
                                              <Text style={{textAlign: 'center', color: '#d3dce8'}}>Men</Text>
                                          </TouchableOpacity>
                                        }               
                                </View>
                                <View style={{flex: 0.34}}>
                                        {
                                          this.state.userType == 'women'?
                                          <TouchableOpacity style={style.selectedType} onPress={() => {this.setState({userType: 'women'})}}>
                                              <Text style={{textAlign: 'center', color: '#b900f0'}}>Women</Text>
                                          </TouchableOpacity>
                                          :
                                          <TouchableOpacity style={style.defaultType} onPress={() => {this.setState({userType: 'women'})}}>
                                              <Text style={{textAlign: 'center', color: '#d3dce8'}}>Women</Text>
                                          </TouchableOpacity>
                                        }               
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={style.saveButton}>
                    <TouchableOpacity onPress={() => {alert('Added successfully!')}}>
                        <Text style={style.saveButtonText}>ADD SERVICE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onChanged(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1){
                  newText = newText + text[i];
            }
            else {
                  // your call back function
            }
        }
        return newText;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(Add_Service);