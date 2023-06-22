// Created by Anna McColl 20/04/23
// Edit icon added layout finalised by Anna McColl 23/04/23
// Code separated out into components/profiles files, dummy data added, and DateFormatConverter implemented 25-04-23

// Profile Page for a Patient viewing their own profile
import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/style";
import Patient from "../models/Patient";
import DateFormatConverter from "../utilities/DateFormatConverter";
import User from "../models/User";
import FullName from "../components/profiles/FullName";
import Username from "../components/profiles/Username";
import DateOfBirth from "../components/profiles/DateOfBirth";
import ContactDetails from "../components/profiles/ContactDetails";
import AddressDetails from "../components/profiles/AddressDetails";
import Culture from "../components/profiles/Culture";
import Orientation from "../components/profiles/Orientation";
import Religion from "../components/profiles/Religion";
import MentalDisorder from "../components/profiles/MentalDisorder";
import Language from "../components/profiles/Language";
import PreferredCounsellorGender from "../components/profiles/PreferredCounsellorGender";

function PatientProfile({ userID }) {
  const axios = require("axios");
  const FormData = require("form-data");
  let data = new FormData();
  data.append("username", "test");
  data.append("password", "Password12345!");

  // axios
  //   .request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { token } = route.params;

  const getPatient = async () => {
    await axios
      .get("http://mindmagic.pythonanywhere.com/api/patient/", {
        headers: {
          Authorization: `Token ` + token,
        },
      })
      .then(function (response) {
        // handle success
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const newDate = new Date();
  const theDate = DateFormatConverter(newDate);

  const thePatient = new Patient(
    1,
    "Natasha",
    "Romanoff",
    theDate,
    "Unit 12",
    "2 Arawa St",
    "New Lynn",
    "Auckland",
    "0600",
    "021 235 2163",
    "New Zealand European",
    "Atheist",
    ["English", "Samoan", "Scottish"],
    "Bi-sexual",
    "Female",
    "No Preference",
    ["Depression", "Anxiety", "ADHD", "Post Traumatic Stress Disorder"]
  );

  const theUser = new User(1, "karanina", "karaninaofrayne@gmail.com");

  console.log(thePatient);
  return (
    <View>
      <ScrollView>
        <Text style={styles.title}>My Profile</Text>

        <Text style={styles.inputHeader}>My Name is:</Text>
        <FullName
          firstName={thePatient.firstName}
          lastName={thePatient.lastName}
        />

        <Text style={styles.inputHeader}>My Username is:</Text>
        <Username username={theUser.username} />

        <Text style={styles.inputHeader}>I was born on:</Text>
        <DateOfBirth dateOfBirth={thePatient.dateOfBirth} />

        <Text style={styles.inputHeader}>I can be contacted at:</Text>
        <View style={styles.primaryCard}>
          <ContactDetails phone={thePatient.phone} email={theUser.email} />
          <AddressDetails
            addressLine1={thePatient.addressLine1}
            addressLine2={thePatient.addressLine2}
            suburb={thePatient.suburb}
            city={thePatient.city}
            postcode={thePatient.postcode}
          />
        </View>

        <Text style={styles.inputHeader}>I identify as:</Text>
        <View style={styles.primaryCard}>
          <Culture culture={thePatient.culture} />
          <Orientation
            gender={thePatient.gender}
            sexuality={thePatient.sexuality}
          />
          <Religion religion={thePatient.religion} />
        </View>

        <Text style={styles.inputHeader}>I need help with:</Text>
        <View style={styles.primaryCard}>
          <MentalDisorder mentalDisorders={thePatient.mentalDisorder} />
        </View>

        <Text style={styles.inputHeader}>I want a Counsellor who speaks:</Text>
        <View style={styles.primaryCard}>
          <Language languages={thePatient.preferredLanguage} />
        </View>

        <Text style={styles.inputHeader}>
          I would like my Counsellor's gender to be:
        </Text>
        <PreferredCounsellorGender
          preferredCounsellorGender={thePatient.preferredCounsellorGender}
        />
      </ScrollView>
    </View>
  );
}

export default PatientProfile;
