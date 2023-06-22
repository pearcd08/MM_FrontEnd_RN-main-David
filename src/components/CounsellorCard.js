// Updated By David Pearce 31/04/2023

import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import KeywordBadge from "../forum/KeywordBadge";

const CounsellorCard = ({
  name,
  business,
  suburb,
  city,
  postcode,
  percentage,
  keywords,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={{ textAlign: "right" }}>Match Score:{percentage}%</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.addressText}>
          {business}
          {"\n"}
          {suburb ? suburb : postcode}
          {"\n"}
          {suburb ? city : city}
        </Text>
        <View style={styles.keywordsContainer}>
          {keywords.map((keyword, index) => (
            <View key={index} style={styles.keywordRow}>
              <KeywordBadge keyword={keyword} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    overflow: "visible",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 350,

    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  nameText: {
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
  },

  addressText: {
    left: 20,
    fontSize: 20,
  },

  keywordsContainer: {
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  keywordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default CounsellorCard;
