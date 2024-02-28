import { useLocalSearchParams } from "expo-router";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
import TopBar from "../../../../components/TopBar";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { useState } from "react";

function index(props) {
    const { id } = useLocalSearchParams();

    const [value, setValue] = useState();
    const [selected, setSelected] = useState([]);

    const renderMultiSelectItem = (item) => {
        let isSelected = selected.indexOf(item.value) >= 0;
        return (
            <View
                className={
                    "p-4 px-5 border-b-2 " + (isSelected ? "bg-black" : "")
                }>
                <Text
                    className={"text-md " + (isSelected ? "text-white" : "")}
                    numberOfLines={1}>
                    {item.label}
                </Text>
            </View>
        );
    };

    return (
        <>
            {/* Top bar */}
            <TopBar title="Add new spending" icon="save" />

            <ScrollView className="bg-white m-3 p-7 px-8 rounded-lg">
                <Text className="font-semibold text-lg">Expenditure name</Text>
                <TextInput
                    placeholder="Example: Movie tickets and snacks"
                    cursorColor="black"
                    placeholderTextColor="lightgray"
                    className="border-black border-b-2 pb-1 my-3"
                />

                <Text className="font-semibold text-lg mt-5">Amount</Text>
                <TextInput
                    placeholder="Example: 500"
                    cursorColor="black"
                    placeholderTextColor="lightgray"
                    className="border-black border-b-2 pb-1 my-3"
                    inputMode="decimal"
                />

                <Text className="font-semibold text-lg mt-5 mb-3">Paid by</Text>

                <Dropdown
                    data={[
                        { label: "Item 1", value: "1" },
                        { label: "Item 2", value: "2" },
                        { label: "Item 3", value: "3" },
                        { label: "Item 4", value: "4" },
                        { label: "Item 5", value: "5" },
                        { label: "Item 6", value: "6" },
                        { label: "Item 7", value: "7" },
                        { label: "Item 8", value: "8" },
                    ]}
                    maxHeight={157}
                    labelField="label"
                    valueField="value"
                    iconStyle={{ height: 35, tintColor: "black" }}
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                    }}
                    placeholderStyle={{
                        color: "lightgray",
                        fontSize: 14,
                    }}
                    placeholder="Select the member who paid"
                    value={value}
                    onChange={(item) => {
                        setValue(item.value);
                        console.log(item.value);
                    }}
                    renderItem={renderItem}
                />

                <Text className="font-semibold text-lg mt-8 mb-3">
                    To be split among
                </Text>

                <MultiSelect
                    data={[
                        { label: "Item 1", value: "1" },
                        { label: "Item 2", value: "2" },
                        { label: "Item 3", value: "3" },
                        { label: "Item 4", value: "4" },
                        { label: "Item 5", value: "5" },
                        { label: "Item 6", value: "6" },
                        { label: "Item 7", value: "7" },
                        { label: "Item 8", value: "8" },
                    ]}
                    placeholder="Select the members paid for"
                    labelField="label"
                    valueField="value"
                    value={selected}
                    onChange={(item) => {
                        setSelected(item);
                        console.log(item);
                    }}
                    renderItem={renderMultiSelectItem}
                    maxHeight={157}
                    iconStyle={{ height: 35, tintColor: "black" }}
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                    }}
                    placeholderStyle={{
                        color: "lightgray",
                        fontSize: 14,
                    }}
                    renderSelectedItem={renderSelectedItem}
                />
            </ScrollView>
        </>
    );
}

function renderItem(item) {
    return (
        <View className="p-4 px-5 border-b-2">
            <Text className="text-md" numberOfLines={1}>
                {item.label}
            </Text>
        </View>
    );
}

function renderSelectedItem(item) {
    return (
        <View className="flex-row mr-2 mt-2" key={index}>
            <View
                className="border-2 rounded-full rounded-tr-none rounded-br-none pl-5 pr-3 py-2 flex justify-center"
                style={{ maxWidth: 120 }}>
                <Text numberOfLines={1} className="text-md">
                    {item.label}
                </Text>
            </View>
            <View
                className="bg-black rounded-full rounded-tl-none rounded-bl-none pl-2 pr-3 py-1 flex justify-center"
                style={{ maxWidth: 70 }}>
                <AntDesign name="close" size={15} color="white" />
            </View>
        </View>
    );
}

export default index;
