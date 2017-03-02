import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import DetailedServiceView from '../components/detailed_service_view'

var style = require('../styles/service_view');
var Image1 = require('../images/service_haircut.png');
var Image2 = require('../images/service_hairspa.png');
var Image3 = require('../images/service_facial.png');
var Image4 = require('../images/service_makeup.png');
var Image5 = require('../images/service_trimming.png');
var Image6 = require('../images/service_polish.png');


var back_white = require('../images/back_white.png');
var search = require('../images/search_white.png');
var Images = [Image1, Image2, Image3, Image4, Image5, Image6];
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
  Dimensions
} = ReactNative;
var width = Dimensions.get('window').width;
class ServiceTap extends React.Component {

    constructor(props) {
        super(props);    
        this.state = { 
            navigationState: {
              index:  props.index,
              routes: [
                { key: '0', title: 'HAIR CUT' },
                { key: '1', title: 'HAIR SPA' },
                { key: '2', title: 'FACIAL' },
                { key: '3', title: 'MAKEUP' },
                { key: '4', title: 'BEARD' },
                { key: '5', title: 'NAILS' },
              ],
            },
            categoryImage: Images[props.index],
            tabIndex: props.index,
        };    
    }  

    componentDidMount() {
    }

  _handleChangeTab = (index) => {
      this.setState({
        navigationState: {
          index: index,
              routes: [
                { key: '0', title: 'HAIR CUT' },
                { key: '1', title: 'HAIR SPA' },
                { key: '2', title: 'FACIAL' },
                { key: '3', title: 'MAKEUP' },
                { key: '4', title: 'BEARD' },
                { key: '5', title: 'NAILS' },
              ],
        },
        category: '',
    });
  };

  onLoadServiceTab(index) {
        this.setState({categoryImage: Images[index], tabIndex: index})
  }

  
  _renderHeader = (props) => {
      
    return(
        <TabBar
            scrollEnabled={true} 
            indicatorStyle={{paddingBottom: 10, backgroundColor:'white'}}
            labelStyle={{fontSize: 16, fontWeight: 'bold'}}
            {...props} 
        />
    ) 
  };

  _renderScene = ({ route }) => {   
      //this.setState({tabIndex: route.key})
      
      if(route.key == this.state.tabIndex){
          return (
              <DetailedServiceView name={route.title} index={route.key} handle={this}/>
          );
      }else{
          return <ServiceView name='Loading...'/>
      }
  };

  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black', opacity: 0.95, position: 'relative'}}>

          <Image style={style.serviceImage} source={this.state.categoryImage}/>

          <TabViewAnimated
            style={{flex: 1, justifyContent: 'center', marginTop: -55}}
            navigationState={this.state.navigationState}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onChangePosition={(position) => {this.onLoadServiceTab(Math.round(position))}}
            onRequestChangeTab={this._handleChangeTab}
          />


          <TouchableOpacity style={style.backButtonView} onPress={() => {Actions.pop()}}>
              <Image style={style.backButton} source={back_white}/>
          </TouchableOpacity>


          <TouchableOpacity style={style.searchButtonView} onPress={() => {this.searchBar.show()}}>
              <Image source={search} style={style.searchButton}/>
          </TouchableOpacity>         
          
      </View>
    );
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

export default connect(() => {return {}}, mapDispatchToProps)(ServiceTap);
