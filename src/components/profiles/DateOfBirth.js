// Created by Anna McColl 25-04-23
// Initially used for Profiles

import {Text, View} from 'react-native'
import EditIcon from '../../icons/EditIcon';
import { styles } from "../../styles/style";

function DateOfBirth({dateOfBirth}){
    return <View style={styles.primaryCard}>
    <View style={styles.containerRow}>
      <Text>{dateOfBirth}</Text>
      <EditIcon />
    </View>
  </View>
}

export default DateOfBirth;