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
            <Camera
                ref={(cam) => {this.camera = cam;}}
                style={styles.preview}
                type={this.state.cameraType}
                mirrorImage={this.state.mirrorMode}
                aspect={Camera.constants.Aspect.stretch}
                playSoundOnCapture={true}
                captureTarget={Camera.constants.CaptureTarget.memory}>

                <Text style={styles.capture} onPress={this.switchCameraType.bind(this)}>
                  [{Dimensions.get('window').width}]
                </Text>

                <TouchableHighlight style={styles.capture} onPress={this.takePicture.bind(this)} underlayColor="rgba(255, 255, 255, 0.5)">
                    <View />
                </TouchableHighlight>

            </Camera>
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
  //   const options = {
		// target: Camera.constants.CaptureTarget.memory
  //   };
    //options.location = ...
    this.camera.capture(target=Camera.constants.CaptureTarget.memory)
      .then((return_val) => {
      	// Do fetch thing.
		let req_body = {
			requests: [
				{
					image: {
						content: return_val.data
					},
					features: [
						{
							type: TYPE_UNSPECIFIED
						}
					]
				}
			]
		}

      	fetch('https://vision.googleapis.com/v1/images:annotate?key=API_KEY',
      		method: 'post',
      		body: req_body)

      })
      .then((response) => {
      	response.responses[0].fullTextAnnotation
      		//
      })
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 1.20 // Offset of 70px from the Nexus 5's native width of 360.
  },
  preview: {
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
  }
});

export default ImageGulp
