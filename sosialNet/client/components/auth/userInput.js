import React from 'react';
import {StyleSheet, Text, View, TextInput, } from "react-native";

const UserInput = ({
                       name,
                       value,
                       setValue,
                       autoCapitalize,
                       keyboardType = 'default',
                       secureTextEntry = false
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                style={styles.inputFld}
                value ={value}
                placeholder={name}
                onChangeText = {(text) => setValue(text)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    inputFld: {
        borderWidth: 1,
        height:48,
        borderColor:'#BDBDBD',
        marginBottom:14,
        borderRadius:5,
        paddingHorizontal:17,
        backgroundColor:'#ebebeb'
    },
    inputContainer: {
        marginHorizontal:28,
    },
});

export default UserInput;