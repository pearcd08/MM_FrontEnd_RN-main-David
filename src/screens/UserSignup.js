// Updated By David Pearce 31/04/2023
// Added Patient/Counsellor Step Array
// Updated prevStep & nextStep
// Updated 09/05/2023
// Added JSON data for each user type to send to API
// Created Axios calls.

import React, { useState, useEffect } from "react";
import { View, Alert, Text } from "react-native";
import axios from "axios";
import UserType from "../components/signup/UserType";
import DateOfBirth from "../components/signup/DateOfBirth";
import Address from "../components/signup/Address";
import PhoneNumber from "../components/signup/PhoneNumber";
import Identity from "../components/signup/Identity";
import Culture from "../components/signup/Culture";
import Religion from "../components/signup/Religion";
import Languages from "../components/signup/Languages";
import MentalDisorders from "../components/signup/MentalDisorders";
import CounsellorPreference from "../components/signup/Preference";
import LoginDetails from "../components/signup/LoginDetails";
import FullName from "../components/signup/Full_Name";
import TreatmentMethods from "../components/signup/TreatmentMethods";
import Biography from "../components/signup/Biography";
import { styles } from "../styles/style";

const UserSignup = ({ navigation }) => {
  {
    // Current step of the signup process
    const [step, setStep] = useState(1);

    // Setters for the user type
    const [isPatient, setIsPatient] = useState(false);
    const [isCounsellor, setIsCounsellor] = useState(false);

    // Patient and Counsellor fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [streetAddress1, setStreetAddress1] = useState("");
    const [streetAddress2, setStreetAddress2] = useState("");
    const [suburb, setSuburb] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [sexuality, setSexuality] = useState("");
    const [culture, setCulture] = useState("");
    const [religion, setReligion] = useState("");
    const [languages, setLanguages] = useState([]);
    const [mentalDisorders, setMentalDisorders] = useState([]);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Patient only fields
    const [counsellorPreference, setCounsellorPreference] = useState("");

    // Counsellor only Fields
    const [businessName, setBusinessName] = useState("");
    const [treatmentMethods, setTreatmentMethods] = useState([]);
    const [biography, setBiography] = useState("");

    //RAW JSON DATA FOR THE PATIENT
    const patientData = JSON.stringify ({
      user: {
        username: username,
        email: email,
        password: password,
      },
      firstName: firstName,
      lastName: lastName,
      addressLine1: streetAddress1,
      addressLine2: streetAddress2,
      suburb: suburb,
      city: city,
      postcode: postcode,
      phone: phoneNumber,
      culture: culture,
      religion: religion,
      sexuality: sexuality,
      gender: gender,
      preferredCounsellorGender: counsellorPreference,
      preferredLanguages: languages,
      mentalDisorders: mentalDisorders,
    });

    // IF ISSUES WITH NON REQUIRED FIELDS ADD SEPERATELY
    if (dateOfBirth) {
      patientData.dateOfBirth = dateOfBirth;
    }

    //RAW JSON DATA FOR THE COUNSELLOR
    const counsellorData = JSON.stringify({
      user: {
        username: username,
        email: email,
        password: password,
      },
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      businessName: businessName,
      addressLine1: streetAddress1,
      addressLine2: streetAddress2,
      suburb: suburb,
      city: city,
      postcode: postcode,
      phone: phoneNumber,
      culture: culture,
      religion: religion,
      sexuality: sexuality,
      gender: gender,
      biography: biography,
      preferredLanguages: languages,
      mentalDisorders: mentalDisorders,
      treatmentMethods: treatmentMethods,
    });

    // CHECK IF USER IS A PATIENT OR COUNSELLOR
    // THEN START APPRORIATE FUNCTION
    const saveUser = () => {
      if (isCounsellor) {
        createCounsellor();
      } else if (!isCounsellor) {
        createPatient();
      }
    };

    // FUNCTION TO CREATE A PATIENT
    // TO DO: ADD MORE ERROR MESSAGES, LIKE USERNAME IS ALREADY IN USE
    const createPatient = () => {
      console.log(patientData);
      const config = {
        method: "post",
        url: "http://mindmagic.pythonanywhere.com/api/patient/create/",
        headers: {
          "Content-Type": "application/json",
        },
        data: patientData,
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          Alert.alert("Success", "Welcome to Mind Magic!");
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // FUNCTION TO CREATE A COUNSELLOR
    // TO DO: ADD MORE ERROR MESSAGES, LIKE USERNAME IS ALREADY IN USE
    const createCounsellor = () => {
      console.log(counsellorData);
      const config = {
        method: "post",
        url: "http://mindmagic.pythonanywhere.com/api/counsellor/create/",
        headers: {
          "Content-Type": "application/json",
        },
        data: counsellorData,
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          Alert.alert(
            "Success",
            "Welcome to Mind Magic \nLogin to start using our services"
          );
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // The steps of the signin process each usertype requires stored in Array
    const patientSteps = [1, 2, 3, 4, 5, 6, 7, 9, 10, 12, 13, 14];
    const counsellorSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14];

    // Find out what usertype is currently using the signup form
    // If the step is 2, go back to pick user type
    // Else find the index that contains the current step in the usertype's array
    // And minus one
    const prevStep = () => {
      if (step == 1) {
        navigation.navigate("Login");
      } else if (isPatient) {
        const arrayIndex = patientSteps.indexOf(step) - 1;
        setStep(patientSteps[arrayIndex]);
      } else if (isCounsellor) {
        const arrayIndex = counsellorSteps.indexOf(step) - 1;
        setStep(counsellorSteps[arrayIndex]);
      }
    };

    // Find out what usertype is currently using the signup form
    // If the step is login details, complete the signin process
    // Else find the index that contains the current step in the usertype's array
    // And add one
    const nextStep = () => {
      if (isPatient) {
        const arrayIndex = patientSteps.indexOf(step) + 1;
        setStep(patientSteps[arrayIndex]);
      } else if (isCounsellor) {
        const arrayIndex = counsellorSteps.indexOf(step) + 1;
        setStep(counsellorSteps[arrayIndex]);
      }
    };

    // THE STEP OF THE SIGNUP PROCESS DECIDES WHAT COMPONENT WILL BE SHOWN
    // EACH COMPONENT HAS PROPS PASSED INTO IT
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.homeTitle}> Mind Magic </Text>
        </View>

        {step === 1 && (
          <UserType
            prevStep={prevStep}
            nextStep={nextStep}
            isCounsellor={isCounsellor}
            setIsCounsellor={setIsCounsellor}
            isPatient={isPatient}
            setIsPatient={setIsPatient}
          />
        )}
        {step === 2 && (
          <FullName
            prevStep={prevStep}
            nextStep={nextStep}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            isCounsellor={isCounsellor}
          />
        )}

        {step === 3 && (
          <DateOfBirth
            dateOfBirth={dateOfBirth}
            setDateOfBirth={setDateOfBirth}
            nextStep={nextStep}
            prevStep={prevStep}
            isCounsellor={isCounsellor}
          />
        )}

        {step === 4 && (
          <Culture
            culture={culture}
            setCulture={setCulture}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 5 && (
          <Identity
            gender={gender}
            setGender={setGender}
            sexuality={sexuality}
            setSexuality={setSexuality}
            prevStep={prevStep}
            nextStep={nextStep}
            isCounsellor={isCounsellor}
          />
        )}

        {step === 6 && (
          <Religion
            religion={religion}
            setReligion={setReligion}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 7 && (
          <MentalDisorders
            mentalDisorders={mentalDisorders}
            setMentalDisorders={setMentalDisorders}
            prevStep={prevStep}
            nextStep={nextStep}
            isCounsellor={isCounsellor}
          />
        )}

        {step === 8 && (
          <TreatmentMethods
            treatmentMethods={treatmentMethods}
            setTreatmentMethods={setTreatmentMethods}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 9 && (
          <Languages
            languages={languages}
            setLanguages={setLanguages}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 10 && (
          <CounsellorPreference
            counsellorPreference={counsellorPreference}
            setCounsellorPreference={setCounsellorPreference}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 11 && (
          <Biography
            biography={biography}
            setBiography={setBiography}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )}

        {step === 12 && (
          <PhoneNumber
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 13 && (
          <Address
            businessName={businessName}
            setBusinessName={setBusinessName}
            streetAddress1={streetAddress1}
            setStreetAddress1={setStreetAddress1}
            streetAddress2={streetAddress2}
            setStreetAddress2={setStreetAddress2}
            suburb={suburb}
            setSuburb={setSuburb}
            city={city}
            setCity={setCity}
            postcode={postcode}
            setPostcode={setPostcode}
            nextStep={nextStep}
            prevStep={prevStep}
            isCounsellor={isCounsellor}
          />
        )}

        {step === 14 && (
          <LoginDetails
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            prevStep={prevStep}
            createPatient={createPatient}
            saveUser={saveUser}
          />
        )}

        <View style={styles.bottomContainer}></View>
      </View>
    );
  }
};

export default UserSignup;
