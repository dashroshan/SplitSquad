import AwesomeAlert from "react-native-awesome-alerts";

function AlertModal(props) {
    return (
        <AwesomeAlert
            show={props.alert.visible}
            showProgress={false}
            title="Uhh Oh 😶"
            message={props.alert.message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showConfirmButton={true}
            confirmText="Continue"
            confirmButtonColor="black"
            confirmButtonTextStyle={{
                fontSize: 16,
                margin: 8,
                marginHorizontal: 16,
                fontWeight: "700",
            }}
            confirmButtonStyle={{ borderRadius: 8 }}
            onConfirmPressed={() =>
                props.setAlert({ visible: false, message: "" })
            }
        />
    );
}

export default AlertModal;
