// Created by Anna McColl 25-04-23
// Initially used for Profiles

import { Text, View } from "react-native";
import EditIcon from "../../icons/EditIcon";
import { styles } from "../../styles/style";

function ContactDetails({ phone, email }) {
  return (
    <View style={styles.secondaryCard}>
      <View style={styles.containerRow}>
        <View style={styles.containerColumn}>
          <Text>{phone}</Text>
          <Text>{email}</Text>
        </View>
        <EditIcon />
      </View>
    </View>
  );
}

export default ContactDetails;
