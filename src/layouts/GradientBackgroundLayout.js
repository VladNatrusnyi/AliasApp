import React from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {theme} from "../theme/theme";

export const GradientBackgroundLayout = ({ children }) => {
    return (
        <LinearGradient
            colors={[theme.gradient.color1, theme.gradient.color2]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <SafeAreaView style={styles.content}>
                <View style={{flex: 1, padding: 20}}>
                    {children}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    }
});

