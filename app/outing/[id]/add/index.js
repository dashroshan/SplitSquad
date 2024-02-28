import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import TopBar from "../../../../components/TopBar";
import { getData, storeData } from "../../../../utils/kvStore";

function index(props) {
    const { id } = useLocalSearchParams();

    const [value, setValue] = useState();
    const [selected, setSelected] = useState([]);
    const [selectedDisplay, setSelectedDisplay] = useState(
        "Select the members paid for"
    );
    const [equalSplit, setEqualSplit] = useState(true);
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [customSplitData, setCustomSplitData] = useState({});
    const [alert, setAlert] = useState({ visible: false, message: "" });
    const [members, setMembers] = useState([]);

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

    // Validates all input data and returns error messages
    const getError = (data) => {
        if (data.description === undefined || data.description === "")
            return "Expenditure name is empty...";

        if (!equalSplit)
            for (let forEntry of data.for) {
                if (forEntry.amount <= 0)
                    return "Invalid split amount(s) given...";
            }

        if (data.amount === undefined || isNaN(data.amount) || data.amount <= 0)
            return "Invalid amount given...";
        if (data.by === undefined) return "Paid by not selected...";
        if (selected.length === 0) return "To be split among not specified...";

        return "";
    };

    const save = async () => {
        let data = { by: value, description };
        let forList = [];
        if (equalSplit) {
            data["amount"] = amount;
            for (let member of selected)
                forList.push({
                    name: member,
                    amount: amount / selected.length,
                });
        } else {
            let amount = 0;
            Object.entries(customSplitData).forEach(([key, value]) => {
                forList.push({ name: key, amount: value });
                amount += value;
            });
            data["amount"] = amount;
        }
        data["for"] = forList;

        let error = getError(data);
        if (error === "") {
            let oldData = JSON.parse(await getData(`outing-${id}`));
            oldData.payments.unshift(data);
            await storeData(`outing-${id}`, JSON.stringify(oldData));
            router.navigate(`/outing/${id}`);
        } else {
            setAlert({ visible: true, message: error });
        }
    };

    const fetchMemberDetails = async () => {
        let outingDetails = JSON.parse(await getData(`outing-${id}`));
        let memData = [];
        for (let member of outingDetails.members)
            memData.push({ label: member, value: member });
        setMembers(memData);
    };

    useEffect(() => {
        fetchMemberDetails();
    }, [id]);

    return (
        <>
            {/* Top bar */}
            <TopBar title="Add new spending" icon="save" onPress={save} />

            <ScrollView className="bg-white m-3 p-7 px-8 rounded-lg">
                <Text className="font-semibold text-lg">Expenditure name</Text>
                <TextInput
                    placeholder="Example: Movie tickets and snacks"
                    cursorColor="black"
                    placeholderTextColor="lightgray"
                    className="border-black border-b-2 pb-1 my-3"
                    onChangeText={(text) => setDescription(text)}
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
                            onChangeText={(text) => setAmount(parseFloat(text))}
                        />
                    </>
                ) : null}

                <Text className="font-semibold text-lg mt-5 mb-3">Paid by</Text>

                <Dropdown
                    data={members}
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
                    }}
                    renderItem={renderItem}
                />

                <Text className="font-semibold text-lg mt-8 mb-3">
                    To be split among
                </Text>

                <MultiSelect
                    data={members}
                    placeholder={selectedDisplay}
                    labelField="label"
                    valueField="value"
                    value={selected}
                    onChange={(item) => {
                        let commaValue = "";
                        for (let i = item.length - 1; i >= 0; i--) {
                            commaValue += item[i];
                            if (i > 0) commaValue += ", ";
                        }
                        if (!equalSplit) {
                            let data = {};
                            for (let member of item)
                                data[member] = customSplitData[member] || 0;
                            setCustomSplitData(data);
                        }
                        setSelected(item);
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
                        onPress={() => {
                            setEqualSplit(true);
                            setAmount(null);
                        }}
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
                        onPress={() => {
                            let data = {};
                            for (let member of selected) data[member] = 0;
                            setCustomSplitData(data);
                            setEqualSplit(false);
                        }}
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
                        {selected.map((item) => (
                            <View
                                className="flex-row items-center justify-between"
                                key={item}>
                                <View className="flex-1">
                                    <Text className="pr-5" numberOfLines={1}>
                                        {item}
                                    </Text>
                                </View>
                                <TextInput
                                    placeholder="Amount"
                                    cursorColor="black"
                                    placeholderTextColor="lightgray"
                                    className="border-black border-b-2 pb-1 flex-1"
                                    inputMode="decimal"
                                    onChangeText={(text) => {
                                        let data = customSplitData;
                                        data[item] = parseFloat(text);
                                        setCustomSplitData(data);
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Alert shown while saving for validation errors */}
            <AwesomeAlert
                show={alert.visible}
                showProgress={false}
                title="Uhh Oh 😶"
                message={alert.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showConfirmButton={true}
                confirmText="Continue"
                confirmButtonColor="black"
                confirmButtonTextStyle={{
                    fontSize: 16,
                    margin: 8,
                    marginHorizontal: 16,
                    fontWeight: "700",
                }}
                confirmButtonStyle={{ borderRadius: 8 }}
                onConfirmPressed={() =>
                    setAlert({ visible: false, message: "" })
                }
            />
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
