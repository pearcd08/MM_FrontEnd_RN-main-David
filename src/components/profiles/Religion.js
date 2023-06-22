// Created by Anna McColl 25-04-23
// Initially used for Profiles

import { Text, View } from "react-native";
import EditIcon from "../../icons/EditIcon";
import { styles } from "../../styles/style";

function Religion({ religion }) {
  return (
    <View style={styles.secondaryCard}>
    <View style={styles.containerRow}>
      <Text>{religion}</Text>
      <EditIcon />
    </View>
    </View>
  );
}

export default Religion;