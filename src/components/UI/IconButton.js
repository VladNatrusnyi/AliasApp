import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {theme} from "../../theme/theme";

export const IconButton = ({iconName = 'analytics', color = theme.orange, onPress, style, size = 42, sizeWrapper = 70}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.wrapper, style, {backgroundColor: color, width: sizeWrapper,
            height: sizeWrapper,}]}>
            <MaterialIcons name={iconName} size={size} color={theme.light} />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
})