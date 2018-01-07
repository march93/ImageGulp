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
import styles from '../styles/CameraStyles';
import Camera from 'react-native-camera';

class Camera extends Component {
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

export default Camera
