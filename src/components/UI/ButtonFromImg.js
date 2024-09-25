import {Image, StyleSheet, TouchableOpacity} from "react-native";

export const ButtonFromImg = ({width = 70, height = 70, source, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Image
                style={[styles.headerBtnImg, {width: width, height: height }]}
                source={source}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerBtnImg: {
        resizeMode: 'contain'
    },
})

