import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function PunchButtonComp() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus.status === 'granted' && imagePickerStatus.status === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    })();
  }, []);

  const takeSelfie = async () => {
    if (hasPermission) {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!photo.canceled) {
        setImage(photo.uri);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {hasPermission === null ? (
        <Text>Requesting permission...</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera or camera roll.</Text>
      ) : (
        <>
          <Camera style={{ width: 300, height: 300 }} type={type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <Button
                title="Flip Camera"
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              />
            </View>
          </Camera>
          <Button title="Take Selfie" onPress={takeSelfie} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </>
      )}
    </View>
  );
}
