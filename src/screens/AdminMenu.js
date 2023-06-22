import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
//Where the style sheet is located, make edits to the style here
import { styles } from "../styles/style";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import * as SecureStore from "expo-secure-store";
const AdminMenu = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { user } = route.params;

  // Get all site admins to display in a list
  // With detail(update)/delete

  //Button up top to add new site admin

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <CustomButton
          text={"Add new Site Admin"}
          type={"big"}
          onPress={() => navigation.navigate("AdminSignup", { user: user })}
        />

        <CustomButton
          text={"View Site Admins"}
          type={"big"}
          onPress={() =>
            navigation.navigate("AdminViewUsers", {
              user: user,
              userType: "siteadmins",
            })
          }
        />

        <CustomButton
          text={"View Counsellors"}
          type={"big"}
          onPress={() =>
            navigation.navigate("AdminViewUsers", {
              user: user,
              userType: "counsellors",
            })
          }
        />
        <CustomButton
          text={"View Patients"}
          type={"big"}
          onPress={() =>
            navigation.navigate("AdminViewUsers", {
              user: user,
              userType: "patients",
            })
          }
        />
      </View>
    </View>
  );
};

export default AdminMenu;
