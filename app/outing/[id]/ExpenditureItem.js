import { Text, View } from "react-native";

// Expenditure list item for outing screen showing name, spending, and spent for info
export function ExpenditureItem(props) {
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
