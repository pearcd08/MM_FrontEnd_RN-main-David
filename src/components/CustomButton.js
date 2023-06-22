// Updated By David Pearce 31/04/2023

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({ onPress, text, type }) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 10,
      backgroundColor: "#F49097",
      width: 120,
      height: 50,
      justifyContent: "center",
    },

    bigButton: {
      borderRadius: 30,
      backgroundColor: "#55D6C2",
      width: 350,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },

    deleteButton: {
      borderRadius: 10,
      backgroundColor: "#F49097",
      width: 240,
      height: 50,
      justifyContent: "center",
    },

    buttonText: {
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  let buttonStyle = styles.button;
  if (type === "big") {
    buttonStyle = styles.bigButton;
  }
  if (type === "delete") {
    buttonStyle = styles.deleteButton;
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={buttonStyle}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
