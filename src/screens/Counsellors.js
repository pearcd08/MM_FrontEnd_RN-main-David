// Created by David Pearce 12/05/23

import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../styles/style";
import axios from "axios";

import CounsellorCard from "../components/CounsellorCard";

const Counsellors = ({ navigation, route }) => {
  const { user } = route.params;
  console.log();
  // ARRAY OF COUNSELLORS FETCHED FROM API
  const [counsellors, setCounsellors] = useState([]);
  // USESTATE TO WAIT FOR COUNSELLORS TO BE RANKED
  const [ranked, setRanked] = useState(false);

  // USER INFOa
  const userMentalDisorders = user.profile.mentalDisorders;
  const userLanguages = user.profile.preferredLanguages;
  const userCulture = user.profile.culture;
  const userReligion = user.profile.religion;
  const userPreferredGender = user.profile.preferredCounsellorGender;
  const userSuburb = user.profile.suburb;
  const userCity = user.profile.city;

  // GET A LIST OF ALL COUNSELLORS
  useEffect(() => {
    if (user) {
      axios
        .get("http://mindmagic.pythonanywhere.com/api/counsellors/", {
          headers: {
            Authorization: `Token ` + user.token,
          },
        })

        .then(function (response) {
          const data = response.data.map((counsellor) => ({
            counsellor_id: counsellor.id,
            user_id: counsellor.user.id,
            name: counsellor.firstName + " " + counsellor.lastName,
            business: counsellor.businessName,
            suburb: counsellor.suburb,
            city: counsellor.city,
            postcode: counsellor.postcode,
            culture: counsellor.culture,
            religion: counsellor.religion,
            gender: counsellor.gender,
            languages: counsellor.preferredLanguages,
            mentalDisorders: counsellor.mentalDisorders,
          }));
          // console.log(data);
          // PERSONAL DETAILS
          setCounsellors(data);
          console.log(user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user]);

  // SORT THE LIST BY BEST MATCH BETWEEN COUNSELLOR AND PATIENT
  // TO DO: CHAT WITH SPONSOR TO DETERMINE WHAT FIELD MATCHES ARE THE MOST IMPORTANT
  // SO WE CAN DETERMINE WHAT EACH FIELD SCORE WOULD BE
  useEffect(() => {
    if (counsellors.length > 0 && !ranked) {
      const rankedCounsellors = counsellors.map((counsellor) => {
        // THE SCORE USED TO DETERMINE WHAT COUNSELLOR IS THE BEST MATCH
        let score = 0;
        let attributes = 0;

        // ARRAY FOR THE KEYWORDS FOR EACH MATCH
        const keywords = [];

        // CHECK IF COUNSELLORS CULTURE MATCHES THE USERS

        if (userCulture) {
          attributes++;
          if (counsellor.culture === userCulture) {
            score++;
            console.log(counsellor.name + ": matching culture");
            keywords.push("Culture Match");
          }
        }

        // CHECK IF COUNSELLORS RELUGUIB MATCHES THE USERS

        if (userReligion) {
          attributes++;
          if (counsellor.religion === userReligion) {
            score++;
            console.log(counsellor.name + ": matching religion");
            keywords.push("Religion Match");
          }
        }

        // CHECK IF COUNSELLORS GENDER MATCHES THE USERS COUNSELLOR GENDER PREFERENCE

        if (userPreferredGender) {
          attributes++;
          if (counsellor.gender === userPreferredGender) score++;
          console.log(counsellor.name + ": preferred gender");
          keywords.push("Preferred Gender");
        }

        // CHECK IF THE COUNSELLOR SPEAKS ANY OF THE USERS PREFERRED LANGUAGES
        if (userLanguages) {
          attributes += userLanguages.length;
          const matchingLanguages = counsellor.languages.filter((language) =>
            userLanguages.includes(language)
          );
          // IF THERE IS A MATCHING LANGUAGE, ADD A +1
          if (matchingLanguages.length > 0) {
            score += matchingLanguages.length;
            console.log(counsellor.name + ": matching language");
            keywords.push("Language Match x" + matchingLanguages.length);
          }
        }

        // CHECK IF THE COUNSELLOR'S SPECIALITIES MATCHES THE USERS PROBLEMS
        if (userMentalDisorders.length > 0) {
          attributes += userMentalDisorders.length;
          const matchingMentalDisorders = counsellor.mentalDisorders.filter(
            (disorder) => userMentalDisorders.includes(disorder)
          );
          // IF THERE IS A MATCHING LANGUAGE, ADD A +1
          if (matchingMentalDisorders.length > 0) {
            score += matchingMentalDisorders.length;
            console.log(
              counsellor.name +
                ": matching disorder:" +
                matchingMentalDisorders.length
            );
            keywords.push(
              "Mental Illness Match x" + matchingMentalDisorders.length
            );
          } else {
            console.log("NO MENTAL MATCH");
          }
        }

        // CHECK IF THE COUNSELLORS BUSINESS SUBURB IS SAME AS USERS
        if (userSuburb) {
          attributes++;
          if (counsellor.suburb === userSuburb) {
            score++;
            keywords.push("Same Suburb");
          }
        }

        // CHECK IF THE COUNSELLORS BUSINESS CITY IS SAME AS USERS
        if (userCity) {
          attributes++;
          if (counsellor.city === userCity) {
            score++;
            keywords.push("Same City");
          }
        }

        // ADD A SCORE FIELD TO THE COUNSELLOR OBJECT
        return {
          ...counsellor,
          score,
          percentage: ((score / attributes) * 100).toFixed(2),
          keywords,
        };
      });
      // SORT THE COUNSELLORS BASED ON SCORE
      rankedCounsellors.sort((a, b) => b.score - a.score);
      // PUT THE RANKED COUNSELLORS IN THE COUNSELLORS ARRAY
      setCounsellors(rankedCounsellors);
      setRanked(true);
    }
  }, [counsellors, ranked]);

  const handlePress = (id) => {
    navigation.navigate("CounsellorDetail", {
      user: user,
      counsellorID: id,
    });
    console.log("PRESSED");
  };

  const renderCounsellorCard = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.counsellor_id)}>
      <CounsellorCard {...item} />
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View>
        <Text>Error: User profile not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {ranked ? (
          <FlatList
            data={counsellors}
            keyExtractor={(item) => item.counsellor_id.toString()}
            renderItem={renderCounsellorCard}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default Counsellors;
