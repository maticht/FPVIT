import React, {useState} from "react";
import {StyleSheet, View, TouchableOpacity, Image} from "react-native";

export default function FooterTabs() {
    return (
        <View>
            <View style={styles.FootNav}>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/footNavLogo/homeLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/footNavLogo/searchLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/footNavLogo/addLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/footNavLogo/userLogo.png')}
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
