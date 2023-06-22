// Created by Anna McColl 25-04-23
// Initially used for Profiles

import {Text, View} from 'react-native'
import EditIcon from '../../icons/EditIcon';
import { styles } from "../../styles/style";

function Username({username}){
    return <View style={styles.primaryCard}>
    <View style={styles.containerRow}>
      <Text>{username}</Text>
      <EditIcon />
    </View>
  </View>
}

export default Username;