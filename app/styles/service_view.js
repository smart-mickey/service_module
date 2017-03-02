var React = require('react-native')
var {StyleSheet, Dimensions} = React
var width = Dimensions.get('window').width;
var Service_View_CSS = StyleSheet.create({

    serviceImage: {
        width: width,
        height: 200,
        resizeMode: 'cover',
        opacity: 0.5
    },

    AddServiceIconView: {
        position: 'absolute',
        right: 10,
        bottom: 30
    },

    AddServiceIcon: {
        width: 56,
        height: 56,
        resizeMode: 'stretch',
        alignSelf: 'stretch',        
    },

    EditServiceIcon: {
        width: 32,
        height: 32,
        resizeMode: 'stretch',
        alignSelf: 'stretch',
    },

    serviceName: {
        fontSize: 18,
        color: 'black',
        padding: 5
    },

    serviceTime: {
        fontSize: 15,
        color: 'gray',
        padding: 5
    },

    iconImage: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    editIconView: {
        width: 20
    },

    switchText: {
        fontSize: 12,
        marginRight: 15,
        padding: 5
    },

    listItem: {
        borderRadius: 5,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 1,
        margin: 10,
        backgroundColor: 'white'
    },

    iconText: {
        fontSize: 12,
        padding: 5,
        marginLeft: 5
    },

    backButtonView: {
        position: 'absolute',
        top: 30,
        left: 10
    },

    backButton: {
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        alignSelf: 'stretch',        
    },

    searchButtonView: {
        position: 'absolute',
        right: 10,
        top: 30,
    },

    searchButton: {
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        alignSelf: 'stretch',        
    },

})

module.exports = Service_View_CSS