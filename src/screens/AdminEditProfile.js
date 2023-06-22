import React, { useState, useEffect } from "react";
import { View, Alert, Text, ScrollView, Platform } from "react-native";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles } from "../styles/style";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

const AdminEditProfile = ({ navigation, route, isUpdate }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      dateOfBirth,
      businessName,
      streetAddress1,
      streetAddress2,
      suburb,
      city,
      postcode,
      phoneNumber,
    },
  });

  const { user } = route.params;

  // Admin fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(true);

  // useEffect to check user group
  useEffect(() => {
    fetchUser();
  }, []);

  // Get the user details
  const fetchUser = () => {
    console.log("FETCH USER");
    axios
      .get(`http://mindmagic.pythonanywhere.com/api/siteadmin/detail/`, {
        headers: {
          Authorization: `Token ` + user.token,
        },
      })
      .then(function (response) {
        const userData = response.data;
        console.log(userData);

        // Update the state and form field values
        updateUserStateAndFormValues(userData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // Update user state and set form field values
  const updateUserStateAndFormValues = (userData) => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setDateOfBirth(userData.dateOfBirth);
    setBusinessName(userData.businessName);
    setStreetAddress1(userData.addressLine1);
    setStreetAddress2(userData.addressLine2);
    setSuburb(userData.suburb);
    setCity(userData.city);
    setPostcode(userData.postcode);
    setPhoneNumber(userData.phone);

    // Set form field values using setValue from react-hook-form
    setValue("firstName", userData.firstName);
    setValue("lastName", userData.lastName);
    setValue("dateOfBirth", userData.dateOfBirth);
    setValue("businessName", userData.businessName);
    setValue("streetAddress1", userData.addressLine1);
    setValue("streetAddress2", userData.addressLine2);
    setValue("suburb", userData.suburb);
    setValue("city", userData.city);
    setValue("postcode", userData.postcode);
    setValue("phone", userData.phone);
    setIsLoading(false);
  };

  // Update user
  const updateUser = (data) => {
    console.log(data);
    const adminData = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      businessName: data.businessName,
      addressLine1: data.streetAddress1,
      addressLine2: data.streetAddress2,
      suburb: data.suburb,
      city: data.city,
      postcode: data.postcode,
      phone: data.phone,
    });
    updateAdmin(adminData);
  };

  // Function to update an admin
  const updateAdmin = (adminData) => {
    const config = {
      headers: {
        Authorization: `token ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .put(
        "http://mindmagic.pythonanywhere.com/api/siteadmin/update/",
        adminData,
        config
      )
      .then((response) => {
        console.log(response.data);
        Alert.alert("Admin Updated");
        setIsLoading(false);
        fetchUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.inputContainer}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={{ ...styles.container, minHeight: "250%" }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={false}
        >
          <CustomTextInput
            control={control}
            header="Admin's First Name"
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
            header="Admin's Last Name"
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

          <CustomTextInput
            control={control}
            header={"Admin's Date of Birth"}
            name="dateOfBirth"
            fieldName="dateOfBirth"
            placeholder="YYYY-MM-DD"
            defaultValue={dateOfBirth || ""}
            rules={{
              required: "Date of Birth is required",
              pattern: {
                value: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                message: "Please enter a valid date in the format YYYY-MM-DD",
              },
            }}
          />

          <CustomTextInput
            control={control}
            keyboardType={"numeric"}
            returnKeyType="done"
            header={"Admin's Phonenumber"}
            name="phone"
            fieldName="phone"
            placeholder="Phone Number"
            defaultValue={phoneNumber || ""}
            rules={{
              required: "Phone number is required",
              maxLength: {
                value: 15,
                message: "Phone number must be less than 15 numbers",
              },
              minLength: {
                value: 7,
                message: "Phone number must be at least 7 numbers",
              },
            }}
          />

          <CustomTextInput
            control={control}
            header={"Admin's Business Name"}
            fieldName="businessName"
            placeholder="Business Name"
            defaultValue={businessName || ""}
            rules={{
              required: "Business Name is required",
              maxLength: {
                value: 100,
                message: "Business Name can only be 100 characters long",
              },
            }}
          />

          <CustomTextInput
            control={control}
            header={"Admin's Street Address 1"}
            fieldName="streetAddress1"
            placeholder="Street Address 1"
            defaultValue={streetAddress1 || ""}
            rules={{
              required: "Street Address 1 is required",
              maxLength: {
                value: 100,
                message: "Street Address 1 can only be 100 characters long",
              },
            }}
          />

          <CustomTextInput
            control={control}
            header={"Admin's Street Address 2"}
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
            header={"Admin's Suburb"}
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
            header={"Admin's City"}
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
            header={"Admin's Postcode"}
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
          <View style={{ marginTop: 20 }}>
            <View style={styles.buttonContainer}>
              <CustomButton
                text={"Cancel"}
                type="small"
                onPress={() => navigation.goBack()}
              />
              <CustomButton
                text={"Update"}
                type="small"
                onPress={handleSubmit(updateUser)}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default AdminEditProfile;
