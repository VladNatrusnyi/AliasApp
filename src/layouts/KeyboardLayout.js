import {KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet} from "react-native";
import React from "react";

export const KeyboardLayout = ({children}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboard}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.wrapper}>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboard : {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    wrapper: {
        flex: 1,
    },
});