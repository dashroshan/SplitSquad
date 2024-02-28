import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TextInput } from "react-native";
import TopBar from "../../../../components/TopBar";
import { AntDesign } from "@expo/vector-icons";

function index(props) {
    const { id } = useLocalSearchParams();

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
                    className="border-gray-900 border-b-2 pb-1 my-3"
                />

                {/* Amount */}
                <Text className="font-semibold text-lg mt-5">Amount</Text>
                <TextInput
                    placeholder="Example: 500"
                    cursorColor="black"
                    placeholderTextColor="lightgray"
                    className="border-gray-900 border-b-2 pb-1 my-3"
                    inputMode="decimal"
                />

            </ScrollView>
        </>
    );
}

export default index;
