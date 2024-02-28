import { ScrollView, View } from "react-native";
import OutingItem from "../components/OutingItem";
import TopBar from "../components/TopBar";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getData, storeData } from "../utils/kvStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

function index(props) {
    const [outings, setOutings] = useState([]);

    const fetchOutings = async () => {
        let data = JSON.parse(await getData("outingData")) || [];
        setOutings(data);
    };

    useEffect(() => {
        fetchOutings();
    }, []);

    const deleteOuting = async (id) => {
        let newOutings = outings.filter((o) => o.id !== id);
        setOutings(newOutings);
        await storeData("outingData", JSON.stringify(newOutings));
    };

    return (
        <>
            <TopBar icon="plus" onPress={() => router.navigate("/newOuting")} />
            <View className="flex-1">
                <ScrollView>
                    {outings.map((item, index) => {
                        return (
                            <OutingItem
                                isLast={index == outings.length - 1}
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                deleteOuting={deleteOuting}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </>
    );
}

export default index;
