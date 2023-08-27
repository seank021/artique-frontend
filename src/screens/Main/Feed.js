import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import * as Cookies from "@functions/cookie";

export default function Feed() {
    const [isCookie, setIsCookie] = useState(true);

    useEffect(() => {
        const checkCookie = async () => {
            const cookieExists = await Cookies.ifCookieExists();
            setIsCookie(cookieExists);
        };
        checkCookie();
    }, []);

    return (
        <View>
            {isCookie ? <View><Text>cookie exists</Text></View> 
            : <View><Text>no cookie</Text></View> }
        </View>
    )

}
