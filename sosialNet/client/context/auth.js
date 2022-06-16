import React, {useState,useEffect,createContext} from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API} from "../config";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [state, setState] = useState({
            user: null,
            token: '',
        });

    axios.defaults.baseURL = API;

    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            let data = await AsyncStorage.getItem('@auth');
            const as = JSON.parse(data);
            setState({user: as.user, token: as.token})
        }
    }, []);

    return <AuthContext.Provider value={[state, setState]}>
        {children}
    </AuthContext.Provider>;
}
export {AuthContext,AuthProvider};