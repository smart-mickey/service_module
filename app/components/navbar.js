import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux'

class NavBar extends Component{
    constructor(props){
        super(props);

       
    }
   

    render(){
        
        return (
            <View>
                {Platform.OS === 'android'?
                null:
                <View style={style.statuBar}/>
                }
                <View style={{height: this.props.height, backgroundColor: this.props.bgColor, flexDirection: 'row', padding: 16, alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {Actions.pop()}}>
                        <Image style={style.backButton} source={this.props.source}/>
                    </TouchableOpacity>
                    <Text style={[style.headerText, {color: this.props.textColor}]} >{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

var style = StyleSheet.create({
   statuBar: {
        height: 24,
        backgroundColor: '#263041',
    },    

    backButton: {
        width: 24,
        height: 24,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    headerText: {
        color: 'white',
        textAlign: 'center', 
        fontSize: 16,
        marginLeft: 16
    },

    backView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default NavBar;