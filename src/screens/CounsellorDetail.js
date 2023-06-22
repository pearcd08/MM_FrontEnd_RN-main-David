// Created by David Pearce 12/05/23
// Updated 22/05/23

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/style";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import KeywordBadge from "../forum/KeywordBadge";

const CounsellorDetail = ({ navigation, route }) => {
  const { user, counsellorID } = route.params;

  // STATE FOR THE COUNSELLOR
  const [counsellor, setCounsellor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addressString, setAddressString] = useState("");

  // GET THE SELECTED COUNSELLORS DETAILS
  useEffect(() => {
    axios
      .get(
        `http://mindmagic.pythonanywhere.com/api/counsellor/${counsellorID}/`,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setCounsellor(response.data);
        createAddressString();
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [counsellorID, user.token]);

  useEffect(() => {
    if (counsellor) {
      createAddressString();
      console.log("ADDRESS STRING");
    }
  }, [counsellor]);

  // TURN THE ADDRESS COMPONENTS INTO A MULTILINE STRING
  const createAddressString = () => {
    setAddressString(
      (counsellor.businessName ? counsellor.businessName + "\n" : "") +
        (counsellor.addressLine1 ? counsellor.addressLine1 : "") +
        (counsellor.addressLine2 ? "\n" + counsellor.addressLine2 : "") +
        (counsellor.suburb ? "\n" + counsellor.suburb : "") +
        "\n" +
        counsellor.city +
        ",  " +
        counsellor.postcode
    );
  };

  // OPEN THE DEFAULT PHONE APP ON ANDROID/iOS USING THE COUNSELLORS PHONE NUMBER
  const handlePhone = () => {
    if (counsellor && counsellor.phone) {
      const phoneNumber = counsellor.phone;
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  // OPEN THE DEFAULT EMAIL APP ON ANDROID/iOS USING THE COUNSELLORS PHONE NUMBER
  const handleEmail = () => {
    if (counsellor && counsellor.user.email) {
      const emailAddress = counsellor.user.email;
      Linking.openURL(`mailto:${emailAddress}`);
    }
  };

  // OPEN A CHAT WINDOW WITH COUNSELLOR AND LOGGED IN USER
  const handleChat = () => {};

  // CHECKS WHAT PLATFORM USER IS ON
  // CREATES A STRING FROM THE COUNSELLORS ADDRESS COMPONENTS
  // OPENS THE DEFAULT MAPS APP WITH THE SEARCH QUERY BEING THE ADDRESS STRING
  const handleDirections = () => {
    const addressString =
      (counsellor.addressLine1 ? counsellor.addressLine1 + ", " : "") +
      (counsellor.addressLine2 ? counsellor.addressLine2 + ", " : "") +
      (counsellor.suburb ? counsellor.suburb + ", " : "") +
      counsellor.city +
      ", " +
      counsellor.postcode;

    console.log(addressString);

    const addressURI = encodeURIComponent(addressString);

    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${addressURI}`,
      android: `https://www.google.com/maps/search/?api=1&query=${addressURI}`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {counsellor && (
          <ScrollView style={{ width: "100%" }}>
            <View style={localStyles.counsellorContainer}>
              <View style={localStyles.nameContainer}>
                <Text style={localStyles.nameText}>
                  Dr. {counsellor.firstName} {counsellor.lastName}
                </Text>
                <Text style={localStyles.businessText}>
                  {counsellor.gender.name}
                </Text>
                <Text style={localStyles.businessText}>
                  {counsellor.culture.name}
                </Text>
              </View>

              <Text style={localStyles.header}>
                About {counsellor.firstName}
              </Text>

              <View style={localStyles.container}>
                <Text style={localStyles.bioText}>{counsellor.biography}</Text>
              </View>
              <Text style={localStyles.header}>Address:</Text>
              <View style={localStyles.container}>
                <Text style={localStyles.bioText}>{addressString}</Text>
              </View>

              <Text style={localStyles.header}>Contact:</Text>
              <View style={localStyles.contactContainer}>
                <View style={localStyles.iconContainer}>
                  <MaterialIcons
                    name="phone"
                    size={40}
                    color="#F49097"
                    onPress={() => handlePhone()}
                  />
                  <MaterialIcons
                    name="email"
                    size={40}
                    color="#F49097"
                    onPress={() => handleEmail()}
                  />

                  <MaterialIcons
                    name="directions"
                    size={40}
                    color="#F49097"
                    onPress={() => handleDirections()}
                  />
                </View>
              </View>

              <Text style={localStyles.header}>Languages:</Text>
              <View style={localStyles.container}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {counsellor.preferredLanguages.map((language) => {
                    return (
                      <View key={language.id} style={{ margin: 10 }}>
                        <KeywordBadge keyword={language.name} />
                      </View>
                    );
                  })}
                </View>
              </View>

              <Text style={localStyles.header}>Specialties:</Text>
              <View style={localStyles.container}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {counsellor.mentalDisorders.map((disorder) => {
                    return (
                      <View key={disorder.id} style={{ margin: 10 }}>
                        <KeywordBadge keyword={disorder.name} />
                      </View>
                    );
                  })}
                </View>
              </View>

              <Text style={localStyles.header}>Treatment Methods:</Text>
              <View style={localStyles.container}>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {counsellor.treatmentMethods.map((method) => {
                    return (
                      <View key={method.id} style={{ margin: 10 }}>
                        <KeywordBadge keyword={method.name} />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  counsellorContainer: {
    flex: 4,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  nameContainer: {
    marginTop: 20,
    width: "85%",
  },

  nameText: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    verticalAlign: "bottom",
  },
  businessText: {
    fontFamily: "Inter",
    fontSize: 18,
    textAlign: "left",
    verticalAlign: "bottom",
  },

  header: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    verticalAlign: "bottom",
    left: "3%",
    color: "#F49097",
    width: "90%",
    marginTop: 10,
  },

  container: {
    width: "90%",
    margin: 5,
    backgroundColor: "#F2F5FF",
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },

  bioText: {
    fontFamily: "Inter",
    fontSize: 16,
    textAlign: "left",
    verticalAlign: "bottom",
    margin: "3%",
  },

  contactContainer: {
    width: "90%",

    backgroundColor: "#F2F5FF",
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contactHeader: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    verticalAlign: "bottom",
    left: "3%",
    top: -25,
    color: "#F49097",
  },

  iconContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CounsellorDetail;
