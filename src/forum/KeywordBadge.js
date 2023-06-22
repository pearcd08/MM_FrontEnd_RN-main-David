// Created by Anna McColl 21-05-23

import { View, Text, StyleSheet } from "react-native";

function KeywordBadge({ keyword }) {
  return (
    <View>
      <View style={internalStyle.keywordBadge}>
        <Text style={internalStyle.capitalizeText}>{keyword}</Text>
      </View>
    </View>
  );
}
export default KeywordBadge;

const internalStyle = StyleSheet.create({
  capitalizeText: {
    textTransform: "capitalize",
  },
  keywordBadge: {
    alignSelf: "flex-start",
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
    // for android - to give the container a shadow
    elevation: 4,
    // for iOS - to give the container a shadow
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  primaryCard: {
    // justifyContent: "center",
    // alignContent: 'center',
    padding: 16,
    marginBottom: 36,
    marginHorizontal: 50,
    borderRadius: 8,
    maxWidth: "95%",
    backgroundColor: "white",
    // for android - to give the container a shadow
    elevation: 4,
    // for iOS - to give the container a shadow
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
