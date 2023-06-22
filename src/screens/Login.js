import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { styles } from "../styles/style";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState({
    userID: null,
    token: null,
    group: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (data) => {
    console.log("Data:" + data.username + data.password);
    try {
      const response = await axios.post(
        "http://mindmagic.pythonanywhere.com/api/login/",
        {
          username: data.username,
          password: data.password,
        }
      );
      // GET THE LOGGED IN USER INFO
      const userID = response.data.user.id;
      const token = response.data.token;
      const group = response.data.group;
      const profile = response.data.user_data;
      setUser({ userID, token, group });
      await SecureStore.setItemAsync(
        "user",
        JSON.stringify({ userID, token, group, profile })
      );

      navigation.navigate("Home");
    } catch (error) {
      alert("Wrong credentials");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.homeTitle}>Mind Magic</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          header="Enter Username"
          fieldName="username"
          placeholder="Username"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <CustomTextInput
          header="Enter Password"
          fieldName="password"
          placeholder="Password"
          control={control}
          passwordInput={true}
          rules={{
            required: "Password is required",
          }}
        />

        <CustomButton
          text={"Login"}
          type={"big"}
          onPress={handleSubmit(handleLogin)}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("UserSignup")}>
            <Text style={{ fontSize: 18, color: "#FF005C" }}>Sign up!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
};

export default LoginScreen;
