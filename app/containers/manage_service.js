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
import SwitchView from '../components/switch'
const {
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ListView,
  Dimensions
} = ReactNative;

var Global = require('../Global');
var style = require('../styles/manage_service');
var gstyle = require('../styles/gstyle'); 
var image = require('../images/login.jpg');
var search = require('../images/search.png');
var edit_category = require('../images/edit_category.png');
var delete_category = require('../images/delete_category.png');
var pick_image = require('../images/pick_image.png')
var edit_service_category = require('../images/edit_service_category.png');
var back = require('../images/back.png')
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

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
                    image:Image1,
                    active: true
                }
                , {
                    key: 1,
                    service: 'Hair Spa',
                    image:Image2,
                    active: true
 
                }, {
                    key: 2,
                    service: 'Facial',
                    image:Image3,
                    active: true
 
                }, {
                    key: 3,
                    service: 'Makeup',
                    image:Image4,
                    active: false
 
                }, {
                    key: 4,
                    service: 'Beard',
                    image:Image5,
                    active: true
 
                }, {
                    key: 5,
                    service: 'Nails',
                    image:Image6,
                    active: true
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
        add_category: false,
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
      this.searchBar.hide();
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
        <View style={{flex: 1, backgroundColor: '#f3f7f8'}}>

            <View style={style.Header}>
                <View style={{flex: 0.5}}>
                    <TouchableOpacity onPress={() => {alert('Go back!')}}>
                        <Image style={style.backButton} source={back}/>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 0.5, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {Actions.stylists()}}>
                        <View style={style.Stylists}>
                            <Text style={style.text}>Stylists</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.searchBar.show();
                        this.setState({dataSource: ds.cloneWithCells([], 2)})
                    }}>
                        <Image source={search} style={style.searchImage}/>
                    </TouchableOpacity>
                </View>
                
                
            </View>
            <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={datas}
                    placeholder='Search...'
                    handleResults={this._handleResults}
                    handleChangeText={(input) => {this.setState({searchText: input})}}
                    showOnLoad={false}
                    onHide={() => {
                        this.setState({dataSource: ds.cloneWithCells(services, 2)})
                    }}
                />
            <View style={style.ListView}>
                <GridView dataSource={this.state.dataSource}
                      style={{padding: 6}}
                      spacing={0}
                      enableEmptySections={true}
                      renderCell={(rowData) => {
                        
                        return(
                            rowData.service.toString().length > 0?
                                <TouchableOpacity                                 
                                onPress={() => {
                                    Actions.service_view({index: rowData.key})
                                }}>
                                    <View style={{margin: 6, position: 'relative'}}>
                                        <Image
                                          source={rowData.image}
                                          style={[style.ServiceImage, {opacity: rowData.active?1:0.2}]}
                                        />
                                        <TouchableOpacity  style={style.editIconView} onPress={() => {this.editCategory(rowData)}}>
                                                <Image style={style.editIcon} source={edit_service_category}/>
                                        </TouchableOpacity>
                                        <View>
                                          <Text style={style.ServiceName}>{rowData.service}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            :
                                <TouchableOpacity onPress={() => {this.setState({add_category: true})}}>
                                    <View style={{margin: 6}}>
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
                offset = {this.state.offset}
                open = {this.state.edit}
                modalDidOpen = {() => {           
                    this.setState({offset: height - (height + 1000) / 2 - 140})
                }}
                ref={(ref) => {this.EditModal = ref}}
                modalDidClose = {() => this.setState({edit: false})}
                containerStyle={{
                  justifyContent: 'center',
                  position: 'absolute',
                  marginBottom: -1000
                }}
                modalStyle={{
                    borderRadius: 0,
                    margin: 0,
                    padding: 0,
                    backgroundColor: '#F5F5F5'
                }}
                style = {{alignItems: 'center'}}>
                <View style = {style.ModalView}>
                    <View style={{height: 80, justifyContent: 'center', alignItems: 'center', marginBottom: 8}}>
                       <Text style={{fontSize: 24, color: '#47556c'}}>{this.state.selected_category.service}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.onEditCategory()}}>
                        <View style={{flexDirection: 'row', height: 64, alignItems: 'center', padding: 20}}>
                            <Image style={{width: 24, height: 24, resizeMode: 'stretch'}} source={edit_category}/>
                            <Text style={{fontSize: 16, marginLeft: 20}}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.onDeleteConfirm()}}>
                        <View style={{flexDirection: 'row', height: 64, alignItems: 'center', padding: 20}}>
                            <Image style={{width: 24, height: 24, resizeMode: 'stretch'}} source={delete_category}/>
                            <Text style={{fontSize: 16, marginLeft: 20, color: '#e64848'}}>Delete</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', height: 64, alignItems: 'center', padding: 20}}>
                        <SwitchView 
                            switchWidth={25} 
                            switchHeight={7}
                            buttonRadius={6.5}
                            activeButtonColor='#1FbF55'
                            inactiveButtonColor='#rgba(200,200,200,.7)'
                            activeSwitchColor='#8FDFAA' 
                            inactiveSwitchColor='#rgba(200,200,200,.4)'
                            active={this.state.selected_category_active}
                            onPress={(state)=>{this.onChangeCategoryActiveState(state)}}
                            />
                        <Text style={{fontSize: 16, marginLeft: 20}}>{this.state.active_title}</Text>
                    </View>
                </View>
            </Modal>
            <Modal
                open = {this.state.edit_category}
                modalStyle={{
                    borderRadius: 0,
                    padding: 0,
                    backgroundColor: '#F5F5F5'
                }}
                modalDidOpen = {() => console.log('modal did open')}
                modalDidClose = {() => this.setState({edit_category: false})}>
                <View style = {{backgroundColor: 'transparent', padding: 24, paddingBottom: 12}}>
                    <View style={{height: 72, justifyContent: 'flex-end'}}>
                        <Text style={{color:'#a5a5a5', fontSize: 12}}>Category Name</Text>
                        <View style={{borderColor: '#a5a5a5', borderBottomWidth: 0.5, paddingTop: 6.5, paddingBottom: 6.5}}>
                            <TextInput
                                    style = {{color: 'black', height: 30, fontSize: 16}}
                                    underlineColorAndroid='transparent'
                                    onChangeText = {(text) => this.setState({ EditCategoryName: text })}
                                    value = {this.state.EditCategoryName}
                                    maxLength = {32}
                                    editable = {true}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 24, minHeight: 150, position: 'relative', alignItems: 'center', flexDirection: 'row'}}>
                        <Image
                          source={this.state.editImage}
                          style={style.EditServiceImage}
                        />
                        <TouchableOpacity style={style.editIconView} onPress={() => {this.onEditCategoryImage()}}>
                                <Image style={style.editIcon} source={edit_service_category}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 36, marginTop: 24, alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{this.setState({edit_category: false})}}>
                            <Text style={{color:'#b9b9b9', fontSize: 14}}>CLOSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onSaveCategory()}}>
                            <Text style={{color:'#F78457', fontSize: 14, marginLeft: 36}}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                open = {this.state.add_category}
                modalStyle={{
                    borderRadius: 0,
                    padding: 0,
                    backgroundColor: '#F5F5F5'
                }}
                modalDidOpen = {() => console.log('modal did open')}
                modalDidClose = {() => this.setState({add_category: false})}>
                <View style = {{backgroundColor: 'transparent', padding: 24, paddingBottom: 12}}>
                    <View style={{height: 72, justifyContent: 'flex-end'}}>
                        <Text style={{color:'#a5a5a5', fontSize: 12}}>Category Name</Text>
                        <View style={{borderColor: '#a5a5a5', borderBottomWidth: 0.5, paddingTop: 6.5, paddingBottom: 6.5}}>
                            <TextInput
                                style = {{color: 'black', height: 30, fontSize: 16}}
                                underlineColorAndroid='transparent'
                                placeholder = 'Category Name'
                                onChangeText = {(text) => this.setState({ NewCategoryName: text })}
                                value = {this.state.NewCategoryName}
                                maxLength = {32}
                                editable = {true}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 24, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {this.onNewCategoryImage()}}>
                                    <Image
                                        source={pick_image}
                                        style={{maxHeight: 150, maxWidth: width - 88, resizeMode: 'cover'}}
                                    />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 36, marginTop: 24, alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{{this.setState({add_category: false})}}}>
                            <Text style={{color:'#b9b9b9', fontSize: 14}}>CLOSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onAddCategory()}}>
                            <Text style={{color:'#F78457', fontSize: 14, marginLeft: 36}}>CONFIRM</Text>
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
                <View style = {{padding: 14, paddingBottom: 2}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Confirm Delete</Text>
                     <Text style={{marginTop: 15, color: '#b9b9b9'}}>Are you sure you want to delete {this.state.selected_category.service} category? This will <Text style={{color: 'black'}}>delete all serivces in {this.state.selected_category.service}</Text></Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 24, height: 36}}>
                        <TouchableOpacity onPress={()=>{this.setState({delete_category: false})}}>
                            <Text style={{color:'#b9b9b9', fontSize: 14, width: 64}}>CLOSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.onDeleteCategory()}}>
                            <Text style={{color:'#E64848', width: 70, marginLeft: 32}}>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>    
    );
  }      

  editCategory(category) {
      if(category.active){
          this.setState({selected_category: category, edit: true, active_title: 'Available', selected_category_active: true});
      }else{
          this.setState({selected_category: category, edit: true, active_title: 'Unavailable', selected_category_active: false});
      }      
  }

  onChangeCategoryActiveState(state) {
      if(state){
          this.setState({active_title: 'Available', selected_category_active: true});
      }else{
          this.setState({active_title: 'Unavailable', selected_category_active: false});
      }    
      services[this.state.selected_category.key].active = state;
      this.setState({dataSource: ds.cloneWithCells(services, 2)})
  }

  onEditCategoryImage() {
      alert('Select Image');
  }

  onNewCategoryImage() {
      alert('Select Image');
  }

  onSaveCategory() {
      alert('Saved successfully!');
      this.setState({edit_category: false});
  }

  onAddCategory() {
      alert('Added successfully!')
      this.setState({add_category: false});
  }

  onEditCategory() {
      
      this.setState({edit_category: true})
      this.setState({ EditCategoryName: this.state.selected_category.service })
      this.setState({editImage: this.state.selected_category.image})
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

