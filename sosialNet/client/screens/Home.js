import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import FooterTabHome from "../components/nav/FooterTabs/FooterTabHome";
import {PostContext} from "../context/post";
import {AuthContext} from "../context/auth";
import axios from "axios";
import dayjs from 'dayjs'
let a = 3
const Home = () => {
    const [users, setUsers] = useContext(AuthContext);
    const [posts, setPosts] = useContext(PostContext);
    const [saved, setSaved] = useState(3);


    useEffect(() => {
        viewPosts()
    }, []);

    const viewPosts = async () => {
        const {data} = await axios.get('/');
        setPosts(data.reverse())
        console.log('eqweqeqeqeqe213121111',data)
    }
    const save = () => {
        a++
        setSaved(a)
    }
    const handleLike = async (post) => {
        // console.log('like click', post._id)
        const {data} = await axios.put('/like', {ObjectId: post._id});
        setPosts((posts) => {
            const index = posts.findIndex((l) => l._id === post._id);
            posts[index] = data;
            return[...posts]
        })
    }


    return(
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/Instagram_logo.svg.png')}
                    style={styles.userImgLogo}
                />
                <TouchableOpacity>
                    <Image
                        source={require('../assets/footNavLogo/message.png')}
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
                                <View style={styles.userPostInfoBlock}>
                                    <Image
                                        source={{uri: post.postedBy.image.url}}
                                        style={styles.userAvaImgPw}
                                    />
                                    <Text style={styles.userPostEmail}>{post.postedBy.email}</Text>
                                </View>
                                <TouchableOpacity>
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
                                            <TouchableOpacity onPress={() => handleLike(post)}>
                                                <Image
                                                    source={require('../assets/footNavLogo/offLike.png')}
                                                    style={styles.likeBtn}
                                                />
                                            </TouchableOpacity>
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
                                        <TouchableOpacity onPress={() => save()}>
                                            {saved % 2 === 1 ?
                                                (<Image
                                                    source={require('../assets/footNavLogo/arhive.png')}
                                                    style={styles.like2Btn}
                                                />) : (<Image
                                                    source={require('../assets/footNavLogo/saved.png')}
                                                    style={styles.like2Btn}
                                                />)
                                            }

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
        width: 28,
        height: 28,
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
    }
});

export default Home;