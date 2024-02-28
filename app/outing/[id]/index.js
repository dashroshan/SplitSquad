import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import TopBar from "../../../components/TopBar";

function ExpenditureItem(props) {
    return (
        <View className="bg-white m-3 mb-0 rounded-lg flex-row">
            {/* Spent by */}
            <View className="bg-black w-28 p-2 rounded-lg rounded-tr-none rounded-br-none flex items-center justify-center">
                <Text
                    className="text-white font-semibold text-lg"
                    numberOfLines={1}>
                    {props.data.amount}
                </Text>
                <Text className="text-white" numberOfLines={1}>
                    {props.data.by}
                </Text>
            </View>

            {/* Spent for list */}
            <View className="flex-row flex-wrap flex-1 gap-[6] p-3 py-5">
                {props.data.for.map((item, index) => (
                    <View className="flex-row" key={index}>
                        <View
                            className="border-2 rounded-full rounded-tr-none rounded-br-none pl-2 pr-1 py-1 flex justify-center"
                            style={{ maxWidth: 120 }}>
                            <Text numberOfLines={1} className="text-xs">
                                {item.name}
                            </Text>
                        </View>
                        <View
                            className="bg-black rounded-full rounded-tl-none rounded-bl-none pl-1 pr-2 py-1 flex justify-center"
                            style={{ maxWidth: 70 }}>
                            <Text
                                numberOfLines={1}
                                className="text-xs text-white">
                                {item.amount}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

function index(props) {
    const { id } = useLocalSearchParams();
    const [details, setDetails] = useState({
        name: "Puri trip",
        members: ["Roshan", "Swoyam", "Soumesh", "Rohan"],
        payments: [
            {
                by: "Roshan",
                amount: 450,
                for: [
                    { name: "Swoyam", amount: 150 },
                    { name: "Roshan", amount: 250 },
                    { name: "Soumesh", amount: 50 },
                ],
            },
            {
                by: "Soumesh",
                amount: 2000,
                for: [
                    { name: "Rohan", amount: 1800 },
                    { name: "Soumesh", amount: 200 },
                ],
            },
            {
                by: "Soumesh",
                amount: 140,
                for: [{ name: "Soumesh", amount: 140 }],
            },
        ],
    });

    const [totals, setTotals] = useState({ total: 0, members: [] });

    const calculateTotals = () => {
        let paidBy = new Map();
        for (payment of details.payments) {
            paidBy.set(
                payment.by,
                (paidBy.get(payment.by) || 0) + payment.amount
            );
        }
        let total = 0;
        let members = [];
        paidBy.forEach((value, key) => {
            members.push({ name: key, amount: value });
            total += value;
        });
        setTotals({ total, members });
    };

    useEffect(() => {
        calculateTotals();
    }, [details]);

    // const fetchOutingDetails = async () => {
    //     let outingDetails = JSON.parse(await getData(`outing-${id}`));
    //     setDetails(outingDetails);
    // };

    // useEffect(() => {
    //     fetchOutingDetails();
    // }, [id]);

    return (
        <>
            {/* Top bar */}
            <TopBar title={details?.name} icon="plus" />

            <ScrollView>
                {/* Group memebrs and total expenditure */}
                <View className="bg-white m-3 mb-0 p-7 px-8 rounded-lg">
                    {/* Table title */}
                    <View className="flex-row items-center justify-between pb-2 mb-2 border-b-2">
                        <Text className="font-semibold text-lg">
                            Group members
                        </Text>
                        <Text className="font-semibold text-lg">Paid</Text>
                    </View>

                    {/* Members list and expenditure */}
                    {totals.members.map((item, index) => (
                        <View
                            className="flex-row items-center justify-between"
                            key={index}>
                            <Text className="w-[70%]" numberOfLines={1}>
                                {item.name}
                            </Text>
                            <Text>{item.amount}</Text>
                        </View>
                    ))}

                    {/* Total expenditure */}
                    <View className="flex-row items-center justify-between pt-2 mt-2 border-t-2">
                        <Text>Total expenditure</Text>
                        <Text>{totals.total}</Text>
                    </View>
                </View>

                {/* Expenditure list header */}
                <View className="bg-black m-3 mb-0 rounded-lg flex-row">
                    <View className="w-28 p-2 flex items-center justify-center">
                        <Text className="text-white font-semibold">
                            Paid by
                        </Text>
                    </View>
                    <View className="flex-row flex-1 p-3 border-l-2 border-white">
                        <Text className="text-white font-semibold">
                            Paid for
                        </Text>
                    </View>
                </View>

                {details.payments.map((item, index) => {
                    return <ExpenditureItem key={index} data={item} />;
                })}
            </ScrollView>
        </>
    );
}

export default index;
