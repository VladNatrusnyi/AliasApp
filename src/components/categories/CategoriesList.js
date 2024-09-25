import {StyleSheet, View} from "react-native";
import {categories} from "../../mock/categories";
import {CategoriesListItem} from "./CategoriesListItem";
import {useState} from "react";
import {PrimaryButton} from "../UI/PrimaryButton";
import {useNavigation} from "@react-navigation/native";

export const CategoriesList = () => {
    const navigation = useNavigation()

    const [activeCategory, setActiveCategory] = useState(0)

    return (
        <View style={styles.wrapper}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                {
                    categories.map(el => {
                        return (
                            <CategoriesListItem
                                activeId={activeCategory}
                                onPress={(data) => setActiveCategory(data)}
                                key={el.categoryId}
                                categoryData={el}
                            />
                        )
                    })
                }
            </View>

            <View>
                {
                    !!activeCategory &&
                    <PrimaryButton
                        customStyles={{marginTop: 15}}
                        onPress={() => navigation.navigate('GamePage', {categoryId: activeCategory})}
                        text={'Play'}
                    />
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginVertical: 10,
        justifyContent: "space-between",
    },
})