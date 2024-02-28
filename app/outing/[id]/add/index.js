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

const data = [
    { label: "Roshan", value: "Roshan" },
    { label: "Swoyam", value: "Swoyam" },
    { label: "Rohan", value: "Rohan" },
    { label: "Soumesh", value: "Soumesh" },
    { label: "Shreeya", value: "Shreeya" },
    { label: "Rishabh", value: "Rishabh" },
    { label: "1Roshan", value: "1Roshan" },
    { label: "1Swoyam", value: "1Swoyam" },
    { label: "1Rohan", value: "1Rohan" },
    { label: "1Soumesh", value: "1Soumesh" },
    { label: "1Shreeya", value: "1Shreeya" },
    { label: "1Rishabh", value: "1Rishabh" },
];

function index(props) {
    const { id } = useLocalSearchParams();

    const [value, setValue] = useState();
    const [selected, setSelected] = useState([]);
    const [selectedDisplay, setSelectedDisplay] = useState(
        "Select the members paid for"
    );
    const [equalSplit, setEqualSplit] = useState(true);

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

                {equalSplit ? (
                    <>
                        <Text className="font-semibold text-lg mt-5">
                            Amount
                        </Text>
                        <TextInput
                            placeholder="Example: 500"
                            cursorColor="black"
                            placeholderTextColor="lightgray"
                            className="border-black border-b-2 pb-1 my-3"
                            inputMode="decimal"
                        />
                    </>
                ) : null}

                <Text className="font-semibold text-lg mt-5 mb-3">Paid by</Text>

                <Dropdown
                    data={data}
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
                    selectedTextStyle={{ fontSize: 14 }}
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
                    data={data}
                    placeholder={selectedDisplay}
                    labelField="label"
                    valueField="value"
                    value={selected}
                    onChange={(item) => {
                        setSelected(item);
                        let commaValue = "";
                        for (let i = item.length - 1; i >= 0; i--) {
                            commaValue += item[i];
                            if (i > 0) commaValue += ", ";
                        }
                        setSelectedDisplay(commaValue);
                    }}
                    renderItem={renderMultiSelectItem}
                    maxHeight={157}
                    iconStyle={{ height: 35, tintColor: "black" }}
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 2,
                    }}
                    placeholderStyle={{
                        color: selected.length === 0 ? "lightgray" : "black",
                        fontSize: 14,
                    }}
                    renderSelectedItem={() => <></>}
                />

                <View className="flex-row mt-10">
                    <TouchableOpacity
                        onPress={() => setEqualSplit(true)}
                        className={
                            "flex-1 items-center border-2 " +
                            (equalSplit ? "bg-black" : "bg-white")
                        }>
                        <Text
                            className={
                                "p-3 font-semibold " +
                                (equalSplit ? "text-white" : "text-black")
                            }>
                            Split equally
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setEqualSplit(false)}
                        className={
                            "flex-1 items-center border-2 " +
                            (!equalSplit ? "bg-black" : "bg-white")
                        }>
                        <Text
                            className={
                                "p-3 font-semibold " +
                                (!equalSplit ? "text-white" : "text-black")
                            }>
                            Custom split
                        </Text>
                    </TouchableOpacity>
                </View>

                {equalSplit ? null : (
                    <View className="flex gap-4 mt-3 mb-20">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="pr-5" numberOfLines={1}>
                                    Swoyam
                                </Text>
                            </View>
                            <TextInput
                                placeholder="Amount"
                                cursorColor="black"
                                placeholderTextColor="lightgray"
                                className="border-black border-b-2 pb-1 flex-1"
                                inputMode="decimal"
                            />
                        </View>
                    </View>
                )}
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

export default index;
