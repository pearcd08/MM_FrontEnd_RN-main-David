import { View, Text, StyleSheet, Pressable } from "react-native";
import { styles } from "../styles/style";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import DateFormatConverter from "../utilities/DateFormatConverter";
import TimeFormatConverter from "../utilities/TimeFormatConverter";
import KeywordBadge from "./KeywordBadge";
import ForumAuthorName from "../utilities/ForumAuthorName";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import DeleteAlert from "../utilities/DeleteAlert";
import axios from "axios";

function PostCard({
  id,
  title,
  postType,
  postContent,
  createdOn,
  eventDateTime,
  authorID,
  postContentCategory,
  authorUser,
  currentUser,
}) {
  const navigation = useNavigation();
  const token = currentUser.token;

  // set the parameters
  const [postId, setPostId] = useState(id);
  const [postTitle, setPostTitle] = useState(title);
  const [postPostType, setPostPostType] = useState(postType);
  const [postPostContent, setPostPostContent] = useState(postContent);
  const [postCreatedOn, setPostCreatedOn] = useState(createdOn);
  const [postEventDateTime, setPostEventDateTime] = useState(eventDateTime);
  const [postAuthorID, setPostAuthorID] = useState(authorID);
  const [postPostContentCategory, setPostPostContentCategory] =
    useState(postContentCategory);
  const [postAuthorName, setPostAuthorName] = useState("");

  const [authorIsCurrentUser, setAuthorIsCurrentUser] = useState(false);

  // // Set all the const
  // useEffect(() => {
  //   setPostId(id);
  //   setPostTitle(title);
  //   setPostPostType(postType);
  //   setPostPostContent(postContent);
  //   setPostCreatedOn(createdOn);
  //   setPostEventDateTime(eventDateTime);
  //   setPostAuthorID(authorID);
  //   setPostPostContentCategory(postContentCategory);
  // }, [id]);

  // Check if is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      if (currentUser.group == 1) {
        setIsAdmin(true);
      }
    }
  }, [isAdmin, currentUser]);

  // If the post is not an event, we don't want to show the event date/time components.
  const [isEvent, setIsEvent] = useState(false);

  // To hold date and time strings of date time object types.
  const [postCreatedOnString, setPostCreatedOnString] = useState("");
  const [postEventDateString, setPostEventDateString] = useState("");
  const [postEventTimeString, setPostEventTimeString] = useState("");

  // To hold the keyword badge strings, which are a combination of the postPostType and postPostContentCategory values
  const [keywordBadges, setKeywordBadges] = useState([]);

  // Confirms that a user wants to delete a post.
  const [doDelete, setDoDelete] = useState(false);
  useEffect(() => {
    if (postAuthorID === currentUser.userID) {
      setAuthorIsCurrentUser(true);
    }
  }, []);

  useEffect(() => {
    setPostAuthorName(ForumAuthorName(authorUser));
  }, []);

  // combines postPostType and postPostContentCategory into one array.
  useEffect(() => {
    let categoryArray = [];
    categoryArray.push(postPostType);
    postContentCategory.forEach((category) => {
      categoryArray.push(category.name);
    });
    setKeywordBadges(categoryArray);
  }, []);

  useEffect(() => {
    if (postType === "event") {
      setIsEvent(true);
    }
  }, [postPostType]);

  // Transform dateTime objects into readable strings.
  useEffect(() => {
    setPostCreatedOnString(DateFormatConverter(postCreatedOn));
  }, [postCreatedOn]);

  useEffect(() => {
    setPostEventDateString(DateFormatConverter(postEventDateTime));
  }, [postEventDateTime]);

  useEffect(() => {
    setPostEventTimeString(TimeFormatConverter(postEventDateTime));
  }, [postEventDateTime]);

  function CardPressHandler() {
    const post = {
      id: postId,
      title: postTitle,
      postType: postPostType,
      postContent: postPostContent,
      createdOn: postCreatedOn,
      createdOnString: postCreatedOnString,
      eventDateTime: postEventDateTime,
      eventDateString: postEventDateString,
      eventTimeString: postEventTimeString,
      authorID: postAuthorID,
      postContentCategory: postPostContentCategory,
      currentUser: currentUser,
      authorName: postAuthorName,
      keywordBadges: keywordBadges,
    };

    navigation.navigate("ForumPostDetail", { token: token, post: post });
  }

  function onEditHandler() {
    const postData = {
      id: postId,
      title: postTitle,
      postType: postPostType,
      postContent: postPostContent,
      createdOn: postCreatedOn,
      createdOnString: postCreatedOnString,
      eventDateTime: postEventDateTime,
      eventDateString: postEventDateString,
      eventTimeString: postEventTimeString,
      authorID: postAuthorID,
      postContentCategory: postPostContentCategory,
      currentUser: currentUser,
      authorName: postAuthorName,
      keywordBadges: keywordBadges,
      authorUser: authorUser,
    };
    navigation.navigate("EditForumPost", { postData });
  }

  function confirmDeleteHandler(result) {
    setDoDelete(result);
  }

  function onDeleteHandler() {
    let message = "Are you sure you want to delete this forum post?";
    DeleteAlert(message, confirmDeleteHandler);
  }

  useEffect(() => {
    if (doDelete) {
      const data = {
        id: postId,
      };
      let config = {
        method: "delete",
        url:
          "http://mindmagic.pythonanywhere.com/api/forumpost/" +
          postId +
          "/delete/",
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          navigation.navigate("ViewAllForumPosts");
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [doDelete]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.primaryCard}>
        <Pressable android_ripple={true} onPress={CardPressHandler}>
          <View style={internalStyle.primaryCard}>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={styles.forumUsername}>{postAuthorName}</Text>
              {authorIsCurrentUser || isAdmin ? (
                <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                  <Pressable
                    onPress={onEditHandler}
                    style={{ marginRight: 10, left: 20 }}
                  >
                    <EditIcon />
                  </Pressable>
                  <Pressable
                    onPress={onDeleteHandler}
                    style={{ marginRight: 10, left: 20 }}
                  >
                    <TrashIcon />
                  </Pressable>
                </View>
              ) : null}
            </View>
            <Text style={styles.forumTitle}>{title}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {keywordBadges.map((keyword) => {
                return (
                  <View key={keyword}>
                    <KeywordBadge keyword={keyword} />
                  </View>
                );
              })}
            </View>
            {isEvent ? (
              <View>
                <Text style={styles.forumUsername}>
                  Event Date:{"\n"}
                  {postEventDateString} @ {postEventTimeString}
                </Text>
              </View>
            ) : null}
            <Text style={{ textAlign: "right", top: 10 }}>
              Created {postCreatedOnString}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default PostCard;

const internalStyle = StyleSheet.create({
  capitalizeText: {
    textTransform: "capitalize",
  },

  titleText: {
    fontFamily: "InterMedium",
    fontSize: 20,
  },
});
