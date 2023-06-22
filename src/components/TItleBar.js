import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const TitleBar = ({ user, handleGoBack }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = async () => {
    try {
      console.log(user.token);
      const response = await axios.post(
        "http://mindmagic.pythonanywhere.com/api/logout/",
        null,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      await SecureStore.deleteItemAsync("user");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Appbar.Header
      style={{
        height: 100,
        paddingTop: 0,

        backgroundColor: "#EFE789",
      }}
    >
      <Appbar.Content
        title={
          <Text
            style={{
              fontFamily: "Pacifico",
              fontSize: 48,
              color: "#F49097",
            }}
          >
            Mind Magic
          </Text>
        }
        style={{ marginTop: -10 }}
      />

      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon={() => (
              <Ionicons
                name="settings"
                size={32}
                color="#F49097"
                style={{ right: 5, bottom: 5, width: 32, height: 32 }}
              />
            )}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            handleLogout();
            closeMenu();
          }}
          title="Logout"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default TitleBar;
