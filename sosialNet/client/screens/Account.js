import React, {useState, useContext, useEffect} from "react";
import {View, ScrollView, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {AuthContext} from "../context/auth";
import FooterTabsUser from "../components/nav/FooterTabs/FooterTabsUser";
import LogOutTab from "../components/nav/LogOutTab";
import {useNavigation, useRoute} from "@react-navigation/native";
import 'react-native-gesture-handler'
import {PostContext} from "../context/post";
import axios from "axios";
import dayjs from "dayjs";

export default function Account () {
    const [state, setState] = useContext(AuthContext);
    const [posts, setPosts] = useContext(PostContext);
    const navigation = useNavigation();
    const {name, email} = state.user;
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try{
                const {data} = await axios.get(`/user-profile/${state.user._id}`);
                setUserPosts(data.posts.reverse())
                // console.log('user profile data', data.posts)
            }catch (err){
                console.log(err)
            }
        };
        fetchUserProfile(state.user._id);
    }, []);

    const handleDelete = async (postId) => {
        try {
            const {data} = await axios.delete(`/post-delete/:${postId}`)
            setUserPosts((posts) => {
                const index = userPosts.findIndex((i) => i._id === postId);
                userPosts.splice(index,1);
                return [...posts]
            });
            setPosts((posts) => {
                const index = posts.findIndex((i) => i._id === postId);
                posts.splice(index,1);
                return [...posts]
            });
        }catch (err){
            console.log(err)
        }
    }

    return(
    <View style={styles.homeContainer}>
        <View style={styles.titleBar}>
            <Text style={styles.nameStyle}>{email}</Text>
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
                <Text style={styles.emailStyle}>{name}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateUser')}
                    style={styles.submitBtn}>
                    <Text style={styles.submitTxt}>Edit profile</Text>
                </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => handleDelete(post._id)}>
                                <Image
                                    source={require('../assets/footNavLogo/tresh.png')}
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
                                            <TouchableOpacity>
                                                <Image
                                                    source={require('../assets/footNavLogo/onLike.png')}
                                                    style={styles.likeBtn}
                                                />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity>
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
        color:'#000',
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
        paddingBottom:11,
        borderColor:'#D8D8D8',
    },
    mainInfoBlock: {
        marginTop: 20,
        paddingHorizontal: 16,
        marginBottom:11
    },
    mainUserInfoBlock: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginRight:10,
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

    followTxt: {
        fontWeight: '500',
        fontSize:15,
        color:'#fff'
    },




    userContainer: {
    },

    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
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