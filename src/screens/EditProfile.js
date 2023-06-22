// Created by David Pearce 12/05/23

import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/style";
import axios from "axios";

import CustomButton from "../components/CustomButton";

// Signup Components
import Full_Name from "../components/signup/Full_Name";
import DateOfBirth from "../components/signup/DateOfBirth";
import Identity from "../components/signup/Identity";
import Culture from "../components/signup/Culture";
import Religion from "../components/signup/Religion";
import PhoneNumber from "../components/signup/PhoneNumber";
import Address from "../components/signup/Address";
import CustomUpdateField from "../components/CustomUpdateField";
import MentalDisorders from "../components/signup/MentalDisorders";
import CounsellorPreference from "../components/signup/Preference";
import Languages from "../components/signup/Languages";
import Biography from "../components/signup/Biography";
import TreatmentMethods from "../components/signup/TreatmentMethods";

function EditProfile({ navigation, route }) {
  const { user } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [gender, setGender] = useState("");
  const [genderName, setGenderName] = useState("");

  const [sexuality, setSexuality] = useState("");
  const [sexualityName, setSexualityName] = useState("");

  const [culture, setCulture] = useState("");
  const [cultureName, setCultureName] = useState("");

  const [religion, setReligion] = useState("");
  const [religionName, setReligionName] = useState("");

  // CONTACT DETAILS
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  // ADDRESS
  const [businessName, setBusinessName] = useState("");
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [mentalDisorders, setMentalDisorders] = useState([]);
  const [treatmentMethods, setTreatmentMethods] = useState([]);
  const [biography, setBiography] = useState("");
  const [counsellorPreference, setCounsellorPreference] = useState("");
  const [counsellorPreferenceName, setCounsellorPreferenceName] = useState("");
  const [languages, setLanguages] = useState([]);

  const [isCounsellor, setIsCounsellor] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);
  const [step, setStep] = useState(1);

  // STRING MADE UP OF WHAT ADDRESS FIELDS ARE PRESENT IN THE DATABASE FOR THE USER
  const [addressString, setAddressString] = useState("");
  // THE NUMBER OF LINES DEPENDING ON WHAT FIELDS ARE PRESENT
  const [addressLines, setAddressLines] = useState("");
  const [biographyLines, setBiographyLines] = useState(1);

  const [userType, setUserType] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user.group == 3) {
      setIsCounsellor(true);
      setUserType("counsellor");
      fetchUser();
      console.log("USER = COUNSELLOR");
    } else if (user.group == 2) {
      setIsCounsellor(false);
      setUserType("patient");
      fetchUser();
      console.log("USER = PATIENT");
    }
  }, []);

  // get the user on screen load
  useEffect(() => {
    fetchUser();
  }, [userType]);

  // get the user details
  const fetchUser = () => {
    axios
      .get(`http://mindmagic.pythonanywhere.com/api/${userType}/detail/`, {
        headers: {
          Authorization: `Token ` + user.token,
        },
      })
      .then(function (response) {
        data = response.data;
        console.log(data);

        // PERSONAL DETAILS
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDateOfBirth(data.dateOfBirth);
        // IDENTITY

        if (data.gender) {
          setGender(data.gender.id);
          setGenderName(data.gender.name);
        }
        if (!data.gender) {
          setGender("");
        }

        if (data.sexuality) {
          setSexuality(data.sexuality.id);
          setSexualityName(data.sexuality.name);
        }

        if (!data.sexuality) {
          setSexuality("");
        }

        setCulture(data.culture.id);
        setCultureName(data.culture.name);
        if (data.religion) {
          setReligion(data.religion.id);
          setReligionName(data.religion.name);
        }

        if (!data.religion) {
          setReligion("");
        }
        // CONTACT DETAILS
        setPhoneNumber(data.phone);
        setEmail(data.user.email);
        setStreetAddress1(data.addressLine1);
        setStreetAddress2(data.addressLine2);
        setSuburb(data.suburb);
        setCity(data.city);
        setPostcode(data.postcode);
        // PREFERENCES
        if (data.mentalDisorders.length > 0) {
          setMentalDisorders(data.mentalDisorders);
        }
        if (data.mentalDisorders.length === 0) {
          setMentalDisorders([]);
          console.log("NO MENTAL DISORDERS");
        }

        setLanguages(data.preferredLanguages);
        // PATIENT ONLY FIELD
        if (!isCounsellor) {
          if (data.preferredCounsellorGender !== null) {
            setCounsellorPreference(data.preferredCounsellorGender.id);
            setCounsellorPreferenceName(data.preferredCounsellorGender.name);
          }
          if (data.preferredCounsellorGender === null) {
            setCounsellorPreference(null);
            setCounsellorPreferenceName("No Counsellor Preference");
          }
        }
        // COUNSELLOR ONLY FIELDS
        if (isCounsellor) {
          setTreatmentMethods(data.treatmentMethods);
          setBiography(data.biography);
          setBusinessName(data.businessName);
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  // WHEN POSTCODE AND CITY ARE SET, START TO COUNT THE ADDRESS LINES
  useEffect(() => {
    if (postcode || city) {
      countAddressLines();
      setIsLoading(false);
    }
  }, [city, postcode, streetAddress1, streetAddress2, suburb]);

  // GET THE NUMBER OF LINES TO SEND TO THE CUSTOM UPDATE FIELD
  const countAddressLines = () => {
    let count = 0;
    if (isCounsellor && businessName.length > 0) {
      count++;
    }
    if (streetAddress1.length > 0) {
      count++;
    }
    if (streetAddress2.length > 0) {
      count++;
    }
    if (suburb.length > 0) {
      count++;
    }
    if (city !== null) {
      count++;
    }
    console.log("Line COUNT:" + count);
    setAddressLines(count);
    createAddressString();
  };

  // TURN THE ADDRESS COMPONENTS INTO A MULTILINE STRING
  const createAddressString = () => {
    setAddressString(
      (businessName ? businessName + "\n" : "") +
        (streetAddress1 ? streetAddress1 + "\n" : "") +
        (streetAddress2 ? streetAddress2 + "\n" : "") +
        (suburb ? suburb + "\n" : "") +
        city +
        ",  " +
        postcode
    );
  };

  // WHEN BIOGRAPHY IS SET, START COUNTING THE LINES IN THE BIOGRAPHY LINES
  useEffect(() => {
    if (biography) {
      countBiographyLines();
      setIsLoading(false);
    }
  }, [biography]);

  // FOR EVERY NEW LINE IN THE STRING, INCREASE THE LINE COUNT
  const countBiographyLines = () => {
    const count = biography.split("\n").length;
    setBiographyLines(count);
  };

  // WHEN USER CLICKS CANCEL BUTTON IN CHILD COMPONENT, SHOW THE UPDATE USER SCREEN
  const handleCancel = () => {
    setStep(1);
  };

  // WHEN USER CLICKS UPDATE BUTTON IN CHILD COMPONENT
  // THE CHILD COMPONENT SENDS THE DATA VARIABLE
  // THE DATA VARIABLE IS SENT TO THE UPDATE PATIENT FOR ITS DATA FIELD
  const handleUpdate = (updateData) => {
    setIsLoading(true);
    updateUser(updateData)
      .then(() => {
        setStep(1);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // TAKES THE UPDATE DATA FROM HANDLE UPDATE TO UPDATE THE FIELDS CHANGED IN THE CHILD COMPONENT
  // SO THAT ONLY THE CHILD COMPONENT FIELDS ARE UPDATED
  // THE URL IS CHANGED IF THE USER IS A PATIENT OR COUNSELLOR
  const updateUser = async (updateData) => {
    console.log(updateData);
    const config = {
      method: "put",
      url: `http://mindmagic.pythonanywhere.com/api/${userType}/update/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ` + user.token,
      },
      data: updateData,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      setIsUpdating(false);
      return fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteUser = async () => {
    const userID = user.profile.user.id;

    Alert.alert(
      "Warning",
      "Are you sure you want to delete your Account?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://mindmagic.pythonanywhere.com/api/user/${userID}/delete/`,
                {
                  headers: {
                    Authorization: `Token ${user.token}`,
                  },
                }
              );

              if (response.status === 204) {
                Alert.alert("Success", "Account Deleted!");
                await SecureStore.deleteItemAsync("user");
                navigation.navigate("Login");
              } else {
                Alert.alert(
                  "Error",
                  "Failed to delete account. Please try again."
                );
              }
            } catch (error) {
              console.log(error);
              Alert.alert(
                "Error",
                "An error occurred while deleting the account."
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {isLoading ? (
              <Text>Loading</Text>
            ) : (
              <ScrollView
                scrollIndicatorInsets={{ right: -10 }}
                style={{ flex: 1 }}
              >
                <Text style={styles.titleHeader}>Your Profile</Text>

                <View style={{ marginTop: 20 }}>
                  <CustomUpdateField
                    header={"My Name is..."}
                    text={
                      firstName
                        ? `${firstName} ${lastName}`
                        : "No Name Provided"
                    }
                    onPress={() => setStep(2)}
                    lines={1}
                  />
                </View>

                <CustomUpdateField
                  header={"I was born..."}
                  text={dateOfBirth ? `${dateOfBirth}` : "No Date of Birth"}
                  onPress={() => setStep(3)}
                  lines={1}
                />

                <CustomUpdateField
                  header={"I Identity as..."}
                  text={
                    !gender && !sexuality
                      ? "No gender or sexuality"
                      : !gender
                      ? `${sexualityName}`
                      : !sexuality
                      ? `${genderName}`
                      : `${sexualityName} ${genderName}`
                  }
                  onPress={() => setStep(4)}
                  lines={1}
                />

                <CustomUpdateField
                  header={"My Culture is..."}
                  text={`${cultureName}`}
                  onPress={() => setStep(5)}
                  lines={1}
                />

                <CustomUpdateField
                  header={"My Religion is..."}
                  text={religion ? `${religionName}` : "Non-Religious"}
                  onPress={() => setStep(6)}
                  lines={1}
                />
                <CustomUpdateField
                  header={"I can be contacted at..."}
                  text={email + "\n" + phoneNumber}
                  lines={phoneNumber ? 2 : 1}
                  onPress={() => setStep(7)}
                />

                <CustomUpdateField
                  header={
                    isCounsellor
                      ? "My Business Address is..."
                      : "My Address is..."
                  }
                  text={addressString}
                  lines={addressLines}
                  onPress={() => setStep(8)}
                />

                <CustomUpdateField
                  header={
                    isCounsellor
                      ? "I provide help with..."
                      : "I need help with..."
                  }
                  text={
                    mentalDisorders.length === 0
                      ? "No problems selected"
                      : mentalDisorders
                          .map((disorder) => disorder.name)
                          .join("\n")
                  }
                  // Make dynamic for how many disorders
                  // If more than 3 lines put "and 5 more" on next line
                  lines={
                    mentalDisorders.length === 0 ? 1 : mentalDisorders.length
                  }
                  onPress={() => setStep(9)}
                />

                {isCounsellor ? (
                  <CustomUpdateField
                    header={"My Treatment Methods are..."}
                    text={treatmentMethods
                      .map((method) => method.name)
                      .join("\n")}                 
                    lines={treatmentMethods.length}
                    onPress={() => setStep(13)}
                  />
                ) : (
                  ""
                )}

                <CustomUpdateField
                  header={
                    isCounsellor
                      ? "I speak these Languages..."
                      : "I want a Counsellor that speaks..."
                  }
                  text={languages.map((language) => language.name).join("\n")}           
                  lines={languages.length}
                  onPress={() => setStep(10)}
                />

                {isCounsellor ? (
                  <CustomUpdateField
                    header={"This is a Biography about me..."}
                    text={`${biography}`}
                    lines={biographyLines}
                    onPress={() => setStep(12)}
                  />
                ) : (
                  <CustomUpdateField
                    header={"I would prefer my Counsellor's gender to be:"}
                    text={`${counsellorPreferenceName}`}
                    lines={1}
                    onPress={() => setStep(11)}
                  />
                )}

                <View style={{ margin: 20 }}>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      text={"Delete Profile"}
                      type="delete"
                      onPress={() => deleteUser()}
                    />
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      )}
      {step === 2 && (
        <Full_Name
          firstName={firstName}
          lastName={lastName}
          isCounsellor={isCounsellor}
          isUpdate={isUpdate}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
      {step === 3 && (
        <DateOfBirth
          dateOfBirth={dateOfBirth}
          isCounsellor={isCounsellor}
          isUpdate={isUpdate}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
      {step === 4 && (
        <Identity
          gender={gender}
          sexuality={sexuality}
          isUpdate={isUpdate}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
      {step === 5 && (
        <Culture
          culture={culture}
          isUpdate={isUpdate}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}
      {step === 6 && (
        <Religion
          religion={religion}
          isUpdate={isUpdate}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}

      {step === 7 && (
        <PhoneNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}

      {step === 8 && (
        <Address
          businessName={businessName}
          streetAddress1={streetAddress1}
          streetAddress2={streetAddress2}
          suburb={suburb}
          city={city}
          postcode={postcode}
          isCounsellor={isCounsellor}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}

      {step === 9 && (
        <MentalDisorders
          mentalDisorders={mentalDisorders}
          isCounsellor={isCounsellor}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}
      {step === 10 && (
        <Languages
          languages={languages}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}

      {step === 11 && (
        <CounsellorPreference
          counsellorPreference={counsellorPreference}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}

      {step === 12 && (
        <Biography
          biography={biography}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}
      {step === 13 && (
        <TreatmentMethods
          treatmentMethods={treatmentMethods}
          setTreatmentMethods={setTreatmentMethods}
          isUpdate={isUpdate}
          handleUpdate={handleUpdate}
          handleCancel={handleCancel}
        />
      )}
    </View>
  );
}

export default EditProfile;
