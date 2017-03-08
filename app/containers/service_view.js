import React, {Component} from 'react';
const ReactNative = require('react-native');
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import DetailedServiceView from '../components/detailed_service_view'
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import NavBar from '../components/navbar';

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
Dimensions,
ScrollView,
PanResponder,
Platform,
Animated
} = ReactNative;
var width = Dimensions.get('window').width;

class ServiceTap extends React.Component {
    searchBar = [];
    TabView = [];
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
            animation: new Animated.Value(200),
            ImageHeight: 200
            
        };    
    }  

    componentDidMount() {
    }

    onLoadServiceTab(tab) {
            this.setState({ImageHeight: 200, animation: new Animated.Value(200)})
            this.setState({categoryImage: Images[tab.i], tabIndex: tab.i});
            this.setState({navigationState: 
            {index: tab.i,
                routes: [
                    { key: '0', title: 'HAIR CUT' },
                    { key: '1', title: 'HAIR SPA' },
                    { key: '2', title: 'FACIAL' },
                    { key: '3', title: 'MAKEUP' },
                    { key: '4', title: 'BEARD' },
                    { key: '5', title: 'NAILS' },
                ],
            }}
            )
            this.TabView.map(function(tabview, index){
                tabview.setState({index: index})    
            });
            
            
    }

    render() {
        var _this = this;
        return (
            <View style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
                {Platform.OS === 'android'?
                null:
                <View style={{height: 24, position: 'absolute', top: 0, left: 0, width: width, backgroundColor: '#ffffff', opacity: 0.7}}/>
                }                
                
                
                
                <View style={{flex: 1}}>
                <ScrollableTabView 
                        renderTabBar={() => <ScrollableTabBar style={{padding: 5, height: 60, position: 'absolute', top: _this.state.ImageHeight - 60}}/>}
                        initialPage={this.props.index}
                        tabBarUnderlineStyle={{borderColor:'white', backgroundColor: 'white', justifyContent: 'center'}}
                        onChangeTab={(tab)=>{this.onLoadServiceTab(tab)}}
                        tabBarActiveTextColor='#ffffff'
                        tabBarInactiveTextColor='#ababab'
                        tabBarTextStyle={{fontWeight: 'bold', fontSize: 16, backgroundColor: 'transparent'}}
                        tabBarPosition="bottom"
                        style={{backgroundColor: 'white', marginTop: 0, alignItems: 'center', position: 'relative', flex: 1}}>
                        {
                            this.state.navigationState.routes.map(function(route, index){
                                return(
                                    <View tabLabel={route.title} key={route.key} style={{flex:1, backgroundColor: 'black'}}>
                                        <Animated.Image style={{width: width, height: _this.state.animation, opacity:0.5}} source={_this.state.categoryImage}>
                                        </Animated.Image>
                                        <DetailedServiceView 
                                        onScroll={(value) => {
                                            
                                            Animated.spring(
                                                _this.state.animation,
                                                {
                                                    toValue: value + 60,
                                                    friction: 1,
                                                }
                                            ).start();value
                                            _this.setState({animation: new Animated.Value(60 + value)})
                                            _this.setState({ImageHeight: 60 + value})
                                        }}
                                        tabLabel={route.title} name={route.title} key={route.key} index={route.key} handle={_this}/>
                                    </View>
                                )
                            })
                        }               
                </ScrollableTabView>
                </View>
                <TouchableOpacity style={style.backButtonView} onPress={() => {Actions.pop()}}>
                    <Image style={style.backButton} source={back_white}/>
                </TouchableOpacity>
                <TouchableOpacity style={style.searchButtonView} onPress={() => {
                    Actions.searchview({category: _this.state.navigationState.routes[_this.state.tabIndex].title});
                }}>
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
