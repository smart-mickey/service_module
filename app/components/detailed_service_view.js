import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import Modal from 'react-native-simple-modal';
import Switch from 'react-native-material-switch';
import Panel from './panel.js'
import SwitchView from './switch'
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
  StyleSheet,
  ScrollView
} = ReactNative;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var search_data = ['Organic Face Cleanup', 'Organic Face Wash', 'Gold Facial', 'Cucumber Facial'];
var service_data = [
  {
    name: 'Organic Face Cleanup',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: true
  },
  {
    name: 'Organic Face Wash',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: false
  },
  {
    name: 'Gold Facial',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: true
  },
  {
    name: 'Cucumber Facial',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: false
  },
  {
    name: 'Gold Fashion',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
    active: true
  },
  {
    name: 'Body Lightning',
    price: 2200,
    previous: 2800,
    time: '60 min',
    description: 'Rejuvenate your skin with our organic face cleanup. We use only the best quality products and this is suitable for all skin types.',
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
            Datas: [],
            isVisible: true,
            offset: 0
        };       
          
    }  
    

    componentDidMount() {
        this._setDataList(service_data);
        this.state.parent.TabView[this.state.index] = this;
    }

    _setDataList(data) {
        this.setState({Datas: data});
        this.setState({dataSource: ds.cloneWithRows(data)});
    }

    ListItemHeader(rowData) {
        return(
            <View style={{flex: 1, padding: 16}}>
                <View style={{flex: 0.8}}>
                    <Text style={{fontSize: 15}}>{rowData.name}</Text>
                    <View style={{flexDirection: 'row', marginTop: 8}}>
                            <Text style={{fontSize: 14, color: '#ababab'}}>{'\u20B9'}{rowData.price}</Text>
                            <Text style={{fontSize: 14, color: '#d8d8d8', marginLeft: 5, textDecorationLine: 'line-through'}}>{'\u20B9'}{rowData.previous}</Text>
                            <Text style={{fontSize: 14, color: '#d8d8d8', marginLeft: 12}}>|</Text>
                            <Text style={{fontSize: 14, color: '#d8d8d8', marginLeft: 10}}>{rowData.time}</Text>
                    </View>
                </View>
                <View style={{marginTop: 9, height: 18, width: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#41ca41', borderRadius:9}}>
                    <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 11}}>20% OFF</Text>
                </View>
                <Text style={{marginTop: 15, color: '#a5a5a5', fontSize: 14}}>{rowData.description}</Text>

            </View>            
              
        )
    }

    render() {
        var _this = this;
        const config = {
            velocityThreshold: 0.8,
            directionalOffsetThreshold: 20
        };
        return(
            this.state.parent.state.tabIndex == this.state.index?
            <View style={{ flex: 1, position: 'relative', backgroundColor: '#e5e5e5', padding: 5}}>
                
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={(event) => {
                        var currentOffset = event.nativeEvent.contentOffset.y;
                        var direction = currentOffset > _this.state.offset ? 'up' : 'down';
                        var offset = currentOffset - _this.state.offset;
                        if(direction == 'up' && currentOffset > 0){
                            //var newTop = _this.state.parent.state.TabMarginTop - Math.abs(offset);
                            _this.props.onScroll(70);
                        }
                        else if(direction == 'down' && currentOffset <= 0){
                            //var newTop = _this.state.parent.state.TabMarginTop + Math.abs(offset);
                            _this.props.onScroll(140);
                        }
                        else if(currentOffset < 0){
                             _this.props.onScroll(140);
                        }
                        _this.setState({offset: currentOffset});
                    }} 
                    contentContainerStyle={{paddingBottom: 80}}
                    automaticallyAdjustContentInsets={false}
                >
                    {
                        service_data.map(function(item, index){
                            return(
                            <View style={style.serviceCard} key={index}>
                                <Panel title={_this.ListItemHeader(item)} data={item} handle={_this}>
                                    
                                    
                                    <View style={{flexDirection: 'row',height: 48}}>

                                                    <View style={{flex: 0.2, borderTopWidth: 0.5,justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                                        <TouchableOpacity onPress={() => {_this.onEditService(item)}}>
                                                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Image style={style.iconImage} source={edit_service}/>
                                                                <Text style={style.iconText}>EDIT</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopWidth: 0.5, borderRightWidth: 0.5, borderColor: '#ababab'}}>
                                                        <TouchableOpacity onPress={() => {_this.onDeleteConfirm(item)}}>
                                                            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Image style={style.iconImage} source={delete_service}/>
                                                                <Text style={[style.iconText, {color: 'red'}]}>DELETE</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#ababab'}}>
                                                            <Text style={style.switchText}>{item.active?'AVAILABLE':'UNAVILABLE'}</Text>
                                                            <View style={style.SwitchView}>
                                                                <SwitchView 
                                                                    switchWidth={22}
                                                                    switchHeight={8}
                                                                    buttonRadius={7}
                                                                    activeButtonColor='#1FbF55'
                                                                    inactiveButtonColor='#rgba(200,200,200,.7)'
                                                                    activeSwitchColor='#8FDFAA' 
                                                                    inactiveSwitchColor='#rgba(200,200,200,.4)'
                                                                    active={item.active}
                                                                    onPress={(state)=>{_this.onChangeCategoryActiveState(index, state)}}
                                                                    />
                                                            </View>                                                    
                                                    </View>
                                                </View>     
                                  
                                </Panel>
                            </View>

                )
                        })
                    }
                </ScrollView>       
                
                <Modal
                    offset = {0}
                    containerStyle={{
                       justifyContent: 'center',
                       position: 'absolute',
                       paddingBottom: 200
                    }}
                    open = {this.state.delete_service}
                    modalDidOpen = {() => console.log('modal did open')}
                    modalDidClose = {() => this.setState({delete_service: false})}>
                    <View style = {{padding: 14, paddingBottom: 2}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Confirm Delete</Text>
                        <Text style={{marginTop: 15, color: '#b9b9b9'}}>Are you sure you want to <Text style={{color: 'black'}}>delete {this.state.selected_service.name}?</Text></Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 24, height: 36}}>
                            <TouchableOpacity onPress={()=>{this.setState({delete_service: false})}}>
                                <Text style={{color:'#b9b9b9', fontSize: 14, width: 64}}>CLOSE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.onDeleteService()}}>
                                <Text style={{color:'#E64848', width: 70, marginLeft: 32}}>DELETE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={style.AddServiceIconView} onPress={() => {this.onAddService()}}>
                        <Image style={style.AddServiceIcon} source={addService}/>
                </TouchableOpacity>
                
            </View>    
            :
            <ServiceView name='loading...' />
        )
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

class ServiceView extends Component {
    
    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#FFFFFF' }}>
                <Text>{this.props.name}</Text>
            </View>           
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {}}, mapDispatchToProps)(DetailedServiceView);