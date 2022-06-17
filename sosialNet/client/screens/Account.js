import React, {useState, useContext} from "react";
import {View, ScrollView, Text, StyleSheet} from "react-native";
import {AuthContext} from "../context/auth";
import FooterTabsUser from "../components/nav/FooterTabs/FooterTabsUser";

export default function Account () {
    const [state, setState] = useContext(AuthContext);
    const {name, email} = state.user;
    return(

    <View style={styles.homeContainer}>
        <View>
            <View style={styles.titleBar}>
                <Text>Account</Text>
                <Text>{name}</Text>
                <Text>{email}</Text>
            </View>
        </View>
        <FooterTabsUser/>
    </View>

)};
const styles = StyleSheet.create({
    titleBar: {
        marginTop:10,
        marginLeft:15
    },
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },

});