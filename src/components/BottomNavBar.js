import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import TitleBar from "./TItleBar";

// SCREENS
import HomeScreen from "../screens/Home";
import EditProfile from "../screens/EditProfile";
import AdminEditProfile from "../screens/AdminEditProfile";

// COUNSELLOR STACK
import Counsellors from "../screens/Counsellors";
import CounsellorDetail from "../screens/CounsellorDetail";

// FORUM STACK
import ViewAllForumPosts from "../screens/ViewAllForumPosts";
import ForumPostDetail from "../screens/ForumPostDetail";
import CreateForumPost from "../screens/CreateForumPost";
import EditForumPost from "../screens/EditForumPost";

// ADMIN STACK
import AdminMenu from "../screens/AdminMenu";
import AdminSignup from "../screens/AdminSignup";
import AdminViewUsers from "../screens/AdminViewUsers";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CounsellorStack = ({ route }) => {
  const { user } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Counsellors"
        component={Counsellors}
        initialParams={{ user: user }}
      />
      <Stack.Screen name="CounsellorDetail" component={CounsellorDetail} />
    </Stack.Navigator>
  );
};

const ForumStack = ({ route }) => {
  const { user } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ViewAllForumPosts"
        component={ViewAllForumPosts}
        initialParams={{ user: user }}
      />
      <Stack.Screen name="ForumPostDetail" component={ForumPostDetail} />
      <Stack.Screen name="CreateForumPost" component={CreateForumPost} />
      <Stack.Screen name="EditForumPost" component={EditForumPost} />
    </Stack.Navigator>
  );
};

const AdminStack = ({ route }) => {
  const { user } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AdminMenu"
        component={AdminMenu}
        initialParams={{ user: user }}
      />
      <Stack.Screen name="AdminSignup" component={AdminSignup} />
      <Stack.Screen name="AdminViewUsers" component={AdminViewUsers} />
    </Stack.Navigator>
  );
};

const BottomNavBar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // GET THE USER ON LOG IN
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = await SecureStore.getItemAsync("user");
        const userData = JSON.parse(userString);
        if (userData !== null) {
          setUser(userData);
          console.log(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // CHECK IF ADMIN

  useEffect(() => {
    if (user !== null) {
      if (user.group == 1) {
        setIsAdmin(true);
        console.log(isAdmin);
      }
    }
  }, [isAdmin, user]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // ADD LOADING SCREEN
  if (isLoading) {
    return null;
  }

  return (
    <>
      {user && (
        <View style={{ flex: 1 }}>
          <TitleBar user={user} />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: "#55D6C2",
                height: 100,
                alignContent: "center",
              },
              tabBarInactiveTintColor: "#fff",
              tabBarActiveTintColor: "#fff",
            }}
          >
            <Tab.Screen
              name="HomeTab"
              component={HomeScreen}
              initialParams={{ user: user }}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={{ alignItems: "center" }}>
                    <Ionicons
                      name={focused ? "home" : "home-outline"}
                      size={size}
                      color={color}
                    />
                    <Text style={{ color }}>{"Home"}</Text>
                  </View>
                ),
              }}
            />

            <Tab.Screen
              name="ForumTab"
              component={ForumStack}
              initialParams={{ user: user }}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <View style={{ alignItems: "center" }}>
                    <Ionicons
                      name={
                        focused
                          ? "chatbubble-ellipses"
                          : "chatbubble-ellipses-outline"
                      }
                      size={size}
                      color={color}
                    />
                    <Text style={{ color }}>{"Forum"}</Text>
                  </View>
                ),
              }}
            />

            {isAdmin ? (
              <Tab.Screen
                name="Admin"
                component={AdminStack}
                initialParams={{ user: user }}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <View style={{ alignItems: "center" }}>
                      <Ionicons
                        name={focused ? "hammer" : "hammer-outline"}
                        size={size}
                        color={color}
                      />
                      <Text style={{ color }}>{"Admin Menu"}</Text>
                    </View>
                  ),
                }}
              />
            ) : (
              <Tab.Screen
                name="CounsellorTab"
                component={CounsellorStack}
                initialParams={{ user: user }}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <View style={{ alignItems: "center" }}>
                      <Ionicons
                        name={focused ? "people" : "people-outline"}
                        size={size}
                        color={color}
                      />
                      <Text style={{ color }}>{"Counsellors"}</Text>
                    </View>
                  ),
                }}
              />
            )}

            {isAdmin ? (
              <Tab.Screen
                name="Profile"
                component={AdminEditProfile}
                initialParams={{ user: user }}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <View style={{ alignItems: "center" }}>
                      <Ionicons
                        name={focused ? "person" : "person-outline"}
                        size={size}
                        color={color}
                      />
                      <Text style={{ color }}>{"Profile"}</Text>
                    </View>
                  ),
                }}
              />
            ) : (
              <Tab.Screen
                name="Profile"
                component={EditProfile}
                initialParams={{ user: user }}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <View style={{ alignItems: "center" }}>
                      <Ionicons
                        name={focused ? "person" : "person-outline"}
                        size={size}
                        color={color}
                      />
                      <Text style={{ color }}>{"Profile"}</Text>
                    </View>
                  ),
                }}
              />
            )}
          </Tab.Navigator>
        </View>
      )}
    </>
  );
};

export default BottomNavBar;
