import React, {useState} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import Home from "../../screens/Home";
import {AuthContext} from "../../context/auth";

const Stack = createNativeStackNavigator();

const ScreensNav = () => {
    const [state, setState] = useState(AuthContext);
    return(
        <Stack.Navigator initialRouteName='Signin' screenOptions={{headerShown: false}}>
                {state._currentValue[0].user === null ?
                    <Stack.Group>
            <Stack.Screen name='Signin' component={Signin} />
            <Stack.Screen name='Signup' component={Signup} />
                    </Stack.Group> :
            <Stack.Screen name='Home' component={Home}/>
                }
        </Stack.Navigator>

    )
};
export default ScreensNav;