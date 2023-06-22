// Created by Anna McColl 25-04-23
// Initially used for Profiles

import { Text, View } from "react-native";
import EditIcon from "../../icons/EditIcon";
import { styles } from "../../styles/style";

function TreatmentMethod({ treatmentMethods }) {
  return treatmentMethods.map((treatmentMethod) => (
    <View style={styles.secondaryCard} key={{treatmentMethod}}>
            <View style={styles.containerRow}>
              <Text>{treatmentMethod}</Text>
              <EditIcon />
            </View>
          </View>))
};

export default TreatmentMethod;