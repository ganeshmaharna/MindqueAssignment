// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// export default function MapComponent() {
//   const [location, setLocation] = useState(null);
//   const [customCoords, setCustomCoords] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       console.log("This is the location latitude"+location.coords.latitude);
//       console.log("This is the location longitude"+location.coords.longitude);
//       setLocation(location);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {location ? (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="You are here"
//           />
//         </MapView>
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const [customCoords, setCustomCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      if (location) {
        return; // Don't fetch location if custom coordinates are set.
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, [location]);

  const handleLocationUpdate = () => {
    setLocation(customCoords);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{fontSize:35,fontWeight:600}}>Home Screen</Text>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          onChangeText={(text) =>
            setCustomCoords({ ...customCoords, latitude: parseFloat(text) })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          onChangeText={(text) =>
            setCustomCoords({ ...customCoords, longitude: parseFloat(text) })
          }
        />
        <Button title="Update Location" onPress={handleLocationUpdate} />
      </View>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Custom Location"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

