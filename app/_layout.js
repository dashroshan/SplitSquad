import { Slot, router } from "expo-router";
import Header from "../components/TopBar";
import { useEffect } from "react";
import { View } from "react-native";

function _layout(props) {
    useEffect(() => {
        router.navigate("/newOuting");
    }, []);
    return (
        <View className="bg-gray-200 flex-1">
            <Slot />
        </View>
    );
}

export default _layout;
