import React from "react";
import {StyleSheet, View, Image} from "react-native";

const PostLogo = ({children}) => (
    <View>
        {children ? (children) :
            (<Image
                source={require('../../assets/footNavLogo/NanPost.png')}
                style={styles.userImg}
            />)
        }
    </View>
);

const styles = StyleSheet.create({
    userImg: {
        width: '100%',
        height:400,
        marginBottom:15,
    },
});
export default PostLogo;