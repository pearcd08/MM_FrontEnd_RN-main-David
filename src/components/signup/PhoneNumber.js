// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/style";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";

const PhoneNumber = ({
  prevStep,
  nextStep,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  isUpdate,
  handleUpdate,
  handleCancel,
  isCounsellor,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber,
      email,
    },
  });

  const handleNext = (data) => {
    setEmail(data.email);
    if (data.phone) {
      setPhoneNumber(data.phone);
    }

    nextStep();
  };

  //UPDATE FUNCTIONS
  const handle_Cancel = () => {
    handleCancel();
  };

  // WAIT FOR EACH SET TO FINISH BEFORE GOING TO NEXT
  const handle_Update = async (data) => {
    const updateData = {
      user: {
        email: data.email,
      },
      phone: data.phone,
    };
    handleUpdate(updateData);
  };

  //TO DO
  // Check Email availability

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {" "}
          {isUpdate ? "Update" : "What's"} your {"\n"} Contact Details?
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          control={control}
          header={"Enter Email Address"}
          keyboardType={"email-address"}
          name="email"
          fieldName="email"
          placeholder="Enter Email Address"
          defaultValue={email || ""}
          rules={{
            required: "Email Address is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
          }}
        />

        <CustomTextInput
          control={control}
          keyboardType={"numeric"}
          returnKeyType="done"
          header={"Enter Phonenumber"}
          name="phone"
          fieldName="phone"
          placeholder="Enter Phone Number"
          defaultValue={phoneNumber || ""}
          rules={{
            ...(isCounsellor && {
              required: "Phone number is required",
            }),

            maxLength: {
              value: 15,
              message: "Phone number must be less than 15 numbers",
            },
            minLength: {
              value: 7,
              message: "Phone number must be atleast 7 numbers",
            },
          }}
        />
      </View>

      {isUpdate ? (
        <View style={styles.buttonContainer}>
          <CustomButton text={"Cancel"} type="small" onPress={handle_Cancel} />
          <CustomButton
            text={"Update"}
            type="small"
            onPress={handleSubmit(handle_Update)}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton text={"Back"} type="small" onPress={prevStep} />
          <CustomButton
            text={"Next"}
            type="small"
            onPress={handleSubmit(handleNext)}
          />
        </View>
      )}
    </View>
  );
};

export default PhoneNumber;
