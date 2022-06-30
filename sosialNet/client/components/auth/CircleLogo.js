import React from "react";
import {StyleSheet, View, Image} from "react-native";

const CircleLogo = ({children}) => (
    <View>
        <View>
            {children ? (children) :
                (<Image
                    source={require('../../assets/footNavLogo/LogoUser.png')}
                    style={styles.userImgLogo}
                />)
            }
        </View>
    </View>
)
const styles = StyleSheet.create({
    userImgLogo: {
        width: 115,
        height: 115,
        resizeMode: 'contain',
        marginBottom:30
    },
});
export default CircleLogo;