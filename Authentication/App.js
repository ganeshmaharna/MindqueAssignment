import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapComponent from "./components/MapComponent";
import PunchButtonComp from "./components/PunchButtonComp";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
    //   <LoginScreen/>
    // </View>

      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={MapComponent} />
          <Stack.Screen name="PunchScreen" component={PunchButtonComp} />
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
