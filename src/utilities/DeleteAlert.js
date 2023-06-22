import { Alert } from "react-native";

function DeleteAlert(message, confirmDelete) {
  return Alert.alert("Warning", message, [
    { text: "OK", onPress: () => confirmDelete(true) },
    { text: "Cancel", onPress: () => confirmDelete(false) },
  ]);
}
export default DeleteAlert;
