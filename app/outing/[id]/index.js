import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import EmptyList from "../../../components/EmptyList";
import TopBar from "../../../components/TopBar";
import { getData } from "../../../utils/kvStore";

function ExpenditureItem(props) {
    return (
        <View className="bg-white m-3 mt-0 rounded-lg flex-row">
            {/* Spent by */}
            <View className="bg-black w-28 p-2 rounded-lg rounded-tr-none rounded-br-none flex items-center justify-center">
                <Text
                    className="text-white text-center text-xs font-light"
                    numberOfLines={2}>
                    {props.data.description}
                </Text>
                <Text
                    className="text-white font-semibold text-lg"
                    numberOfLines={1}>
                    {props.data.amount}
                </Text>
                <Text
                    className="text-white text-xs font-semibold"
                    numberOfLines={1}>
                    {props.data.by}
                </Text>
            </View>

            {/* Spent for list */}
            <View className="flex-row flex-wrap flex-1 gap-[6] p-3 py-7">
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
                                {Math.round(item.amount * 100) / 100}
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

    const [details, setDetails] = useState(null);

    const calculateTotals = (details) => {
        let paidBy = new Map();
        for (let member of details.members) paidBy.set(member, 0);
        for (let payment of details.payments) {
            paidBy.set(payment.by, paidBy.get(payment.by) + payment.amount);
        }
        let totalSpending = 0;
        let spendingByMember = [];
        paidBy.forEach((value, key) => {
            spendingByMember.push({ name: key, amount: value });
            totalSpending += value;
        });
        return { totalSpending, spendingByMember };
    };

    const fetchOutingDetails = async () => {
        let outingDetails = JSON.parse(await getData(`outing-${id}`));
        let totals = calculateTotals(outingDetails);
        setDetails({ ...outingDetails, ...totals });
    };

    useEffect(() => {
        fetchOutingDetails();
    }, [id]);

    return (
        <>
            {/* Top bar */}
            <TopBar
                title={details?.name}
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

                        {details.payments.length === 0 ? <EmptyList /> : null}

                        {details.payments.map((item, index) => {
                            return <ExpenditureItem key={index} data={item} />;
                        })}
                    </ScrollView>
                </>
            )}
        </>
    );
}

export default index;
