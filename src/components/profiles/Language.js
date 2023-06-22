// Created by Anna McColl 25-04-23
// Initially used for Profiles

import { Text, View } from "react-native";
import EditIcon from "../../icons/EditIcon";
import { styles } from "../../styles/style";

function Language({ languages }) {
  return languages.map((language) => (
    <View style={styles.secondaryCard} key={{language}}>
            <View style={styles.containerRow}>
              <Text>{language}</Text>
              <EditIcon />
            </View>
          </View>))
};

export default Language;