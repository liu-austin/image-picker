/*This is an example of Image Picker in React Native*/
// jshint esversion:6
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {}
    };
  }

  chooseFile = () => {
    // var options = {
    //   title: 'Select Image',
    //   customButtons: [
    //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    //   ],
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    const options = {};
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', 'https://panoimages.s3.us-west-1.amazonaws.com/images/myimage.jpg?AWSAccessKeyId=AKIAS6MTBGTIAQR7KBXB&Content-Type=image%2Fjpeg&Expires=1579115713&Signature=xY92PSgj0T%2BLNQEhkZdihJQJqq0%3D');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr)
          if (xhr.status === 200) {

            console.log('Image successfully uploaded to S3')
          } else {
            console.log('Error while sending the image to S3')
          }
        }
      }
      xhr.setRequestHeader('Content-Type', 'image/jpeg')
      xhr.send({ uri: response.uri, type: 'image/jpeg', name: 'myimage.jpg'})
    });

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  }
  render() {
    return (
        <View style={styles.container}>
          <Button title="Choose File" onPress={this.chooseFile} />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});