// Created by David Pearce 29/05/2023

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/style";
import axios from "axios";
import UserCard from "../components/UserCard";

const AdminViewUsers = ({ navigation, route }) => {
  const { user, userType } = route.params;
  console.log();

  const [users, setUsers] = useState([]);
  const [userString, setUserString] = useState(null);
  const userCount = users.length;

  useEffect(() => {
    if (userType) {
      if (userType === "siteadmins") {
        setUserString("Site Administrator");
      } else if (userType === "patients") {
        setUserString("Patient");
      } else if (userType === "counsellors") {
        setUserString("Counsellor");
      }
      getUsers();
    }
  }, [userType]);

  // GET A LIST OF SPECIFIED USER TYPE
  const getUsers = () => {
    if (userType) {
      axios
        .get(`http://mindmagic.pythonanywhere.com/api/${userType}/`, {
          headers: {
            Authorization: `Token ` + user.token,
          },
        })
        .then(function (response) {
          const data = response.data.map((person) => ({
            userID: person.user.id,
            name: person.firstName + " " + person.lastName,
            email: person.user.email,
            username: person.user.username,
            phone: person.phone,
            city: person.city,
            postcode: person.postcode,
          }));
          setUsers(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const deleteUser = async (id) => {
    Alert.alert(
      "Warning",
      `Are you sure you want to delete this ${userString}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              console.log(user.token);
              const response = await axios.delete(
                `http://mindmagic.pythonanywhere.com/api/user/${id}/delete/`,
                {
                  headers: {
                    Authorization: `Token ${user.token}`,
                  },
                }
              );
              if (response.status === 204) {
                // IF SITEADMIN IS DELETING THEIR OWN ACCOUNT LOG OUT
                if (id == user.id) {
                  await SecureStore.deleteItemAsync("user");
                  navigation.navigate("Login");
                } else {
                  Alert.alert("Success", { userString } + " Deleted!");
                }
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderUserCard = ({ item }) => (
    <View>
      <UserCard {...item} deleteUser={deleteUser} userString={userString} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {users ? (
          <FlatList
            data={users}
            keyExtractor={(item) => item.userID.toString()}
            renderItem={renderUserCard}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default AdminViewUsers;
