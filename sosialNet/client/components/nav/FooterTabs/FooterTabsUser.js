import React, {useContext} from "react";
import {StyleSheet, View, TouchableOpacity, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../../context/auth";

export default function FooterTabsUser() {
    const [state, setState] = useContext(AuthContext);
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.FootNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image
                        source={require('../../../assets/footNavLogo/homeLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Image
                        source={require('../../../assets/footNavLogo/searchLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Add');}}>
                    <Image
                        source={require('../../../assets/footNavLogo/addLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                    <View style={styles.userLogo}>
                        {state.user.image.url ? (
                            <Image
                                source={{uri: state.user.image.url}}
                                style={styles.FootNavLogoUser}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/footNavLogo/LogoUser.png')}
                                style={styles.FootNavLogo}
                            />
                        )}
                    </View>
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
        borderColor:'#D8D8D8',
    },
    FootNavLogo: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    FootNavLogoUser: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        borderRadius:15,
    },
    userLogo: {
        width: 29,
        height: 29,
        borderRadius:15,
        borderWidth:2,
        borderColor:'#000',
    }
});