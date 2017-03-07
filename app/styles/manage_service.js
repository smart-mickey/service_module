var React = require('react-native')
var {StyleSheet, Dimensions} = React
var width = Dimensions.get('window').width;
var Manage_Service_CSS = StyleSheet.create({

    text: {
        fontSize: 12,
        color: '#47556c'
    },

    Header: {
        height: 32,
        flexDirection: 'row',
        marginTop: 20,
        alignItems:'center',
        margin: 12,
        marginBottom: 28
    },

    backButton: {
        width: 32,
        height: 32,
        resizeMode: 'stretch',
    },

    Stylists: {
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#243140',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 16
    },

    SwitchView: {
        width: 50,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchImage: {
        width: 32,
        height: 32,
        resizeMode: 'stretch',
        alignSelf: 'stretch',
    },

    ServiceImage: {
        width: width / 2 - 18,
        height: width / 2 - 18,
        resizeMode: 'cover',
        borderRadius: 10
    },

    EditServiceImage: {
        height: 150,
        width: width - 88,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    NewImage: {
        height: 50,
        width: 70,
        resizeMode: 'stretch'
    },

    addServiceImage: {
        width: width / 2 - 18,
        height: width / 2 - 18,
        resizeMode: 'contain'
    },

    ServiceName: {
        color: '#243140',
        fontSize: 18,
        padding: 4,
    },

    ListView: {
        flex: 1
    },

    listItem: {

    },

    ModalView: {
        backgroundColor: 'transparent', 
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

    editIconView: {
        position: 'absolute',
        right: 4,
        top: 4,       
    },

    editIcon: {
        width: 30,
        height: 30,
        alignSelf: 'stretch',
        resizeMode: 'stretch'      
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


	
})

module.exports = Manage_Service_CSS