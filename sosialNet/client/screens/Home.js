import React, {useContext} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import {AuthContext} from "../context/auth";
import FooterTabHome from "../components/nav/FooterTabs/FooterTabHome";
import HeaderTabs from "../components/nav/HeaderTabs";


const Home = () => {
    const [state, setState] = useContext(AuthContext);
    // const name = JSON.stringify(state.user.name).replace(/"/g,'');
    // const email = JSON.stringify(state.user.email).replace(/"/g,'');


    return(
        <SafeAreaView style={styles.homeContainer}>
            <View style={styles.userContainer}>
                <View style={styles.headerContainer}>
                    {/*<Text style={styles.nameStyle}>{JSON.stringify(state.user.name).replace(/"/g,'')}</Text>*/}
                    <Text style={{justifyContent:'center',fontSize:25}}>Home</Text>
                    <HeaderTabs/>
                </View>
                <View>
                    {/*<Image source={require('../assets/footNavLogo/userLogo.png')}*/}
                    {/*       style={styles.FootNavLogo}/>*/}
                    <Text style={styles.emailStyle}>{JSON.stringify(state, null, 4).replace(/{|}|"|,|/gi,'')}</Text>
                </View>

            </View>
            <FooterTabHome/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        marginHorizontal:20
    },
    homeContainer: {
        flex:1,
        marginTop:50,
        justifyContent:'space-between',
    },
    emailStyle: {
      fontSize:15,
        fontWeight:'500'
    },
    FootNavLogo: {
        marginTop:25,
        width: 110,
        height: 110,
        resizeMode: 'contain'
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    nameStyle: {
        fontSize:20,
        fontWeight:'bold',


    }
});

export default Home;