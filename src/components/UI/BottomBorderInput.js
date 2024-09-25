import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import {theme} from "../../theme/theme";

export const BottomBorderInput = ({onChange, value = ''}) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={'Team name'}
            value={value}
            onChangeText={(text) => onChange(text)}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: theme.light,
        color: theme.light,
        padding: 5,
        fontSize: 18
    },
});
