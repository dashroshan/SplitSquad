import { ScrollView, View } from "react-native";
import OutingItem from "../components/OutingItem";
import TopBar from "../components/TopBar";
import { router } from "expo-router";

function index(props) {
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
        <>
            <TopBar icon="plus" onPress={() => router.navigate("/newOuting")} />
            <View className="flex-1">
                <ScrollView>
                    {items.map((item, index) => {
                        return (
                            <OutingItem
                                isLast={index == items.length - 1}
                                key={index}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </>
    );
}

export default index;
