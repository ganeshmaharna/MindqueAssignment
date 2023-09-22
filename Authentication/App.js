import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import MapComponent from "./components/MapComponent";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
    //   <LoginScreen/>
    // </View>

      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="Map" component={MapComponent} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
