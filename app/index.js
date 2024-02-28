import { FlatList, ScrollView, View } from "react-native";
import OutingItem from "../components/OutingItem";
import TopBar from "../components/TopBar";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getData, removeData, storeData } from "../utils/kvStore";

function index(props) {
    const [outings, setOutings] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

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
        </>
    );
}

export default index;
