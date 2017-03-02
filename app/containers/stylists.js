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
                    image: User1
                },
                {
                    name: 'Julia Cabania',
                    image: User2
                },
                {
                    name: 'Jake Andreson',
                    image: User3
                },
                {
                    name: 'Joris Loos',
                    image: User4
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
                <View style={style.statuBar}/>
                <View style={style.header}>
                    <TouchableOpacity style={style.backView} onPress={() => {Actions.pop()}}>
                        <Image style={style.backButton} source={back}/>
                        <Text style={style.headerText} >Stylists</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.listView}>
                    {
                        userdatas.length == 0?
                            this.showEmptyView()
                        :
                            <ListView
                                dataSource = {this.state.dataSource}
                                enableEmptySections = {true}
                                renderRow = {(rowData) => {
                                    

                                    return(            
                                        <View style={style.listItem}> 
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
                    modalDidClose = {() => this.setState({delete_stylist: false})}
                    style = {{alignItems: 'center'}}>
                    <View>
                        <Text style={{padding: 10, fontSize: 20, fontWeight: 'bold'}}>Confirm Delete</Text>
                        <Text style={{padding: 10, color: 'gray'}}>Are you sure you want to delete <Text style={{color: 'black'}}>{this.state.selected_stylist.name}</Text> from stylists list?</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={()=>{this.setState({delete_stylist: false})}}>
                                <Text style={{color:'gray', padding: 10}}>CLOSE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.onDeleteStylist()}}>
                                <Text style={{color:'#F78457', padding: 10}}>DELETE</Text>
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

    takePhoto() {

    }



}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(Stylists);