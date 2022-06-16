import React, {useContext} from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";
import {AuthContext} from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderTabs = ({navigation}) => {
    const [state, setState] = useContext(AuthContext);
    console.log(state)
    const signOut = async () => {
        setState({user: null, token:''});
        await AsyncStorage.removeItem("@auth");
        navigation.navigate('Signin')
    }

    return(
        <View style={styles.signOut}>
            <TouchableOpacity onPress={signOut}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    signOut: {
    },
});

export default HeaderTabs;