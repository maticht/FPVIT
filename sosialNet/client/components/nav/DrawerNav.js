// import React from "react";
// import { Button, View } from 'react-native';
// import {createDrawerNavigator} from "react-navigation-drawer";
// import Drawe from "../../screens/Drawe";
// import Account from "../../screens/Account";
// import { NavigationContainer } from '@react-navigation/native';
//
//
// function AccountScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button
//                 onPress={() => navigation.navigate('Account')}
//                 title="Go to notifications"
//             />
//         </View>
//     );
// }
//
// function DraweScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Button onPress={() => navigation.goBack('Drawe')} title="Go back home" />
//         </View>
//     );
// }
//
// const Drawer = createDrawerNavigator();
//
// const DrawerNav = () => {
//     return(
//     <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Account">
//             <Drawer.Screen name='Account' component={AccountScreen} />
//             <Drawer.Screen name='Drawe' component={DraweScreen} />
//         </Drawer.Navigator>
//     </NavigationContainer>
//     )
// };
// export default DrawerNav;
