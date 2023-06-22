// Created by Anna McColl 25-04-23
// Initially used for Profiles

import { Text, View } from "react-native";
import EditIcon from "../../icons/EditIcon";
import { styles } from "../../styles/style";

function PreferredCounsellorGender({ preferredCounsellorGender }) {
  return (
    <View style={styles.primaryCard}>
      <View style={styles.containerRow}>
        <Text>{preferredCounsellorGender}</Text>
        <EditIcon />
      </View>
    </View>
  );
}

export default PreferredCounsellorGender;
