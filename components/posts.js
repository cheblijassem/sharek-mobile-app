import React, { useState, useEffect } from 'react'
import {
    ActivityIndicator,
    StyleSheet, View, TouchableOpacity, FlatList
} from 'react-native';
import axios from 'axios';
import Moment from 'moment';

import { ListItem, Icon, Text, Layout } from '@ui-kitten/components';

const renderItemIcon = (props) => (
    <Icon {...props} name='bookmark' tintColor="#F1C40F" />
);

function posts({ navigation }) {
    const [Posts, setPosts] = useState([])
    const [Loading, setLoading] = useState(true)

    const resulta = () => {
        setLoading(true);
        axios.get('https://sharek-it-back.herokuapp.com/api/Blog/getBlogs')
            .then(({ data }) => {

                setPosts(data.result)
                setLoading(false)
            }).catch(err => console.log(err))

    }

    useEffect(() => {
        resulta()
    }, [])


    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <View style={globalStyles.container}>




                <View style={{ position: "absolute", top: '10%', left: 75, height: 50, width: 50, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }}>

                </View>
                <View style={{ position: "absolute", top: '10%', left: 75, height: 60, width: 60, borderRadius: 400, zIndex: -4, backgroundColor: '#4d4d4d' }} />
                <View style={{ position: "absolute", bottom: '10%', left: -75, height: 160, width: 160, borderRadius: 400, zIndex: -4, backgroundColor: '#262626' }} />
                <View style={{ position: "absolute", bottom: 140, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#4d4d4d', transform: [{ skewY: "45deg" }] }} />
                <View style={{ position: "absolute", bottom: 0, right: -100, height: 100, width: 150, borderRadius: 5, zIndex: -3, backgroundColor: '#262626', transform: [{ skewY: "45deg" }] }} />
                <View style={{ position: "absolute", top: 0, left: -200, height: 200, width: 300, borderRadius: 50, zIndex: -3, backgroundColor: 'orange', transform: [{ skewY: "45deg" }] }} />
                {!Loading ? <FlatList data={Posts} style={{ paddingTop: 10 }} keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ paddingBottom: 10, marginLeft: 5, marginRight: 5 }}>

                            <ListItem style={globalStyles.item}
                                title={evaProps => <Text {...evaProps} style={{ color: "#262626", fontFamily: 'Lato_400Regular' }}>{`${item.title}`}</Text>}
                                description={evaProps => <Text {...evaProps} style={{ color: "#888888", fontFamily: 'Lato_400Regular' }} >{Moment(item.createdAt).format('d MMM')}</Text>}
                                accessoryLeft={renderItemIcon} onPress={() => navigation.navigate('Article', item)}
                            />
                        </TouchableOpacity>
                    )}
                />
                    :
                    <ActivityIndicator color="#000000"></ActivityIndicator>
                }
            </View>
        </Layout>
    );
}
export default posts

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        overflow: "hidden"
    },
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    }
});
const globalStyles = StyleSheet.create({
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    container: {
        flex: 1,
        borderRadius: 50,
        marginTop: 150,
        marginBottom: 100,
        backgroundColor: "#f1c40f",
        width: "100%",
        padding: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 10,
    },
    item: {
        borderRadius: 40,
        margin: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 10,
        fontSize: 15,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
});
