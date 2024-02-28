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
                    className="border-black border-b-2 pb-1 my-3"
                />

                {/* Amount */}
                <Text className="font-semibold text-lg mt-5 mb-3">
                    Spent by
                </Text>
                <Pressable onPress={() => console.log("Pressed")}>
                    <View className="border-black border-2 pl-3 flex-row justify-between items-center">
                        <Text></Text>
                        <View className="bg-black p-2 pl-4 pr-3">
                            <AntDesign
                                name="caretdown"
                                size={26}
                                color="white"
                            />
                        </View>
                    </View>
                </Pressable>
            </ScrollView>
        </>
    );
}

export default index;
