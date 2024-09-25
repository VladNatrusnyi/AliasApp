import {useNavigation} from "@react-navigation/native";
import {GradientBackgroundLayout} from "../layouts/GradientBackgroundLayout";
import {CategoriesList} from "../components/categories/CategoriesList";
import {IconButton} from "../components/UI/IconButton";

export const CategoriesPage = () => {
    const navigation = useNavigation()

    return (
        <GradientBackgroundLayout>
            <IconButton
                sizeWrapper={50}
                size={40}
                color={'transparent'}
                iconName={'keyboard-arrow-left'}
                onPress={() => navigation.goBack()}
            />

            <CategoriesList />
        </GradientBackgroundLayout>
    )
}