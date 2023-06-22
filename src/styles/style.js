import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },

  titleContainer: {
    height: 140,
    backgroundColor: "#EFE789",
    width: "100%",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  inputContainer: {
    flex: 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  dropDownContainer: {
    flex: 4,
    marginTop: 50,
  },

  dropDown: {
    width: 350,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },

  bottomContainer: {
    flexDirection: "row",
    backgroundColor: "#55D6C2",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: 100,
  },

  skipText: {
    fontSize: 18,
    color: "#FF005C",
    top: -30,
  },

  homeTitle: {
    color: "#F49097",
    fontFamily: "Pacifico",
    fontSize: 48,
    fontWeight: 500,
    textAlign: "left",
    textAlignVertical: "center",
    textAlign: "center",
    top: -10,
  },

  questionContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },

  question: {
    color: "black",
    fontFamily: "Pacifico",
    fontSize: 36,
    textAlign: "center",
  },

  inputHeader: {
    color: "#F49097",
    width: 350,
    height: 20,
    fontSize: 16,
    fontFamily: "InterMedium",
    left: 5,
  },

  inputHeaderError: {
    position: "relative",
    width: 300,
    alignItems: "baseline",
    fontStyle: "normal",
    fontSize: 16,
    fontWeight: 500,
    color: "#F49097",
    left: 5,
  },

  input: {
    width: 350,
    height: 50,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    fontSize: 16,
    fontFamily: "InterRegular",
  },

  multiInput: {
    width: 350,
    height: 500,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    fontSize: 16,
  },

  inputError: {
    width: 350,
    height: 50,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
  },

  inputDate: {
    width: 150,
    height: 50,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
    fontSize: 16,
    textAlign: "center",
  },

  dropDown: {
    width: 350,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    border: 1,
    borderWidth: 1,
    borderColor: "#6F6F6F",
    borderRadius: 10,
  },

  titleHeader: {
    fontFamily: "InterBold",
    fontSize: 32,
    textAlign: "left",
    marginBottom: 25,
    top: 10,
  },

  selectedButton: {
    backgroundColor: "#F49097",
    borderRadius: 30,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginTop: 20,
    marginBottom: 20,
  },

  unselectedButton: {
    backgroundColor: "#CCCCCC",
    borderRadius: 30,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "InterMedium",
    fontSize: 16,
  },

  unselectedButtonText: {
    color: "#F49097",
    textAlign: "center",
    fontFamily: "InterMedium",
    fontSize: 16,
  },

  link: {
    fontSize: 16,
  },

  picker: {
    width: 350,
    backgroundColor: "white",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  // created by Anna 23/04/23
  // initially used in profile screens
  primaryCard: {
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    maxWidth: "100%",
    backgroundColor: "white",
    // for android - to give the container a shadow
    elevation: 4,
    // for iOS - to give the container a shadow
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  secondaryCard: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    margin: 8,
    borderRadius: 25,
    backgroundColor: "#D9D9D9",
    // for android - to give the container a shadow
    elevation: 4,
    // for iOS - to give the container a shadow
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  cardContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    shadowColor: "#000",
    overflow: "visible",
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerColumn: {
    flexDirection: "column",
  },
  // Created for CreateForumPost by Anna McColl 16/5/23

  multiSelectContainer: {
    zIndex: 2,
    width: "80%",
  },
  forumUsername: {
    fontSize: 20,
    fontFamily: "InterRegular",
  },
  forumTitle: {
    fontSize: 24,
    fontFamily: "InterMedium",
  },

  //modal styles

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  multiList: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6F6F6F",
  },
});

export { styles };
