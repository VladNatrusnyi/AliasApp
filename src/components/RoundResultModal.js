import {Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {theme} from "../theme/theme";
import {AntDesign} from "@expo/vector-icons";
import {PrimaryButton} from "./UI/PrimaryButton";

export const RoundResultModal = ({showModal, teamName, guessedWords, missedWords, onPress, onClose, round}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={onClose}>
            <SafeAreaView style={styles.modalView}>
                <Text style={styles.modalTitle}>Round: {round}</Text>
                <Text style={styles.modalTitle}>{teamName}</Text>

                <ScrollView style={{flex: 1, width: '100%',borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.light, paddingVertical: 10}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.blockWrapper}>
                            <Text style={styles.blockTitle}>Guessed Words</Text>

                            {
                                guessedWords.length
                                    ? guessedWords.map((item, index) => (
                                        <View key={index} style={styles.blockItem}>
                                            <View>
                                                <Text style={styles.blockItemText}>{item.word}</Text>
                                            </View>
                                            <View>
                                                <AntDesign name="like1" size={24} color={theme.orange} />
                                            </View>
                                        </View>

                                    ))
                                    : <View style={styles.blockItem}>
                                        <Text style={styles.emptyText}>You have no guessed words.</Text>
                                    </View>
                            }
                        </View>

                        <View style={styles.blockWrapper}>
                            <Text style={styles.blockTitle}>Missed Words</Text>
                            {
                                missedWords.length
                                    ? missedWords.map((item, index) => (
                                        <View key={index} style={styles.blockItem}>
                                            <View>
                                                <Text style={styles.blockItemText}>{item.word}</Text>
                                            </View>
                                            <View>
                                                <AntDesign name="dislike1" size={24} color={theme.orange} />
                                            </View>
                                        </View>

                                    ))
                                    :  <View style={styles.blockItem}>
                                        <Text style={styles.emptyText}>You have no missing words.</Text>
                                    </View>
                            }

                        </View>
                    </View>
                </ScrollView>


                <PrimaryButton
                    customStyles={{width: '50%', marginVertical: 10}}
                    bgColor={theme.orange}
                    onPress={onPress}
                    text={'Continue'}
                />
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        marginTop: 22,
        padding: 20,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.secondary,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: theme.light,
        marginBottom: 10
    },


    blockWrapper: {
        width: '70%',
        padding: 20,
        backgroundColor: theme.light,
        borderRadius: 20,
        marginBottom: 20
    },
    blockTitle: {
        fontSize: 20,
        color: '#280A82',
        fontWeight: 'bold',
        marginBottom: 5
    },
    blockItem: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    blockItemText: {
        fontSize: 16
    },
    emptyText: {
      textAlign: 'center'
    },


    modalButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
    },
})
