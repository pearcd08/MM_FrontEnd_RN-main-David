// Updated By David Pearce 31/04/2023

import React, { useState } from "react";
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "../../styles/style";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";

const Biography = ({
  prevStep,
  nextStep,
  biography,
  setBiography,
  isUpdate,
  handleCancel,
  handleUpdate,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      biography,
    },
  });

  const handleNext = (data) => {
    setBiography(data.biography);
    nextStep();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  //Update Functions
  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = (data) => {
    const updateData = {
      biography: data.biography,
    };
    handleUpdate(updateData);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {isUpdate ? "Update your \n Biography" : "Write your \n Biography"}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomTextInput
            control={control}
            header=""
            fieldName="biography"
            placeholder="Start writing here..."
            multiline={true}
            numberOfLines={8}
            defaultValue={biography || ""}
            returnKeyType={"none"}
            rules={{
              required: "Biography is required",
              maxLength: {
                value: 1000,
                message: "Biography must be less than 1000 characters",
              },
            }}
          />
        </View>

        {isUpdate ? (
          <View style={styles.buttonContainer}>
            <CustomButton
              text={"Cancel"}
              type="small"
              onPress={handle_Cancel}
            />
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

        <View style={styles.bottomContainer}></View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Biography;
