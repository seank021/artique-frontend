import React, { useState } from "react";

import Login1 from "@screens/LoginSignup/Login1";
import Login2 from "@screens/LoginSignup/Login2";
import ChangePW1 from "@screens/LoginSignup/ChangePW1";
import Signup1 from "@screens/LoginSignup/Signup1";

import Feed from "@screens/Main/Feed";
import Search from "@screens/Main/Search";
import Profile from "@screens/Main/Profile";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login1" children={() => <Login1 setGoToFeed={setUserLoggedIn} />} />
                <Stack.Screen name="Login2" children={() => <Login2 setGoToFeed={setUserLoggedIn} />} />
                <Stack.Screen name="ChangePW1" component={ChangePW1} />
                <Stack.Screen name="Signup1" component={Signup1} />
            </Stack.Navigator>
        )
    };

    const FeedStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="FeedStack" component={Feed} />
            </Stack.Navigator>
        )
    };

    const SearchStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SearchStack" component={Search} />
            </Stack.Navigator>
        )
    };

    const ProfileStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ProfileStack" component={Profile} />
            </Stack.Navigator>
        )
    };

    const Tabs = () => {
        return (
            <Tab.Navigator initialRouteName="Feed" screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Search" component={SearchStack} />
                <Tab.Screen name="Feed" component={FeedStack} />
                <Tab.Screen name="Profile" component={ProfileStack} />
            </Tab.Navigator>
        )
    };

    return (        
        <NavigationContainer>
            {userLoggedIn ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation;