import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
//Where the style sheet is located, make edits to the style here
import { styles } from "../styles/style";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import * as SecureStore from "expo-secure-store";
const HomeScreen = ({ navigation, route }) => {
  const { user } = route.params;

  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      console.log(user.token);
      const response = await axios.post(
        "http://mindmagic.pythonanywhere.com/api/logout/",
        null,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      await SecureStore.deleteItemAsync("user");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Your Recommended Counsellor</Text>
        <Text>Latest Forum Post</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
