// Created by Anna McColl 11/05/23

import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import ForumPostForm from "../forum/ForumPostForm";

function CreateForumPost({ route }) {
  // get navigation and parameters passed through the route
  const navigation = useNavigation();
  const token = route.params.user.token;
  const userID = route.params.user.userID;

  const oldData = { postAuthorID: userID };
  // Event Handlers

  // If cancel is pressed the user is taken back to the previous screen.
  function onCancelHandler() {
    navigation.goBack();
  }

  // If post is pressed, the post is updated to the database.
  function onPostHandler(newPost) {
    //  newPost.authorID = userID
    console.log(newPost);
    let config = {
      method: "post",
      url: "https://mindmagic.pythonanywhere.com/api/forumpost/create/",
      headers: {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      },
      data: newPost,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("ViewAllForumPosts");
  }

  return (
    <ForumPostForm
      oldData={oldData}
      isForumPostUpdate={false}
      onCancel={onCancelHandler}
      onSave={onPostHandler}
    />
  );
}
export default CreateForumPost;
