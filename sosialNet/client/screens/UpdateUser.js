import React, {useState, useContext, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import UserInput from "../components/auth/userInput";
import SubmitBtn from "../components/auth/SubmitBtn";
import CircleLogo from '../components/auth/CircleLogo';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../context/auth";
import * as ImagePicker from 'expo-image-picker'

const UpdateUser = ({navigation}) => {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[role, setRole] = useState('');
    const[uploadImage, setUploadImage] = useState('');
    const[image, setImage] = useState({
        url: '',
        public_id: '',
    });
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const[state, setState] = useContext(AuthContext);

    useEffect(() => {
        if(state){
            const {name, email, role, image} = state.user;
            setName(name);
            setEmail(email);
            setRole(role);
            setImage(image);
        }
    }, [state])
    const handleSubmit = async () => {

        try {
            setLoading(true)
            const {data} = await axios.post(`/update-password`,{name, email, password});
            if(data.error) {
                setLoading(false)
                alert(data.error)
            }else{
                setName('')
                setEmail('')
                setPassword('')
                setLoading(false)
                alert('User has been updated')
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

    const handleUpload = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // console.log(permissionResult);
        if(permissionResult.granted === false){
        }
        let pikerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,4],
            base64: true,
        })
        if(pikerResult.cancelled === true){
            return;
        }
        let base64Images = `data:image/jpg;base64,${pikerResult.base64}`;
        setUploadImage(base64Images);
            const {data} = await axios.post('/upload-image',{
                image: base64Images,
            });
            console.log("UUUUUUploaded",data);
            const as = JSON.parse(await AsyncStorage.getItem('@auth'));
            as.user = data;
            await AsyncStorage.setItem('@auth', JSON.stringify(as));
            setState({...state, user: data});
            setImage(data.image)
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View>
                <View style={styles.signUpContainer}>
                    <CircleLogo>
                        {image && image.url ? (
                            <Image
                                source={{uri: image.url}}
                                style={styles.userImg}
                            />
                        ) : uploadImage ? (
                            <Image
                            source={{uri: uploadImage}}
                            style={styles.userImg}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => handleUpload()}>
                                <Image
                                    source={require('../assets/footNavLogo/LogoUser.png')}
                                    style={styles.userImgLogo}
                                />
                            </TouchableOpacity>
                        )}
                    </CircleLogo>
                    {image && image.url ? (
                        <TouchableOpacity onPress={() => handleUpload()}>
                            <Text style={styles.changeImgTxt}>Change profile photo</Text>
                        </TouchableOpacity>
                    ) : <></>}
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
                    autoCompleteType='password'
                    secureTextEntry={true}
                />
                <SubmitBtn
                    title='Update User'
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            </View>

        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    UpdateTxt : {
      alignItems: 'center',
      margin:10,
    },
    changeImgTxt: {
        marginTop: -14,
        marginBottom:20,
        fontSize:16,
        color:"#0080FF"
    },
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
    userImg: {
        width: 115,
        height: 115,
        borderRadius:100,
        resizeMode: 'contain',
        marginBottom:30
    },
    userImgLogo: {
        width: 115,
        height: 115,
        resizeMode: 'contain',
        marginBottom:30
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
        marginTop:30,
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default UpdateUser;