import React, {useContext, useState} from "react";
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image} from "react-native";
import FooterTabsAdd from "../components/nav/FooterTabs/FooterTabsAdd";
import SubmitBtn from "../components/auth/SubmitBtn";
import PostLogo from "../components/auth/PostLogo";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {PostContext} from "../context/post";

const Add = ({navigation}) => {
    const[posts, setPosts] = useContext(PostContext);
    const[title, setTitle] = useState('');
    const[loading, setLoading] = useState(false);
    const[uploadI, setUploadI] = useState('');
    const[image, setImage] = useState({
        url: '',
        public_id: '',
    });
    const handleChange = async (text) => {
        try{
            setLoading(true);
            setTitle(text);
            setLoading(false);
        }catch (err){
            console.log(err)
            setLoading(false);
        }
    }
    const upload = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(permissionResult.granted === false){
        }
        let pikerR = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,4],
            base64: true,
        });
        if(pikerR.cancelled === true){
            return;
        }
        let base64Images = `data:image/jpg;base64,${pikerR.base64}`;
        setUploadI(base64Images);
    };
    const handleSubmit = async () => {
        if (!image){
            alert('Please add a photo')
        }
        setLoading(true);
            const {data} = await axios.post('/create',{
                image: uploadI,
                title
            });
        try {;
            setPosts([data,  ...posts]);
            setLoading(false);
            setTimeout(() => {
                alert('sucсess post');
                navigation.navigate('Home');
            }, 50);
        }catch (err){
            console.log(err);
        }
    }
    return(
        <View style={styles.homeContainer}>
            <View  style={styles.titleBar}>
                <Text style={styles.PostText}>New Post</Text>
            </View>
            <ScrollView>
                <View>
                    <PostLogo>
                        {image && image.url ? (
                            <Image
                                source={{uri: image.url}}
                                style={styles.userImg}
                            />
                        ) : uploadI ? (
                            <Image
                                source={{uri: uploadI}}
                                style={styles.userImg}
                            />
                        ) : (
                            <Image
                                source={require('../assets/footNavLogo/NanPostLight.png')}
                                style={styles.userImg}
                            />
                        )}
                    </PostLogo>
                    <View style={styles.addPostContainer}>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity
                                onPress={() => upload()}
                                style={styles.galleryBtnBlock}
                            >
                                <Text style={styles.galleryBtnTxt}>Gallery ▼</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Write a caption...'
                                value={title}
                                setValue={setTitle}
                                onChangeText={(text) => handleChange(text)}
                                autoCorrect={false}
                                style={styles.inputFld}
                            />
                        </View>
                    </View>
                    <SubmitBtn
                        title='Post'
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </View>
            </ScrollView>
            <FooterTabsAdd/>
        </View>
    )};

const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },
    titleBar: {
        alignItems:'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 16,
        paddingBottom:11
    },
    PostText: {
        fontSize:19,
        fontWeight: 'bold'
    },
    inputFld: {
        marginTop:10,
        height:28,
        marginBottom:5,
    },
    inputContainer: {
        marginHorizontal:16,
    },
    addPostContainer: {
        borderBottomWidth: 0.8,
        borderColor:'#D8D8D8',
        marginBottom: 15
    },
    galleryBtnTxt: {
        fontSize: 16,
        fontWeight:'500'
    },
    galleryBtnBlock: {
    },
    userImg: {
        width: '100%',
        height:400,
        marginBottom:15,
    },

});
export default Add;