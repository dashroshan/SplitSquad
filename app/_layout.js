import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

function _layout(props) {
    useEffect(() => {
        router.navigate("/outing/mj20093b4z");
        // router.navigate("/newOuting");
    }, []);
    return (
        <View className="bg-gray-200 flex-1">
            <Slot />
        </View>
    );
}

export default _layout;
