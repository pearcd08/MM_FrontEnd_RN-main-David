// Created by Anna McColl 23-05-23

import { View, Text, StyleSheet, Pressable } from "react-native";
import { styles } from "../styles/style";
import { useEffect, useState } from "react";

import DateFormatConverter from "../utilities/DateFormatConverter";
import ForumAuthorName from "../utilities/ForumAuthorName";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import CommentForm from "./CommentForm";
import DeleteAlert from "../utilities/DeleteAlert";
import axios from "axios";
function CommentCard({ comment, currentUser, isRefreshRequired }) {
  const token = currentUser.token;

  // Stores the content of the comment.
  const [commentContent, setCommentContent] = useState(comment.commentContent);

  // Stores the user objectof the comment's author.
  const [commentAuthor, setCommentAuthor] = useState("");

  // Boolean of whether the current user is the author of the comment.
  const [authorIsCurrentUser, setAuthorIsCurrentUser] = useState(false);

  // Boolean which tells the app whether to delete the comment or not.
  const [doDelete, setDoDelete] = useState(false);

  //  Boolean which states whether the component should be an update form, or just display the card.
  const [isCommentUpdate, setIsCommentUpdate] = useState(false);

  // Array which stores the current comment data to send it through to the comment form component.
  const [oldData, setOldData] = useState([]);

  // To hold the datetime value that hte comment was created on.
  const [commentCreatedOn, setCommentCreatedOn] = useState(comment.createdOn);

  // To hold the string value of the date the comment was created on.
  const [commentCreatedOnString, setCommentCreatedOnString] = useState("");

  // Stores the comment ID.
  const [commentID, setCommentID] = useState(comment.commentID);

  useEffect(() => {
    console.log("new comment card", comment);
    if (comment.authorID === currentUser.userID) {
      setAuthorIsCurrentUser(true);
    }
    setCommentAuthor(ForumAuthorName(comment.commentAuthorUser));
  }, []);

  function onCommentEditHandler() {
    setIsCommentUpdate(true);
    const commentData = {
      comment: comment,
      currentUser: currentUser,
    };
    setOldData(commentData);
  }
  function onUpdateCommentHandler() {
    setIsCommentUpdate(false);
  }

  function onCancelUpdateCommentHandler() {
    setIsCommentUpdate(false);
  }
  function confirmDeleteHandler(result) {
    setDoDelete(result);
  }

  function onCommentDeleteHandler() {
    let message = "Are you sure you want to delete this comment?";
    DeleteAlert(message, confirmDeleteHandler);
  }

  function isRefreshRequiredHandler() {
    isRefreshRequired();
  }
  useEffect(() => {
    if (doDelete) {
      console.log(comment);
      const data = {
        id: commentID,
      };
      console.log(data);
      let config = {
        method: "delete",
        url:
          "http://mindmagic.pythonanywhere.com/api/forumcomment/" +
          comment.id +
          "/delete/",
        headers: {
          Authorization: "Token " + currentUser.token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          isRefreshRequiredHandler();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [doDelete]);

  // Transform dateTime objects into readable strings.
  useEffect(() => {
    console.log("transforming created on", commentCreatedOn);
    setCommentCreatedOnString(DateFormatConverter(commentCreatedOn));
  }, [commentCreatedOn]);

  return (
    <View style={styles.primaryCard}>
      {authorIsCurrentUser || currentUser.group === 1 ? (
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <Pressable
            onPress={onCommentEditHandler}
            style={{ marginRight: 100 }}
          >
            <EditIcon />
          </Pressable>
          <Pressable onPress={onCommentDeleteHandler}>
            <TrashIcon />
          </Pressable>
        </View>
      ) : null}
      {isCommentUpdate ? (
        <View>
          <CommentForm
            oldData={oldData}
            isCommentUpdate={isCommentUpdate}
            onSaveComment={onUpdateCommentHandler}
            onCancelComment={onCancelUpdateCommentHandler}
            isRefreshRequired={isRefreshRequiredHandler}
          />
        </View>
      ) : (
        <View>
          <Text>Username: {commentAuthor}</Text>
          <Text>{commentContent}</Text>
          <Text style={{ textAlign: "right" }}>
            Created On: {commentCreatedOnString}
          </Text>
        </View>
      )}
    </View>
  );
}

export default CommentCard;

const internalStyle = StyleSheet.create({
  capitalizeText: {
    textTransform: "capitalize",
  },
});
