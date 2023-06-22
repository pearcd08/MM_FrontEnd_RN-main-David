// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/style";
import { useForm } from "react-hook-form";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";

const LoginDetails = ({
  prevStep,
  username,
  setUsername,
  password,
  setPassword,
  saveUser,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // USING USEFORM WATCH THE VALUE OF PASSWORD1
  // USED TO COMPARE PASSWORD2 FOR MATCHING VALIDATION
  const password1 = watch("password1");

  // SET USERNAME AND PASSWORD
  const handleNext = async (data) => {
    setUsername(data.userName);
    setPassword(data.password1);
  };

  // SAVE USER ONLY TRIGGERS WHEN USERNAME AND PASSWORD SET IN PARENT COMPONENT
  useEffect(() => {
    if (password.length > 0 && username.length > 0) {
      saveUser();
    }
  }, [password, username]);

  //TO DO:
  // Check username availibility

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Give us your {"\n"} Login Details</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          control={control}
          header={"Enter Username"}
          name="userName"
          fieldName="userName"
          placeholder="Enter Username"
          defaultValue={username || ""}
          rules={{
            required: "Username is required",
            minLength: {
              value: 5,
              message: "Username must be atleast 5 characters",
            },
            maxLength: {
              value: 20,
              message: "Username must be less than 20 characters",
            },
          }}
        />
        <CustomTextInput
          control={control}
          header={"Enter Password"}
          headerName="Password"
          fieldName="password1"
          placeholder="Password"
          passwordInput={true}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
            maxLength: {
              value: 20,
              message: "Password must be less than 20 characters",
            },
          }}
        />

        <CustomTextInput
          style={{ top: -50 }}
          control={control}
          header={"Confirm Password"}
          headerName="Password"
          fieldName="password2"
          placeholder="Password"
          passwordInput={true}
          rules={{
            validate: (value) =>
              value === password1 || "Passwords do not match",
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Back"} type="small" onPress={prevStep} />
        <CustomButton
          text={"Save"}
          type="small"
          onPress={handleSubmit(handleNext)}
        />
      </View>
    </View>
  );
};

export default LoginDetails;
