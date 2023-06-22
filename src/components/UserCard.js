// Updated By David Pearce 31/04/2023

import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import TrashIcon from "../icons/TrashIcon";

const UserCard = ({
  userID,
  userString,
  username,
  email,
  name,
  deleteUser,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.nameText}>User ID: {userID}</Text>
        <Text style={styles.nameText}>Username: {username}</Text>
        <Text style={styles.nameText}>Email: {email}</Text>
        <Text style={styles.nameText}>Full Name: {name}</Text>
        <View style={{ alignItems: "center", margin: 10 }}>
          <CustomButton
            text={"Delete " + userString}
            type={"delete"}
            onPress={() => deleteUser(userID)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    overflow: "visible",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 350,
    height: 175,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  nameText: {
    left: 5,
    fontSize: 20,
  },

  addressText: {
    left: 5,
    fontSize: 20,
  },

  icon1: {
    position: "absolute",
    width: 150,
    height: 30,
    backgroundColor: "#D9D9D9",
    top: 125,
    left: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  icon2: {
    position: "absolute",
    width: 150,
    height: 30,
    backgroundColor: "#D9D9D9",
    top: 125,
    right: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  iconText: {},
});

export default UserCard;
