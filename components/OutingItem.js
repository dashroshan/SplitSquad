import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function OutingItem(props) {
    let mb = props.isLast ? "mb-3" : "mb-0";
    return (
        <View
            key={props.index}
            className={`bg-white p-3 pl-5 m-3 ${mb} rounded-lg border-l-8 flex-row items-center justify-between`}>
            <Text numberOfLines={1} className="w-[80%]">
                Movie
            </Text>
            <TouchableOpacity
                className="bg-black p-3 rounded-lg"
                children={<AntDesign name="delete" size={24} color="white" />}
            />
        </View>
    );
}

export default OutingItem;
