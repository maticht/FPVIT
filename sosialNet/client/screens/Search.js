import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import FooterTabsSearch from "../components/nav/FooterTabs/FooterTabsSearch";

export default function Search () {
    return(
        <View style={styles.homeContainer}>
            <View>
                <Text>Search Screen</Text>

            </View>
            <FooterTabsSearch/>
        </View>

    )};
const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },

});