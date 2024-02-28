import { Text, View } from "react-native";

export function renderItem(item) {
    return (
        <View className="p-4 px-5 border-b-2">
            <Text className="text-md" numberOfLines={1}>
                {item.label}
            </Text>
        </View>
    );
}
