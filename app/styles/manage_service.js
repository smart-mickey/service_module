var React = require('react-native')
var {StyleSheet, Dimensions} = React
var width = Dimensions.get('window').width;
var Manage_Service_CSS = StyleSheet.create({

    text: {
        fontSize: 10
    },

    Header: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 20
    },

    Stylists: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#243140',
        padding: 5,
        margin: 10
    },

    searchImage: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        alignSelf: 'stretch',
        margin: 10
    },

    ServiceImage: {
        width: width / 2 - 30,
        height: width / 2 - 30,
        resizeMode: 'cover',
        borderRadius: 10
    },

    EditServiceImage: {
        resizeMode: 'contain',
        height: 150,
        width: width - 60
    },

    addServiceImage: {
        width: width / 2 - 30,
        height: width / 2 - 30,
        resizeMode: 'contain'
    },

    ServiceName: {
        color: '#243140',
        fontSize: 20,
        padding: 5,
    },

    ListView: {
        flex: 1
    },

    listItem: {

    },

    ModalView: {
        backgroundColor: 'white', 
        padding: 5,         
    },

    ModalTitle: {
        borderColor: 'black', 
        borderBottomWidth: 0.5
    },

    modal_header_title: {
        padding: 10,
        textAlign: 'center',
        color: '#243140',
        fontSize: 25,
    },

    editCategory: {
        position: 'absolute',
        right: 5,
        top: 5,        
    },

    EditCategoryIcon: {
        width: 35,
        height: 35,
        alignSelf: 'stretch',
        resizeMode: 'stretch'
    },

    iconImage: {
        width: 30,
        height: 30,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    iconText: {
        fontSize: 18,
        padding: 5,
        marginLeft: 15
    },

    switchText: {
        fontSize: 18,
        marginLeft: 15,
        paddingLeft: 5
    },

    editIconView: {
        width: 40
    }

	
})

module.exports = Manage_Service_CSS