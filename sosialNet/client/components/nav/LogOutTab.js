import React, {useContext} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image} from "react-native";
import {AuthContext} from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogOutTab = () => {
    const [state, setState] = useContext(AuthContext);
    const signOut = async () => {
        await setState({user: null, token:''});
        await AsyncStorage.removeItem("@auth");
    }
    return(
        <View>
            <TouchableOpacity onPress={signOut}>
                <Image
                    source={require('../../assets/footNavLogo/logOut.png')}
                    style={styles.signOutText}
                />
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    signOutText: {
        width: 33,
        height: 33,
        resizeMode: 'contain',
        marginRight:2,

    },
});

export default LogOutTab;