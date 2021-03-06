import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import FooterTabHome from "../components/nav/FooterTabs/FooterTabHome";
import {PostContext} from "../context/post";
import {AuthContext} from "../context/auth";
import axios from "axios";
import dayjs from 'dayjs';
import {useNavigation} from "@react-navigation/native";
import Search from "../components/Search1";

const Home = () => {
    const [users, setUsers] = useContext(AuthContext);
    const [posts, setPosts] = useContext(PostContext);
    const[load, setLoad] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        viewPosts()
    }, []);
    const viewPosts = async () => {
        const {data} = await axios.get('/');
        setPosts(data.reverse())
        setLoad(false);
    }

    const handleLike = async (post) => {
        const {data} = await axios.put('/like', {postId: post._id});
        setPosts((posts) => {
            const index = posts.findIndex((p) => p._id === post._id);
            posts[index] = data;
            return[...posts];
        });
    };

    const handleUnLike = async (post) => {
        const {data} = await axios.put('/unlike', {postId: post._id});
        setPosts((posts) => {
            const index = posts.findIndex((p) => p._id === post._id);
            posts[index] = data;
            return[...posts]
        })
    };

        if(load){
            return (
                <View style={styles.loadContainer}>
                    <Image
                        source={require('../assets/footNavLogo/instagram-2016-6.png')}
                        style={styles.loadInst}
                    />
                    <View style={styles.loadCont}>
                        <Text style={{color:'#666', marginBottom:-20}}>from</Text>
                        <Image
                            source={require('../assets/footNavLogo/meta-logoeps.com_-768x768.png')}
                            style={styles.loadMeta}
                        />
                    </View>
                </View>
            )
        }

    return(
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/Instagram_logo.svg.png')}
                    style={styles.userImgLogo}
                />
                <TouchableOpacity style={styles.inputFld}>
                    <Image
                        source={require('../assets/footNavLogo/messg.png')}
                        style={styles.messageBtn}
                    />
                </TouchableOpacity>

            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.userContainer}>
                {posts && posts.map((post) =>
                    <View key={post._id}>
                        <View style={styles.postBlock}>
                            <View style={styles.undrPostBtn}>
                                <TouchableOpacity onPress={() => {
                                    {users?.user?._id === post.postedBy._id ?
                                        navigation.navigate('Account')
                                         :
                                        navigation.navigate('Profile', {
                                            email: post.postedBy?.email,
                                            _id: post.postedBy?._id
                                        })
                                    }
                                }}>
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
                                </TouchableOpacity>
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
                                            {post?.likes?.includes(users?.user?._id) ? (
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
            <View>
                <FooterTabHome/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        marginLeft:10,
        marginRight:5,
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
    },
    loadInst: {
        justifyContent:'center',
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    loadMeta: {
        justifyContent:'center',
        width: 100,
        height: 80,
        resizeMode: 'contain',
    },
    loadContainer: {
        marginTop:320,
        marginBottom:30,
        flex:1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    loadCont: {
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:-35,
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
        width: 30,
        height: 30,

        resizeMode: 'contain',
        marginRight:10,
        marginLeft:100,
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
    inputFld: {
        flexDirection:'row'
    }
});

export default Home;