import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login1 from "@screens/LoginSignup/Login1";
import Login2 from "@screens/LoginSignup/Login2";
import ChangePW1 from "@screens/LoginSignup/ChangePW1";
import Signup1 from "@screens/LoginSignup/Signup1";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Login1} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login1" component={Login1} />
        <Stack.Screen name="Login2" component={Login2} />
        <Stack.Screen name="ChangePW1" component={ChangePW1} />
        <Stack.Screen name="Signup1" component={Signup1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;