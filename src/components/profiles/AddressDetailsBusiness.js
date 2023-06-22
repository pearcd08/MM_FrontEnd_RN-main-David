// Created by Anna McColl 25-04-23
// Initially used for Profiles

import {Text, View} from 'react-native'
import EditIcon from '../../icons/EditIcon';
import { styles } from "../../styles/style";

function AddressDetailsBusiness({businessName, addressLine1, addressLine2, suburb, city, postcode}){
    return <View style={styles.secondaryCard}>
    <View style={styles.containerRow}>
      <View style={styles.containerColumn}>
        <Text>{businessName}</Text>
        <Text>{addressLine1}</Text>
        <Text>{addressLine2}</Text>
        <Text>{suburb}</Text>
        <Text>
          {city} {postcode}
        </Text>
      </View>
      <EditIcon />
    </View>
  </View>
}

export default AddressDetailsBusiness;