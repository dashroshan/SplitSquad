import {
    TextInput,
    View,
    Button,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import TopBar from "../../components/TopBar";

function MemberItem(props) {
    const changeText = (text) => {
        let mem = props.data.members;
        mem[props.index] = text;
        props.setData({ ...props.data, members: mem });
    };

    const deleteSelf = () => {
        let mem = props.data.members;
        delete mem[props.index];
        props.setData({ ...props.data, members: mem });
    };

    return (
        <View className="flex-row items-end my-2">
            <TextInput
                placeholder="Member name"
                cursorColor="black"
                value={props.data.members[index]}
                onChangeText={changeText}
                placeholderTextColor="lightgray"
                className="border-gray-900 border-b-2 pb-1 flex-1"
            />
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

    const addMember = () => {
        let mem = data.members;
        mem.push("");
        setData({ ...data, members: mem });
    };

    const getError = (name, members) => {
        if (name === "") return "Outing name cannot be empty...";
        else if (members.length < 2)
            return "Group needs to have minimum 2 members...";
        else if (new Set(members).size !== members.length)
            return "Ground member names cannot be same...";
        for (let member of members) {
            if (member === "") return "Group member name cannot be empty...";
        }
        return "";
    };

    const save = () => {
        let name = data.name;
        let members = data.members.filter((item) => item !== undefined);

        let error = getError(name, members);
        if (error === "") {
            console.log(name, members);
        } else {
            console.log(error);
        }
    };

    return (
        <>
            <TopBar icon="save" onPress={save} />

            <ScrollView className="bg-white m-3 p-7 px-8 rounded-lg">
                <View>
                    <Text className="font-semibold text-lg">Outing name</Text>
                    <TextInput
                        onChangeText={(text) =>
                            setData({ ...data, name: text })
                        }
                        value={data.name}
                        placeholder="Example: Saturday movie night"
                        cursorColor="black"
                        placeholderTextColor="lightgray"
                        className="border-gray-900 border-b-2 pb-1 my-3"
                    />

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

                    <TouchableOpacity
                        onPress={addMember}
                        children={
                            <Text className="text-white text-lg font-semibold text-center">
                                Add member
                            </Text>
                        }
                        className="bg-black p-3 rounded-lg mt-4 mb-16"
                    />
                </View>
            </ScrollView>
        </>
    );
}

export default index;
