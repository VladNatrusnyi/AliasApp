import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {theme} from "../../theme/theme";

export const PrimaryButton = ({onPress, text, bgColor = theme.orange, height = 65, customStyles = {}}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.btnWrapper, customStyles, {height: height, backgroundColor: bgColor}]}
        >
            <Text style={styles.btnText}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnWrapper: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        borderColor: theme.light,
        borderWidth: 4
    },
    btnText: {
        color: theme.light,
        fontSize: 22,
        fontWeight: 'bold'
    }
})




// import {StyleSheet, useWindowDimensions, View} from "react-native";
// import {Card} from "./Card";
// import {useEffect, useMemo, useState} from "react";
// import {Timer} from "./Timer";
// import {useNavigation} from "@react-navigation/native";
// import {useDispatch, useSelector} from "react-redux";
// import {setTimerStarted} from "../store/GameSlice";
//
//
//
// const numberOfItems = 6
//
// const closeAllCards = (cards) => {
//     return cards.map(card => ({
//         ...card,
//         isOpen: false
//     }));
// }
//
// export const PlayArea = ({levelInfo}) => {
//     const dispatch = useDispatch()
//     const navigation = useNavigation()
//
//     const {width , height} = useWindowDimensions()
//
//     const {isTimerComplete} = useSelector(state => state.game)
//
//     const [cards, setCards] = useState(levelInfo.cards)
//
//     const [isPreview, setIsPreview] = useState(false)
//
//     const [isBlockedScreen, setIsBlockedScreen] = useState(false)
//
//     const gameAreaWidth = width - 40
//     const gameAreaHeight = height - (120 + 80)
//
//     const cardWidth = Math.round(gameAreaWidth / 2) - 5
//     const cardHeight = Math.round((gameAreaHeight / 3)) - 10
//
//     const isWin = useMemo(() => {
//         const res = cards.every(el => el.isShown === false)
//         if (res) {
//             dispatch(setTimerStarted(false))
//             setTimeout(() => navigation.navigate('WinPage'), 1000)
//         }
//         return res
//     }, [cards])
//
//     const startTimer = () => {
//         dispatch(setTimerStarted(true))
//     };
//
//
//     useEffect(() => {
//         if (isTimerComplete && !isWin) {
//             navigation.navigate('LoosePage')
//         }
//     }, [isTimerComplete]);
//
//     useEffect(() => {
//         setIsPreview(true)
//         setTimeout(() => {
//             setCards(closeAllCards(cards))
//             setIsPreview(false)
//             startTimer()
//         }, levelInfo.previewTime)
//     }, []);
//
//     useEffect(() => {
//         if (!isPreview || !isWin) {
//             const openCards = cards.filter(card => card.isOpen && card.isCorrectAnim && card.isShown);
//             if (openCards.length === 2) {
//                 if (openCards[0].name === openCards[1].name) {
//                     setIsBlockedScreen(true)
//                     setCards(cards.map(card =>
//                         openCards.includes(card) ? { ...card, isCorrectAnim: false} : card
//                     ));
//                     setTimeout(() => {
//                         setCards(cards.map(card =>
//                             openCards.includes(card) ? { ...card, isShown: false, isOpen: false} : card
//                         ));
//                         setIsBlockedScreen(false)
//                     }, 1000)
//                 } else {
//                     setIsBlockedScreen(true)
//                     setTimeout(() => {
//                         setCards(closeAllCards(cards))
//                         setIsBlockedScreen(false)
//                     }, 1000)
//                 }
//             }
//         }
//     }, [cards, isPreview, isWin]);
//
//
//
//     const changeCardFlipStatus = (status, cardId) => {
//         setCards(state => {
//             return state.map(el => {
//                 if (el.id === cardId) {
//                     return { ...el, isOpen: status };
//                 }
//                 return el;
//             })
//         });
//     }
//
//
//     return (
//         <>
//             <View style={styles.wrapper}>
//                 {
//                     isBlockedScreen &&
//                     <View style={[styles.block, {width: gameAreaWidth, height: gameAreaHeight}]}></View>
//                 }
//
//                 <View style={styles.head}></View>
//                 <View
//                     style={[
//                         styles.body,
//                         {
//                             width: gameAreaWidth,
//                             height: gameAreaHeight
//                         }
//                     ]}
//                 >
//                     <View style={styles.cardList}>
//                         {
//                             // Array.from({length: numberOfItems}, (_, i) => i + 1)
//                             cards
//                                 .map(card => {
//                                     return (
//                                         <Card
//                                             key={card.id}
//                                             cardData={card}
//                                             changeCardFlipStatus={changeCardFlipStatus}
//                                             size={{
//                                                 width: cardWidth,
//                                                 height: cardHeight
//                                             }
//                                             }
//                                         />
//                                     )
//                                 })
//                         }
//                     </View>
//                 </View>
//                 {/*<View style={styles.bottom}>*/}
//                 {/*    {*/}
//                 {/*        timerStarted &&*/}
//                 {/*        <Timer*/}
//                 {/*            duration={levelInfo.timer}*/}
//                 {/*            start={timerStarted}*/}
//                 {/*            onComplete={timerComplete}*/}
//                 {/*        />*/}
//                 {/*    }*/}
//                 {/*</View>*/}
//             </View>
//         </>
//     )
// }
//
//
// const styles = StyleSheet.create({
//     wrapper: {
//         flex: 1,
//         padding: 20,
//         position: 'relative'
//     },
//     block: {
//         position: 'absolute',
//         backgroundColor: 'transparent',
//         zIndex: 10,
//         left: 20,
//         top: 45
//     },
//
//     head: {
//         flex: 1
//     },
//
//     body: {
//         // backgroundColor: 'yellow'
//     },
//     cardList: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         flexWrap: 'wrap',
//         rowGap: 10
//     },
//
//     bottom: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });