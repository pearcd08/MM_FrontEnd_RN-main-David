// Updated By David Pearce 31/04/2023

import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { styles } from "../../styles/style";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import CustomButton from "../CustomButton";

const Identity = ({
  prevStep,
  nextStep,
  gender,
  setGender,
  sexuality,
  setSexuality,
  isCounsellor,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const [genders, setGenders] = useState([]);
  const [sexualities, setSexualities] = useState([]);
  const [tempGender, setTempGender] = useState(0);
  const [tempSex, setTempSex] = useState(0);
  const [genderOpen, setGenderOpen] = useState(false);
  const [sexualityOpen, setSexualityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/sexualities/")
      .then((response) => {
        const sexualitiesData = response.data.map((sexuality) => ({
          label: sexuality.name,
          value: sexuality.id,
        }));
        setSexualities(sexualitiesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const checkLoading = () => {
      if (sexualities.length > 0 && genders.length > 0) {
        setIsLoading(false);
      } else {
        setTimeout(checkLoading, 1000);
      }
    };
    checkLoading();
  }, [sexualities, genders]);

  // SETS THE TEMP VALUES TO THE PREVIOUSLY SAVED VALUES
  useEffect(() => {
    setTempGender(gender);
    setTempSex(sexuality);
    console.log("TEMP:" + tempGender + " " + tempSex);
  }, [gender, sexuality]);

  const onGenderOpen = () => {
    if (sexualityOpen) {
      setSexualityOpen(false);
    }
    setGenderOpen(true);
  };

  const onSexualityOpen = () => {
    if (genderOpen) {
      setGenderOpen(false);
    }
    setSexualityOpen(true);
  };

  const onGenderClose = () => {
    setGenderOpen(false);
  };

  const onSexualityClose = () => {
    setSexualityOpen(false);
    console.log("Selected Sexuality" + sexuality);
  };

  const handleNext = () => {
    if (tempGender || tempSex) {
      setGender(tempGender);
      setSexuality(tempSex);
      nextStep();
    } else {
      Alert.alert("Missing Field", "Select atleast one option");
    }
  };

  //UPDATE FUNCTIONS

  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = () => {
    const data = {
      sexuality: tempSex,
      gender: tempGender,
    };

    handleUpdate(data);
  };

  const handle_Empty = () => {
    const data = {
      sexuality: "",
      gender: "",
    };

    handleUpdate(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update" : "What's"} your{"\n"} Identity?
        </Text>
      </View>
      <View style={styles.dropDownContainer}>
        <Text style={styles.inputHeader}>Select your Gender</Text>
        <DropDownPicker
          style={styles.dropDown}
          placeholder={isLoading ? "Loading..." : "Select an item"}
          open={genderOpen}
          value={tempGender}
          items={genders}
          setOpen={onGenderOpen}
          setValue={setTempGender}
          onClose={onGenderClose}
          dropDownContainerStyle={styles.dropDown}
          closeAfterSelecting={true}
          zIndex={3}
        />

        {genderOpen ? (
          <></> // Render an empty fragment if genderOpen is true
        ) : (
          <>
            <Text style={styles.inputHeader}>Select your Sexuality</Text>
            <DropDownPicker
              style={styles.dropDown}
              placeholder={isLoading ? "Loading..." : "Select an item"}
              open={sexualityOpen}
              value={tempSex}
              items={sexualities}
              setOpen={onSexualityOpen}
              setValue={setTempSex}
              onClose={onSexualityClose}
              dropDownContainerStyle={styles.dropDown}
              closeAfterSelecting={true}
              zIndex={2}
            />
          </>
        )}
      </View>
      {isUpdate ? (
        <View style={styles.buttonContainer}>
          <CustomButton text={"Cancel"} type="small" onPress={handle_Cancel} />
          <CustomButton text={"Save"} type="small" onPress={handle_Update} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton text={"Back"} type="small" onPress={prevStep} />
          <CustomButton text={"Next"} type="small" onPress={handleNext} />
        </View>
      )}
      {!isCounsellor ? (
        <TouchableOpacity onPress={isUpdate ? handle_Empty : nextStep}>
          <Text style={styles.skipText}>Skip entering your Identity?</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

export default Identity;
