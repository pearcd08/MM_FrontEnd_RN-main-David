// Created by Anna McColl 25-04-23
// Initially used for Profiles

import { Text, View } from "react-native";
import EditIcon from "../../icons/EditIcon";
import { styles } from "../../styles/style";

function MentalDisorder({ mentalDisorders }) {
  return mentalDisorders.map((mentalDisorder) => (
    <View style={styles.secondaryCard} key={{ mentalDisorder }}>
      <View style={styles.containerRow}>
        <Text>{mentalDisorder}</Text>
        <EditIcon />
      </View>
    </View>
  ));
}

export default MentalDisorder;
