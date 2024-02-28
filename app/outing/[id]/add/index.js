import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TextInput } from "react-native";
import TopBar from "../../../../components/TopBar";

function index(props) {
    const { id } = useLocalSearchParams();

    return (
        <>
            {/* Top bar */}
            <TopBar title="Add new expenditure" icon="save" />

            <ScrollView className="bg-white m-3 p-7 px-8 rounded-lg">
                {/* Outing name */}
                <Text className="font-semibold text-lg">Paid by</Text>
            </ScrollView>
        </>
    );
}

export default index;
