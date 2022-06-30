import React, {useContext, useState} from "react";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "react-navigation-drawer";
import { NavigationContainer } from '@react-navigation/native';
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Add from "../../screens/Add";
import Account from "../../screens/Account";
import Drawe from "../../screens/Drawe";
import UpdateUser from "../../screens/UpdateUser";
import {AuthContext} from "../../context/auth";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";



const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
//
// function DrawerRoutes(){
//     return(
//         <Drawer.Navigator initialRouteName="Account">
//             <Drawer.Screen name='Account' component={Account} />
//             <Drawer.Screen name='Drawe' component={Drawe} />
//         </Drawer.Navigator>
//         )
// }



const ScreensNav = () => {
    const navigation = useNavigation();
    const [state, setState] = useContext(AuthContext);

    return(
            <Stack.Navigator initialRouteName='Signin' screenOptions={{headerShown: false}}>
                {state.token === "" && state.user === null ?
                    <Stack.Group>
                        <Stack.Screen name='Signin' component={Signin}
                        />
                        <Stack.Screen name='Signup' component={Signup} />
                    </Stack.Group> :
                    <Stack.Group>
                        <Stack.Screen name='Home' component={Home}/>
                        <Stack.Screen name='Search' component={Search}/>
                        <Stack.Screen name='Add' component={Add}/>
                        <Stack.Screen name='Account' component={Account}/>
                        <Stack.Screen options={{headerShown: true, title: 'Edit profile',}} name='UpdateUser' component={UpdateUser}/>
                    </Stack.Group>
                }
            </Stack.Navigator>
    )
};
export default ScreensNav;

const styles = StyleSheet.create({
    UpdateTxt: {
        fontSize:15,
        fontWeight:'500',
        color:"#0080FF",
    }

});