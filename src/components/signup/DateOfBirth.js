// Updated By David Pearce 31/04/2023

import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { styles } from "../../styles/style";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../CustomButton";

const DateOfBirth = ({
  dateOfBirth,
  setDateOfBirth,
  nextStep,
  prevStep,
  isCounsellor,
  isUpdate,
  handleUpdate,
  handleCancel,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateSelected, setDateSelected] = useState(false);
  const [dateString, setDateString] = useState("YYYY-MM-DD");
  const [showDatePicker, setShowDatePicker] = useState(false);

  //Animation idea
  // Shake calendar icon if no date selected when Next is clicked.

  useEffect(() => {
    if (dateOfBirth) {
      setDateString(dateOfBirth);
    }
  }, [dateOfBirth]);

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      if (Platform.OS === "android") {
        setShowDatePicker(false);
      }
      console.log(date);
      setSelectedDate(date);
      handleDateString(date);
      setDateSelected(true);
    }
  };

  const handleDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    setDateString(year + "-" + month + "-" + day);
  };

  const handleNext = () => {
    if (!dateSelected) {
      Alert.alert("Missing Field", "Date of Birth is Required");
    } else if (dateSelected) {
      setDateOfBirth(dateString);
      nextStep();
    }
  };

  //UPDATE FUNCTIONS

  const handle_Cancel = () => {
    handleCancel();
  };

  const handle_Update = () => {
    if (!dateSelected) {
      Alert.alert("Missing Field", "Date of Birth is Required");
    } else if (dateSelected) {
      const updateData = {
        dateOfBirth: dateString,
      };
      handleUpdate(updateData);
    }
  };

  const handle_Empty = () => {
    const updateData = {
      dateOfBirth: null,
    };
    handleUpdate(updateData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          {isUpdate ? "Update" : "What's"} your{"\n"}Date of Birth?
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.inputDate}
            value={dateString}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              alignSelf: "center",
              paddingLeft: 20,
            }}
          >
            <Icon name="calendar" size={45} color="#000" top={-5} />
          </TouchableOpacity>
        </View>
        <Modal visible={showDatePicker} animationType="fade" transparent={true}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles2.modalContainer}
            onPressOut={() => setShowDatePicker(false)}
          >
            <View style={styles2.modalContent}>
              <View>
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  themeVariant="light"
                  maximumDate={new Date()}
                  timeZoneOffsetInMinutes={undefined}
                />
              </View>
              {Platform.OS === "android" ? (
                ""
              ) : (
                <View style={{ marginTop: 20 }}>
                  <CustomButton
                    text={"Confirm"}
                    type="big"
                    onPress={() => setShowDatePicker(false)}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
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
        <TouchableOpacity onPress={isUpdate ? handle_Empty : nextStep}>
          <Text style={styles.skipText}>Skip entering your Date of Birth?</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

const styles2 = StyleSheet.create({
  // ...existing styles...

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DateOfBirth;
