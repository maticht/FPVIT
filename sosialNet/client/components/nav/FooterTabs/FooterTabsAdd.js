import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity, Image} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function FooterTabsAdd() {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View>
            <View style={styles.FootNav}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    screenName='Home'
                    routeName={route.name}
                >
                    <Image
                        source={require('../../../assets/footNavLogo/homeLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Search')}
                    screenName='Search'
                    routeName={route.name}
                >
                    <Image
                        source={require('../../../assets/footNavLogo/searchLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {navigation.navigate('Add');}}
                    screenName="Add"
                    routeName={route.name}
                >
                    <Image
                        source={require('../../../assets/footNavLogo/AAdd.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Account')}
                    screenName='Account'
                    routeName={route.name}
                >
                    <Image
                        source={require('../../../assets/footNavLogo/userLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    FootNav: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        borderTopWidth: 0.6,
        paddingVertical:12,
        borderColor:'#BDBDBD',
    },
    FootNavLogo: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
});