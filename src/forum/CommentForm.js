import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import axios from "axios";
import { styles } from "../styles/style";

function CommentForm({
  isCommentUpdate,
  oldData,
  onSaveComment,
  onCancelComment,
  isRefreshRequired,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      commentContent: isCommentUpdate ? oldData.comment.commentContent : "",
    },
  });
  const [prevData, setPrevData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [forumPostID, setForumPostID] = useState("");

  useEffect(() => {
    if (oldData) {
      setPrevData(oldData);
    }
    if (oldData && oldData.currentUser && oldData.currentUser.userID) {
      setCurrentUser(oldData.currentUser);
    }
    if (isCommentUpdate) {
      setForumPostID(oldData.comment.forumPostID);
    } else if (!isCommentUpdate) {
      setForumPostID(oldData.forumPostID);
    } else {
      console.log("no forum post id");
    }
    if (isCommentUpdate) {
      setCommentContent(oldData.comment.commentContent);
    }
  }, []);

  function cancelHandler() {
    onCancelComment();
  }

  function saveCommentHandler(data) {
    try {
      const newComment = {
        authorID: currentUser.userID,
        commentContent: data.commentContent,
        forumPostID: forumPostID,
      };
      console.log(newComment);
      let config = {};
      if (isCommentUpdate) {
        newComment.id = prevData.comment.id;

        config = {
          method: "put",
          url:
            "https://mindmagic.pythonanywhere.com/api/forumcomment/" +
            prevData.comment.id +
            "/update/",
          headers: {
            Authorization: "Token " + currentUser.token,
            "Content-Type": "application/json",
          },
          data: newComment,
        };
      } else {
        config = {
          method: "post",
          url: "https://mindmagic.pythonanywhere.com/api/forumcomment/create/",
          headers: {
            Authorization: "Token " + currentUser.token,
            "Content-Type": "application/json",
          },
          data: newComment,
        };
      }
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setCommentContent(data.commentContent);

          onSaveComment(response.data);
          isRefreshRequired();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 25 }}
    >
      <CustomTextInput
        control={control}
        header="New Comment"
        fieldName="commentContent"
        placeholder="Enter comment here."
        defaultValue={commentContent}
        multiline={true}
        numberOfLines={2}
        rules={{
          required: "Comment text is required",
          maxLength: {
            value: 1000,
            message: "The comment can only be 1000 characters long",
          },
        }}
      />

      <View style={styles.buttonContainer}>
        <CustomButton text={"Cancel"} onPress={cancelHandler} type={"small"} />

        <CustomButton
          text={"Comment"}
          onPress={handleSubmit(saveCommentHandler)}
          type={"small"}
        />
      </View>
    </View>
  );
}

export default CommentForm;
