import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../../theme/theme";

export const CategoriesListItem = ({categoryData, activeId, onPress}) => {

    return (
        <TouchableOpacity
            onPress={() => onPress(categoryData.categoryId)}
        >
        <ImageBackground
            resizeMode="cover"
            source={categoryData.bgUrl}
            style={[
                styles.wrapper,
                {overflow: 'hidden'},
                {borderColor: categoryData.categoryId !== activeId ? theme.light : theme.green }
            ]}
        >
        </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 20,
        borderWidth: 6
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: theme.light,

    },

    textWrapper: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20
    }
})
