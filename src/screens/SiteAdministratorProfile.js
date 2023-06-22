// Created by Anna McColl 26/04/23
// Profile page for a Site Administrator viewing their own profile

import { View, Text, ScrollView } from "react-native";
import { styles } from "../styles/style";
import DateFormatConverter from "../utilities/DateFormatConverter";
import User from "../models/User";
import FullName from "../components/profiles/FullName";
import Username from "../components/profiles/Username";
import DateOfBirth from "../components/profiles/DateOfBirth";
import ContactDetails from "../components/profiles/ContactDetails";
import AddressDetails from "../components/profiles/AddressDetails";
import SiteAdministrator from "../models/SiteAdministrator";

function SiteAdministratorProfile({ userID }) {
  // Dummy data to test
  const newDate = new Date();
  const theDate = DateFormatConverter(newDate);

  const theSiteAdministrator = new SiteAdministrator(
    3,
    "Han",
    "Solo",
    theDate,
    "Manzana Limited",
    "47 High Street",
    "",
    "",
    "Auckland City",
    "1010",
    "021 356 1480"
  );

  const theUser = new User(3, "smuggler", "hansolo@milleniumfalcon.com");

  console.log(theSiteAdministrator);
  return (
    <ScrollView>
      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.inputHeader}>My Name is:</Text>
      <FullName
        firstName={theSiteAdministrator.firstName}
        lastName={theSiteAdministrator.lastName}
      />

      <Text style={styles.inputHeader}>My Username is:</Text>
      <Username username={theUser.username} />

      <Text style={styles.inputHeader}>I was born on:</Text>
      <DateOfBirth dateOfBirth={theSiteAdministrator.dateOfBirth} />

      <Text style={styles.inputHeader}>I can be contacted at:</Text>
      <View style={styles.primaryCard}>
        <ContactDetails
          phone={theSiteAdministrator.phone}
          email={theUser.email}
        />
        <AddressDetails
          businessName={theSiteAdministrator.businessName}
          addressLine1={theSiteAdministrator.addressLine1}
          addressLine2={theSiteAdministrator.addressLine2}
          suburb={theSiteAdministrator.suburb}
          city={theSiteAdministrator.city}
          postcode={theSiteAdministrator.postcode}
        />
      </View>
    </ScrollView>
  );
}

export default SiteAdministratorProfile;
