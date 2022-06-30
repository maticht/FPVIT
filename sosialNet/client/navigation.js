import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from "./context/auth";
import ScreensNav from "./components/nav/ScreensNav";
import {PostProvider} from "./context/post";

export default function RootNavigation() {
    return(
        <NavigationContainer>
            <AuthProvider>
                <PostProvider>
                    <ScreensNav/>
                </PostProvider>
            </AuthProvider>
        </NavigationContainer>
    )
}