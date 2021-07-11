import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Text, ActivityIndicator, useWindowDimensions } from 'react-native';
import Axios from 'axios';
import HTML from "react-native-render-html";
import { Layout } from '@ui-kitten/components';

function Post({ route, navigation }) {
    const { _id } = route.params;
    const [Post, setPost] = useState({ content: '<p><p/>' })
    const [Body, setBody] = useState('<p>...<p/>')
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        const resulta = () => {
            Axios.get(`https://sharek-it-back.herokuapp.com/api/Blog/getPost/` + _id)
                .then(({ data }) => {

                    setPost(data.post)
                    setLoading(false)
                }).catch(err => console.log(err))
        }
        resulta();
        setTimeout(() => {
            setBody(Post.content)
        }, 500);
    }, [Body])
    const { width } = useWindowDimensions();
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
                {!Loading ?
                    <ScrollView style={{ flex: 1 }} style={styles.content}>
                        <Text style={styles.title}> {Post.title}</Text>
                        <HTML
                            html={Body}
                            imagesMaxWidth={width - 100}
                            contentWidth={width - 100}
                            computeEmbeddedMaxWidth={width + 100}
                            style={{
                                padding: 5,
                            }}
                            ignoredStyles={['width']}
                        />
                    </ScrollView>
                    :
                    <ActivityIndicator color="#000000"></ActivityIndicator>
                }

            </View>
        </Layout>
    )
}
const styles = StyleSheet.create({
    title: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 'bold'

    },
    content: {
        padding: 10,
        flex: 1,
        backgroundColor: "transparent",
        borderRadius: 40,
    },
    container: {
        flex: 1,
        borderRadius: 50,
        marginTop: 150,
        marginBottom: 100,
        backgroundColor: "#f1c40f",
        width: "90%",
        paddingRight: '5%',
        paddingLeft: '5%',
        borderWidth: 0,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});
export default Post
