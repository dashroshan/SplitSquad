import { Dimensions, Image } from "react-native";

// Full width image shown when a list is empty
function EmptyList(props) {
    const { width } = Dimensions.get("window");

    return (
        <Image
            source={require("../assets/emptyList.jpg")}
            style={{
                width,
                height: width * 0.676,
                opacity: 0.3,
            }}
        />
    );
}

export default EmptyList;
