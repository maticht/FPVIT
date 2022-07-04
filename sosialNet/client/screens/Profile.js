import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import {useRoute} from "@react-navigation/native";
import {AuthContext} from "../context/auth";
import {PostContext} from "../context/post";
import axios from "axios";
import dayjs from "dayjs";

const Profile = ({navigation}) => {
    const [auth, setAuth] = useContext(AuthContext);
    const [post, setPost] = useContext(PostContext);
    const [userPosts, setUserPosts] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const route = useRoute()
    const routeParamsId = route?.params?._id
    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            try{
                const {data} = await axios.get(`/user-profile/${routeParamsId}`);
                setUserPosts(data.posts.reverse())
                setUserProfile(data.profile)
                console.log('user profile data', data.profile)
            }catch (err){
                console.log(err)
            }
        };
        routeParamsId ? fetchUserProfile(routeParamsId) : fetchUserProfile(auth.user._id);
    }, []);

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <View style={styles.mainInfoBlock}>
                    <View style={styles.mainUserInfoBlock}>
                        <View>
                            {userProfile?.image?.url ? (
                                <Image
                                    source={{uri: userProfile?.image?.url}}
                                    style={styles.userImgLog}
                                />
                            ) : (
                                <Image
                                    source={require('../assets/footNavLogo/LogoUser.png')}
                                    style={styles.userImgLog}
                                />
                            )}
                        </View>
                        <View style={styles.postsFollowers}>
                            <Text style={styles.postsFollowersNum}>{userPosts.length}</Text>
                            <Text>Posts</Text>
                        </View>
                        <View style={styles.postsFollowers}>
                            <Text style={styles.postsFollowersNum}>0</Text>
                            <Text>Followers</Text>
                        </View>
                        <View style={styles.postsFollowers}>
                            <Text style={styles.postsFollowersNum}>0</Text>
                            <Text>Following</Text>
                        </View>
                    </View>
                    <Text style={styles.emailStyle}>{userProfile.name}</Text>
                    <View style={styles.sameUserBtn}>
                        <TouchableOpacity
                            onPress={() => alert('Added to imaginary friends')}
                            style={styles.followBtn}>
                            <Text style={styles.followTxt}>Follow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitBtn}>
                            <Text style={styles.submitTxt}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {userPosts && userPosts.map((post) =>
                    <View key={post._id}>
                        <View style={styles.postBlock}>
                            <View style={styles.undrPostBtn}>
                                <View style={styles.userPostInfoBlock}>
                                    {post.postedBy.image.url ? (
                                        <Image
                                            source={{uri: post.postedBy.image.url}}
                                            style={styles.userAvaImgPw}
                                        />
                                    ) : (
                                        <Image
                                            source={require('../assets/footNavLogo/LogoUser.png')}
                                            style={styles.userAvaImgPw}
                                        />
                                    )}
                                    <Text style={styles.userPostEmail}>{post.postedBy.email}</Text>
                                </View>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../assets/footNavLogo/treePoints.png')}
                                        style={styles.treshBtn}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Image
                                source={{uri: post.image.url}}
                                style={styles.userImgPw}
                            />
                            <View style={styles.postInfoBlock}>
                                <View>
                                    <View style={styles.undrPost}>
                                        <View style={styles.undrPostBtn}>
                                            {userPosts?.likes?.includes(auth?.user?._id) ? (
                                                <TouchableOpacity onPress={() => handleUnLike(post)}>
                                                    <Image
                                                        source={require('../assets/footNavLogo/onLike.png')}
                                                        style={styles.likeBtn}
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={() => handleLike(post)}>
                                                    <Image
                                                        source={require('../assets/footNavLogo/offLike.png')}
                                                        style={styles.likeBtn}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity>
                                                <Image
                                                    source={require('../assets/footNavLogo/comment.png')}
                                                    style={styles.like1Btn}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Image
                                                    source={require('../assets/footNavLogo/send.png')}
                                                    style={styles.like1Btn}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('../assets/footNavLogo/arhive.png')}
                                                style={styles.like2Btn}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.userPostEmail}>{post.likes.length} likes</Text>
                                </View>
                                <View style={styles.postTextInfoBlock}>
                                    <Text style={styles.userPostEmail}>{post.postedBy.email}</Text>
                                    <Text style={styles.userPostText}>{post.title}</Text>
                                </View>
                                <Text style={styles.postDate}>{dayjs(post.createdAt).format('MMM D / HH:mm')}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    sameUserBtn: {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    userImgLog: {
        width: 85,
        height: 85,
        resizeMode: 'contain',
        marginBottom:3,
        borderRadius:50
    },
    followBtn:{
        height:32,
        width:'49%',
        backgroundColor: '#0080FF',
        marginTop:14,
        borderRadius:4,
        paddingHorizontal:14,
        marginRight:10,
        alignItems: 'center',
        justifyContent:"center",
    },
    submitBtn: {
        borderWidth: 0.9,
        height:32,
        width:'49%',
        borderColor:'#BABABA',
        marginTop:14,
        borderRadius:4,
        paddingHorizontal:17,
        alignItems: 'center',
        justifyContent:"center",
    },
    followTxt: {
        fontWeight: '500',
        fontSize:15,
        color:'#fff'
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
        paddingLeft: 16,
        paddingRight: 12,
        borderBottomWidth: 0.6,
        borderColor:'#D8D8D8',
    },
    mainInfoBlock: {
        marginTop: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 0.6,
        paddingBottom:11,
        borderColor:'#D8D8D8',
    },
    mainUserInfoBlock: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginRight:10
    },
    FootNavLogo: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight:15,
    },
    postsFollowersNum: {
        fontSize:17,
        fontWeight:'700'
    },
    postsFollowers: {
        alignItems:'center'
    },
    userContainer: {
    },
    homeContainer: {
        flex:1,
        marginTop:45,
    },
    emailStyle: {
        fontSize:15,
        fontWeight:'500'
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    nameStyle: {
        fontSize:20,
        fontWeight:'bold',
    },
    userImgLogo: {
        width: 115,
        height: 48,
        resizeMode: 'contain',
        marginLeft:12
    },
    undrPostBtn: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    undrPost: {
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userPostInfoBlock: {
        flexDirection:"row",
        alignItems:'center',
        marginBottom:10,
    },
    postTextInfoBlock: {
        flexDirection:"row",
        alignItems:'center',
    },
    userPostEmail: {
        fontWeight:'700'
    },
    userImgPw: {
        width: '100%',
        height:400,
        marginBottom:10,
    },
    userPostText: {
        marginLeft:5
    },
    userAvaImgPw: {
        width: 26,
        height: 26,
        borderRadius:15,
        resizeMode: 'contain',
        marginLeft:15,
        marginRight:10,
    },
    likeBtn: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
        marginBottom:6,

    },
    messageBtn: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
        marginRight:10,
    },
    like1Btn: {
        width: 23,
        height: 23,
        resizeMode: 'contain',
        marginBottom:6,
        marginLeft: 22
    },
    like2Btn: {
        width: 19,
        height: 22,
        resizeMode: 'contain',
        marginBottom:6,
        marginRight: 14
    },
    treshBtn: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
        marginRight:12
    },
    postInfoBlock: {
        marginLeft:15,
        marginBottom:12
    },
    postBlock: {
        borderTopWidth: 0.6,
        borderColor:'#D8D8D8',
        paddingTop:10,
    },
    postDate:{
        fontSize:13,
        marginTop:5,
        color: '#9d9d9d'
    },
});
export default Profile;