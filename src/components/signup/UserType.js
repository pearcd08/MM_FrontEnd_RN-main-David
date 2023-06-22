// Updated By David Pearce 31/04/2023

import React, { useState, useCallback, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/style";
import CustomButton from "../CustomButton";

const UserType = ({
  prevStep,
  nextStep,
  isPatient,
  setIsPatient,
  isCounsellor,
  setIsCounsellor,
}) => {
  const [patientSelected, setPatientSelected] = useState(false);
  const [counsellorSelected, setCounsellorSelected] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Check the user type
  useEffect(() => {
    if (isPatient) {
      setPatientSelected(true);
      setCounsellorSelected(false);
    } else if (isCounsellor) {
      setPatientSelected(false);
      setCounsellorSelected(true);
    }
  }, []);

  // Enable or disable button is no required selection
  useEffect(() => {
    setIsButtonDisabled(!patientSelected && !counsellorSelected);
  }, [patientSelected, counsellorSelected]);

  const handleUserType = (code) => {
    if (code == "P") {
      setPatientSelected(true);
      setCounsellorSelected(false);
      setIsPatient(true);
      setIsCounsellor(false);
    } else if (code == "C") {
      setPatientSelected(false);
      setCounsellorSelected(true);
      setIsPatient(false);
      setIsCounsellor(true);
    }
  };

  const handleNext = async () => {
    if (!isButtonDisabled) {
      nextStep();
    } else {
      Alert.alert("Error", "Select a User Type!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Select User Type</Text>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={
            !patientSelected ? styles.unselectedButton : styles.selectedButton
          }
          onPress={() => handleUserType("P")}
        >
          <Text style={styles.buttonText}>Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            !counsellorSelected
              ? styles.unselectedButton
              : styles.selectedButton
          }
          onPress={() => handleUserType("C")}
        >
          <Text style={styles.buttonText}>Counsellor</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text={"Back"} type="small" onPress={prevStep} />
        <CustomButton text={"Next"} type="small" onPress={handleNext} />
      </View>
    </View>
  );
};

export default UserType;
