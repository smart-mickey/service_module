import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Modal from 'react-native-simple-modal';
import Switch from 'react-native-material-switch';
import Panel from './panel.js'
import SearchBar from 'react-native-searchbar'
var edit_service = require('../images/edit_category.png');
var delete_service = require('../images/delete_category.png');
var addService = require('../images/add_service.png');
var style = require('../styles/service_view');
const {
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ListView,
  StyleSheet
} = ReactNative;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var search_data = ['Organic Face Cleanup', 'Organic Face Wash', 'Gold Facial', 'Cucumber Facial'];
var service_data = [
  {
    name: 'Organic Face Cleanup',
    time: '60 min',
    active: true
  },
  {
    name: 'Organic Face Wash',
    time: '60 min',
    active: false
  },
  {
    name: 'Gold Facial',
    time: '60 min',
    active: true
  },
  {
    name: 'Cucumber Facial',
    time: '60 min',
    active: false
  },
  
];

class DetailedServiceView extends React.Component {
    constructor(props) {
        super(props);    
        this.state = { 
            selected_service: {},
            delete_service: false,
            dataSource: ds,
            parent: props.handle,
            category: props.name,
            index: props.index,
            searchText: '',
            Datas: []
        };       
          
    }  

    componentDidMount() {
        this._setDataList(service_data);
        this._handleResults = this._handleResults.bind(this); 
    }

    _setDataList(data) {
        this.setState({Datas: data});
        this.setState({dataSource: ds.cloneWithRows(data)});
    }

    _handleResults(results) {
        var filtered_services = [];
        service_data.map(function(item, index){
            if(results.indexOf(item.name) > -1) filtered_services.push(item);
        });
        if(this.state.searchText == ''){
            this._setDataList(service_data);
        }else{
            this._setDataList(filtered_services)
        }
    }


    ListItemHeader(rowData) {
        return(
            <View style={{flexDirection: 'row', flex: 1, padding: 10}}>
                  <View style={{flex: 0.8, justifyContent: 'center'}}>
                      <Text style={style.serviceName}>{rowData.name}</Text>
                      <Text style={style.serviceTime}>{rowData.time}</Text>
                  </View>                 
              </View>
        )
    }

    renderItem(rowData, rowID) {
                return(
                                    
                                <Panel title={this.ListItemHeader(rowData)} data={rowData} handle={this}>
                                    
                                    <View style={{flexDirection: 'row'}}>

                                        <View style={{flex: 0.2, justifyContent: 'center', borderTopWidth: 0.5, borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                            <TouchableOpacity onPress={() => {this.onEditService(rowData)}}>
                                                <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, justifyContent: 'center' }}>
                                                    <View style={style.editIconView}>
                                                        <Image style={style.iconImage} source={edit_service}/>
                                                    </View>
                                                    <Text style={style.iconText}>Edit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{flex: 0.3, justifyContent: 'center', borderTopWidth: 0.5, borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                            <TouchableOpacity onPress={() => {this.onDeleteConfirm(rowData)}}>
                                                <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, justifyContent: 'center'}}>
                                                    <View style={style.editIconView}>
                                                        <Image style={style.iconImage} source={delete_service}/>
                                                    </View>
                                                    <Text style={[style.iconText, {color: 'red'}]}>Delete</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{flex: 0.5, justifyContent: 'center', borderTopWidth: 0.5, borderColor: '#ababab'}}>
                                            <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10, justifyContent: 'center'}}>
                                                <Text style={style.switchText}>{rowData.active?'AVAILABLE':'UNAVILABLE'}</Text>
                                                <View style={[style.editIconView, {padding: 5}]}>
                                                    <Switch 
                                                        switchHeight = {10}
                                                        switchWidth = {30}
                                                        buttonRadius = {10}
                                                        activeButtonColor='#1FbF55' 
                                                        activeBackgroundColor='#8FDFAA' 
                                                        inactiveButtonColor='#FAFAFA' 
                                                        inactiveBackgroundColor='#rgba(200,200,200,.5)' 
                                                        active={rowData.active} 
                                                        onChangeState={(state)=>{this.onChangeCategoryActiveState(rowID, state)}}/>
                                                </View>                                                    
                                            </View>
                                        </View>
                                    </View>     
                                  
                                </Panel>
                )
                        
    }

    


    render() {
        return(
            <View style={{ flex: 1, position: 'relative'}}>
                <ListView
                    style={{padding: 15, backgroundColor: '#e5e5e5',paddingBottom: 80}}
                    dataSource = {this.state.dataSource}
                    enableEmptySections = {true}
                    renderRow = {(rowData, sectionID, rowID, highlightRow) => {
                        return(
                            <View>
                                {this.renderItem(rowData, rowID)}
                            </View>
                        )
                    }}
                />       
           
                <SearchBar
                    ref={(ref) => this.state.parent.searchBar = ref}
                    data={search_data}
                    placeholder='Service Name'
                    handleResults={this._handleResults}
                    handleChangeText={(input) => {this.setState({searchText: input})}}
                    showOnLoad={false}
                />     
                <Modal
                    offset = {0}
                    open = {this.state.delete_service}
                    modalDidOpen = {() => console.log('modal did open')}
                    modalDidClose = {() => this.setState({delete_service: false})}
                    style = {{alignItems: 'center'}}>
                    <View>
                        <Text style={{padding: 10, fontSize: 20, fontWeight: 'bold'}}>Confirm Delete</Text>
                        <Text style={{padding: 10, color: 'gray'}}>Are you sure you want to <Text style={{color: 'black'}}>delete {this.state.selected_service.name}?</Text></Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={()=>{this.setState({delete_service: false})}}>
                                <Text style={{color:'gray', padding: 10}}>CLOSE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.onDeleteService()}}>
                                <Text style={{color:'#F78457', padding: 10}}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={style.AddServiceIconView} onPress={() => {this.onAddService()}}>
                        <Image style={style.AddServiceIcon} source={addService}/>
                </TouchableOpacity>
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
                  alert("please enter numbers only");
            }
            this.setState({ EditServiceTime: newText });
        }
    }

    onEditService(data) {
        Actions.edit_service({service: this.state.selected_service, category: this.state.category})
    }

    onDeleteService() {
        alert('Deleted Service!')
    }
   
    onDeleteConfirm(data) {
        this.setState({delete_service: true, selected_service: data})
    }

    onChangeCategoryActiveState(index, state) {
        var data = this.state.Datas[index];
        data.active = state;
        this._setDataList(this.state.Datas)
    }    

    onAddService() {
      Actions.add_service({category: this.state.category});
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(DetailedServiceView);