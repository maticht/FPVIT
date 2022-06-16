import React from "react";
import {StyleSheet, View, Image} from "react-native";

const SignLogo = () => (
        <View>
            <Image
                source={require('../../assets/Instagram_logo.svg.png')}
                style={styles.signUpLogo}
            />
        </View>
    )
const styles = StyleSheet.create({
    signUpLogo: {
        width: 220,
        height: 70,
        resizeMode: 'contain',
        marginBottom:15
    },
});
export default SignLogo


