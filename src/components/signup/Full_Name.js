// Updated By David Pearce 31/04/2023
// 23/05/2023 - Added Admin Conditional Rendering

import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/style";
import { useForm } from "react-hook-form";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";

const FullName = ({
  prevStep,
  nextStep,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  isCounsellor,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
    },
  });

  const handleNext = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    nextStep();
  };

  //UPDATE FUNCTIONS
  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = (data) => {
    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    handleUpdate(updateData);
  };

  const handle_Empty = () => {
    const updateData = {
      firstName: "",
      lastName: "",
    };
    handleUpdate(updateData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update" : "What's "}
          your Name?
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          control={control}
          header="Enter First Name"
          fieldName="firstName"
          placeholder="First name"
          defaultValue={firstName || ""}
          rules={{
            required: "First Name is required",
            maxLength: {
              value: 50,
              message: "First Name can only be 50 characters long",
            },
          }}
        />
        <CustomTextInput
          control={control}
          header="Enter Last Name"
          fieldName="lastName"
          placeholder="Last name"
          defaultValue={lastName || ""}
          rules={{
            required: "Last Name is required",
            maxLength: {
              value: 50,
              message: "Last Name can only be 50 characters long",
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

      <View>
        {!isCounsellor ? (
          <TouchableOpacity onPress={isUpdate ? handle_Empty : nextStep}>
            <Text style={styles.skipText}>Skip entering your name?</Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default FullName;
