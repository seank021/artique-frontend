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
import MusicalDetail2 from "@screens/Main/MusicalDetail2";
import ReviewDetail1 from "@screens/Main/ReviewDetail1";
import ReviewWrite1 from "@screens/Main/ReviewWrite1";

import Search1 from "@screens/Search/Search1";

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
        const [musicalId, setMusicalId] = useState(0);
        const [reviewId, setReviewId] = useState(0);
        const [musicalPoster, setMusicalPoster] = useState("");
        const [musicalTitle, setMusicalTitle] = useState("");

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator initialRouteName="Feed1" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Feed1" children={() => <Feed1 isCookie={isCookie} setMusicalId={setMusicalId} setReviewId={setReviewId}/>} />
                <Stack.Screen name="MusicalDetail1" children={() => <MusicalDetail1 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId}/>} />
                <Stack.Screen name="MusicalDetail2" children={() => <MusicalDetail2 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId}/>} />
                <Stack.Screen name="ReviewDetail1" children={() => <ReviewDetail1 isCookie={isCookie} reviewId={reviewId}/>} />
                <Stack.Screen name="ReviewWrite1" children={() => <ReviewWrite1 isCookie={isCookie} musicalId={musicalId} musicalPoster={musicalPoster} musicalTitle={musicalTitle}/>} />
            </Stack.Navigator>
        )
    };

    const SearchStack = () => {
        const [isCookie, setIsCookie] = useState(true);
        const [musicalId, setMusicalId] = useState(0);
        const [reviewId, setReviewId] = useState(0);
        const [musicalPoster, setMusicalPoster] = useState("");
        const [musicalTitle, setMusicalTitle] = useState("");

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Search1" children={() => <Search1 isCookie={isCookie} setMusicalId={setMusicalId}/>} />
                <Stack.Screen name="MusicalDetail1" children={() => <MusicalDetail1 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setReviewId={setReviewId}/>} />
                <Stack.Screen name="MusicalDetail2" children={() => <MusicalDetail2 isCookie={isCookie} musicalId={musicalId} setReviewId={setReviewId}/>} />
                <Stack.Screen name="ReviewDetail1" children={() => <ReviewDetail1 isCookie={isCookie} reviewId={reviewId}/>} />
                <Stack.Screen name="ReviewWrite1" children={() => <ReviewWrite1 isCookie={isCookie} musicalId={musicalId} musicalPoster={musicalPoster} musicalTitle={musicalTitle}/>} />
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
                        height: "10%",
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
                            focused ? <Image source={require("@images/search_focused.png")} style={tw`w-[58px] h-[69px]`} /> : <Image source={require("@images/search.png")} style={tw`w-[24px] h-[24px]`} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="MainTab"
                    component={MainStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            focused ? <Image source={require("@images/main_focused.png")} style={tw`w-[58px] h-[70px]`} /> : <Image source={require("@images/main.png")} style={tw`w-[22.15px] h-[24px]`} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="ProfileTab"
                    component={ProfileStack}
                    options={{
                        tabBarIcon: ({focused}) => (
                            focused ? <Image source={require("@images/profile_focused.png")} style={tw`w-[58px] h-[70px]`} /> : <Image source={require("@images/profile.png")} style={tw`w-[23.11px] h-[24px]`} />
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