import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import UserInput from "../components/auth/userInput";
import SubmitBtn from "../components/auth/SubmitBtn";
import SignLogo from '../components/auth/signLogo';
import {API} from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../context/auth";


const Signin = ({navigation}) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const[state, setState] = useContext(AuthContext)

    const handleSubmit = async () => {
        setLoading(true);
        if(!email || !password){
            alert('Enter data');
            setLoading(false);
            return;
        }
        setLoading(true)
        try {
            const {data} = await axios.post(`/log`, {
                email,
                password,
            });
            if(data.error){
                alert(data.error)
                setLoading(false);
            }else{
                setState(data);
                await AsyncStorage.setItem('@auth', JSON.stringify(data))
                setLoading(false);
                console.log('SignIn request =>',data)
                alert('Sign in successful');
                navigation.navigate('Home')
            }

        }catch (err) {
            console.log(err)
            setLoading(false);
        }
    }
    const label = async () => {
        await AsyncStorage.getItem("@auth");
    };
    label()

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View>
                <View style={styles.signUpContainer}>
                    <SignLogo/>
                </View>
                <UserInput
                    name='email'
                    value={email}
                    setValue={setEmail}
                    autoCompleteType='email'
                    keyboardType='email-address'
                />
                <UserInput
                    name='password'
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                    autoCompleteType='password'
                />
                <SubmitBtn
                    title='Log in'
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            </View>
            <View style={styles.signInContainer}>
                <Text style={styles.signInGreyText}>Don't have an account?
                    <Text
                    onPress={() => navigation.navigate('Signup')}
                    style={styles.signInText}> Sing up</Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    signInContainer: {
        zIndex:10,
        borderTopWidth: 1,
        paddingVertical:12,
        borderColor:'#BDBDBD',
        alignItems:'center',
    },
    signInText: {
        fontSize:12,
        color:"#0080FF"
    },
    signInGreyText: {
        fontSize:12,
        color:"#a8a8a8"
    },
    signUpContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginTop:120,
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default Signin;