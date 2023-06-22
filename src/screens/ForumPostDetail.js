// Created by Anna McCOll 21-05-23
// Updated David Pearce, 09/06/2023
// Updated the get comments to work on ios
// Added a isEvent boolean
// Added Event Fields

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native";
import { styles } from "../styles/style";
import KeywordBadge from "../forum/KeywordBadge";
import CustomButton from "../components/CustomButton";
import { useEffect, useState } from "react";
import CommentForm from "../forum/CommentForm";
import CommentCard from "../forum/CommentCard";
import DeleteAlert from "../utilities/DeleteAlert";
import TrashIcon from "../icons/TrashIcon";
import EditIcon from "../icons/EditIcon";
import axios from "axios";
import { isEqual } from "lodash";

export default function ForumPostDetail({ route }) {
  // Gains access to navigation.
  const navigation = useNavigation();

  // Stores the post data sent through navigation.
  const postData = route.params.post;

  // Boolean for whether or not the current user is the same as the person who authored the post.
  const [authorIsCurrentUser, setAuthorIsCurrentUser] = useState(false);

  // Boolean for whether or not the comment form should be visible.
  const [addComment, setAddComment] = useState(false);

  // An array of all comments returned from the api call.
  const [allComments, setAllComments] = useState([]);

  // Boolean to toggle whenever the api call for comments needs to be re-done.
  const [refreshRequired, setRefreshRequired] = useState(true);

  // Boolean to determine is post is an Event
  const [isEvent, setIsEvent] = useState(false);

  // Whether or not a user wants to delete a post.
  const [doDelete, setDoDelete] = useState(false);

  // Data to be passed into the comment form
  const [oldData, setOldData] = useState([]);

  // Upon loading the screen, the authorID is checked against the userID to see whether they are the same,
  // oldData is defined and an api call is triggered to get the comments for the post.
  useEffect(() => {
    console.log(postData);
    if (postData.authorID === postData.currentUser.userID) {
      setAuthorIsCurrentUser(true);
    }
    if (postData.postType === "event") {
      console.log("EVENT!");
      setIsEvent(true);
    }
    if (postData.postType !== "event") {
      console.log("NOT EVENT!");
      setIsEvent(false);
    }

    const headerData = {
      forumPostID: postData.id,
      currentUser: postData.currentUser,
    };
    setOldData(headerData);
    setRefreshRequired(!refreshRequired);
  }, []);

  // If doDelete changes to true, the post is deleted and the user is taken back to the ViewAllForumPosts screen,
  // and a refresh is requested.
  useEffect(() => {
    if (doDelete) {
      deletePost(postData.id, postData.currentUser.token);
      navigation.goBack();
      setRefreshRequired(!refreshRequired);
    }
  }, [doDelete]);

  // When the refreshRequired useState changes, the fetchComments function is employed to retrieve a new list of
  // comments from the api.
  useEffect(() => {
    async function fetchComments() {
      try {
        const comments = await getComments(
          postData.id,
          postData.currentUser.token
        );

        const sortedComments = sortCommentsByCreatedOn(comments);
        // Compare the new comments with the existing ones
        const commentsChanged = !isEqual(sortedComments, allComments);

        if (commentsChanged) {
          setAllComments([...sortedComments]);
        }
      } catch {
        console.error(error);
      }
    }
    fetchComments();
  }, [refreshRequired]);

  // If the edit icon is pressed, the app navigates to the EditForumPost screen and takes the postData with it.
  function onPostEditHandler() {
    navigation.navigate("EditForumPost", { postData });
  }

  // If the trash icon is pressed, an alert model pops up asking for confirmation of the desire to delete the post.
  function onPostDeleteHandler() {
    let message = "Are you sure you want to delete this forum post?";
    DeleteAlert(message, confirmDeleteHandler);
  }

  // Receives a boolean response from the Delete Alert and sets it to doDelete.
  function confirmDeleteHandler(result) {
    setDoDelete(result);
  }

  // If the Add Comment button is pressed, the addComment useState is updated in order to open the comment form.
  function addCommentHandler() {
    setAddComment(true);
  }

  // When the Save Comment button on the add comment form is pressed, the comment form is closed and a refresh is
  // requested.
  function onSaveCommentHandler() {
    setAddComment(false);
    setRefreshRequired(!refreshRequired);
  }

  // The handler is used to transfer the reference to the refreshRequired state so that it can be updated from the
  // comment card.
  function toRefreshHandler() {
    setRefreshRequired(!refreshRequired);
  }

  // If the cancel button in the add comment form is pressed, the comment form is closed without saving the new comment.
  function onCancelCommentHandler() {
    setAddComment(false);
  }

  // Attend the event by sending the postID and userID to the database
  // If the edit icon is pressed, the app navigates to the EditForumPost screen and takes the postData with it.
  function onAttendEventHandler() {
    let userID = postData.currentUser.userID;
    let token = postData.currentUser.token;
    let eventID = postData.id;
    console.log(userID, token, eventID);
    attendEvent(eventID, token, userID);
  }

  return (
    <View style={styles.inputContainer}>
      <ScrollView>
        {authorIsCurrentUser ? (
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Pressable onPress={onPostEditHandler} style={{ marginRight: 100 }}>
              <EditIcon />
            </Pressable>
            <Pressable onPress={onPostDeleteHandler}>
              <TrashIcon />
            </Pressable>
          </View>
        ) : null}
        <Text style={styles.forumTitle}>{postData.title}</Text>
        <Text style={styles.forumUsername}>{postData.authorName}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {postData.keywordBadges.map((keyword) => {
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
              Event Date: {postData.eventDateString} at{" "}
              {postData.eventTimeString}
            </Text>
            <CustomButton
              text={"Attend"}
              onPress={onAttendEventHandler}
              type={"small"}
            />
          </View>
        ) : (
          ""
        )}

        <View style={styles.primaryCard}>
          <Text>{postData.postContent}</Text>
        </View>
        {addComment ? (
          <View>
            <CommentForm
              isCommentUpdate={false}
              oldData={oldData}
              onSaveComment={onSaveCommentHandler}
              onCancelComment={onCancelCommentHandler}
            />
          </View>
        ) : (
          <View>
            <CustomButton
              text={"Add Comment"}
              onPress={addCommentHandler}
              type={"big"}
            />
          </View>
        )}
        <View>
          <Text style={styles.forumTitle}>Comments</Text>
          {allComments.map((comment) => {
            return (
              <CommentCard
                key={comment.id + "-" + comment.commentContent}
                comment={comment}
                currentUser={postData.currentUser}
                isRefreshRequired={toRefreshHandler}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

// Sends an api call to delete the forum post object from the database.
export function deletePost(postID, token) {
  axios
    .delete(
      "http://mindmagic.pythonanywhere.com/api/forumpost/" +
        postID +
        "/delete/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })

    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// Sends an api call to get all the comments belonging to the specific forum post from the database.

export async function getComments(postID, token) {
  try {
    const config = {
      method: "get",
      url: `http://mindmagic.pythonanywhere.com/api/forumpost/${postID}/comments/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      params: {
        id: postID,
      },
    };

    const response = await axios.request(config);
    const comments = response.data.map((comment) => ({
      id: comment.id,
      commentContent: comment.commentContent,
      createdOn: comment.createdOn,
      authorID: comment.authorID,
      forumPostID: comment.forumPostID,
      commentAuthorUser: comment.user,
    }));

    return comments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Sorts the comments returned from the api call with the oldest first.
export function sortCommentsByCreatedOn(comments) {
  comments.sort((a, b) => {
    let date_a = new Date(a.createdOn),
      date_b = new Date(b.createdOn);
    return date_a - date_b;
  });
  return comments;
}

// Attend the event
export function attendEvent(eventID, token, userID) {
  const attendeeData = {
    attendeeID: userID,
    eventID: eventID,
  };

  axios
    .post(
      "http://mindmagic.pythonanywhere.com/api/attendingevents/",
      attendeeData,
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function checkIfAttending(eventID, token, userID) {
  useEffect(() => {
    axios
      .get(
        `http://mindmagic.pythonanywhere.com/api/attendingevents/?eventID=${eventID}&attendeeID=${userID}`,
        {
          headers: {
            Authorization: "Token " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Check if the user is attending the event
        const isAttending = response.data.length > 0;
        console.log("Is attending:", isAttending);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventID, token, userID]);
}

// export function attendEvent(postID, token, userID) {
//   return new Promise((resolve, reject) => {
//     let config = {
//       method: "get",
//       url: `http://mindmagic.pythonanywhere.com/api/attendingEvents/${postID}/comments/`,
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//       params: {
//         id: postID,
//       },
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//         const comments = response.data.map((comment) => ({
//           id: comment.id,
//           commentContent: comment.commentContent,
//           createdOn: comment.createdOn,
//           authorID: comment.authorID,
//           forumPostID: comment.forumPostID,
//           commentAuthorUser: comment.user,
//         }));
//         resolve(comments);
//       })
//       .catch((error) => {
//         console.log(error);
//         reject(error);
//       });
//   });
// }
