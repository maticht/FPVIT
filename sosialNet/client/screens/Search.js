import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import FooterTabsSearch from "../components/nav/FooterTabs/FooterTabsSearch";
import {useNavigation, useRoute} from "@react-navigation/native";
import axios from "axios";
import Search1 from "../components/Search1";
import {AuthContext} from "../context/auth";

export default function Search () {
    const [users, setUsers] = useContext(AuthContext);
    const [users1, setUsers1] = useState([]);
    const [value, setValue] = useState('');
    const navigation = useNavigation();
    const route = useRoute()
    useEffect(() => {
        const allUsers = async () => {
            try{
                const {data} = await axios.get(`/getAllUsers`);
                setUsers1(data.users)
                console.log(users)
            }catch (err){
                console.log(err)
            }
        };
        allUsers();
    }, []);
    const searched = (value) => (item) => {
        return item.email.toLowerCase().includes(value.toLowerCase())
    }

    return(
        <View style={styles.homeContainer}>
            <View style={styles.titleBar}>
                <Text style={styles.nameStyle}>All Users</Text>
            </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.inputFld}>
                        <Search1 value={value} setValue={setValue}/>
                    </TouchableOpacity>
                    {users1 && users1.filter(searched(value)).map((post) =>
                        <View key={post._id}>
                            <View style={styles.friendsContainer}>
                                <TouchableOpacity
                                    onPress={() => {users.user._id === post._id ?
                                        navigation.navigate('Account')
                                        :
                                        navigation.navigate('Profile', {
                                            email: post.email,
                                            _id: post._id
                                        })
                                    }}
                                >
                                <View style={styles.textImgContainer}>
                                    <View>
                                        {post?.image?.url ? (
                                            <Image
                                                source={{uri: post.image.url}}
                                                style={styles.userAvaImgPw}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../assets/footNavLogo/LogoUser.png')}
                                                style={styles.userAvaImgPw}
                                            />
                                        )}
                                    </View>
                                    <View>
                                        <Text style={styles.emailTxt}>{post.email}</Text>
                                        <Text style={styles.nameTxt}>{post.name}</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => alert('Added to imaginary friends')}
                                    style={styles.followBtn}>
                                    <Text style={styles.followTxt}>Follow</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={styles.searchContainer}>
                        <Text style={styles.searchText}>Adding friends is still</Text>
                        <View style={styles.three}>
                            <Text style={styles.searchText}>in development</Text>
                            <Image
                                source={require('../assets/loading.gif')}
                                style={styles.messageBtn}
                            />
                        </View>

                    </View>

                </ScrollView>
            <FooterTabsSearch/>

        </View>
    )};

const styles = StyleSheet.create({
    emailTxt: {
        fontWeight:'bold'
    },
    nameTxt: {
        color:'#9f9f9f'
    },
    followBtn:{
        height:32,
        backgroundColor: '#0080FF',
        borderRadius:4,
        paddingHorizontal:25,
        alignItems: 'center',
        justifyContent:"center",
    },

    followTxt: {
        fontWeight: '500',
        fontSize:15,
        color:'#fff'
    },
    titleBar: {
        alignItems:'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingLeft: 16,
        paddingRight: 12,
        borderBottomWidth: 0.6,
        paddingBottom:11,
        borderColor:'#D8D8D8',
    },
    nameStyle: {
        fontSize: 19,
        fontWeight:'bold'
    },
    textImgContainer: {
       flexDirection:'row'
    },
    friendsContainer: {
        marginTop:20,
        marginRight:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    userAvaImgPw: {
        width: 50,
        height: 50,
        borderRadius:30,
        resizeMode: 'contain',
        marginLeft:15,
        marginRight:10,
    },
    messageBtn: {
        width:25,
        height: 13,
        resizeMode: 'contain',
    },
    three: {
        flexDirection:'row',
        alignItems:'flex-end',
        marginBottom:10
    },
    searchText: {
      fontSize:17,
        color:'#666'
    },
    searchContainer: {
        marginTop:10,
        flex:2,
        flexWrap:'wrap',
        alignContent:"center",
      justifyContent:'center',
        alignItems:'center',
    },
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },

});