import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import UserInput from "../components/auth/userInput";
import SubmitBtn from "../components/auth/SubmitBtn";
import SignLogo from '../components/auth/signLogo';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../context/auth";

const Signup = ({navigation}) => {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[loading,setLoading] = useState(false);
    const[state, setState] = useContext(AuthContext)

    const handleSubmit = async () => {
        setLoading(true);
        if(!name || !email || !password){
            alert('Enter data');
            setLoading(false);
            return;
        }
        setLoading(true)
        try {
            const {data} = await axios.post(`/reg`, {
                    name,
                    email,
                    password,
                });
            if(data.error){
                alert(data.error);
                setLoading(false);
            }else{
                setState(data);
                await AsyncStorage.setItem('@auth', JSON.stringify(data))
                setLoading(false);
                // console.log('SignUp response =>',data)
                // alert('Sign up successful');
                navigation.navigate('Home')
            }
        }catch (err) {
            console.log(err)
            setLoading(false);
        }
    }
    const getUser = async () => {
        await AsyncStorage.getItem("@auth");
    };
    getUser().then(r => {})

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
           <View>
               <View style={styles.signUpContainer}>
                   <SignLogo/>
               </View>
               <UserInput
                   name='name'
                   value={name}
                   setValue={setName}
                   autoCapitalize="words"
                   autoCorrect={false}
               />
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
                   title='Sign up'
                   handleSubmit={handleSubmit}
                   loading={loading}
               />
           </View>
            <View style={styles.signInContainer}>
                <Text style={styles.signInGreyText}>Already have an account? <Text
                    onPress={() => navigation.navigate('Signin')}
                    style={styles.signInText}>Log in</Text></Text>
            </View>
        </KeyboardAwareScrollView>

    )
}
const styles = StyleSheet.create({
    signInContainer: {
        zIndex:10,
        borderTopWidth: 1,
        paddingVertical:12,
        borderColor:'#D8D8D8',
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

export default Signup;