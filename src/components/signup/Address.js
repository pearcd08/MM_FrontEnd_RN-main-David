// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { styles } from "../../styles/style";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";

const Address = ({
  prevStep,
  nextStep,
  businessName,
  setBusinessName,
  streetAddress1,
  setStreetAddress1,
  streetAddress2,
  setStreetAddress2,
  suburb,
  setSuburb,
  city,
  setCity,
  postcode,
  setPostcode,
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
      streetAddress1,
      streetAddress2,
      suburb,
      city,
      postcode,
      businessName,
    },
  });

  const handleNext = (data) => {
    if (isCounsellor) {
      setBusinessName(data.businessName);
    }
    setStreetAddress1(data.streetAddress1);
    setStreetAddress2(data.streetAddress2);
    setSuburb(data.suburb);
    setCity(data.city);
    setPostcode(data.postcode);
    nextStep();
  };

  //UPDATE FUNCTIONS
  const handle_Cancel = () => {
    handleCancel();
  };

  // WAIT FOR EACH SET TO FINISH BEFORE GOING TO NEXT
  const handle_Update = async (data) => {
    if (isCounsellor) {
      const updateData = {
        businessName: data.businessName,
        addressLine1: data.streetAddress1,
        addressLine2: data.streetAddress2,
        suburb: data.suburb,
        city: data.city,
        postcode: data.postcode,
      };
      handleUpdate(updateData);
    } else {
      const updateData = {
        businessName: data.businessName,
        addressLine1: data.streetAddress1,
        addressLine2: data.streetAddress2,
        suburb: data.suburb,
        city: data.city,
        postcode: data.postcode,
      };
      handleUpdate(updateData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update your Address" : "What's your Address?"}
        </Text>
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.inputContainer}>
            {isCounsellor ? (
              <CustomTextInput
                control={control}
                header={"Enter Business Name"}
                fieldName="businessName"
                placeholder="Enter Business Name"
                defaultValue={businessName || ""}
                rules={{
                  required: "Business Name is required",
                  maxLength: {
                    value: 100,
                    message: "Business Name can only be 100 characters long",
                  },
                }}
              />
            ) : (
              ""
            )}

            <CustomTextInput
              control={control}
              header={"Enter Street Address 1"}
              fieldName="streetAddress1"
              placeholder="Street Address 1"
              defaultValue={streetAddress1 || ""}
              rules={{
                required: isCounsellor
                  ? "Street Address 1 is required"
                  : undefined,
                maxLength: {
                  value: 100,
                  message: "Street Address 1 can only be 100 characters long",
                },
              }}
            />

            <CustomTextInput
              control={control}
              header={"Enter Street Address 2"}
              fieldName="streetAddress2"
              placeholder="Street Address 2"
              defaultValue={streetAddress2 || ""}
              rules={{
                maxLength: {
                  value: 100,
                  message: "Street Address 2 can only be 100 characters long",
                },
              }}
            />

            <CustomTextInput
              control={control}
              header={"Enter Suburb"}
              fieldName="suburb"
              placeholder="Suburb"
              defaultValue={suburb || ""}
              rules={{
                maxLength: {
                  value: 50,
                  message: "Suburb can only be 50 characters long",
                },
              }}
            />

            <CustomTextInput
              control={control}
              header={"Enter City"}
              fieldName="city"
              placeholder="City"
              defaultValue={streetAddress1 || ""}
              rules={{
                required: "City is required",
                maxLength: {
                  value: 100,
                  message: "Street Address 1 can only be 100 characters long",
                },
              }}
            />

            <CustomTextInput
              header={"Enter Postcode"}
              fieldName="postcode"
              placeholder="Postcode"
              keyboardType={"numeric"}
              returnKeyType="done"
              control={control}
              rules={{
                required: "Post Code is required",
                minLength: {
                  value: 4,
                  message: "Post Code must be 4 digits long",
                },
                maxLength: {
                  value: 4,
                  message: "Post Code must be 4 digits long",
                },
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {isUpdate ? (
          <View style={styles.buttonContainer}>
            <CustomButton
              text={"Cancel"}
              type="small"
              onPress={handle_Cancel}
            />
            <CustomButton
              text={"Save"}
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
    </View>
  );
};

export default Address;
