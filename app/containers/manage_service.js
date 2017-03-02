import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import GridView from 'react-native-easy-grid-view'
import Modal from 'react-native-simple-modal';
import Switch from 'react-native-material-switch';
import SearchBar from 'react-native-searchbar'
const {
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ListView
} = ReactNative;

var Global = require('../Global');
var style = require('../styles/manage_service');
var gstyle = require('../styles/gstyle'); 
var image = require('../images/login.jpg');
var search = require('../images/search.png');
var edit_category = require('../images/edit_category.png');
var delete_category = require('../images/delete_category.png');
var edit_service_category = require('../images/edit_service_category.png');


var Image1 = require('../images/service_haircut.png');
var Image2 = require('../images/service_hairspa.png');
var Image3 = require('../images/service_facial.png');
var Image4 = require('../images/service_makeup.png');
var Image5 = require('../images/service_trimming.png');
var Image6 = require('../images/service_polish.png');
var last = require('../images/add_new_service_category.png');

var datas = ['Hair Cut', 'Hair Spa', 'Facial', 'Makeup', 'Beard', 'Nails'];
const ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,});
var SHOWS_PER_ROW = 2
var services = [
                {
                    key: 0,
                    service: 'Hair Cut',
                    image:Image1
                }
                , {
                    key: 1,
                    service: 'Hair Spa',
                    image:Image2
 
                }, {
                    key: 2,
                    service: 'Facial',
                    image:Image3
 
                }, {
                    key: 3,
                    service: 'Makeup',
                    image:Image4
 
                }, {
                    key: 4,
                    service: 'Beard',
                    image:Image5
 
                }, {
                    key: 5,
                    service: 'Nails',
                    image:Image6
                },
                {
                    key: 6,
                    service: '',
                    image:last
                }
]
class Manage_Service extends React.Component {
  
  constructor(props) {
    super(props);    
    this.state = { 
        edit: false,
        edit_category: false,
        selected_category: {},
        active_title: '',
        selected_category_active: false,
        results: [],
        searchText: '',
        dataSource: ds.cloneWithCells(services, 2),
    };
    this._handleResults = this._handleResults.bind(this);        
  }  

  componentDidMount() {
      //this.fetchData();
      this.searchBar.hide()
  }  

  fetchData() {
    
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        alert(JSON.stringify(responseData))
        this.setState({
          dataSource: responseData.movies,
        });
      })
      .done();
  }

  _handleResults(results) {
      var filtered_services = [];
      services.map(function(item, index){
        if(results.indexOf(item.service) > -1) filtered_services.push(item);
      });
      this.setState({dataSource: ds.cloneWithCells(filtered_services, 2)})
      if(this.state.searchText == '') {
          this.setState({dataSource: ds.cloneWithCells(services, 2)})
      }
  }
  
  render() {
    var _this = this;
    
    return (
        <View style={gstyle.VContainer}>

            <View style={style.Header}>
                <TouchableOpacity onPress={() => {Actions.stylists()}}>
                    <View style={style.Stylists}>
                        <Text style={style.text}>Stylists</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.searchBar.show()}}>
                    <Image source={search} style={style.searchImage}/>
                </TouchableOpacity>
                
            </View>
            <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={datas}
                    placeholder='Category Name'
                    handleResults={this._handleResults}
                    handleChangeText={(input) => {this.setState({searchText: input})}}
                    showOnLoad
                />
            <View style={style.ListView}>
                <GridView dataSource={this.state.dataSource}
                      spacing={0}
                      enableEmptySections={true}
                      renderCell={(rowData) => {
                        
                        return(
                            rowData.service.toString().length > 0?
                                <TouchableOpacity onPress={() => {
                                    Actions.service_view({index: rowData.key})
                                }}>
                                    <View style={{margin: 15, position: 'relative'}}>
                                        <Image
                                          source={rowData.image}
                                          style={style.ServiceImage}
                                        />
                                        <TouchableOpacity style={style.editCategory} onPress={() => {this.editCategory(rowData, true)}}>
                                            <View>
                                                <Image style={style.EditCategoryIcon} source={edit_service_category}/>
                                            </View>
                                        </TouchableOpacity>
                                        <View>
                                          <Text style={style.ServiceName}>{rowData.service}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity onPress={() => {alert('clicked category')}}>
                                    <View style={{padding: 20}}>
                                    <Image
                                        source={rowData.image}
                                        style={style.addServiceImage}
                                      />
                                      <View >
                                        <Text style={style.ServiceName}>{rowData.service}</Text>
                                      </View>
                                    </View>
                                </TouchableOpacity>
                            )                         


                    }}
 
                />
            </View>            
            <Modal
                offset = {0}
                open = {this.state.edit}
                modalDidOpen = {() => console.log('modal did open')}
                modalDidClose = {() => this.setState({edit: false})}
                style = {{alignItems: 'center'}}>
                <View style = {style.ModalView}>
                    <View style={style.ModalTitle}>
                       <Text style={style.modal_header_title}>{this.state.selected_category.service}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.onEditCategory()}}>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <View style={style.editIconView}>
                                <Image style={style.iconImage} source={edit_category}/>
                            </View>
                            <Text style={style.iconText}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.onDeleteConfirm()}}>
                        <View style={{flexDirection: 'row', padding: 10}}>
                            <View style={style.editIconView}>
                                <Image style={style.iconImage} source={delete_category}/>
                            </View>
                            <Text style={[style.iconText, {color: 'red'}]}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <View style={[style.editIconView, {padding: 5}]}>
                        <Switch 
                            switchHeight = {10}
                            switchWidth = {30}
                            buttonRadius = {10}
                            activeButtonColor='#1FbF55' 
                            activeBackgroundColor='#8FDFAA' 
                            inactiveButtonColor='#FAFAFA' 
                            inactiveBackgroundColor='#rgba(200,200,200,.5)' 
                            active={this.state.selected_category_active} 
                            onChangeState={(state)=>{this.onChangeCategoryActiveState(state)}}/>
                        </View>
                        <Text style={style.switchText}>{this.state.active_title}</Text>
                    </View>
                </View>
            </Modal>
            <Modal
                offset = {0}
                open = {this.state.edit_category}
                modalDidOpen = {() => console.log('modal did open')}
                modalDidClose = {() => this.setState({edit_category: false})}
                style = {{alignItems: 'center'}}>
                <View style = {style.ModalView}>
                    <Text style={{color:'gray'}}>Category Name</Text>
                    <View style={{borderColor: 'black', borderBottomWidth: 0.5}}>
                        <TextInput
                                style = {{color: 'black', height: 50, padding: 5, fontSize: 25}}
                                underlineColorAndroid='transparent'
                                onChangeText = {(text) => this.setState({ EditCategoryName: text })}
                                value = {this.state.EditCategoryName}
                                maxLength = {32}
                                editable = {true}
                        />
                    </View>
                    <View style={{margin: 15, position: 'relative', alignItems: 'center'}}>
                        <Image
                          source={this.state.selected_category.image}
                          style={style.EditServiceImage}
                        />
                        <TouchableOpacity style={style.editCategory} onPress={() => {this.editCategory(rowData.service, true)}}>
                            <View>
                                <Image source={edit_service_category}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={()=>{this.setState({edit_category: false})}}>
                            <Text style={{color:'gray', padding: 10}}>CLOSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onSaveCategory()}}>
                            <Text style={{color:'#F78457', padding: 10}}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                offset = {0}
                open = {this.state.delete_category}
                modalDidOpen = {() => console.log('modal did open')}
                modalDidClose = {() => this.setState({delete_category: false})}
                style = {{alignItems: 'center'}}>
                <View style = {style.ModalView}>
                    <Text style={{padding: 10}}>Confirm Delete</Text>
                    <Text style={{padding: 10, color: 'gray'}}>Are you sure you want to delete {this.state.selected_category.service} category? This will <Text style={{color: 'black'}}>delete all serivces in {this.state.selected_category.service}</Text></Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={()=>{this.setState({delete_category: false})}}>
                            <Text style={{color:'gray', padding: 10}}>CLOSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onDeleteCategory()}}>
                            <Text style={{color:'#F78457', padding: 10}}>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>    
    );
  }      

  editCategory(servicename, active) {
      if(active){
          this.setState({selected_category: servicename, edit: true, active_title: 'Available', selected_category_active: true});
      }else{
          this.setState({selected_category: servicename, edit: true, active_title: 'Unavailable', selected_category_active: false});
      }      
  }

  onChangeCategoryActiveState(state) {
      if(state){
          this.setState({active_title: 'Available', selected_category_active: true});
      }else{
          this.setState({active_title: 'Unavailable', selected_category_active: false});
      }    
  }

  onSaveCategory() {
      alert('Saved successfully!');
      this.setState({edit_category: false});
  }

  onEditCategory() {
      this.setState({edit_category: true})
      this.setState({ EditCategoryName: this.state.selected_category.service })
  }

  onDeleteConfirm() {
      this.setState({delete_category: true});
  }

  onDeleteCategory() {
      alert('Deleted successfully!');
      this.setState({delete_category: false});
  }
    
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(Manage_Service);

