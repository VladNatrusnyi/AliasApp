import {Modal, View, StyleSheet, Text} from "react-native";
import {theme} from "../theme/theme";
import {IconButton} from "./UI/IconButton";

export const WinModal = ({visible, onHomeBtnPress, onAnaliticsBtnPress, teamName = ''}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Winner</Text>
                    <Text style={styles.teamName}>{teamName}</Text>

                    <View style={styles.btnWrapper}>
                        <IconButton
                            iconName={'home'}
                            onPress={onHomeBtnPress}
                        />
                        <IconButton
                            onPress={onAnaliticsBtnPress}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '65%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        position: 'relative'
    },
    modalText: {
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#280A82'
    },
    teamName: {
        fontSize: 36,
        marginBottom: 30,
        fontWeight: 'bold',
        color: theme.orange
    },

    btnWrapper: {
        position: 'absolute',
        bottom: -35,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30
    },

    closeButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});