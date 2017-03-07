import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Modal from 'react-native-simple-modal';
import NavigationBar from 'react-native-navbar';
import ModalDropdown from 'react-native-modal-dropdown';
import Switch from 'react-native-material-switch';
import Panel from '../components/panel.js'
import NavBar from '../components/navbar';
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
var style = require('../styles/stylists');
var gstyle = require('../styles/gstyle'); 
var width = Dimensions.get('window').width;

var User1 = require('../images/service_haircut.png');
var User2 = require('../images/service_hairspa.png');
var User3 = require('../images/service_facial.png');
var User4 = require('../images/service_makeup.png');
var back = require('../images/back.png');
var take_profile_picture = require('../images/take_profile_picture.png');
var edit_service = require('../images/edit_category.png');
var delete_service = require('../images/delete_category.png');
var addService = require('../images/add_service.png');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,});
//var userdatas = [];
var userdatas = [
                {
                    name: 'Nicklas Olsson',
                    image: User1,
                    active: true
                },
                {
                    name: 'Julia Cabania',
                    image: User2,
                    active: false
                },
                {
                    name: 'Jake Andreson',
                    image: User3,
                    active: true
                },
                {
                    name: 'Joris Loos',
                    image: User4,
                    active: false
                }
            ];
class Stylists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stylists: {},
            dataSource: ds,
            edit_stylist: false,
            editName: '',
            selected_stylist: {},
            selected_service: {}//means selected_stylist
        }
    }

    componentDidMount() {
        //this.fetchData();
        this.setState({dataSource:ds.cloneWithRows(userdatas)
        })
    }  

    ListItemHeader(rowData) {
        return(
            <View style={style.stylist}>
                <View style={{flex: 0.8, alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={rowData.image} style={style.userImage}/>
                    <Text style={style.userName}>{rowData.name}</Text>
                </View>                 
            </View>
        )
    }

    render() {
        return(
            <View style={style.background}>
                <NavBar height={54} title='Stylist' textColor='#47556c' source={back} bgColor='transparent'/>
             
                <View style={style.listView}>
                   
                    {
                        userdatas.length == 0?
                            this.showEmptyView()
                        :
                            <ListView
                                dataSource = {this.state.dataSource}
                                enableEmptySections = {true}
                                renderRow = {(rowData, sectionID, rowID, highlightRow) => {
                                    

                                    return(            
                                        <View style={style.listItem}> 
                                            <Panel title={this.ListItemHeader(rowData)} data={rowData} handle={this}>
                                        
                                                <View style={{flexDirection: 'row',height: 48}}>

                                                    <View style={{flex: 0.2, borderTopWidth: 0.5,justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                                        <TouchableOpacity onPress={() => {this.onEditService(rowData)}}>
                                                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Image style={style.iconImage} source={edit_service}/>
                                                                <Text style={style.iconText}>EDIT</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopWidth: 0.5, borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                                        <TouchableOpacity onPress={() => {this.onDeleteConfirm(rowData)}}>
                                                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Image style={style.iconImage} source={delete_service}/>
                                                                <Text style={[style.iconText, {color: 'red'}]}>DELETE</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#ababab'}}>
                                                            <Text style={style.switchText}>{rowData.active?'AVAILABLE':'UNAVILABLE'}</Text>
                                                            <View style={style.SwitchView}>
                                                                <SwitchView 
                                                                    switchWidth={22}
                                                                    switchHeight={8}
                                                                    buttonRadius={7}
                                                                    activeButtonColor='#1FbF55'
                                                                    inactiveButtonColor='#rgba(200,200,200,.7)'
                                                                    activeSwitchColor='#8FDFAA' 
                                                                    inactiveSwitchColor='#rgba(200,200,200,.4)'
                                                                    active={rowData.active}
                                                                    onPress={(state)=>{this.onChangeCategoryActiveState(rowID, state)}}
                                                                    />
                                                            </View>                                                    
                                                    </View>
                                                </View>     
                                            
                                            </Panel>
                                        </View>
                                    );
                                }
                    
                                }>
                        </ListView>
                    }
                    
                </View>
                <TouchableOpacity style={style.AddServiceIconView} onPress={() => {alert('add')}}>
                        <Image style={style.AddServiceIcon} source={addService}/>
                </TouchableOpacity>
                <Modal
                    offset = {0}
                    open = {this.state.edit_stylist}
                    modalDidOpen = {() => console.log('modal did open')}
                    modalDidClose = {() => this.setState({edit_stylist: false})}
                    style = {{alignItems: 'center'}}>
                    <View style={style.modalView}>
                        <View style={style.editImage}>
                            <View style={style.PhotoImageView}>
                                <Image style={style.previousPhoto} source={this.state.selected_stylist.image}/>
                                <TouchableOpacity style={style.editImageButtonView} onPress={() => {this.takePhoto()}}>
                                    <Image source={take_profile_picture} style={style.editImageButton}/>
                                </TouchableOpacity>
                            </View>                            
                        </View>
                        <View style={style.editNameView}>
                            <Text style={{fontSize: 12, color: 'lightgray'}}>Stylist Name</Text>
                            <View style={style.borderBottomView}>
                                <TextInput
                                    style = {style.textInput}
                                    underlineColorAndroid='transparent'
                                    onChangeText = {(Text) => this.setState({editName: Text})}
                                    value = {this.state.editName}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={()=>{this.setState({edit_stylist: false})}}>
                                <Text style={{color:'gray', padding: 10}}>CLOSE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.onEditSave()}}>
                                <Text style={{color:'#F78457', padding: 10}}>CONFIRM</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    offset = {0}
                    open = {this.state.delete_stylist}
                    modalDidOpen = {() => console.log('modal did open')}
                    modalDidClose = {() => this.setState({delete_stylist: false})}>
                    <View style = {{padding: 14, paddingBottom: 2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Confirm Delete</Text>
                        <Text style={{marginTop: 15, color: '#b9b9b9'}}>Are you sure you want to delete <Text style={{color: 'black'}}>{this.state.selected_stylist.name}</Text> from stylists list?</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 24, height: 36}}>
                            <TouchableOpacity onPress={()=>{this.setState({delete_stylist: false})}}>
                                <Text style={{color:'#b9b9b9', fontSize: 14, padding: 10}}>CLOSE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.onDeleteStylist()}}>
                                <Text style={{color:'#E64848', padding: 10}}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

    onEditService(data) {
        this.setState({selected_stylist: data, edit_stylist: true, editName: data.name})
    }

    onDeleteConfirm(data) {
        this.setState({selected_stylist: data, delete_stylist: true})
    }

    onDeleteStylist() {
        alert('Deleted Successfully');
    }

    showEmptyView() {
        return(
            <View style={{justifyContent: 'center', alignItems:'center', flex: 1, marginTop: -40}}>
                <View style={{width: 100, height: 100, backgroundColor: 'gray'}}/>
                <Text style={{width: 180, textAlign: 'center', padding: 5, color: '#616161'}}>Add you stylists here so that customers can book their preferred stylist</Text>
            </View>

        )
    }

    onEditSave() {
        alert('Saved Successfully!');
    }

    onChangeCategoryActiveState(index, state) {
        var data = userdatas[index];
        data.active = state;
        this.setState({dataSource:ds.cloneWithRows(userdatas)})
    }    

    takePhoto() {

    }



}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(Stylists);