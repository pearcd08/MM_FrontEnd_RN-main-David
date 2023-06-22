// Updated By David Pearce 19/05/2023

import React, { useState, useEffect } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../styles/style";
import CustomButton from "../CustomButton";
import axios from "axios";
import MultiSelect from "react-native-multiple-select";

const MentalDisorders = ({
  prevStep,
  nextStep,
  mentalDisorders,
  setMentalDisorders,
  isCounsellor,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const [mentalList, setMentalList] = useState([]);
  const [tempMentalDisorders, setTempMentalDisorders] = useState([]);

  // PUT CURRENT MENTAL DISORDERS INTO A TEMP ARRAY
  useEffect(() => {
    if (isUpdate) {
      const updateDisorders = mentalDisorders.map((disorder) => disorder.id);
      setTempMentalDisorders(updateDisorders);
    } else {
      setTempMentalDisorders(mentalDisorders);
    }
  }, []);

  // GET ALL MENTAL ILLNESSES FROM API
  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/mentaldisorders/")
      .then((response) => {
        const data = response.data.map((mental) => ({
          id: mental.id,
          name: mental.name,
        }));

        setMentalList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // WHEN CLICK NEXT STORE THE TEMP ARRAY IN THE CREATE USER PARENT ARRAY
  const handleNext = () => {
    if (tempMentalDisorders.length > 0) {
      setMentalDisorders(tempMentalDisorders);
      nextStep();
    } else {
      Alert.alert("Missing Field", "Pick atleast one option");
    }
  };

  // IF USER CLICKS THE BOTTOM TEXT IT WILL EMPTY THE MENTAL DISORDERS IN THE CREATE USER PARENT ARRAY
  const handleSkip = () => {
    setMentalDisorders([]);
    nextStep();
  };

  //UPDATE FUNCTIONS

  // WHEN CANCEL IS CLICKED SET THE STEP TO 1 IN THE PARENT ARRAY TO DISPLAY THE PARENT SCREEN
  const handle_Cancel = () => {
    handleCancel();
  };

  // PUT THE TEMP ARRAY INTO A DATA VARIABLE TO SEND TO THE UPDATE METHOD T0 SEND TO API
  const handle_Update = () => {
    if (tempMentalDisorders.length > 0) {
      const updateData = {
        mentalDisorders: tempMentalDisorders,
      };
      handleUpdate(updateData);
    } else {
      Alert.alert("Missing Field", "Pick atleast one option");
    }
  };

  const handle_Empty = () => {
    const updateData = {
      mentalDisorders: [],
    };
    handleUpdate(updateData);
  };

  // BELOW IS SOME CONDITIONAL RENDERING DEPENDING IF THEY WERE SENT HERE FROM THE SIGNUP OR UPDATE PARENT
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate
            ? isCounsellor
              ? "Update what you can \n provide help with"
              : "Update what you need \n help with"
            : isCounsellor
            ? "What do you need \n  help with?"
            : "What can you provide \n help with?"}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            height: 350,
            width: "80%",
          }}
        >
          <MultiSelect
            items={mentalList}
            uniqueKey="id"
            onSelectedItemsChange={setTempMentalDisorders}
            selectedItems={tempMentalDisorders}
            selectText="  Pick items"
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
      {!isCounsellor ? (
        <TouchableOpacity onPress={isUpdate ? handle_Empty : handleSkip}>
          <Text style={styles.skipText}>I'm not sure yet...</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

export default MentalDisorders;
