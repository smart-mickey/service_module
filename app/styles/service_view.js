var React = require('react-native')
var {StyleSheet, Dimensions} = React
var width = Dimensions.get('window').width;
var Service_View_CSS = StyleSheet.create({

    serviceImageView: {
        position: 'absolute',
        width: width,
        height: 200,
    },

    serviceImage: {
         width: width,
        height: 200,
        resizeMode: 'cover',
        opacity: 0.4
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
        width: 14,
        height: 14,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    editIconView: {
        width: 20
    },

    SwitchView: {
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    switchText: {
        fontSize: 12,
        marginRight: 14,
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

    serviceCard: {
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: 'gray',
        shadowOpacity: 1,
        marginBottom: 12    
    },
    

    iconText: {
        fontSize: 12,
        marginLeft: 6
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