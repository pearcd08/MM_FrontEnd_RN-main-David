// Updated By David Pearce 31/04/2023

import { View, Text, TextInput } from "react-native";
import { styles } from "../styles/style";
import { MaterialIcons } from "@expo/vector-icons";

const CustomUpdateField = ({ onPress, header, text, lines }) => {
  return (
    <View>
      <Text style={styles.inputHeader}>{header}</Text>
      <TextInput
        style={[
          styles.input,
          {
            height: lines === 1 ? 50 : lines * 50,
            lineHeight:
              lines === 1
                ? styles.input.fontSize * 1.8
                : styles.input.fontSize * 1 + 20,
          },
        ]}
        editable={false}
        selectTextOnFocus={false}
        value={text}
        multiline={true}
        lines={lines}
      />
      <MaterialIcons
        name="edit"
        size={20}
        color="#F49097"
        left={320}
        top={-50 * lines}
        onPress={onPress}
      />
    </View>
  );
};

export default CustomUpdateField;
