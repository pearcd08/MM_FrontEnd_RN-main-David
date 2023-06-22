// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "../../styles/style";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import CustomButton from "../CustomButton";

const CounsellorPreference = ({
  prevStep,
  nextStep,
  counsellorPreference,
  setCounsellorPreference,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const [genders, setGenders] = useState([]);
  const [tempPreference, setTempPreference] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTempPreference(counsellorPreference);
  }, []);

  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/genders/")
      .then((response) => {
        const gendersData = response.data.map((gender) => ({
          label: gender.name,
          value: gender.id,
        }));
        setGenders(gendersData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNext = () => {
    if (tempPreference) {
      setCounsellorPreference(tempPreference);
      nextStep();
    } else {
      Alert.alert("Pick a prefered Counsellor Gender");
    }
  };

  const handleSkip = () => {
    setCounsellorPreference(null);
    nextStep();
  };

  //UPDATE FUNCTIONS

  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = () => {
    if (tempPreference) {
      const updateData = {
        preferredCounsellorGender: tempPreference,
      };

      handleUpdate(updateData);
    } else {
      Alert.alert("Missing Field", "Pick your preferred counsellor preference");
    }
  };

  const handle_Empty = () => {
    const updateData = {
      preferredCounsellorGender: null,
    };

    handleUpdate(updateData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update your " : "What's your "}
          prefered {"\n"} Counsellor Gender
        </Text>
      </View>

      <View style={styles.dropDownContainer}>
        <DropDownPicker
          style={{ width: "80%" }}
          placeholder="Make a selection"
          open={open}
          value={tempPreference}
          items={genders}
          setOpen={setOpen}
          s
          setValue={setTempPreference}
          dropDownContainerStyle={{ width: "80%" }}
          closeAfterSelecting={true}
        />
      </View>

      <View style={styles.buttonContainer}>
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
              onPress={handle_Update}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <CustomButton text={"Back"} type="small" onPress={prevStep} />
            <CustomButton text={"Next"} type="small" onPress={handleNext} />
          </View>
        )}
      </View>

      <TouchableOpacity onPress={isUpdate ? handle_Empty : handleSkip}>
        <Text style={styles.skipText}>I have no preference...</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounsellorPreference;
