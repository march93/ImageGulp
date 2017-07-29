'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class ImageGulp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType : 'back',
      mirrorMode : false
    }
  }

  render() {
    return (
      <View style={styles.container}>
            <View style={styles.cameraWrap}>
                <Camera
                    ref={(cam) => {this.camera = cam;}}
                    style={styles.cameraView}
                    type={this.state.cameraType}
                    mirrorImage={this.state.mirrorMode}
                    aspect={Camera.constants.Aspect.stretch}
                    playSoundOnCapture={true}
                    captureTarget={Camera.constants.CaptureTarget.memory}>
                </Camera>
            </View>

            <View style={styles.bottomBar}>
                <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)} underlayColor="rgba(255, 255, 255, 0.5)">
                    <View />
                </TouchableHighlight>
                {/*<TouchableHighlight style={styles.capture} onPress={this.switchCameraType.bind(this)} underlayColor="rgba(255, 255, 255, 0.5)">
                    <View />
                </TouchableHighlight>*/}
            </View>

        {/*<View style={styles.bottomBar}>
            <Text style={styles.capture} onPress={this.switchCameraType.bind(this)}></Text>

            <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)} underlayColor="rgba(255, 255, 255, 0.5)">
                <View />
            </TouchableHighlight>
        </View>          */}
      </View>
    );
  }

  switchCameraType() {
        if (this.state.cameraType === 'back') {
        this.setState({
            cameraType: 'front',
            mirrorMode: true
        })
        } else {
        this.setState({
            cameraType: 'back',
            mirrorMode: false
        })
        }
        console.log(Dimensions.get('window').height, Dimensions.get('window').width);
  }

takePicture() {
    // const options = {
    //     target: Camera.constants.CaptureTarget.memory
    // };
    //options.location = ...
    this.camera.capture({target: Camera.constants.CaptureTarget.memory})
      .then((return_val) => {
          // Prepare request body.
        let req_body = {
          "requests": [
            {
              "image": {
                "content": return_val.data
              },
              "features": [
                {
                  "type": "LABEL_DETECTION"
                }
              ]
            }
          ]
        };

        // Actually send the request.
        fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY', 
            {method: 'post', body: JSON.stringify(req_body)});

      })
      .then((response) => {
          console.log(response);
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
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

export default ImageGulp
