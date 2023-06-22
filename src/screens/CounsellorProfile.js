// Created by Anna McColl 25/04/23
// Profile page for a Counsellor viewing their own profile

import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/style";
import DateFormatConverter from "../utilities/DateFormatConverter";
import User from "../models/User";
import FullName from "../components/profiles/FullName";
import Username from "../components/profiles/Username";
import DateOfBirth from "../components/profiles/DateOfBirth";
import ContactDetails from "../components/profiles/ContactDetails";
import AddressDetailsBusiness from "../components/profiles/AddressDetailsBusiness";
import Culture from "../components/profiles/Culture";
import Orientation from "../components/profiles/Orientation";
import Religion from "../components/profiles/Religion";
import MentalDisorder from "../components/profiles/MentalDisorder";
import Language from "../components/profiles/Language";
import Counsellor from "../models/Counsellor";
import TreatmentMethod from "../components/profiles/TreatmentMethod";
import Biography from "../components/profiles/Biography";

function CounsellorProfile({ userID }) {
  // Dummy data to test
  const newDate = new Date();
  const theDate = DateFormatConverter(newDate);

  const theCounsellor = new Counsellor(
    2,
    "Deanna",
    "Troi",
    theDate,
    "Enterprise Counselling Ltd",
    "Suite 5",
    "123 Dominion Road",
    "Mt Eden",
    "Auckland",
    "1010",
    "09 657 6035",
    "I've had 25 years experience counselling in New Zealand. No person is an island, so I believe in involving family in treatment wherever possible. I have a Doctorate in Clinical Psychiatry from the University of Otago and belong to the New Zealand Association of Psychiatrists.",
    "New Zealand European",
    "Budhist",
    "Straight",
    "Female",
    ["Depression", "Anxiety", "ADHD", "Post Traumatic Stress Disorder"],
    [
      "Cognative Behvioural Therapy",
      "Family Therapy",
      "Counselling",
      "Exposure Therapy",
    ],
    ["English", "Samoan", "Scottish"]
  );

  const theUser = new User(
    2,
    "doctorTroi",
    "deannatroi@enterprisecounselling.com"
  );

  console.log(theCounsellor);
  return (
    <View>
      <ScrollView>
        <Text style={styles.title}>My Profile</Text>

        <Text style={styles.inputHeader}>My Name is:</Text>
        <FullName
          firstName={theCounsellor.firstName}
          lastName={theCounsellor.lastName}
        />

        <Text style={styles.inputHeader}>My Username is:</Text>
        <Username username={theUser.username} />

        <Text style={styles.inputHeader}>I was born on:</Text>
        <DateOfBirth dateOfBirth={theCounsellor.dateOfBirth} />

        <Text style={styles.inputHeader}>I can be contacted at:</Text>
        <View style={styles.primaryCard}>
          <ContactDetails phone={theCounsellor.phone} email={theUser.email} />
          <AddressDetailsBusiness
            businessName={theCounsellor.businessName}
            addressLine1={theCounsellor.addressLine1}
            addressLine2={theCounsellor.addressLine2}
            suburb={theCounsellor.suburb}
            city={theCounsellor.city}
            postcode={theCounsellor.postcode}
          />
        </View>

        <Text style={styles.inputHeader}>I identify as:</Text>
        <View style={styles.primaryCard}>
          <Culture culture={theCounsellor.culture} />
          <Orientation
            gender={theCounsellor.gender}
            sexuality={theCounsellor.sexuality}
          />
          <Religion religion={theCounsellor.religion} />
        </View>

        <Text style={styles.inputHeader}>I specialise in treating:</Text>
        <View style={styles.primaryCard}>
          <MentalDisorder mentalDisorders={theCounsellor.mentalDisorder} />
        </View>

        <Text style={styles.inputHeader}>I treat patients using:</Text>
        <View style={styles.primaryCard}>
          <TreatmentMethod treatmentMethods={theCounsellor.treatmentMethod} />
        </View>

        <Text style={styles.inputHeader}>I can conduct counselling in:</Text>
        <View style={styles.primaryCard}>
          <Language languages={theCounsellor.language} />
        </View>

        <Text style={styles.inputHeader}>About me:</Text>
        <View style={styles.primaryCard}>
        <Biography biography={theCounsellor.biography} />
        </View>
      </ScrollView>
    </View>
  );
}

export default CounsellorProfile;
