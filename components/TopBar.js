import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function TopBar(props) {
    return (
        <View className="h-28 bg-black items-center justify-between pt-10 px-7 flex-row">
            {/* Title */}
            <Text
                numberOfLines={1}
                className="w-[80%] font-bold text-white text-2xl">
                {props.title}
            </Text>

            {/* Right icon button */}
            <TouchableOpacity
                onPress={props.onPress}
                className="rounded-full bg-white p-2"
                children={
                    <AntDesign name={props.icon} size={26} color="black" />
                }
            />
        </View>
    );
}

export default TopBar;
