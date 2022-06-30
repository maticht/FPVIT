import React, {useContext} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image} from "react-native";
import {AuthContext} from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogOutTab = () => {
    const [state, setState] = useContext(AuthContext);
    // console.log(state)
    const signOut = async () => {
        await setState({user: null, token:''});
        await AsyncStorage.removeItem("@auth");
    }
    return(
        <View style={styles.signOut}>
            <TouchableOpacity onPress={signOut}>
                <Image
                    source={require('../../assets/footNavLogo/burger.png')}
                    style={styles.signOutText}
                />
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    signOutText: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight:2,
        marginLeft:5
    },
});

export default LogOutTab;