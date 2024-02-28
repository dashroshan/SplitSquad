import { useLocalSearchParams } from "expo-router";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import TopBar from "../../../../components/TopBar";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

function index(props) {
    const { id } = useLocalSearchParams();

    const [value, setValue] = useState(null);

    return (
        <>
            {/* Top bar */}
            <TopBar title="Add new spending" icon="save" />

            <ScrollView className="bg-white m-3 p-7 px-8 rounded-lg">
                {/* Spent on */}
                <Text className="font-semibold text-lg">Spent on</Text>
                <TextInput
                    placeholder="Example: Movie tickets"
                    cursorColor="black"
                    placeholderTextColor="lightgray"
                    className="border-black border-b-2 pb-1 my-3"
                />

                {/* Amount */}
                <Text className="font-semibold text-lg mt-5 mb-3">
                    Spent by
                </Text>

                <Dropdown
                    data={["Roshan", "Swoyam", "Soumesh", "Rohan"]}
                    maxHeight={157}
                    iconStyle={{ height: 35, tintColor: "black" }}
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                    }}
                    placeholderStyle={{
                        color: value ? "black" : "lightgray",
                        fontSize: 14,
                    }}
                    placeholder={value || "Select the member who paid"}
                    value={value || "Select the member who paid"}
                    onChange={(item) => {
                        setValue(item);
                        console.log(item);
                    }}
                    renderItem={renderItem}
                />
            </ScrollView>
        </>
    );
}

function renderItem(item) {
    return (
        <View className="p-4 px-5 border-b-2">
            <Text className="text-md" numberOfLines={1}>
                {item}
            </Text>
        </View>
    );
}

export default index;
