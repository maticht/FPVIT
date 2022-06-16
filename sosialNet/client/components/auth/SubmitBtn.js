import React from "react";
import {StyleSheet, Text,TouchableOpacity} from "react-native";

const SubmitBtn = ({title, handleSubmit, loading}) => (
        <TouchableOpacity
            onPress={handleSubmit}
            style={styles.submitBtn}>
            <Text style={styles.submitTxt}>{loading ? 'Please wait...' : title}</Text>
        </TouchableOpacity>
)

const styles = StyleSheet.create({
    submitBtn: {
        alignItems: 'center',
        backgroundColor: '#0080FF',
        height:48,
        justifyContent:"center",
        marginHorizontal:28,
        marginBottom:20,
        borderRadius:5

    },
    submitTxt: {
        fontWeight: '500',
        fontSize:15,
        color:'#fff'
    },
});
export default SubmitBtn