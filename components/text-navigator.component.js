import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';


const goHome = (navigation) => {
    navigation.navigate('Accueil')
}
function TextNavigator() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { goHome(navigation) }}>
            <Text style={[styles.subtext, { color: "#888888", marginTop: 10, textDecorationLine: "underline" }]}>Aller à la page d'accueil</Text>
        </TouchableOpacity>
    )
};


const styles = StyleSheet.create({
    subtext: {
        fontSize: 14,
        lineHeight: 21,
        color: '#262626',
        fontFamily: 'Lato_400Regular'
    },
});

export default TextNavigator;