import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// Outing list item for home screen showing name and delete button
export function OutingItem(props) {
    let mb = props.isLast ? "mb-3" : "mb-0"; // Last item to have 3 bottom margin
    return (
        <View
            className={`bg-white px-3 pl-5 m-3 ${mb} rounded-lg border-l-8 flex-row items-center justify-between`}>
            {/* Outing name */}
            <Text
                numberOfLines={1}
                className="w-[80%] py-6"
                onPress={() =>
                    router.navigate({
                        pathname: `/outing/${props.id}`,
                        params: { name: props.name },
                    })
                }>
                {props.name}
            </Text>

            {/* Delete button */}
            <TouchableOpacity
                onPress={() => props.deleteOuting(props.id)}
                className="bg-black p-3 rounded-lg"
                children={<AntDesign name="delete" size={24} color="white" />}
            />
        </View>
    );
}
