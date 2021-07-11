import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    USER_REGISTRED
} from "./types";
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("https://sharek-it-back.herokuapp.com/api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            saveItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const registerUser = (userData) => dispatch => {
    axios
        .post("https://sharek-it-back.herokuapp.com/api/users/register", userData)
        .then(res => {
            dispatch(userRegistred(res.data));
        })
        .catch(err => {
            console.log(err),
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
        }


        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
export const userRegistred = decoded => {
    return {
        type: USER_REGISTRED,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    try {
        AsyncStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

export const saveItem = async (item, selectedValue) => {
    try {
        await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

export const userLogout = async () => async dispatch => {
    try {
        await AsyncStorage.removeItem('jwtToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
}