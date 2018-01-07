import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      // width: Dimensions.get('window').width * 1.20 // Offset of 70px from the Nexus 5's native width of 360.
      // width: Dimensions.get('window').width / 2,
      // height: Dimensions.get('window').height / 2
    },
    cameraWrap: {
      borderColor: 'red',
      borderWidth: 3,
      height: Dimensions.get('window').height * 0.8,
      zIndex: 1,
    },
    cameraView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 5,
      borderColor: '#FFF',
      marginBottom: 15,
      top: 15
    },
    bottomBar: {
      flex: 1,
      width: '100%',
      height: Dimensions.get('window').height * 0.2,
      backgroundColor: '#000',
      alignItems: 'center',
      borderColor: 'green',
      borderWidth: 3,
      zIndex: 100
    }
});