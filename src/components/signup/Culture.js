// Updated By David Pearce 31/04/2023

import React, { useState, useCallback, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { styles } from "../../styles/style";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import CustomButton from "../CustomButton";
const Culture = ({
  prevStep,
  nextStep,
  culture,
  setCulture,
  isUpdate,
  handleCancel,
  handleUpdate,
}) => {
  const [cultures, setCultures] = useState([]);
  const [tempCulture, setTempCulture] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/cultures/")
      .then((response) => {
        const data = response.data.map((culture) => ({
          label: culture.name,
          value: culture.id,
        }));
        setCultures(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CHECK IF CULTURES HAS BEEN LOADED INTO PICKER
  useEffect(() => {
    const checkLoading = () => {
      if (cultures.length > 0) {
        setIsLoading(false);
      } else {
        setTimeout(checkLoading, 1000);
      }
    };

    checkLoading();
  }, [cultures]);

  // SETS THE TEMP VALUES TO THE PREVIOUSLY SAVED VALUES
  useEffect(() => {
    setTempCulture(culture);
  }, [culture]);

  const handleNext = () => {
    if (tempCulture) {
      setCulture(tempCulture);
      nextStep();
    } else {
      console.log("Select Culture");
      Alert.alert("Missing Field", "Culture is Required");
    }
  };

  //UPDATE FUNCTIONS
  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = () => {
    const updateData = {
      culture: tempCulture,
    };
    handleUpdate(updateData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update" : "What's"} your{"\n"} Culture?
        </Text>
      </View>

      <View style={styles.dropDownContainer}>
        <Text style={styles.inputHeader}>Select your Culture...</Text>
        <DropDownPicker
          open={open}
          value={tempCulture}
          items={cultures}
          setOpen={setOpen}
          setValue={setTempCulture}
          closeAfterSelecting={true}
          style={styles.dropDown}
          dropDownContainerStyle={styles.dropDown}
          placeholder={isLoading ? "Loading..." : "Pick an item"}
        />
      </View>

      {isUpdate ? (
        <View style={styles.buttonContainer}>
          <CustomButton text={"Cancel"} type="small" onPress={handle_Cancel} />
          <CustomButton text={"Update"} type="small" onPress={handle_Update} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <CustomButton text={"Back"} type="small" onPress={prevStep} />
          <CustomButton text={"Next"} type="small" onPress={handleNext} />
        </View>
      )}
    </View>
  );
};

export default Culture;
