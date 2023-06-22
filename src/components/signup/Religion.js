// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { styles } from "../../styles/style";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import CustomButton from "../CustomButton";

const Religion = ({
  prevStep,
  nextStep,
  religion,
  setReligion,
  isUpdate,
  handleUpdate,
  handleCancel,
  handleEmpty,
}) => {
  const [religious, setReligious] = useState(false);
  const [religions, setReligions] = useState([]);
  const [noSelected, setNoSelected] = useState(false);
  const [yesSelected, setYesSelected] = useState(false);
  const [tempReligion, setTempReligion] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/religions/")
      .then((response) => {
        const data = response.data.map((religion) => ({
          label: religion.name,
          value: religion.id,
        }));
        setReligions(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // SETS THE TEMP VALUES TO THE PREVIOUSLY SAVED VALUES
  useEffect(() => {
    setTempReligion(religion);
  }, [religion]);

  const handleAnswer = (answer) => {
    if (answer === "Y") {
      setYesSelected(true);
      setNoSelected(false);
    }
    if (answer === "N") {
      setNoSelected(true);
      setYesSelected(false);
    }
  };

  const handleNext = () => {
    if (!religious) {
      if (yesSelected) {
        setReligious(true);
      }
      if (noSelected) {
        if (isUpdate) {
          handle_Empty();
        } else {
          if (tempReligion) {
            setReligious(false);
            setReligion(null);
          } else {
            nextStep();
          }
        }
      } else if (!noSelected && !yesSelected) {
        Alert.alert("Missing Field", "Select atleast one option");
      }
    }
    if (religious) {
      if (tempReligion) {
        if (noSelected) {
          {
            isUpdate ? handle_Empty() : (setReligion(null), nextStep());
          }
        }
        if (yesSelected) {
          {
            isUpdate
              ? handle_Update()
              : (setReligion(tempReligion), nextStep());
          }
        }
      } else {
        setError(true);
      }
    }
  };

  const handleBack = () => {
    if (religious) {
      setReligious(false);
    } else {
      {
        isUpdate ? handle_Cancel() : prevStep();
      }
    }
  };

  //UPDATE FUNCTIONS

  const handle_Update = () => {
    const updateData = {
      religion: tempReligion,
    };

    handleUpdate(updateData);
  };

  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Empty = () => {
    const updateData = {
      religion: "",
    };
    handleUpdate(updateData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        {!religious ? (
          <Text style={styles.question}>Are you Religous?</Text>
        ) : (
          <Text style={styles.question}>What is your Religion?</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        {!religious ? (
          <View>
            <TouchableOpacity
              style={
                !yesSelected ? styles.unselectedButton : styles.selectedButton
              }
              onPress={() => handleAnswer("Y")}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                !noSelected ? styles.unselectedButton : styles.selectedButton
              }
              onPress={() => handleAnswer("N")}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.dropDownContainer}>
            <Text style={styles.inputHeader}>Select your Religion</Text>
            <DropDownPicker
              style={styles.dropDown}
              open={open}
              value={tempReligion}
              items={religions}
              setOpen={setOpen}
              setValue={setTempReligion}
              dropDownContainerStyle={styles.dropDown}
              closeAfterSelecting={true}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton text={"Back"} type="small" onPress={handleBack} />
        <CustomButton text={"Next"} type="small" onPress={handleNext} />
      </View>
    </View>
  );
};

export default Religion;
