// Created by Anna McColl 23/05/23

// Updated by David Pearce 09/06/2023
// Update time and date wasn't working, fixed now
// Added modals for time and date.

import { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
  Pressable,
  Modal,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import { useForm } from "react-hook-form";
import MultiSelect from "react-native-multiple-select";

import DateTimePicker from "@react-native-community/datetimepicker";
import DateFormatConverter from "../utilities/DateFormatConverter";
import TimeFormatConverter from "../utilities/TimeFormatConverter";
import axios from "axios";
import { styles } from "../styles/style";
import CustomButton from "../components/CustomButton";
import ClockIcon from "../icons/ClockIcon";
import CalendarIcon from "../icons/CalendarIcon";

function ForumPostForm({ isForumPostUpdate, oldData, onCancel, onSave }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      authorID: isForumPostUpdate ? oldData.authorID : "",
      title: isForumPostUpdate ? oldData.title : "",
      postType: isForumPostUpdate ? oldData.postType : "",
      postContent: isForumPostUpdate ? oldData.postContent : "",
      createdOn: isForumPostUpdate ? oldData.createdOn : "",
      postContentCategory: isForumPostUpdate ? oldData.postContentCategory : "",
    },
  });

  // The maxium number of content categories that are allowed to be selected for a post.
  const maxPostContentCategories = 3;

  // These are the field values required for the database.
  const [authorID, setAuthorID] = useState("");
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState("");
  const [postContent, setPostContent] = useState("");
  const [createdOn, setCreatedOn] = useState(new Date());
  const [postContentCategory, setPostContentCategory] = useState();
  const [eventDateTime, setEventDateTime] = useState(new Date());

  // Helper variables.
  const [postTypeOpen, setPostTypeOpen] = useState(false);
  const [postContentCategoryList, setPostContentCategoryList] = useState([]);
  const [isEvent, setIsEvent] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // Boolean to toggle whenever the api call for comments needs to be re-done.
  const [refreshRequired, setRefreshRequired] = useState(true);

  // isDateVisible refers to whether or not the eventDateTime variable should be shown on the screen.
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  // isTimeVisible refers to whether or not the eventDateTime variable should be shown on the screen.
  const [isTimeVisible, setIsTimeVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [createdOnDateString, setCreatedOnDateString] = useState("");
  const [eventDateString, setEventDateString] = useState("");
  const [eventTimeString, setEventTimeString] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const [postContentCategoryLength, setPostContentCategoryLength] = useState(0);

  // The text on the save record button changes depending on if it's a new post or an updated post.
  const [saveButtonText, setSaveButtonText] = useState("Post");

  // When the page loads, if it is an update, it will set the data as what has been passed through.
  useEffect(() => {
    if (!isForumPostUpdate) {
      setAuthorID(oldData.postAuthorID);
    }
  });
  useEffect(() => {
    console.log("hit forum post form");

    if (isForumPostUpdate) {
      setAuthorID(oldData.postAuthorID);
      setTitle(oldData.title);
      setPostType(oldData.postType);
      setPostContent(oldData.postContent);
      setCreatedOn(oldData.createdOn);
      setCreatedOnDateString(oldData.createdOnString);
      setEventDateTime(new Date(oldData.eventDateTime));
      // setEventDateString(DateFormatConverter(new Date(oldData.eventDateTime)));
      // setEventTimeString(TimeFormatConverter(new Date(oldData.eventDateTime)));
      setAuthorID(oldData.authorID);
      const oldCategories = oldData.postContentCategory.map((category) => {
        return category.id;
      });
      setPostContentCategory(oldCategories);
      setPostContentCategoryLength(oldCategories.length);
      setIsUpdate(true);
      setSaveButtonText("Update Post");
      console.log("line 98");
      console.log(oldData);
    }
  }, [title, postContent]);

  // These are the only possible values for postType
  const postTypeChoices = [
    { label: "Event", value: "event" },
    { label: "Discussion", value: "discussion" },
  ];

  // Import content categories from back end.
  useEffect(() => {
    axios
      .get("https://mindmagic.pythonanywhere.com/api/postcontentcategories/")
      .then((response) => {
        const data = response.data.map((category) => ({
          id: category.id,
          name: category.name,
        }));

        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setPostContentCategoryList(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Event Handlers

  // When the post type is chosen, if it is Event, the event field components are displayed down the bottom of the form.
  useEffect(() => {
    if (postType === "event") {
      setIsEvent(true);
    } else {
      setIsEvent(false);
    }
  }, [postType]);

  // When a post content category is selected from the multi-select componenet, it is added to the postContentCategory variable.
  // If more than the number of maxPostContentCategory is chosen, an alert will appear, and no more will be able to be selected.
  function onPostContentCategoryHandler(selectedItems) {
    if (selectedItems.length <= maxPostContentCategories) {
      setPostContentCategory(selectedItems);
    } else {
      postContentCategory.pop();
      Alert.alert(
        "Warning",
        "No more than " +
          maxPostContentCategories +
          " categories can be selected.",
        [{ text: "OK", onPress: () => console.log("OK pressed") }]
      );
    }
  }

  // Opens the date picker when the calendar icon is pressed.
  function openDatePicker() {
    setIsDatePickerVisible(true);
  }

  // Opens the time picker when the clock icon is pressed.
  function openTimePicker() {
    setIsTimePickerVisible(true);
  }

  // Once the event date is selected, the date picker is closed, and the conditions
  // are set for the date to appear on the screen.
  function handleDateChange(event, selectedDate) {
    if (event.type === "set") {
      if (Platform.OS === "android") {
        setIsDatePickerVisible(false);
      }
      setEventDateTime(selectedDate);

      setIsDateVisible(true);
    } else if (event.type === "dismissed") {
      setIsDatePickerVisible(false);
    }
  }

  // Once the event time is selected, the time picker is closed and the conditions are set for the time to appear on the screen
  function handleTimeChange(event, selectedTime) {
    if (event.type === "set") {
      if (Platform.OS === "android") {
        setIsTimePickerVisible(false);
      }
      setEventDateTime(selectedTime);
      setIsTimeVisible(true);
    } else if (event.type === "dismissed") {
      setIsTimePickerVisible(false);
    }
  }

  // Re-renders the event date and event time fields in the screen when the eventDateTime variable has been updated.
  useEffect(() => {
    setEventDateString(DateFormatConverter(eventDateTime));
    setEventTimeString(TimeFormatConverter(eventDateTime));
    if (isUpdate) {
      setIsDateVisible(true);
      setIsTimeVisible(true);
    }
  }, [eventDateTime]);

  // If cancel is pressed the imported function reference is enacted.
  function onCancelHandler() {
    onCancel();
  }

  // If post is pressed, the post is updated to the database.

  const onPostHandler = (data) => {
    // if the form data comes back as undefined, it means no update was made to that field.
    console.log("line 204");
    console.log(data);
    setTitle(data.title);
    setPostContent(data.postContent);

    const saveData = {
      authorID: authorID,
      title: data.title,
      postType: postType,
      postContent: data.postContent,
      createdOn: createdOn,
      postContentCategory: postContentCategory,
      eventDateTime: eventDateTime,
    };

    console.log(saveData);
    onSave(saveData);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.titleHeader}>
              {isUpdate ? "Update Post" : "Create New Post"}
            </Text>
            <CustomTextInput
              control={control}
              header="Title"
              fieldName="title"
              placeholder="Enter post title"
              defaultValue={title}
              multiline={false}
              onChangeText={setTitle}
              rules={{
                required: "Post title is required",

                maxLength: {
                  value: 200,
                  message: "The post title can only be 200 characters long",
                },
              }}
            />
          </View>
          {/* If this is an update form, just display the post type, as it cannot be changed. */}
          {isUpdate ? (
            <View>
              <Text style={styles.inputHeader}>Post Type</Text>
              <Text style={{ textTransform: "capitalize" }}>{postType} </Text>
            </View>
          ) : (
            <View style={{ width: "85%", alignItems: "stretch" }}>
              <Text style={styles.inputHeader}>Post Type</Text>

              <DropDownPicker
                items={postTypeChoices}
                open={postTypeOpen}
                setOpen={() => setPostTypeOpen(!postTypeOpen)}
                value={postType}
                setValue={(value) => setPostType(value)}
                closeAfterSelecting={true}
                placeholder="Select the purpose of this post"
                style={[
                  styles.dropDown,
                  { fontSize: 16 },
                  postTypeOpen ? { marginBottom: 90 } : { marginBottom: 10 },
                ]}
              />
            </View>
          )}
          <Text style={[styles.inputHeader, { marginBottom: 10 }]}>
            Categories
          </Text>
          <View
            style={{
              width: "85%",
              alignItems: "stretch",
            }}
          >
            <View
              style={{ width: "85%", alignItems: "stretch", maxHeight: 150 }}
            ></View>

            <MultiSelect
              onOpen={() => {
                // Perform actions when the MultiSelect list is opened
                console.log("MultiSelect list opened!");
                // Add your custom logic here
              }}
              styles={[styles.input, { zIndex: 2 }]}
              items={postContentCategoryList}
              uniqueKey="id"
              onSelectedItemsChange={onPostContentCategoryHandler}
              selectedItems={postContentCategory}
              selectText=" Pick up to 3 Categories"
              searchInputPlaceholderText="Search Categories..."
              tagContainerStyle={{
                backgroundColor: "white",
                flexDirection: "row",
                width: "48%",
              }}
              tagRemoveIconColor="#F49097"
              tagBorderColor="black"
              tagTextColor="black"
              selectedItemIconColor="#F49097"
              selectedItemTextColor="#CCC"
              fixedHeight={true}
              itemTextColor="#000"
              dropdownPosition="top"
              submitButtonColor="#55D6C2"
              submitButtonText="Confirm"
              styleDropdownMenuSubsection={styles.input}
              styleListContainer={{ height: 150, width: "100%" }}
              searchInputStyle={{
                height: 50,
              }}
            />
          </View>
          <CustomTextInput
            control={control}
            header="Post Content"
            fieldName="postContent"
            placeholder="Enter post content here..."
            defaultValue={postContent}
            multiline={true}
            numberOfLines={10}
            onChangeText={setPostContent}
            rules={{
              maxLength: {
                value: 5000,
                message: "The post cannot be more than 5000 characters long",
              },
            }}
          />
          {isEvent ? (
            <View>
              <View>
                <Text style={styles.inputHeader}>Date of Event</Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <View
                  style={[
                    {
                      width: 200,
                      borderColor: "#6F6F6F",
                      borderRadius: 10,
                      borderWidth: 1,
                      marginRight: 10,
                      padding: 10,
                      fontSize: 16,
                      height: 50,
                      backgroundColor: "white",
                    },
                  ]}
                >
                  {isDateVisible ? (
                    <Text>{eventDateString} </Text>
                  ) : (
                    <Text> Select Date</Text>
                  )}
                </View>
                <Pressable onPress={openDatePicker}>
                  <CalendarIcon />
                </Pressable>
              </View>
            </View>
          ) : null}
          <Modal
            visible={isDatePickerVisible}
            animationType="fade"
            transparent={true}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles2.modalContainer}
              onPressOut={() => setIsDatePickerVisible(false)}
            >
              <View style={styles2.modalContent}>
                <View>
                  <DateTimePicker
                    value={eventDateTime}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    themeVariant="light"
                    minimumDate={new Date()}
                    timeZoneOffsetInMinutes={undefined}
                  />
                </View>
                {Platform.OS === "android" ? (
                  ""
                ) : (
                  <View style={{ marginTop: 20 }}>
                    <CustomButton
                      text={"Confirm"}
                      type="big"
                      onPress={() => setIsDatePickerVisible(false)}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Modal>
          {isEvent ? (
            <View>
              <View>
                <Text style={styles.inputHeader}>Time of Event</Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-start" }}
              >
                <View
                  style={[
                    {
                      width: 200,
                      borderColor: "#6F6F6F",
                      borderRadius: 10,
                      borderWidth: 1,
                      marginRight: 10,
                      padding: 10,
                      fontSize: 16,
                      height: 50,
                      backgroundColor: "white",
                    },
                  ]}
                >
                  {isTimeVisible ? (
                    <Text>{eventTimeString} </Text>
                  ) : (
                    <Text> Select Time</Text>
                  )}
                </View>

                <Pressable onPress={openTimePicker}>
                  <ClockIcon />
                </Pressable>
              </View>
            </View>
          ) : null}
          <Modal
            visible={isTimePickerVisible}
            animationType="fade"
            transparent={true}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles2.modalContainer}
              onPressOut={() => setIsTimePickerVisible(false)}
            >
              <View style={styles2.modalContent}>
                <View>
                  <DateTimePicker
                    value={eventDateTime}
                    mode="time"
                    display="spinner"
                    onChange={handleTimeChange}
                    themeVariant="light"
                  />
                </View>
                {Platform.OS === "android" ? (
                  ""
                ) : (
                  <View style={{ marginTop: 20 }}>
                    <CustomButton
                      text={"Confirm"}
                      type="big"
                      onPress={() => setIsTimePickerVisible(false)}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={[styles.buttonContainer, { marginTop: 20 }]}>
            <CustomButton
              text={"Cancel"}
              onPress={onCancelHandler}
              style={styles.button}
            />
            <CustomButton
              text={saveButtonText}
              onPress={handleSubmit(onPostHandler)}
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles2 = StyleSheet.create({
  // ...existing styles...

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
});

export default ForumPostForm;
