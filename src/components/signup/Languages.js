// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { styles } from "../../styles/style";
import CustomButton from "../CustomButton";
import axios from "axios";
import MultiSelect from "react-native-multiple-select";

const Languages = ({
  prevStep,
  nextStep,
  languages,
  setLanguages,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const [languageList, setLanguageList] = useState([]);
  const [tempLanguages, setTempLanguages] = useState([]);

  // PUT Languages INTO A TEMP ARRAY
  useEffect(() => {
    if (isUpdate) {
      const updateLanguages = languages.map((language) => language.id);
      setTempLanguages(updateLanguages);
    } else {
      setTempLanguages(languages);
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/languages/")
      .then((response) => {
        const data = response.data.map((language) => ({
          id: language.id,
          name: language.name,
        }));
        setLanguageList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // TRANSFERS THE TEMPLANGUGES ARRAY TO THE LANGUAGES ARRAY IN SIGNUP SCREEN
  const handleNext = () => {  
    if (tempLanguages.length >= 1) {
      setLanguages(tempLanguages);
      nextStep();
    } else {
      Alert.alert("Missing Field", "Select atleast one Language");
    }
  };

  //UPDATE FUNCTIONS

  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = () => {
    if (tempLanguages.length > 0) {
      const updateData = {
        preferredLanguages: tempLanguages,
      };
      handleUpdate(updateData);
    } else {
      Alert.alert("Missing Field", "Pick atleast one Language");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update your" : "What's your"}
          {"\n"} Preferred Languages?
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={{ height: 300, width: "80%" }}>
          <MultiSelect
            style={styles.input}
            items={languageList}
            uniqueKey="id"
            onSelectedItemsChange={setTempLanguages}
            selectedItems={tempLanguages}
            selectText="  Pick languages"
            searchInputPlaceholderText="Search..."
            tagContainerStyle={{ backgroundColor: "white", width: "100%" }}
            tagRemoveIconColor="#F49097"
            tagBorderColor="black"
            tagTextColor="black"
            selectedItemIconColor="#F49097"
            selectedItemTextColor="#CCC"
            fixedHeight={true}
            itemTextColor="#000"
            dropdownPosition="top"
            submitButtonColor="#55D6C2"
            submitButtonText="Confirm"
            styleDropdownMenuSubsection={styles.input}
            styleListContainer={{ height: 150 }}
            searchInputStyle={{
              height: 50,
            }}
          />
        </View>
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
    </View>
  );
};

export default Languages;
