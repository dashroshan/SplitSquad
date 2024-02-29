import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import TopBar from "../../components/TopBar";
import AwesomeAlert from "react-native-awesome-alerts";
import { getData, storeData } from "../../utils/kvStore";
import { router } from "expo-router";
import AlertModal from "../../components/AlertModal";

function MemberItem(props) {
    // Handles text change
    const changeText = (text) => {
        let mem = props.data.members;
        mem[props.index] = text;
        props.setData({ ...props.data, members: mem });
    };

    // Delete the current member input field
    const deleteSelf = () => {
        let mem = props.data.members;
        delete mem[props.index];
        props.setData({ ...props.data, members: mem });
    };

    return (
        <View className="flex-row items-end my-2">
            {/* Member name input */}
            <TextInput
                placeholder="Member name"
                cursorColor="black"
                value={props.data.members[index]}
                onChangeText={changeText}
                placeholderTextColor="lightgray"
                className="border-gray-900 border-b-2 pb-1 flex-1"
            />

            {/* Delete button */}
            <TouchableOpacity
                onPress={deleteSelf}
                className="bg-black p-3 rounded-lg rounded-bl-none"
                children={<AntDesign name="delete" size={15} color="white" />}
            />
        </View>
    );
}

function index(props) {
    const [data, setData] = useState({
        name: "",
        members: ["", ""],
    });
    const [alert, setAlert] = useState({ visible: false, message: "" });

    // Add a new member input field
    const addMember = () => {
        let mem = data.members;
        mem.push("");
        setData({ ...data, members: mem });
    };

    // Validates all input data and returns error messages
    const getError = (name, members) => {
        if (name === "") return "Outing name cannot be empty";
        else if (members.length < 2)
            return "Group needs to have minimum 2 members";

        for (let member of members) {
            if (member === "") return "Group member name(s) cannot be empty";
        }

        if (new Set(members).size !== members.length)
            return "Group member names cannot be same";

        return "";
    };

    // Save the outing and return back to home screen
    const save = async () => {
        let name = data.name;
        let members = data.members.filter((item) => item !== undefined); // remove all deleted elements from list

        let error = getError(name, members);
        if (error === "") {
            // On all valid inputs
            let id = (Math.random() + 1).toString(36).substring(2); // generate a random string for id
            let newOutingData = { id, name };
            let outingDetails = {
                name,
                members,
                payments: [],
                settlements: [],
            };

            // Get old saved data
            let oldData = await getData("outingData");
            let outingData = [];
            if (oldData !== null) outingData = JSON.parse(oldData);

            // Add new outing and save this new data
            outingData.unshift(newOutingData);
            await storeData("outingData", JSON.stringify(outingData));
            await storeData(`outing-${id}`, JSON.stringify(outingDetails));

            router.navigate("/");
        } else {
            // On some invalid inputs show the alert dialog
            setAlert({ visible: true, message: error });
        }
    };

    return (
        <>
            {/* Top bar */}
            <TopBar title="Create new group" icon="save" onPress={save} />

            <ScrollView className="bg-white m-3 p-7 px-8 rounded-lg">
                {/* Outing name */}
                <Text className="font-semibold text-lg">Group name</Text>
                <TextInput
                    onChangeText={(text) => setData({ ...data, name: text })}
                    value={data.name}
                    placeholder="Example: Saturday movie night"
                    cursorColor="black"
                    placeholderTextColor="lightgray"
                    className="border-gray-900 border-b-2 pb-1 my-3"
                />

                {/* Group members list */}
                <Text className="font-semibold text-lg mt-5">
                    Group members
                </Text>
                {data.members.map((member, index) => (
                    <MemberItem
                        key={index}
                        index={index}
                        data={data}
                        setData={setData}
                    />
                ))}

                {/* Add member button */}
                <TouchableOpacity
                    onPress={addMember}
                    children={
                        <Text className="text-white text-lg font-semibold text-center">
                            Add member
                        </Text>
                    }
                    className="bg-black p-3 rounded-lg mt-4 mb-16"
                />
            </ScrollView>

            {/* Alert shown while saving for validation errors */}
            <AlertModal alert={alert} setAlert={setAlert} />
        </>
    );
}

export default index;
