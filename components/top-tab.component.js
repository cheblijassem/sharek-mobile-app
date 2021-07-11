import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import { Modal, Button, Layout, Text, Icon, OverflowMenu, TopNavigation, TopNavigationAction, MenuItem } from '@ui-kitten/components';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/authActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';



const LogoutIcon = (props) => (

    <Icon {...props} name='log-out' style={{ width: 25, height: 25, tintColor: "#262626" }} />


);
const MenuIcon = (props) => (
    <View style={styles.controlContainer}>
        <Icon {...props} name='more-vertical' style={{ width: 25, height: 25, tintColor: "#262626" }} />
    </View>
);
const message = (props) => (
    <Icon {...props} name='message-square' />
);

function TopTab(props) {

    const navigation = useNavigation();

    const Profile = () => (
        <View style={styles.pinProfile}>
            <Image source={{
                uri: 'https://ui-avatars.com/api/?background=f6bf15&color=262626&name=com_agent',
            }}
                style={{
                    height: 35,
                    width: 35,
                    zIndex: 1,
                    borderRadius: 50,
                }}
                resizeMode="contain"
                resizeMethod="resize" />
        </View>
    )

    /* const Contact2 = () => (
        <Button
            style={{
                position: 'absolute', padding: 30, top: 5, right: -20, borderRadius: 50, backgroundColor: '#262626', zIndex: 1000, borderWidth: 0, shadowColor: "#000",
                marginRight: 10,
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.51,
                shadowRadius: 13.16,
                elevation: 20,
            }
            } size='tiny' status='control' accessoryRight={message} onPress={toggleModal}
        >
            {evaProps => < Text {...evaProps} style={styles.tawk} > Contactez nous</Text >}
        </Button >
    ) */
    const Contact = () => (
        <View style={props.title === 'Mon espace' && !isAuthenticated ? styles.pinWhite : styles.pin}>
            <Text style={styles.tawk} > Contactez nous</Text >
            <Icon {...props} name='message-square' style={{ width: 25, height: 25, tintColor: "#262626" }} />
        </View>
    )
    const Login = () => (
        <View style={styles.pin}>
            <Text style={styles.tawk} >Login</Text >
            <Icon {...props} name='log-in' style={{ width: 25, height: 25, tintColor: "#262626" }} />
        </View>
    )


    useEffect(() => {
        setIsAuthenticated(props.auth.isAuthenticated)
    });
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [visible, setVisible] = React.useState(false);


    const onLogout = () => {
        props.logoutUser();
        authenicationUpdate(false)

    };

    const toggleModal = () => {
        setVisible(!visible);
    };
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const authenicationUpdate = (status) => {
        setMenuVisible(status);
    };
    const openLog = () => {
        navigation.navigate('Mon espace')
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={Profile} onPress={toggleMenu} />
    );

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={Contact} onPress={toggleModal} />

            {!(isAuthenticated) && (props.title !== 'Mon espace') &&
                <TopNavigationAction icon={Login} onPress={openLog} />
            }
            {(isAuthenticated) &&
                <OverflowMenu
                    anchor={renderMenuAction}
                    visible={menuVisible}
                    onBackdropPress={toggleMenu}
                    style={{ marginTop: 30, borderRadius: 50 }}>
                    <MenuItem accessoryLeft={LogoutIcon} onPress={onLogout} style={{ backgroundColor: "#f1c40f", borderRadius: 50 }} title={evaProps => <Text {...evaProps} style={styles.subtext}>Logout</Text>} />
                </OverflowMenu>
            }
        </React.Fragment>
    );


    return (
        <>
            <Layout style={styles.topbar} level='1'>
                <TopNavigation style={{ backgroundColor: "rgba(0,0,0,0)" }}
                    title={evaProps => <Text {...evaProps} style={styles.text}>{props.title}</Text>}
                    accessoryRight={renderRightActions}
                />
            </Layout>
            <Modal scrollable={false}
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={toggleModal}
                style={{ width: "95%", borderRadius: 30, height: '85%', overflow: 'hidden' }} scrollable={false}>
                <Button onPress={toggleModal} style={{ position: 'absolute', right: 11, top: 12.5, backgroundColor: "transparent", borderWidth: 0, zIndex: 100 }}>
                    <Icon name='close' style={{ width: 20, height: 20, tintColor: '#262626', fontSize: 12, margin: 0, padding: 0 }} />
                </Button>
                <WebView source={{ uri: 'http://sharek-it.byethost31.com/' }} style={{ opacity: 0.99 }} />
            </Modal>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0, left: 0, flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        minHeight: 80,
        maxHeight: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    topbar: {
        position: "absolute",
        top: 0, left: 0, flex: 1,
        width: '100%',
        paddingTop: 25,
        minHeight: 80,
        maxHeight: 80,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0)'
    },
    text: {
        fontSize: 20,
        lineHeight: 21,
        color: '#262626',
        fontFamily: 'Lato_400Regular'
    },
    subtext: {
        fontSize: 14,
        lineHeight: 21,
        color: '#262626',
        fontFamily: 'Lato_400Regular'
    },
    controlContainer: {
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#f1c40f',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    tawk: {
        fontSize: 12,
        color: "#262626",
        textAlign: "center",
        fontFamily: 'Lato_400Regular'
    },
    pin: {
        backgroundColor: "#f1c40f", borderRadius: 50,
        padding: 5,
        flexDirection: 'row',
        alignItems: "center",
        /* borderColor: "262626",
        borderWidth: 1.5 */shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    pinWhite: {
        backgroundColor: "#f6f6f6", borderRadius: 50,
        padding: 5,
        flexDirection: 'row',
        alignItems: "center",
        /* borderColor: "262626",
        borderWidth: 1.5 */
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    pinProfile: {
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    }
});

TopTab.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(TopTab);