import {
    FlatList,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import TopBar from "../components/TopBar";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getData, removeData, storeData } from "../utils/kvStore";
import { AntDesign } from "@expo/vector-icons";

function OutingItem(props) {
    let mb = props.isLast ? "mb-3" : "mb-0"; // Last item to have 3 bottom margin
    return (
        <View
            className={`bg-white px-3 pl-5 m-3 ${mb} rounded-lg border-l-8 flex-row items-center justify-between`}>
            {/* Outing name */}
            <Text
                numberOfLines={1}
                className="w-[80%] py-6"
                onPress={() => router.navigate(`/outing/${props.id}`)}>
                {props.name}
            </Text>

            {/* Delete button */}
            <TouchableOpacity
                onPress={() => props.deleteOuting(props.id)}
                className="bg-black p-3 rounded-lg"
                children={<AntDesign name="delete" size={24} color="white" />}
            />
        </View>
    );
}

function index(props) {
    const [outings, setOutings] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const { width } = Dimensions.get("window");

    // Fetch outings from storage
    const fetchOutings = async () => {
        setRefreshing(true);
        let data = JSON.parse(await getData("outingData")) || [];
        setOutings(data);
        setRefreshing(false);
    };

    // On load fetch all outings
    useEffect(() => {
        fetchOutings();
    }, []);

    // Delete an outing with the given id
    const deleteOuting = async (id) => {
        let newOutings = outings.filter((o) => o.id !== id);
        setOutings(newOutings);
        await storeData("outingData", JSON.stringify(newOutings));
        await removeData(`outing-${id}`);
    };

    return (
        <>
            {/* Top bar */}
            <TopBar
                icon="plus"
                title="FairShare"
                onPress={() => router.navigate("/newOuting")}
            />

            {/* Outings list */}

            {outings.length === 0 ? (
                <Image
                    source={require("../assets/emptyList.jpg")}
                    style={{
                        width,
                        height: width * 0.676,
                        opacity: 0.3,
                    }}
                />
            ) : (
                <View className="flex-1">
                    <FlatList
                        data={outings}
                        renderItem={({ item }) => (
                            <OutingItem
                                isLast={index == outings.length - 1}
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                deleteOuting={deleteOuting}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        onRefresh={fetchOutings}
                        refreshing={refreshing}
                    />
                </View>
            )}
        </>
    );
}

export default index;
