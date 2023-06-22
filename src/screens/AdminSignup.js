// Created 23/05/2023

import React, { useState, useEffect, useRef } from "react";
import { View, Alert, Text, ScrollView, Platform } from "react-native";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { styles } from "../styles/style";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

const AdminSignup = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //References for each text input

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const businessRef = useRef(null);
  const street1Ref = useRef(null);
  const street2Ref = useRef(null);
  const suburbRef = useRef(null);
  const cityRef = useRef(null);
  const postCodeRef = useRef(null);
  const usernameRef = useRef(null);
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);

  const password1 = watch("password1");

  const focusNextInput = (ref) => {
    ref.current && ref.current.focusInput();
  };
  // Check is user is admin
  const [isAdmin, setIsAdmin] = useState(true);

  // USE EFFECT TO CHECK USER GROUP

  //RAW JSON DATA FOR THE NEW ADMIN
  const saveUser = (data) => {
    console.log(data);
    const adminData = JSON.stringify({
      user: {
        username: data.userName,
        email: data.email,
        password: data.password2,
      },
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
    createAdmin(adminData);
  };

  // FUNCTION TO CREATE AN ADMIN
  const createAdmin = (adminData) => {
    const config = {
      headers: {
        Authorization: `token ${user.token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://mindmagic.pythonanywhere.com/api/siteadmin/create/",
        adminData,
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
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
        ref={firstNameRef}
        focusNextInput={() => focusNextInput(lastNameRef)}
        handleSubmit={handleSubmit}
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
        ref={lastNameRef}
        focusNextInput={() => focusNextInput(dobRef)}
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
        ref={dobRef}
        focusNextInput={() => focusNextInput(emailRef)}
      />

      <CustomTextInput
        control={control}
        header={"Admin's Email Address"}
        keyboardType={"email-address"}
        name="email"
        fieldName="email"
        placeholder="Email Address"
        defaultValue={email || ""}
        rules={{
          required: "Email Address is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Admin's a valid email address",
          },
        }}
        ref={emailRef}
        focusNextInput={() => focusNextInput(phoneRef)}
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
            message: "Phone number must be atleast 7 numbers",
          },
        }}
        ref={phoneRef}
        focusNextInput={() => focusNextInput(businessRef)}
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
        ref={businessRef}
        focusNextInput={() => focusNextInput(street1Ref)}
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
        ref={street1Ref}
        focusNextInput={() => focusNextInput(street2Ref)}
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
        ref={street2Ref}
        focusNextInput={() => focusNextInput(suburbRef)}
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
        ref={suburbRef}
        focusNextInput={() => focusNextInput(cityRef)}
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
        ref={cityRef}
        focusNextInput={() => focusNextInput(postCodeRef)}
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
        ref={postCodeRef}
        focusNextInput={() => focusNextInput(usernameRef)}
      />

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
            message: "Username can only be 20 characters long",
          },
        }}
        ref={usernameRef}
        focusNextInput={() => focusNextInput(password1Ref)}
      />

      <CustomTextInput
        control={control}
        header={"Enter Password"}
        headerName="Password"
        fieldName="password1"
        placeholder="Password"
        secureTextEntry
        rules={{
          required: "Password is required",
        }}
        ref={password1Ref}
        focusNextInput={() => focusNextInput(password2Ref)}
      />

      <CustomTextInput
        control={control}
        header={"Confirm Password"}
        headerName="Password"
        fieldName="password2"
        placeholder="Password"
        secureTextEntry
        rules={{
          validate: (value) => value === password1 || "Passwords do not match",
        }}
        ref={password2Ref}
      />

      <View style={{ margin: 20 }}>
        <View style={styles.buttonContainer}>
          <CustomButton
            text={"Cancel"}
            type="small"
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            text={"Save"}
            type="small"
            onPress={handleSubmit(saveUser)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AdminSignup;
