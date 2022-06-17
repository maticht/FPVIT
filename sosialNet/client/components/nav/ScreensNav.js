import React, {useContext, useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Add from "../../screens/Add";
import Account from "../../screens/Account";
import {AuthContext} from "../../context/auth";

const Stack = createNativeStackNavigator();

const ScreensNav = () => {
    const [state, setState] = useContext(AuthContext);
    return(

        <Stack.Navigator initialRouteName='Signin' screenOptions={{headerShown: false}}>
                {state && state.token === "" && state.user === null ?
                    <Stack.Group>
                        <Stack.Screen name='Signin' component={Signin} />
                        <Stack.Screen name='Signup' component={Signup} />
                    </Stack.Group> :
                    <Stack.Group>
                        <Stack.Screen name='Home' component={Home}/>
                        <Stack.Screen name='Search' component={Search}/>
                        <Stack.Screen name='Add' component={Add}/>
                        <Stack.Screen name='Account' component={Account}/>
                    </Stack.Group>
                }
        </Stack.Navigator>
    )
};
export default ScreensNav;