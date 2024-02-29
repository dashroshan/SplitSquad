import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ViewShot from "react-native-view-shot";
import EmptyList from "../../../components/EmptyList";
import TopBar from "../../../components/TopBar";
import { getData } from "../../../utils/kvStore";
import { ExpenditureItem } from "./ExpenditureItem";

function index(props) {
    const { id, name } = useLocalSearchParams();
    const [details, setDetails] = useState(null);
    const [sharing, setSharing] = useState(false);
    const shareRef = useRef();

    const calculateTotals = (details) => {
        // Calculate total amount paid by each member
        let paidBy = new Map();
        for (let member of details.members) paidBy.set(member, 0);
        for (let payment of details.payments) {
            paidBy.set(payment.by, paidBy.get(payment.by) + payment.amount);
        }

        // Convert this data to {name, amount} format and also calculate total spending
        let totalSpending = 0;
        let spendingByMember = [];
        paidBy.forEach((value, key) => {
            spendingByMember.push({ name: key, amount: value });
            totalSpending += value;
        });

        return { totalSpending, spendingByMember };
    };

    const fetchOutingDetails = async () => {
        // Get saved details for the outing and add data of total amount paid by each member to it
        let outingDetails = JSON.parse(await getData(`outing-${id}`));
        let totals = calculateTotals(outingDetails);

        setDetails({
            ...outingDetails,
            ...totals,
        });
    };

    useEffect(() => {
        // Run once on load
        fetchOutingDetails();
    }, [id]);

    // Share pending settlement details
    useEffect(() => {
        if (sharing === true)
            shareRef.current.capture().then((uri) => {
                Sharing.shareAsync(uri);
                setSharing(false);
            });
    }, [sharing]);

    return (
        <>
            {/* Top bar */}
            <TopBar
                title={name || details?.name}
                icon="plus"
                onPress={() => router.navigate(`/outing/${id}/add`)}
            />
            {details === null ? null : (
                <>
                    <ScrollView>
                        {/* Group memebrs and total expenditure */}
                        <View className="bg-white m-3 mb-0 p-7 px-8 rounded-lg">
                            {/* Table title */}
                            <View className="flex-row items-center justify-between pb-2 mb-2 border-b-2">
                                <Text className="font-semibold text-lg">
                                    Group members
                                </Text>
                                <Text className="font-semibold text-lg">
                                    Paid
                                </Text>
                            </View>

                            {/* Members list and expenditure */}
                            {details.spendingByMember.map((item, index) => (
                                <View
                                    className="flex-row items-center justify-between"
                                    key={index}>
                                    <Text className="w-[70%]" numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text>{item.amount}</Text>
                                </View>
                            ))}

                            {/* Total spending */}
                            <View className="flex-row items-center justify-between pt-2 mt-2 border-t-2">
                                <Text>Total spending</Text>
                                <Text>{details.totalSpending}</Text>
                            </View>
                        </View>

                        <ViewShot
                            ref={shareRef}
                            options={{
                                fileName: (name || details?.name) + " - ",
                                format: "png",
                                quality: 1,
                            }}
                            className="bg-gray-200">
                            {details.settlements.length > 0 ? (
                                <View className="bg-white m-3 mb-0 p-7 pt-5 px-8 rounded-lg">
                                    <View className="flex-row items-center justify-between">
                                        <Text
                                            className={
                                                "font-semibold text-lg " +
                                                (sharing ? "mt-1" : "")
                                            }
                                            numberOfLines={1}>
                                            {sharing
                                                ? "Pending payments"
                                                : "Settlements"}
                                        </Text>
                                        <TouchableOpacity
                                            className={
                                                "bg-black p-3 px-4 rounded-t-lg " +
                                                (sharing ? "hidden" : "")
                                            }
                                            onPress={() => setSharing(true)}
                                            children={
                                                <View className="flex-row gap-1">
                                                    <Text className="text-white text-sm">
                                                        Share
                                                    </Text>
                                                    <AntDesign
                                                        name="sharealt"
                                                        size={20}
                                                        color="white"
                                                    />
                                                </View>
                                            }
                                        />
                                    </View>
                                    {sharing ? (
                                        <Text className="mb-3">
                                            For - {name || details?.name}
                                        </Text>
                                    ) : null}
                                    <View className="flex-row items-center pb-2 my-2 mt-0 border-b-2 border-t-2 pt-1">
                                        <Text className="font-semibold text-sm w-[38%]">
                                            From
                                        </Text>
                                        <Text className="font-semibold text-sm w-[38%]">
                                            To
                                        </Text>
                                        <Text className="font-semibold text-sm w-[24%] text-right">
                                            Amount
                                        </Text>
                                    </View>
                                    {details.settlements.map((item, index) => (
                                        <View
                                            className="flex-row items-center"
                                            key={index}>
                                            <Text
                                                className="text-sm w-[38%] pr-2"
                                                numberOfLines={1}>
                                                {item.from}
                                            </Text>
                                            <Text
                                                className="text-sm w-[38%] pr-2"
                                                numberOfLines={1}>
                                                {item.to}
                                            </Text>
                                            <Text
                                                className="text-sm w-[24%] text-right"
                                                numberOfLines={1}>
                                                {Math.round(item.amount * 100) /
                                                    100}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            ) : null}

                            {/* Expenditure list header */}
                            <View className="bg-black m-3 rounded-lg flex-row">
                                <View className="w-28 p-2 flex items-center justify-center">
                                    <Text className="text-white font-semibold">
                                        Spending
                                    </Text>
                                </View>
                                <View className="flex-row flex-1 p-3 border-l-2 border-white">
                                    <Text className="text-white font-semibold">
                                        Spent for
                                    </Text>
                                </View>
                            </View>

                            {/* Show empty list image if no payments data added yet */}
                            {details.payments.length === 0 ? (
                                <EmptyList />
                            ) : null}

                            {/* Expenditure list */}
                            {details.payments.map((item, index) => {
                                return (
                                    <ExpenditureItem key={index} data={item} />
                                );
                            })}
                        </ViewShot>
                    </ScrollView>
                </>
            )}
        </>
    );
}

export default index;
