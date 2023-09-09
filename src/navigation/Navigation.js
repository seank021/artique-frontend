import React, { useState, useEffect } from "react";
import { Image } from "react-native";

import tw from 'twrnc'

import * as Cookies from "@functions/cookie";

import Login1 from "@screens/LoginSignup/Login1";
import Login2 from "@screens/LoginSignup/Login2";
import ChangePW1 from "@screens/LoginSignup/ChangePW1";
import Signup1 from "@screens/LoginSignup/Signup1";

import Feed1 from "@screens/Main/Feed1";
import MusicalDetail1 from "@screens/Main/MusicalDetail1";
import MusicalDetail3 from "@screens/Main/MusicalDetail3";
import ReviewDetail1 from "@screens/Main/ReviewDetail1";

import Search from "@screens/Search/Search";

import Profile from "@screens/Profile/Profile";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Feed1 부분에 setGoToFeed 넣어놓음 (로그아웃 테스트용)

const Navigation = () => {
    const [goToFeed, setGoToFeed] = useState(false);

    const AuthStack = () => {
        return (
            <Stack.Navigator initialRouteName="Login1" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login1" children={() => <Login1 setGoToFeed={setGoToFeed} />} />
                <Stack.Screen name="Login2" children={() => <Login2 setGoToFeed={setGoToFeed} />} />
                <Stack.Screen name="ChangePW1" component={ChangePW1} />
                <Stack.Screen name="Signup1" component={Signup1} />
            </Stack.Navigator>
        )
    };

    const MainStack = () => {
        const [isCookie, setIsCookie] = useState(false);

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator initialRouteName="Feed1" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Feed1" children={() => <Feed1 isCookie={isCookie}/>} />
                <Stack.Screen name="MusicalDetail1" children={() => <MusicalDetail1 isCookie={isCookie}/>} />
                <Stack.Screen name="MusicalDetail3" children={() => <MusicalDetail3 isCookie={isCookie}/>} />
                <Stack.Screen name="ReviewDetail1" children={() => <ReviewDetail1 isCookie={isCookie}/>} />
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
                <Stack.Screen name="Profile" children={() => <Profile isCookie={isCookie} setGoToFeed={setGoToFeed} />} />
            </Stack.Navigator>
        )
    };

    const Tabs = () => {
        return (
            <Tab.Navigator
                initialRouteName="MainTab"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        width: "90%",
                        left: "5%",
                        shadowColor: "rgba(0, 0, 0, 0)",
                        borderBlockColor: "rgba(0, 0, 0, 0)",
                        backgroundColor: "#FAFAFA",
                    },
                    tabBarShowLabel: false,
                }}
            >
                <Tab.Screen 
                    name="SearchTab"
                    component={SearchStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            focused ? <Image source={require("@images/search.png")} style={tw`w-[20px] h-[20px]`} /> : <Image source={require("@images/search.png")} style={tw`w-[20px] h-[20px]`} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="MainTab"
                    component={MainStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            focused ? <Image source={require("@images/main_focused.png")} style={tw`w-[47.01324px] h-[46.01267px]`} /> : <Image source={require("@images/main.png")} style={tw`w-[18.46119px] h-[20px]`} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="ProfileTab"
                    component={ProfileStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            focused ? <Image source={require("@images/profile.png")} style={tw`w-[20px] h-[20px]`} /> : <Image source={require("@images/profile.png")} style={tw`w-[19.26213px] h-[20px]`} />
                        ),
                    }}
                />
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