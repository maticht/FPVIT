import React, {useState, useContext} from "react";
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {AuthContext} from "../context/auth";
import FooterTabsUser from "../components/nav/FooterTabs/FooterTabsUser";
import LogOutTab from "../components/nav/LogOutTab";
import {useNavigation} from "@react-navigation/native";

import 'react-native-gesture-handler'

export default function Account () {
    const [state, setState] = useContext(AuthContext);
    const[image, setImage] = useState({
        url: '',
        public_id: '',
    });
    const navigation = useNavigation();
    const {name, email} = state.user;
    // console.log("ssssstatatattatatata",state)
    return(
    <View style={styles.homeContainer}>
        <View style={styles.titleBar}>
            <Text style={styles.nameStyle}>{name}</Text>
            <View style={styles.addMenu}>
                <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                    <Image
                        source={require('../assets/footNavLogo/addLogo.png')}
                        style={styles.FootNavLogo}
                    />
                </TouchableOpacity>
                <LogOutTab/>
            </View>
        </View>
        <ScrollView>
            <View style={styles.mainInfoBlock}>
                <View style={styles.mainUserInfoBlock}>
                    <View>
                        {state.user.image.url ? (
                            <Image
                                source={{uri: state.user.image.url}}
                                style={styles.userImgLogo}
                            />
                        ) : (
                            <Image
                                source={require('../assets/footNavLogo/LogoUser.png')}
                                style={styles.userImgLogo}
                            />
                        )}
                    </View>
                    <View style={styles.postsFollowers}>
                        <Text style={styles.postsFollowersNum}>123</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={styles.postsFollowers}>
                        <Text style={styles.postsFollowersNum}>123</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={styles.postsFollowers}>
                        <Text style={styles.postsFollowersNum}>123</Text>
                        <Text>Following</Text>
                    </View>
                </View>
                <Text style={styles.emailStyle}>{email}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateUser')}
                    style={styles.submitBtn}>
                    <Text

                        style={styles.submitTxt}
                    >Edit profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <FooterTabsUser/>
    </View>
)};

const styles = StyleSheet.create({
    submitBtn: {
        borderWidth: 0.9,
        height:32,
        borderColor:'#BABABA',
        marginTop:14,
        borderRadius:4,
        paddingHorizontal:17,
        alignItems: 'center',
        justifyContent:"center",
    },
    submitTxt: {
        fontWeight: '500',
        fontSize:15,
        color:'#000'
    },
    addMenu: {
        flexDirection: 'row',
        alignItems:'center',
    },
    titleBar: {
        alignItems:'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 0.6,
        paddingBottom:11,
        borderColor:'#D8D8D8',
    },
    mainInfoBlock: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    mainUserInfoBlock: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginRight:10
    },
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },
    FootNavLogo: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight:15,
    },
    userImgLogo: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
        marginBottom:3,
        borderRadius:50
    },
    postsFollowersNum: {
        fontSize:17,
        fontWeight:'700'
    },
    postsFollowers: {
        alignItems:'center'
    },
    nameStyle: {
        fontSize: 19,
        fontWeight:'bold'
    },
    emailStyle: {
        marginTop:7,
        fontSize: 14,
        fontWeight:'500'
    },

});