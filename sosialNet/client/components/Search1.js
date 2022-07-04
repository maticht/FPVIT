import React from "react";
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput} from "react-native";

const Search1 = ({value, setValue}) => {
    return(
        <View style={styles.searchBlok}>
            <Image
                source={require('../assets/footNavLogo/searchLogo.png')}
                style={styles.messageBtn}
            />
            <TextInput
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder='Search                                                                        '
            ></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBlok: {
        backgroundColor:'#dadada',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:1,
        marginHorizontal:12,
        marginTop:10,
        borderRadius:8,
        marginBottom:-2
    },
    messageBtn: {
        width:16,
        height: 16,
        marginHorizontal:15,
        resizeMode: 'contain',
    },
});
export default Search1;