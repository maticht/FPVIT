import React, {useContext} from "react";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import Signin from "../../screens/Signin";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Add from "../../screens/Add";
import Account from "../../screens/Account";
import UpdateUser from "../../screens/UpdateUser";
import {AuthContext} from "../../context/auth";
import Profile from "../../screens/Profile";
import {Image, StyleSheet, TouchableOpacity} from "react-native";

const Stack = createNativeStackNavigator();
const ScreensNav = () => {
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
                    <Stack.Screen options={({route}) => ({title: route.params.email, headerShown: true,
                        headerRight: () => (
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/footNavLogo/treePoints.png')}
                                    style={styles.userImgLogo}
                                />
                            </TouchableOpacity>
                        )
                    })} name='Profile' component={Profile}/>
                </Stack.Group>
            }
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    userImgLogo: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    }
});
export default ScreensNav;