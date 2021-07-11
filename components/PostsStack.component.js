
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from './posts'
import Post from './Post'

const Stack = createStackNavigator();

function PostsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Articles" component={Posts} options={
                {
                    headerStyle: {
                        height: 180
                    },
                    headerTransparent: true,
                    headerTitleStyle: {
                        fontSize: 20,
                        lineHeight: 21,
                        color: '#262626',
                        fontFamily: 'Lato_400Regular'
                    },
                }
            } />
            <Stack.Screen name="Article"
                component={Post}
                options={({ route }) => ({ title: route.params.title }), {
                    headerStyle: {
                        height: 180
                    },
                    headerTransparent: true,
                    headerTitleStyle: {
                        fontSize: 20,
                        lineHeight: 21,
                        color: '#262626',
                        fontFamily: 'Lato_400Regular'
                    },
                }}
            />
        </Stack.Navigator>
    );
}
export default PostsStack;
