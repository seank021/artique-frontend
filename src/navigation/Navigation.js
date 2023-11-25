import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";

import tw from 'twrnc'

import * as Cookies from "@functions/cookie";
import { memberIdInMypage } from "@functions/api";
import { getAutoLogin } from "@functions/autoLogin";

import AlertForm from "@forms/AlertForm";

import Login1 from "@screens/LoginSignup/Login1";
import Login2 from "@screens/LoginSignup/Login2";
import ChangePW1 from "@screens/LoginSignup/ChangePW1";
import Signup1 from "@screens/LoginSignup/Signup1";

import Feed1 from "@screens/Main/Feed1";
import MusicalDetail1 from "@screens/Main/MusicalDetail1";
import MusicalDetail2 from "@screens/Main/MusicalDetail2";
import ReviewDetail1 from "@screens/Main/ReviewDetail1";
import ReviewWrite1 from "@screens/Main/ReviewWrite1";
import ReviewUpdate1 from "@screens/Main/ReviewUpdate1";

import Search1 from "@screens/Search/Search1";

import Mypage from "@screens/Profile/Mypage";
import ChangeProfile from "@screens/Profile/ChangeProfile";
import MyReviews from "@screens/Profile/MyReviews";
import MyReviewSearch from "@screens/Profile/MyReviewSearch";
import MyThumbs from "@screens/Profile/MyThumbs";
import MyThumbsSearch from "@screens/Profile/MyThumbsSearch";

import MainSetting from "@screens/Setting/MainSetting";
import MyAccount from "@screens/Setting/MyAccount/MyAccount";
import PWChange from "@screens/Setting/MyAccount/PWChange";
import PWReset from "@screens/Setting/MyAccount/PWReset";
import Annoucement from "@screens/Setting/Announcement/Announcement"
import AnnounceDetail from "@screens/Setting/Announcement/AnnounceDetail";
import CSCenter from "@screens/Setting/CSCenter/CSCenter";
import ArtiqueInfo from "@screens/Setting/ArtiqueInfo/ArtiqueInfo";
import Terms from "@screens/Setting/ArtiqueInfo/Terms";
import Privacy from "@screens/Setting/ArtiqueInfo/Privacy";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
    const [goToFeed, setGoToFeed] = useState(false);

    useEffect(() => {
        const autoLogin = async () => {
            const autoLogin = await getAutoLogin();
            if (autoLogin === "true") {
                setGoToFeed(true);
            } else {
                setGoToFeed(false);
            }
        };
        autoLogin();
    }, []);

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
        const [memberId, setMemberId] = useState("");
        const [musicalId, setMusicalId] = useState(0);
        const [reviewId, setReviewId] = useState(0);
        const [musicalPoster, setMusicalPoster] = useState("");
        const [musicalTitle, setMusicalTitle] = useState("");
        const [reviewInfo, setReviewInfo] = useState({});
        const [reviewInfo2, setReviewInfo2] = useState({});

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifLoginCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        useEffect(() => {
            const memberId = async () => {
                const memberId = await memberIdInMypage();
                setMemberId(memberId);
            };
            memberId();
        }, []);

        return (
            <Stack.Navigator initialRouteName="Feed1" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Feed1" children={() => <Feed1 isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MusicalDetail1" children={() => <MusicalDetail1 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MusicalDetail2" children={() => <MusicalDetail2 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="ReviewDetail1" children={() => <ReviewDetail1 isCookie={isCookie} reviewId={reviewId}/>} />
                <Stack.Screen name="ReviewWrite1" children={() => <ReviewWrite1 isCookie={isCookie} musicalId={musicalId} musicalPoster={musicalPoster} musicalTitle={musicalTitle} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="ReviewUpdate1" children={() => <ReviewUpdate1 isCookie={isCookie} reviewInfo={reviewInfo} reviewInfo2={reviewInfo2} setGoToFeed={setGoToFeed}/>}/>
                <Stack.Screen name="Mypage" children={() => <Mypage isCookie={isCookie} memberId={memberId} setReviewId={setReviewId} />} />
                <Stack.Screen name="MyReviews" children={() => <MyReviews isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyReviewSearch" children={() => <MyReviewSearch isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyThumbs" children={() => <MyThumbs isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyThumbsSearch" children={() => <MyThumbsSearch isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
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
                const cookieExists = await Cookies.ifLoginCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        return (
            <Stack.Navigator initialRouteName="Search1" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Search1" children={() => <Search1 isCookie={isCookie} setMusicalId={setMusicalId}/>} />
                <Stack.Screen name="MusicalDetail1" children={() => <MusicalDetail1 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId}/>} />
                <Stack.Screen name="MusicalDetail2" children={() => <MusicalDetail2 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId}/>} />
                <Stack.Screen name="ReviewDetail1" children={() => <ReviewDetail1 isCookie={isCookie} reviewId={reviewId}/>} />
                <Stack.Screen name="ReviewWrite1" children={() => <ReviewWrite1 isCookie={isCookie} musicalId={musicalId} musicalPoster={musicalPoster} musicalTitle={musicalTitle}/>} />
            </Stack.Navigator>
        )
    };

    const ProfileStack = () => {
        const [isCookie, setIsCookie] = useState(true);
        const [memberId, setMemberId] = useState("");
        const [musicalId, setMusicalId] = useState(0);
        const [reviewId, setReviewId] = useState(0);
        const [musicalPoster, setMusicalPoster] = useState("");
        const [musicalTitle, setMusicalTitle] = useState("");
        const [reviewInfo, setReviewInfo] = useState({});
        const [reviewInfo2, setReviewInfo2] = useState({});

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifLoginCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        useEffect(() => {
            const memberId = async () => {
                const memberId = await memberIdInMypage();
                setMemberId(memberId);
            };
            memberId();
        }, []);

        return (
            <Stack.Navigator initialRouteName="Mypage" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Mypage" children={() => <Mypage isCookie={isCookie} memberId={memberId} setReviewId={setReviewId} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="ChangeProfile" children={() => <ChangeProfile isCookie={isCookie} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyReviews" children={() => <MyReviews isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyReviewSearch" children={() => <MyReviewSearch isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyThumbs" children={() => <MyThumbs isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyThumbsSearch" children={() => <MyThumbsSearch isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MusicalDetail1" children={() => <MusicalDetail1 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId}/>} />
                <Stack.Screen name="MusicalDetail2" children={() => <MusicalDetail2 isCookie={isCookie} musicalId={musicalId} setMusicalId={setMusicalId} setMusicalPoster={setMusicalPoster} setMusicalTitle={setMusicalTitle} setReviewId={setReviewId}/>} />
                <Stack.Screen name="ReviewDetail1" children={() => <ReviewDetail1 isCookie={isCookie} reviewId={reviewId}/>} />
                <Stack.Screen name="ReviewUpdate1" children={() => <ReviewUpdate1 isCookie={isCookie} reviewInfo={reviewInfo} reviewInfo2={reviewInfo2} setGoToFeed={setGoToFeed}/>}/>

                <Stack.Screen name="MainSetting" children={() => <MainSetting setIsCookie={setIsCookie} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="MyAccount" children={() => <MyAccount isCookie={isCookie} setGoToFeed={setGoToFeed} memberId={memberId}/>} />
                <Stack.Screen name="PWChange" children={() => <PWChange isCookie={isCookie} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="PWReset" children={() => <PWReset isCookie={isCookie}/>} />
                <Stack.Screen name="Announcement" children={() => <Annoucement isCookie={isCookie} />} />
                <Stack.Screen name="AnnounceDetail" children={() => <AnnounceDetail isCookie={isCookie} />} />
                <Stack.Screen name="CSCenter" children={() => <CSCenter isCookie={isCookie} />} />
                <Stack.Screen name="ArtiqueInfo" children={() => <ArtiqueInfo isCookie={isCookie} />} />
                <Stack.Screen name="Terms" children={() => <Terms isCookie={isCookie} />} />
                <Stack.Screen name="Privacy" children={() => <Privacy isCookie={isCookie} />} />

                <Stack.Screen name="Feed1" children={() => <Feed1 isCookie={isCookie} memberId={memberId} setMusicalId={setMusicalId} setReviewId={setReviewId} setReviewInfo={setReviewInfo} setReviewInfo2={setReviewInfo2} setGoToFeed={setGoToFeed}/>} />
                <Stack.Screen name="Login2" children={() => <Login2 setGoToFeed={setGoToFeed} />} />
            </Stack.Navigator>
        )
    };

    const Tabs = () => {
        const nav = useNavigation();

        const [isCookie, setIsCookie] = useState(true);
        const [alertModalVisible, setAlertModalVisible] = useState(false);
        const [alertImage, setAlertImage] = useState(require('@images/x_red.png'));
        const [alertText, setAlertText] = useState('로그인이 필요한 서비스입니다.');

        useEffect(() => {
            const checkCookie = async () => {
                const cookieExists = await Cookies.ifLoginCookieExists();
                setIsCookie(cookieExists);
            };
            checkCookie();
        }, []);

        const handleAlert = () => {
            setAlertModalVisible(true);
            setTimeout(() => {
                setAlertModalVisible(false);
            }, 1000);
            setTimeout(() => {
                nav.navigate('Feed1');
            }, 1500);        
        }

        return (
            <>
            <AlertForm
                modalVisible={alertModalVisible}
                setModalVisible={setAlertModalVisible}
                borderColor="#F5F8F5"
                bgColor="#F5F8F5"
                image={alertImage}
                textColor="#191919"
                text={alertText}
            />

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
                        tabBarButton: (props) => {
                            if (!isCookie) {
                                return <TouchableOpacity {...props} onPress={() => {{handleAlert()}}} />;
                            } else {
                            return <TouchableOpacity {...props} />;
                            }
                        }
                    }}
                />
            </Tab.Navigator>
            </>
        )
    };

    return (        
        <NavigationContainer>
            {goToFeed ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation;