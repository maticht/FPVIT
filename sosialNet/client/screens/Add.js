import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import FooterTabsAdd from "../components/nav/FooterTabs/FooterTabsAdd";

export default function Add () {
    return(
        <View style={styles.homeContainer}>
            <View>
                <Text>Add Screen</Text>

            </View>
            <FooterTabsAdd/>
        </View>

    )};
const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },

});