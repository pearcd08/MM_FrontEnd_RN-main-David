// Updated By David Pearce 19/05/2023

import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { styles } from "../../styles/style";
import axios from "axios";
import MultiSelect from "react-native-multiple-select";
import CustomButton from "../CustomButton";

const TreatmentMethods = ({
  prevStep,
  nextStep,
  treatmentMethods,
  setTreatmentMethods,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const [treatmentList, setTreatmentList] = useState([]);
  const [tempTreatments, setTempTreatments] = useState([]);

  // PUT CURRENT UPDATE TREATMENTS IN A TEMP ARRAY
  useEffect(() => {
    if (isUpdate) {
      const updateTreatments = treatmentMethods.map(
        (treatment) => treatment.id
      );
      setTempTreatments(updateTreatments);
    } else {
      setTempTreatments(treatmentMethods);
    }
  }, []);

  // GET ALL TREATMENT METHODS FROM API
  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/treatmentmethods/")
      .then((response) => {
        const data = response.data.map((treatment) => ({
          id: treatment.id,
          name: treatment.name,
        }));

        setTreatmentList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // WHEN CLICK NEXT STORE THE TEMP ARRAY IN THE CREATE USER PARENT ARRAY
  const handleNext = () => {
    if (tempTreatments.length >= 1) {
      setTreatmentMethods(tempTreatments);
      nextStep();
    } else {
      Alert.alert("Missing Field", "Pick at least one Treatment Method");
    }
  };

  //UPDATE FUNCTIONS

  // WHEN CANCEL IS CLICKED SET THE STEP TO 1 IN THE PARENT ARRAY TO DISPLAY THE PARENT SCREEN
  const handle_Cancel = () => {
    handleCancel();
  };

  // PUT THE TEMP ARRAY INTO A DATA VARIABLE TO SEND TO THE UPDATE METHOD T0 SEND TO API
  const handle_Update = () => {
    if (tempTreatments.length > 0) {
      const updateData = {
        treatmentMethods: tempTreatments,
      };
      handleUpdate(updateData);
    } else {
      Alert.alert("Missing Field", "Pick atleast one Treatment Method");
    }
  };

  // BELOW IS SOME CONDITIONAL RENDERING DEPENDING IF THEY WERE SENT HERE FROM THE SIGNUP OR UPDATE PARENT
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update your\n" : "Select your\n"} Treatment Methods
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={{ height: 300, width: "80%" }}>
          <MultiSelect
            items={treatmentList}
            uniqueKey="id"
            onSelectedItemsChange={setTempTreatments}
            selectedItems={tempTreatments}
            selectText="  Select Treatment Methods"
            searchInputPlaceholderText="Search     
            ..."
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

export default TreatmentMethods;
