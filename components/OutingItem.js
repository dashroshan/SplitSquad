import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

function OutingItem(props) {
    let mb = props.isLast ? "mb-3" : "mb-0"; // Last item to have 3 bottom margin
    return (
        <View
            className={`bg-white px-3 pl-5 m-3 ${mb} rounded-lg border-l-8 flex-row items-center justify-between`}>
            {/* Outing name */}
            <Text
                numberOfLines={1}
                className="w-[80%] py-6"
                onPress={() => router.navigate(`/outing/${props.id}`)}>
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

export default OutingItem;
