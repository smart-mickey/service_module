var React = require('react-native')
var {StyleSheet, Dimensions} = React
var width = Dimensions.get('window').width;
var header_height = 72
var Add_Service_CSS = StyleSheet.create({

    navBar: {
        backgroundColor: '#394355',
        height:80,
        marginTop: -20
    },    

    editView: {
        padding: 15,
        paddingBottom: 75,
        backgroundColor: '#F5F5F5',        
        flex: 1
    },

    editForm: {
        flex: 1,
        shadowColor: 'gray',
        shadowOpacity: 1,
        backgroundColor: 'white',
        padding: 25
    },

    saveButton: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 60,
        backgroundColor: '#339433',
        justifyContent: 'center'
    },

    borderBottomView: {
        borderBottomWidth: 1,
        borderColor: '#ababab',
        flex: 1,
        justifyContent: 'flex-end'
    },

    textInput: {
        height: 40, 
        color: 'black', 
        fontSize: 16,
    },

    dinar: {
        color: '#ababab',
        textAlign: 'center',
        height: 40,
        padding: 10,
        paddingLeft: 0
    },

    dropText: {
        color: 'gray',
        padding: 10,
        fontSize: 18,
        paddingLeft: 30
    },

    selectedType: {
        flex: 1,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 2,
        justifyContent: 'center',
        borderTopColor: '#ababab',
        borderRightColor: '#ababab',
        borderBottomColor: '#b900f0'
    },

    defaultType: {
        flex: 1,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        borderTopColor: '#ababab',
        borderRightColor: '#ababab',
        borderBottomColor: '#ababab'
    },

    saveButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white'
    }




	
})

module.exports = Add_Service_CSS