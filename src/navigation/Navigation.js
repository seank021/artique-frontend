import React, { useState, useEffect } from "react";

import * as Cookies from "@functions/cookie";

import Login1 from "@screens/LoginSignup/Login1";
import Login2 from "@screens/LoginSignup/Login2";
import ChangePW1 from "@screens/LoginSignup/ChangePW1";
import Signup1 from "@screens/LoginSignup/Signup1";

import Feed1 from "@screens/Main/Feed1";
import Detail1 from "@screens/Main/Detail1";
import AllReviews1 from "@screens/Main/AllReviews1";
import SeeMore1 from "@screens/Main/SeeMore1";

import Search from "@screens/Search/Search";

import Profile from "@screens/Profile/Profile";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    const [goToFeed, setGoToFeed] = useState(false);

    const AuthStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login1" children={() => <Login1 setGoToFeed={setGoToFeed} />} />
                <Stack.Screen name="Login2" children={() => <Login2 setGoToFeed={setGoToFeed} />} />
                <Stack.Screen name="ChangePW1" component={ChangePW1} />
                <Stack.Screen name="Signup1" component={Signup1} />
            </Stack.Navigator>
        )
    };

    const MainStack = () => {
        const [isCookie, setIsCookie] = useState(true);

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Feed1" children={() => <Feed1 isCookie={isCookie}/>} />
                <Stack.Screen name="Detail1" children={() => <Detail1 isCookie={isCookie}/>} />
                <Stack.Screen name="AllReviews1" children={() => <AllReviews1 isCookie={isCookie}/>} />
                <Stack.Screen name="SeeMore1" children={() => <SeeMore1 isCookie={isCookie}/>} />
            </Stack.Navigator>
        )
    };

    const SearchStack = () => {
        const [isCookie, setIsCookie] = useState(true);

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Search" children={() => <Search isCookie={isCookie}/>} />
            </Stack.Navigator>
        )
    };

    const ProfileStack = () => {
        const [isCookie, setIsCookie] = useState(true);

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Profile" children={() => <Profile isCookie={isCookie}/>} />
            </Stack.Navigator>
        )
    };

    const Tabs = () => {
        return (
            <Tab.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
                <Tab.Screen name="SearchTab" component={SearchStack} />
                <Tab.Screen name="MainTab" component={MainStack} />
                <Tab.Screen name="ProfileTab" component={ProfileStack} />
            </Tab.Navigator>
        )
    };

    return (        
        <NavigationContainer>
            {goToFeed ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation;