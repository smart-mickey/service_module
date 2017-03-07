import React, {Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity, TouchableHighlight,Animated} from 'react-native';
class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('../images/service_expanded.png'),
            'down'  : require('../images/service_collapsed.png'),
        };

        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value(),
            service     : props.data,
            parent      : props.handle
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
        this.state.parent.setState({selected_service: this.state.service})

    }

    _setMaxHeight(event) {
        if (!this.state.maxHeight) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height,
        });
        }
    }

    _setMinHeight(event) {
        if (!this.state.minHeight) {
        this.setState({
            minHeight: event.nativeEvent.layout.height,
            animation: new Animated.Value(event.nativeEvent.layout.height),
        });
        }
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                <TouchableOpacity onPress={this.toggle.bind(this)} style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    {this.state.title}
                </TouchableOpacity>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        overflow:'hidden',
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {
        justifyContent: 'center',
        padding: 10
    },
    buttonImage : {
        width   : 28,
        height  : 28
    },
    body        : {
        
    }
});

export default Panel;