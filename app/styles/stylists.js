var React = require('react-native')
var {StyleSheet, Dimensions} = React
var width = Dimensions.get('window').width;
var header_height = 60;
var Stylists_CSS = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },

    statuBar: {
        height: 20,
        backgroundColor: '#263041',
    },

    header: {
        height: header_height,
        backgroundColor: 'transparent',
        
    },

    backView: {
        height: 60,
        width: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    backButton: {
        width: 40,
        height: 40,
        marginTop: (header_height - 40)/2,
        resizeMode: 'stretch',
        alignSelf: 'stretch'
    },

    listView: {
        flex: 1,
        padding: 20,
        backgroundColor: 'transparent'
    },

    headerText: {
        color: '#47556c', 
        textAlign: 'center', 
        fontSize: 18,
        fontWeight: 'bold'
    },

    listItem: {
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: 'gray',
        shadowOpacity: 1,
    },

    stylist: {
        flexDirection: 'row', 
        flex: 1, 
        padding: 10,
        
    },

    userImage: {
        width: 50,
        height: 50,
        margin: 10,
        resizeMode: 'cover',
        borderRadius: 25
    },

    userName: {
        height: 25,
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center'
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

    iconText: {
        fontSize: 12,
        padding: 5,
        marginLeft: 5
    },

    AddServiceIconView: {
        position: 'absolute',
        right: 30,
        bottom: 30
    },

    AddServiceIcon: {
        width: 56,
        height: 56,
        resizeMode: 'stretch',
        alignSelf: 'stretch',        
    },

    editImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    PhotoImageView: {
        width: 100,
        height: 100,        
        position: 'relative'
    },

    editImageButtonView: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },

    editImageButton: {        
        width: 25,
        height: 25,
        resizeMode: 'stretch'
    },

    previousPhoto: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 50
    },

    textInput: {
        height: 40, 
        color: 'black', 
        fontSize: 16,
    },

    editNameView: {
        padding: 20,
    },

    borderBottomView: {
        borderBottomWidth: 1,
        borderColor: '#ababab',
        justifyContent: 'flex-end'
    },

    modalView: {
        padding: 15
    }


});
module.exports = Stylists_CSS