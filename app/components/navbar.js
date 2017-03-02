import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class NavBar extends Component{
    constructor(props){
        super(props);

       
    }
   

    render(){
        
        return (
            <View>
                <View style={style.statuBar}/>
                <View style={{height: this.props.height, backgroundColor: this.props.bgColor, flexDirection: 'row'}}>
                    <TouchableOpacity style={style.backView} onPress={() => {Actions.pop()}}>
                        <Image style={style.backButton} source={this.props.source}/>
                    </TouchableOpacity>
                    <View style={style.titleView}>
                        <Text style={style.headerText} >{this.props.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

var style = StyleSheet.create({
   statuBar: {
        height: 20,
        backgroundColor: '#263041',
    },    

    backButton: {
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    headerText: {
        color: 'white', 
        textAlign: 'center', 
        fontSize: 20,
        padding: 20,
    },

    titleView: {
        justifyContent: 'center'
    },

    backView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default NavBar;